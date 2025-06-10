import React, { useState } from "react";
import Hashtag from "../../components/Hashtag";
import AddArea from "./AddArea";
import AreaTable from "./AreaTable";

export default function Area() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  return (
    <>
      <div className="p-4">
        {/* Filter Section */}
        <div className="head">
          <h1 className="font-bold py-3">Filter by</h1>
        </div>
        <div className="flex items-center justify-between py-2 rounded-md">
          <div className="relative flex items-center w-72">
            <span className="absolute left-3 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
                />
              </svg>
            </span>

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Try to Searching..."
              className="w-full px-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            className="px-11 py-2 text-sm text-white bg-[#2697E0] rounded-full font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Area
          </button>
        </div>
        {/* Modal */}
        {isModalOpen && (
          <AddArea
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            onClose={() => setIsModalOpen(false)}
          />
        )}

        {/* Head offers */}
        <div className="py-3">
          <Hashtag># All Areas</Hashtag>
        </div>

        {/* Table */}
        <div>
          <AreaTable
            setIsModalOpen={setIsModalOpen}
            setSelectedArea={setSelectedArea}
            search={search}
          />
        </div>
      </div>
    </>
  );
}
