import React, { useState } from 'react'
import Hashtag from '../../components/Hashtag';
import AddVendor from './AddVendor';
import VendorsTable from './VendorsTable';

export default function Vendors() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState(''); 
    const [placeFilter, setPlaceFilter] = useState(''); 
    const [search, setSearch] = useState(''); 
    
    const [selectedVendor, setSelectedVendor] = useState(null);
    

  
    const handleSearchChange = (e) => {
      setSearch(e.target.value.toLowerCase());
    };
    const handleStatusFilterChange = (e) => {
      setStatusFilter(e.target.value);
    };
    const handlePlaceFilterChange = (e) => {
      setPlaceFilter(e.target.value);
    };
  
  
  
  
    return (
      <>
        <div className="p-4">
          {/* Filter Section */}
          <div className="head">
            <h1 className="font-bold py-3">Filter by</h1>
          </div>
          <div className="flex items-center justify-between py-2 rounded-md">
            {/* Filter By Section */}
            <div className="flex space-x-40">
              <div>
              <select
            value={placeFilter}
            onChange={handlePlaceFilterChange}
            className="w-56 p-2 mt-1 text-sm border border-gray-300 rounded-md"
          >
                <option value="" className={`text-gray-300`}>Select Place</option>
                        <option value="1">Hospitals</option>
                        <option value="2">Doctor</option>
                        <option value="3">Pharmacies</option>
                        <option value="4">Laboratories</option>
                        <option value="5">Radiology Center</option>
                        <option value="6">Optics</option>
          </select>
              </div>
              <div>
              <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="w-56 p-2 mt-1 text-sm border border-gray-300 rounded-md"
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
              </div>
            </div>
  
            {/* Actions Section */}
            <div className="flex items-center space-x-4">
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
              {/* Dropdown for 50 */}
              {/* <div>
                <select className="w-16 py-[2px] px-2 text-sm border border-gray-300 rounded-md">
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div> */}
  
              {/* Bulk Actions */}
              {/* <button
                // onClick={handleBulkActions}
                className=" flex gap-1  border-gray-300 items-center mr-3 px-2 py-[2px] border rounded-lg"
              >
                <span className=" border-r-[1px] border-gray-300 px-1">
                  Bulk Actions
                </span>
                <FaArrowsRotate />
              </button> */}
  
              {/* Add New Offer Button */}
              <button className="px-11 py-2 text-sm text-white bg-[#2697E0] rounded-full font-medium" onClick={() => setIsModalOpen(true)}>
                Add New Vendor
              </button>
  
               {/* Modal Add Vendor*/}
        {isModalOpen && (
        <AddVendor onClose={() => setIsModalOpen(false)} selectedVendor={selectedVendor} setSelectedVendor={setSelectedVendor}/>
        )}
  
            </div>
          </div>
  
          {/* Head offers */}
          <div className="py-3">
            <Hashtag># All Vendors</Hashtag>
          </div>
  
          {/* Table */}
          <div>
            <VendorsTable setIsModalOpen={setIsModalOpen} setSelectedVendor={setSelectedVendor} statusFilter={statusFilter} placeFilter={placeFilter} search={search}/>
          </div>
        </div>
      </>
    )
}
