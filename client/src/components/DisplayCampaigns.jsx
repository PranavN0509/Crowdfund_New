import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../assets/index';
import { Loader } from '../components/index'
import { useStateContext } from '../context';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const { address } = useStateContext();
  const navigate = useNavigate();
  campaigns.length = 5 //set ths length for better view of all campaigns
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign })
  }

  const tempcampaign1 = {
    owner: "Naturelife Foundation",
    title: "River Cleaning Campaign",
    description: "This is description of the campaign",
    target: "70",
    deadline: "October 30, 2024 12:00:00",
    amountCollected: "30",
    image: "https://www.river-cleanup.org/sites/default/files/styles/max/public/2024-04/pxl_20230709_075854737_2.jpg?itok=3T-BYZ1m"
  }
  const tempcampaign2 = {
    owner: "Riley Children’s Foundation",
    title: "Donate for Child Welfare",
    description: "This is description of the campaign",
    target: "70",
    deadline: "October 30, 2024 12:00:00",
    amountCollected: "30",
    image: "https://www.classy.org/wp-content/uploads/2022/03/CF5.jpg"
  }
  const tempcampaign3 = {
    owner: "Wildlife Foundation",
    title: "Animal Rescue and Shelter",
    description: "This is description of the campaign",
    target: "70",
    deadline: "October 30, 2024 12:00:00",
    amountCollected: "30",
    image: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/08/11/Pictures/_0df5d23e-bc4e-11e9-b550-1b3b7c3fb345.jpg"
  }
  const tempcampaign4 = {
    owner: "Yashodhan Trust",
    title: "Treatment of psychiatric health check-ups",
    description: "This is description of the campaign",
    target: "70",
    deadline: "October 30, 2024 12:00:00",
    amountCollected: "30",
    image: "https://athenabhs.com/wp-content/uploads/2024/09/Mental-Health-Wards-vs.-Psychiatric-Hospitals-Key-Differences.webp"
  }
  const tempcampaign5 = {
    owner: "Wishberry",
    title: "FuelADream",
    description: "This is description of the campaign",
    target: "70",
    deadline: "October 30, 2024 12:00:00",
    amountCollected: "30",
    image: "https://images.squarespace-cdn.com/content/v1/5b6a846685ede1c6f0f1f607/1533887461631-NET3XBBR3M988QFSX62Y/FAD+Logo?format=1000w"
  }
  

  return (
    <div>
      {isLoading && <Loader />}

      <h1 className="font-epilogue font-semibold text-[20px] text-[#818183] dark:text-white text-left">Welcome User {address}</h1>
      <h1 className="font-epilogue font-semibold text-[20px] text-[#818183] dark:text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap flex-row mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[16px] leading-[30px] text-[#818183] dark:text-[#fff]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) =>
          <></>)}

        {/* <FundCard 
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        /> */}

        <FundCard
          key={uuidv4()}
          {...tempcampaign1}
          handleClick={() => {
            handleNavigate(tempcampaign1)
          }
          }
        />
        <FundCard
          key={uuidv4()}
          {...tempcampaign2}
          handleClick={() => {
            handleNavigate(tempcampaign2)
          }
          }
        />
        <FundCard
          key={uuidv4()}
          {...tempcampaign3}
          handleClick={() => {
            handleNavigate(tempcampaign3)
          }
          }
        />
        <FundCard
          key={uuidv4()}
          {...tempcampaign4}
          handleClick={() => {
            handleNavigate(tempcampaign4)
          }
          }
        />
        <FundCard
          key={uuidv4()}
          {...tempcampaign5}
          handleClick={() => {
            handleNavigate(tempcampaign5)
          }
          }
        />
      </div>
    </div>
  )
}

export default DisplayCampaigns