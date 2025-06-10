import React, { useEffect, useMemo, useState } from "react";
import ReportsTable from "./ReportsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../Store/Reports/reports";

export default function Reports() {


  const [title, setTitle] = useState(""); 
  const [typeId, setTypeId] = useState(""); 
  const [search, setSearch] = useState(""); 

  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.fetchCard);
  
  const { data } = useSelector((state) => state.fetchCard?.data);
  

  const queryParams = useMemo(() => {
    const params = {};
    if (title) params.title = title;
    if (typeId) params.type_id = typeId;
    if (search) params.search = search;
    return params;
  }, [title, typeId, search]);

  useEffect(() => {
    dispatch(fetchCards({ page: currentPage, queryParams }));
  }, [queryParams, currentPage, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(fetchCards({ page: newPage, queryParams }));
    }
  };

  return (
    <>
      <div className="p-4">
        {/* Filter Section */}
        <div className="head">
          <h1 className="font-bold py-3"># Reports</h1>
        </div>

        <div className="flex space-x-2 items-center mb-5">
          <div className="heading flex-grow">
            <h2 className="font-bold">Sales</h2>
          </div>

          {/* <div>
            <button
              // onClick={handleBulkActions}
              className=" flex gap-1  border-gray-300 items-center mt-1 px-2 py-[6px] border rounded-lg"
            >
              <span className=" border-r-[1px] border-gray-300 px-1">
                Bulk Actions
              </span>
              <FaArrowsRotate />
            </button>
            </div> */}
          <div>
            <select onChange={(e) => setTitle(e.target.value)} value={title} className="w-52 p-2 mt-1 text-sm border border-gray-300 rounded-md">
            <option value="" >Card</option>
                <option value="Elite Medical Card">Elite Medical Card</option>
                <option value="Free Medical Card">Free Medical Card</option>
            </select>
          </div>
          <div>
            <select onChange={(e) => setTypeId(e.target.value)} value={typeId}className="w-52 p-2 mt-1 text-sm border border-gray-300 rounded-md">
            <option value="">Type of Card</option>
            <option value="1">Virtual Card</option>
            <option value="2">Physical Card</option>
            </select>
          </div>

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
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try to Searching..."
              className="w-full px-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* <div className='date'>
            <div className="relative">

      <div
        className="flex items-center px-4 py-2 mt-1 border border-gray-300 rounded-md cursor-pointer"
        onClick={toggleCalendar}
      >
        <span className="text-sm text-gray-700">
          {format(dateRange[0].startDate, 'yyyy-MM-dd')} -{' '}
          {dateRange[0].endDate
            ? format(dateRange[0].endDate, 'yyyy-MM-dd')
            : 'Select end date'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="30.789" height="17.638" viewBox="0 0 16.789 17.638">
  <g id="Group_17" data-name="Group 17" transform="translate(5)">
    <g id="Group_16" data-name="Group 16">
      <path id="Path_58" data-name="Path 58" d="M-3076.575,1054.584h2.651v-.578a.774.774,0,0,1,.721-.877,1.177,1.177,0,0,1,.743.087.688.688,0,0,1,.443.684c-.005.223,0,.446,0,.693h.207c.508,0,1.016,0,1.523,0a1.14,1.14,0,0,1,1.157,1.108c0,.06,0,.121,0,.181q0,6.784,0,13.567a1.759,1.759,0,0,1-.051.466,1.132,1.132,0,0,1-1.055.822c-.206.006-.412,0-.617,0h-13.838a1.148,1.148,0,0,1-1.187-.867,1.537,1.537,0,0,1-.038-.377q0-6.829,0-13.658a1.152,1.152,0,0,1,1.259-1.246h1.631V1054a.773.773,0,0,1,.726-.873,1.166,1.166,0,0,1,.807.123.67.67,0,0,1,.375.635c0,.228,0,.457,0,.7h2.65v-.57a.781.781,0,0,1,.761-.892,1.158,1.158,0,0,1,.771.135.652.652,0,0,1,.364.621C-3076.581,1054.1-3076.575,1054.333-3076.575,1054.584Zm6.853,12.272v-8.624h-15.615v.176q0,5.116,0,10.232c0,.459.218.672.684.672h12.3c.063,0,.126-.008.2-.012v-2.017c0-.35.076-.427.422-.427Zm-8.167-11.675a2.779,2.779,0,0,1,0,.346c-.022.171.058.246.213.271.053.009.107.017.161.024a.287.287,0,0,1,.284.291.28.28,0,0,1-.311.282,1.8,1.8,0,0,1-.537-.137.624.624,0,0,1-.389-.638c.007-.143,0-.287,0-.437h-3.977v.244c0,.32.035.359.349.393.019,0,.036,0,.054,0a.271.271,0,0,1,.254.281.271.271,0,0,1-.229.286.855.855,0,0,1-1.009-.781c0-.143,0-.285,0-.439h-1.637c-.46,0-.671.213-.672.678q0,.789,0,1.578c0,.065,0,.129.008.2h15.608c0-.052.011-.093.011-.135,0-.568,0-1.137,0-1.7a.568.568,0,0,0-.625-.614h-2.83c-.057,0-.114.006-.179.009a3.25,3.25,0,0,1,0,.347c-.021.172.068.243.218.27.054.01.108.017.161.024a.283.283,0,0,1,.281.293.278.278,0,0,1-.31.281,1.548,1.548,0,0,1-.44-.091.686.686,0,0,1-.489-.723c0-.131,0-.262,0-.4Zm-7.384,14.635c.083.232.262.342.587.342h14.33a.577.577,0,0,0,.647-.632c0-.5,0-1,0-1.506a1.316,1.316,0,0,0-.022-.155c-.618.619-1.216,1.21-1.8,1.812a.672.672,0,0,1-.527.218q-6.257-.007-12.515-.007A6.554,6.554,0,0,1-3085.273,1069.817Zm13.7-1.02,1.351-1.35h-1.351Zm-10.131-14.213c0-.244.006-.466-.006-.688a.209.209,0,0,0-.1-.148.587.587,0,0,0-.54,0,.18.18,0,0,0-.1.114c-.009.239,0,.478,0,.722Zm8.357,0h.744v-.2c0-.168,0-.337,0-.506a.151.151,0,0,0-.044-.092.612.612,0,0,0-.647,0,.173.173,0,0,0-.048.108C-3073.345,1054.114-3073.343,1054.341-3073.343,1054.582Zm-4.546,0h.733c0-.24,0-.474,0-.708a.171.171,0,0,0-.086-.119.582.582,0,0,0-.54,0,.207.207,0,0,0-.1.148C-3077.9,1054.117-3077.889,1054.34-3077.889,1054.578Z" transform="translate(3085.917 -1053.103)" fill="#707070"/>
      <path id="Path_59" data-name="Path 59" d="M-3036.742,1322.65c.236,0,.471,0,.707,0a.288.288,0,0,1,.324.308q.011.634,0,1.268a.286.286,0,0,1-.312.3q-.714.008-1.43,0a.288.288,0,0,1-.313-.32q-.006-.625,0-1.25a.284.284,0,0,1,.319-.31C-3037.213,1322.648-3036.977,1322.651-3036.742,1322.65Zm-.432.588v.7h.873v-.7Z" transform="translate(3040.104 -1309.586)" fill="#707070"/>
      <path id="Path_60" data-name="Path 60" d="M-3036.742,1192.838c-.229,0-.458,0-.688,0a.294.294,0,0,1-.331-.336q0-.607,0-1.214a.3.3,0,0,1,.337-.333q.688-.005,1.377,0a.3.3,0,0,1,.344.348c0,.4,0,.8,0,1.2,0,.237-.111.338-.35.34S-3036.512,1192.838-3036.742,1192.838Zm.449-.587v-.708h-.877v.708Z" transform="translate(3040.097 -1184.271)" fill="#707070"/>
      <path id="Path_61" data-name="Path 61" d="M-3036.734,1256.815c.229,0,.459,0,.688,0a.3.3,0,0,1,.339.333q.007.607,0,1.214a.3.3,0,0,1-.338.335q-.7,0-1.395,0a.291.291,0,0,1-.325-.325q-.005-.616,0-1.232a.29.29,0,0,1,.324-.325C-3037.2,1256.812-3036.969,1256.815-3036.734,1256.815Zm.436,1.3v-.707h-.875v.707Z" transform="translate(3040.101 -1246.942)" fill="#707070"/>
      <path id="Path_62" data-name="Path 62" d="M-2967.58,1256.815c.229,0,.458,0,.688,0a.291.291,0,0,1,.325.325q0,.616,0,1.231a.291.291,0,0,1-.325.325c-.465,0-.93,0-1.395,0-.218,0-.331-.1-.335-.317q-.009-.625,0-1.249c0-.214.117-.313.336-.316C-2968.051,1256.812-2967.815,1256.815-2967.58,1256.815Zm.424.593h-.877v.7h.877Z" transform="translate(2974.311 -1246.942)" fill="#707070"/>
      <path id="Path_63" data-name="Path 63" d="M-2898.273,1258.7c-.223,0-.447,0-.669,0-.241,0-.347-.1-.349-.339q0-.606,0-1.213a.293.293,0,0,1,.336-.331q.688,0,1.376,0c.229,0,.339.1.342.328q.01.616,0,1.231a.294.294,0,0,1-.331.323C-2897.8,1258.7-2898.039,1258.7-2898.273,1258.7Zm.447-1.291h-.87v.7h.87Z" transform="translate(2908.338 -1246.94)" fill="#707070"/>
      <path id="Path_64" data-name="Path 64" d="M-2829.143,1256.816c.23,0,.459,0,.689,0a.291.291,0,0,1,.327.323q.006.615,0,1.231a.291.291,0,0,1-.322.328q-.707.006-1.412,0a.289.289,0,0,1-.321-.314q-.01-.625,0-1.25c0-.214.116-.316.333-.319C-2829.613,1256.813-2829.378,1256.816-2829.143,1256.816Zm-.452,1.29h.878v-.7h-.878Z" transform="translate(2842.581 -1246.943)" fill="#707070"/>
      <path id="Path_65" data-name="Path 65" d="M-2967.594,1322.65c.229,0,.458,0,.688,0s.337.1.338.327q0,.615,0,1.231a.291.291,0,0,1-.328.323q-.7.006-1.394,0a.293.293,0,0,1-.333-.321q-.009-.625,0-1.25a.286.286,0,0,1,.321-.311C-2968.065,1322.647-2967.83,1322.65-2967.594,1322.65Zm.438.589h-.874v.7h.874Z" transform="translate(2974.31 -1309.586)" fill="#707070"/>
      <path id="Path_66" data-name="Path 66" d="M-2898.26,1322.652c.229,0,.459,0,.688,0,.211,0,.326.1.33.3q.012.643,0,1.286a.279.279,0,0,1-.3.294q-.724.009-1.449,0a.283.283,0,0,1-.3-.312q-.005-.624,0-1.249c0-.214.109-.316.328-.319C-2898.732,1322.65-2898.5,1322.652-2898.26,1322.652Zm-.441.588v.707h.869v-.707Z" transform="translate(2908.341 -1309.589)" fill="#707070"/>
      <path id="Path_67" data-name="Path 67" d="M-2967.607,1192.835c-.229,0-.459,0-.688,0a.286.286,0,0,1-.323-.308q-.011-.634,0-1.268a.288.288,0,0,1,.328-.307q.7-.006,1.395,0a.3.3,0,0,1,.331.338q0,.607,0,1.214c0,.226-.106.329-.335.332S-2967.372,1192.835-2967.607,1192.835Zm-.423-.592h.871v-.7h-.871Z" transform="translate(2974.308 -1184.268)" fill="#707070"/>
      <path id="Path_68" data-name="Path 68" d="M-2898.273,1192.83c-.236,0-.471,0-.707,0a.284.284,0,0,1-.315-.314q0-.625,0-1.25a.286.286,0,0,1,.313-.318q.716-.008,1.431,0a.285.285,0,0,1,.309.307q.011.634,0,1.268a.287.287,0,0,1-.324.308C-2897.8,1192.833-2898.038,1192.83-2898.273,1192.83Zm.437-.587v-.708h-.868v.708Z" transform="translate(2908.341 -1184.263)" fill="#707070"/>
      <path id="Path_69" data-name="Path 69" d="M-2830.112,1193.769c.28-.33.524-.62.772-.908a.275.275,0,0,1,.359-.072.266.266,0,0,1,.144.32.41.41,0,0,1-.087.155c-.3.356-.6.711-.9,1.063a.3.3,0,0,1-.494.021q-.266-.258-.526-.523a.29.29,0,0,1-.032-.445.3.3,0,0,1,.447.041C-2830.323,1193.527-2830.226,1193.642-2830.112,1193.769Z" transform="translate(2843.322 -1185.984)" fill="#707070"/>
    </g>
  </g>
</svg>

      </div>

     
      {showCalendar && (
        <div className="absolute top-12 right-10 z-50 bg-white shadow-2xl rounded-lg p-4">
          <DateRange
            ranges={dateRange}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
            </div> */}
        </div>

        {/* Table for Reports */}
        <ReportsTable data={data}/>

        <div className="pagination flex items-center justify-center space-x-2 mt-4">
  {/* Previous Button */}
  {/* <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
  >
    Previous
  </button> */}

  {/* Page Number(s) */}
  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => handlePageChange(index + 1)}
      className={`px-3 py-1 border border-gray-300 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' :  ' text-gray-600'}`}
    >
      {index + 1}
    </button>
  ))}

  {/* Next Button */}
  {/* <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
  >
    Next
  </button> */}
</div>

      </div>
    </>
  );
}
