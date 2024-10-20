import React, { useContext, createContext, useState } from 'react';
// import dotenv from "dotenv";
// import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { PinataSDK } from "pinata-web3"
// import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';
import { Crowdfundingfactoryaddress, contractAbiCrowdfundingFactory } from '../constants';

// dotenv.config()

const StateContext = createContext();  //here i created the context 

// the below StateContextProvider provides it to the  main.jsx where I will wrap it in StateContextProvider tags

export const StateContextProvider = ({ children }) => {

  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);

  // const networks = {
  //   polygon: {
  //     chainId: `0x${Number(80002).toString(16)}`,
  //     chainName: "Polygon Testnet",
  //     nativeCurrency: {
  //       name: "POL",
  //       symbol: "POL",
  //       decimals: 18
  //     },
  //     rpcUrls: ["https://rpc-amoy.polygon.technology"],
  //     blockExplorerUrls: ["https://amoy.polygonscan.com"]
  //   }
  // }

  const networks = {
    sepolia: {
      chainId: `0x${Number(11155111).toString(16)}`,
      chainName: "Sepolia test network",
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "SepoliaETH",
        decimals: 18
      },
      rpcUrls: ["https://sepolia.infura.io/v3/"],
      blockExplorerUrls: ["https://sepolia.etherscan.io"]
    }
  }



  // Pinata
  const pinata = new PinataSDK({
    pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
    pinataGateway: "yellow-adjacent-marmot-457.mypinata.cloud"
  })


  const connectWallet = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" })
    const provider = new ethers.BrowserProvider(window.ethereum);
    const network = await provider.getNetwork();
    console.log(network.name)
    if (network.name !== "sepolia") {

      console.log("Hello");
      await window.ethereum.request({
        "method": "wallet_addEthereumChain",
        "params": [
          {
            ...networks["sepolia"]
          }
        ]
      })

    }

    const signer = await provider.getSigner();
    const _walletAddress = await signer.getAddress();
    const Balance = ethers.formatEther(await provider.getBalance(_walletAddress));
    const contract = new ethers.Contract(Crowdfundingfactoryaddress, contractAbiCrowdfundingFactory, signer);
    setAddress(_walletAddress);
    setBalance(Balance);
    console.log(address)
    console.log(Balance);


    // console.log(signer)
    // console.log(_walletAddress);
    // console.log(address);
  };



  const disconnectWallet = async () => {
    try {
      // Request to revoke all previously granted permissions
      const response = await window.ethereum.request({
        method: "wallet_revokePermissions",
        params: [{ eth_accounts: {} }],
      });
      setAddress("");
      setBalance(0)
      console.log('Permissions revoked:', response);
      // Update the state or trigger any cleanup needed after disconnecting
    } catch (error) {
      console.error('Error revoking permissions:', error);
    }
  };








  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
        args: [
          address, // owner
          form.title, // title
          form.description, // description
          form.target,
          new Date(form.deadline).getTime(), // deadline,
          form.image,
        ],
      });

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount) });

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{
        pinata,
        connectWallet,
        disconnectWallet,
        address,
        balance, 
        publishCampaign,
        // address,
        // contract,
        // connect,
        // createCampaign: publishCampaign,
        // getCampaigns,
        // getUserCampaigns,
        // donate,
        // getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);