import React, { useState } from "react";
import Hashtag from "../../components/Hashtag";
import SliderTable from "./SliderTable";
import AddSlider from "./AddSlider";

export default function Slider() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);



  return (
    <>
      <div className="flex space-x-2 justify-between m-10 items-center mb-5 mt-6 ms-4">
        <Hashtag># Banner</Hashtag>
        <button
          className="px-11 py-2 text-sm text-white bg-[#2697E0] rounded-full font-medium"
          onClick={() => setIsModalOpen(true)}
        >
          Add Banner
        </button>
        {isModalOpen && (
          <AddSlider onClose={() => setIsModalOpen(false)} selectedBanner={selectedBanner} setSelectedBanner={setSelectedBanner}/>
        )}
      </div>

      <div>
        <SliderTable setIsModalOpen={setIsModalOpen} setSelectedBanner={setSelectedBanner}/>
      </div>
    </>
  );
}
