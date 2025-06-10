import React, { useState } from "react";
import InvoicesTable from "./InvoicesTable";
import { LuDownload } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { exportPDF } from "../../Store/Invoice/downloadpdf";

export default function Invoices() {

  const [search, setSearch] = useState("");
  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.exportPDF);

  const handleExport = () => {
    dispatch(exportPDF());
  };


  return (
    <>

      <div className="p-4">
        <div className="head">
          <h1 className="font-bold py-3"># Invoices</h1>
        </div>
        <div className=" flex mb-1 justify-between items-center">
          <div className=" flex  gap-1 items-center">
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
                className="w-full px-10 py-[6px] text-sm border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
        className={`bg-[#1492E6] font-medium text-white rounded-full flex gap-3 px-5 py-2 text-[11px] ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        // onClick={handleExport}
        disabled={loading}
      >
        {loading ? "Exporting..." : "Export PDF"}
        <LuDownload className="text-[14px]" />
      </button>
          </div>
        </div>
        {/* Table for Reports */}
        <div className="py-4 px-2">
          <InvoicesTable search={search}/>
        </div>
      </div>
    </>
  );
}
