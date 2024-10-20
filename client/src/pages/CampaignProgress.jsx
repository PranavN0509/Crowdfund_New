import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context/index';
import { CountBox, CustomButton, Loader } from '../components/index';
import { calculateBarPercentage, daysLeft } from '../utils/index';
import { thirdweb } from '../assets/index';

const CampaignProgress = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { connectWallet, address, balance } = useStateContext();
    const { state } = useLocation();
    let isOwnerViewing = false;
    state.owner = address

    if (address === state.owner) {
        isOwnerViewing = true;

    } else {
        isOwnerViewing = false;
    }
    console.log("Hello", isOwnerViewing);



    const CreateCampaignModal = () => {
        const [isDeployingContract, setIsDeployingContract] = useState(false);
        const [requestName, setrequestName] = useState("");
        const [requestDescription, setrequestDescription] = useState("");
        const [requestAmount, setrequestAmount] = useState(1);
        const [campaignImageBefore, setCampaignImageBefore] = useState("");
    
    
        const handleAddWithdrawRequest = async () => { }
    
    
        return (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
                <div className="w-1/2 bg-slate-100 p-6 rounded-md">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-semibold">Create a Milestone</p>
                        <button
                            className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
                            onClick={() => setIsModalOpen(false)}
                        >Close</button>
                    </div>
                    <div className="flex flex-col">
                        <label>Milestone Title:</label>
                        <input
                            type="text"
                            value={requestName}
                            onChange={(e) => setrequestName(e.target.value)}
                            placeholder="Milestone Title"
                            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        />
    
                        <label>Milestone Description:</label>
                        <textarea
                            value={requestDescription}
                            onChange={(e) => setrequestDescription(e.target.value)}
                            placeholder="Milestone Description"
                            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        ></textarea>
    
                        <label>Request Amount:</label>
                        <input
                            type="number"
                            value={requestAmount}
                            onChange={(e) => setrequestAmount(parseInt(e.target.value))}
                            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        />
    
                        <label>Milestone Images:</label>
                        <input
                            type="file"
                            value={campaignImageBefore}
                            onChange={(e) => { }}
                            className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                        />
    
    
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={handleAddWithdrawRequest}
                        >
                            {isDeployingContract ? "Creating Request..." : "Create Milestone Request"}
                        </button>
    
                    </div>
                </div>
            </div>
        )
    }










    return (
        <>
            { isModalOpen && <CreateCampaignModal /> }

            {/* Contributions received */}

            <div className="bg-gray-100 dark:bg-[#13131a] w-full">

                <div className="w-full flex items-center justify-between pb-6">
                    <div>
                        <h1 className="text-2xl text-[#3e3e42] dark:text-white font-semibold">Withdrawl Request for <b>{state.title}</b> </h1>
                        <span className="mt-2 text-base text-[#818183] dark:text-white">Milestones achieved</span>
                    </div>

                    <div className="flex items-center justify-between">
                        {isOwnerViewing ?
                            (<div className="lg:ml-40 ml-10 space-x-8">
                                <button className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => { setIsModalOpen(true) }}>Add Withdrawl Request</button>
                                {/* <button className="bg-blue-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button> */}
                            </div>) : (<></>)
                        }
                    </div>
                </div>

                <div className="w-full">
                    <div className="mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal border-black">
                                <thead className="border-gray-200 text-[#3e3e42] dark:text-white bg-gray-100 dark:bg-[#13131a]">
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Receipent Wallet Address
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Approval Count
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                                            Approve
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-[#3e3e42] dark:text-white bg-[#fff] dark:bg-[#13131a]">
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="whitespace-no-wrap">
                                                        1
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full"
                                                        src="https://images.pexels.com/photos/7656743/pexels-photo-7656743.jpeg"
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className="whitespace-no-wrap">
                                                        Completed the work
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b  text-sm">
                                            <p className="whitespace-no-wrap">2 Eth</p>
                                        </td>
                                        <td className="px-5 py-5 border-b text-sm">
                                            <p className="whitespace-no-wrap">
                                                0xfDe29D36d6467F880c6A15c15ea89b262ca9BCe5
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b  text-sm">
                                            <p className="whitespace-no-wrap">
                                                43
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <button className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Approve</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <div className="flex items-center">
                                                <div className="ml-3">
                                                    <p className="whitespace-no-wrap">
                                                        2
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 w-10 h-10">
                                                    <img className="w-full h-full rounded-full"
                                                        src="https://images.pexels.com/photos/7656743/pexels-photo-7656743.jpeg"
                                                        alt="" />
                                                </div>
                                                <div className="ml-3">
                                                    <p className=" whitespace-no-wrap">
                                                        Cleaned the surface with garbage collector
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="whitespace-no-wrap">1 Eth</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="whitespace-no-wrap">
                                                0xfDe29D36d6467F880c6A15c15ea89b262ca9BCe5
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <p className="whitespace-no-wrap">
                                                43
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 text-sm">
                                            <button className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Approve</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>


            {isModalOpen && (
                <CreateCampaignModal
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </>
    )
}

export default CampaignProgress;


// type CreateCampaignModalProps = {
//     // setIsModalOpen: (value: boolean) => void
// }


const CreateCampaignModal = (
    // { setIsModalOpen, }: CreateCampaignModalProps
) => {
    const account = useActiveAccount();
    const [isDeployingContract, setIsDeployingContract] = useState(false);
    const [requestName, setrequestName] = useState("");
    const [requestDescription, setrequestDescription] = useState("");
    const [requestAmount, setrequestAmount] = useState(1);
    const [campaignImageBefore, setCampaignImageBefore] = useState("");


    const handleAddWithdrawRequest = async () => { }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
            <div className="w-1/2 bg-slate-100 p-6 rounded-md">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-lg font-semibold">Create a Milestone</p>
                    <button
                        className="text-sm px-4 py-2 bg-slate-600 text-white rounded-md"
                        onClick={() => setIsModalOpen(false)}
                    >Close</button>
                </div>
                <div className="flex flex-col">
                    <label>Milestone Title:</label>
                    <input
                        type="text"
                        value={requestName}
                        onChange={(e) => setrequestName(e.target.value)}
                        placeholder="Milestone Title"
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                    />

                    <label>Milestone Description:</label>
                    <textarea
                        value={requestDescription}
                        onChange={(e) => setrequestDescription(e.target.value)}
                        placeholder="Milestone Description"
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                    ></textarea>

                    <label>Request Amount:</label>
                    <input
                        type="number"
                        value={requestAmount}
                        onChange={(e) => setrequestAmount(parseInt(e.target.value))}
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                    />

                    <label>Milestone Images:</label>
                    <input
                        type="file"
                        value={campaignImageBefore}
                        onChange={(e) => { }}
                        className="mb-4 px-4 py-2 bg-slate-300 rounded-md"
                    />


                    <button
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAddWithdrawRequest}
                    >
                        {isDeployingContract ? "Creating Request..." : "Create Milestone Request"}
                    </button>

                </div>
            </div>
        </div>
    )
}