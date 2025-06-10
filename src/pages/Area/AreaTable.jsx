import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteArea, fetchAreas } from '../../Store/Area/area';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function AreaTable({ setIsModalOpen , setSelectedArea , search}) {

    const [Modal, setModal] = useState(false);
     const [areaToDelete, setAreaToDelete] = useState(null); 
     const dispatch = useDispatch();
     const { areas } = useSelector((state) => state.area);

       const filteredAreas = useMemo(() => {
         return areas?.filter((offer) => {
           const matchesSearch =
             offer.EnArea?.toLowerCase().includes(search) ||
             offer.ArArea?.toLowerCase().includes(search)
       
           return matchesSearch;
         });
       }, [areas, search ]);
     
       useEffect(() => {
         dispatch(fetchAreas());
       }, [dispatch]);

        const handleEditArea = (area) => {
            setSelectedArea(area);
          setIsModalOpen(true);
        };
      
      
        const handleDeleteArea = (areaId) => {
            setAreaToDelete(areaId); 
          setModal(true); 
        };
      
      
        const confirmDelete = () => {
          if (areaToDelete) {
            dispatch(deleteArea(areaToDelete)); 
            
          }
          setModal(false); 
        };
      
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredAreas?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredAreas?.slice(startIndex, startIndex + itemsPerPage);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    
    

    const maxPagesToShow = 3;
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  
    const handleNextPage = () => {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
  
    const handlePreviousPage = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
      setCurrentPage(1);
    }, [search]);
    
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-y-auto max-h-[400px]">

          <table className="w-full text-left overflow-y-auto">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2">
                  <input type="checkbox" />
                </th>
                <th className="p-2">#</th>
                <th className="p-2">Area</th>
                <th className="p-2">Country</th>
                <th className="p-2">City</th>
              </tr>
            </thead>
            <tbody>
              
               {
                currentPageData?.length <= 0 ? (
                  <tr className="text-center">
                    <td colSpan="12" className="py-8 text-gray-700">
                      <div>
                        <h2 className="text-2xl font-semibold">No Areas available at the moment.</h2>
                      </div>
                    </td>
                  </tr>
                ) : 
                currentPageData?.map((area ,index) => {
                  const globalIndex = startIndex + index + 1;
               return(
                <tr key={area.id} className="border-b border-gray-300">
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2">{globalIndex}</td>
                <td className="p-2">{area.EnArea} ({area.ArArea}) </td>
                <td className="p-2">{area.country?.EngName}({area.country?.name}) </td>
                <td className="p-2">{area.city?.name} ({area.city?.ArabName}) </td>
                <td className="p-2 flex justify-center mt-[10px]">
                  <button
                    className="update text-blue-500"
                    onClick={() => handleEditArea(area)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25.217"
                      height="100%"
                      viewBox="0 0 25.217 16.276"
                    >
                      <g
                        id="Group_3174"
                        data-name="Group 3174"
                        transform="translate(-1344.438 -282)"
                      >
                        <g
                          id="Group_889"
                          data-name="Group 889"
                          transform="translate(1344.438 283)"
                        >
                          <path
                            id="Path_85"
                            data-name="Path 85"
                            d="M-4965.978,501.586a4.115,4.115,0,0,1-.666-.243,1.825,1.825,0,0,1-.975-1.684q0-3.28,0-6.56,0-2.153,0-4.305a1.869,1.869,0,0,1,1.453-1.85,2.089,2.089,0,0,1,.473-.051q3.7,0,7.4,0a.521.521,0,0,1,.586.505.524.524,0,0,1-.591.52h-7.328a.867.867,0,0,0-.965.972V499.6a.867.867,0,0,0,.96.961h10.728a.865.865,0,0,0,.954-.949v-7.295a1.113,1.113,0,0,1,.01-.221.517.517,0,0,1,.544-.419.515.515,0,0,1,.471.5c.006.176,0,.353,0,.529,0,2.3-.01,4.6.006,6.9a1.9,1.9,0,0,1-1.6,1.954.123.123,0,0,0-.043.024Z"
                            transform="translate(4967.619 -486.676)"
                            fill="#707070"
                          />
                          <path
                            id="Path_86"
                            data-name="Path 86"
                            d="M-4821.991,427.79a1.9,1.9,0,0,1-.589.894q-3.69,3.68-7.367,7.369a1,1,0,0,1-.542.294c-.742.139-1.483.295-2.225.439a.509.509,0,0,1-.63-.625c.154-.776.3-1.552.466-2.325a.775.775,0,0,1,.2-.364q3.817-3.83,7.64-7.65a1.194,1.194,0,0,1,1.775,0c.235.232.461.473.7.7a1.71,1.71,0,0,1,.568.889Zm-10.2,7.835c.066-.005.1,0,.132-.01.429-.086.859-.168,1.286-.263a.464.464,0,0,0,.207-.133q3.021-3.016,6.038-6.036c.044-.043.085-.089.1-.108-.407-.407-.8-.8-1.205-1.2l-.034.029q-3.078,3.079-6.156,6.159a.253.253,0,0,0-.076.108C-4832,434.643-4832.092,435.121-4832.193,435.624Zm7.346-8.556c.417.419.815.814,1.217,1.218.171-.173.359-.362.546-.553a.172.172,0,0,0,.007-.27q-.474-.478-.953-.953a.162.162,0,0,0-.245,0C-4824.476,426.7-4824.672,426.9-4824.848,427.069Z"
                            transform="translate(4836.689 -425.428)"
                            fill="#707070"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                  <button className="delete" onClick={() => handleDeleteArea(area.id)}>
                    <svg
                      id="Group_1755"
                      data-name="Group 1755"
                      xmlns="http://www.w3.org/2000/svg"
                      width="13.217"
                      height="100%"
                      viewBox="0 0 13.217 16.276"
                    >
                      <path
                        id="Path_1259"
                        data-name="Path 1259"
                        d="M-2103.619,835.079c-.105-.029-.212-.055-.317-.087a1.988,1.988,0,0,1-1.364-1.827c0-.09,0-.18,0-.27q0-4.527,0-9.055a.228.228,0,0,0-.179-.256,1.449,1.449,0,0,1-.9-1.51,1.425,1.425,0,0,1,1.289-1.261c.65-.031,1.3-.018,1.953-.025h.141c.01-.21.015-.414.03-.618a1.48,1.48,0,0,1,1.479-1.358c1.139-.008,2.278-.015,3.416,0a1.492,1.492,0,0,1,1.494,1.564c0,.127,0,.254,0,.4.063,0,.118.008.174.008.567,0,1.134-.005,1.7,0a1.447,1.447,0,0,1,1.43.937,1.439,1.439,0,0,1-.8,1.853.241.241,0,0,0-.186.269q.008,4.543,0,9.087a2.134,2.134,0,0,1-.645,1.633,1.838,1.838,0,0,1-.949.48.553.553,0,0,0-.086.031Zm-.922-11.384v.167q0,4.544,0,9.088a2.18,2.18,0,0,0,.026.348,1.16,1.16,0,0,0,1.143,1.017q3.591.008,7.182,0a1.1,1.1,0,0,0,.931-.49,1.476,1.476,0,0,0,.246-.887q0-4.536,0-9.072c0-.056,0-.112-.008-.172Zm4.768-.771h4.988a2.273,2.273,0,0,0,.238-.01.669.669,0,0,0,.6-.726c-.033-.4-.326-.636-.8-.637H-2104.8a1.576,1.576,0,0,0-.237.017.679.679,0,0,0-.577.643.682.682,0,0,0,.507.685,1.435,1.435,0,0,0,.331.027Q-2102.275,822.925-2099.773,822.924Zm2.424-2.145a5.186,5.186,0,0,0,0-.57.681.681,0,0,0-.527-.607.849.849,0,0,0-.235-.031q-1.66,0-3.321,0a.709.709,0,0,0-.757.587,4,4,0,0,0-.006.62Z"
                        transform="translate(2106.386 -818.803)"
                        fill="#515151"
                      />
                      <path
                        id="Path_1260"
                        data-name="Path 1260"
                        d="M-2001.41,977.554c0,1.17,0,2.34,0,3.509a.7.7,0,0,1-.075.316.321.321,0,0,1-.353.158.346.346,0,0,1-.3-.264.738.738,0,0,1-.026-.187q0-3.517,0-7.034a.624.624,0,0,1,.052-.26.341.341,0,0,1,.365-.2.341.341,0,0,1,.32.263.87.87,0,0,1,.023.235Q-2001.409,975.823-2001.41,977.554Z"
                        transform="translate(2006.15 -967.683)"
                        fill="#515151"
                      />
                      <path
                        id="Path_1261"
                        data-name="Path 1261"
                        d="M-1943.2,977.567q0-1.755,0-3.509c0-.276.12-.435.337-.457a.358.358,0,0,1,.406.294.869.869,0,0,1,.019.188q0,3.485,0,6.97a.906.906,0,0,1-.021.2.371.371,0,0,1-.365.292.375.375,0,0,1-.361-.3,1.008,1.008,0,0,1-.014-.205Q-1943.2,979.306-1943.2,977.567Z"
                        transform="translate(1949.426 -967.69)"
                        fill="#515151"
                      />
                      <path
                        id="Path_1262"
                        data-name="Path 1262"
                        d="M-1884.269,977.517q0-1.739,0-3.477c0-.329.127-.5.372-.506s.391.177.391.507q0,3.469,0,6.938c0,.33-.144.515-.392.508s-.371-.179-.371-.509Q-1884.27,979.248-1884.269,977.517Z"
                        transform="translate(1892.748 -967.628)"
                        fill="#515151"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
               )
              })}
            </tbody>
          </table>






      
        </div>
      </div>
            <div className="flex justify-center items-center mt-4">
        <div className="flex items-center space-x-2">
          {/* {[...Array(totalPages)]?.map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-full ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))} */}

<button
              onClick={handlePreviousPage}
              className={`p-2 rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
              disabled={currentPage === 1}
            >
              <AiOutlineArrowLeft />
            </button>

          
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-full ${
                  currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNextPage}
              className={`p-2 rounded-full ${
                currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
              }`}
              disabled={currentPage === totalPages}
            >
              <AiOutlineArrowRight />
            </button>
        </div>
      </div>

      {/* Delete Offer */}
      {Modal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 mx-[0px!important]">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
              <button
                onClick={() => setModal(false)}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-7 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-black-400 w-12 h-12 dark:text-black-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-black-500 dark:text-black-400">
                  Are you sure you want to delete this area?
                </h3>
                <button
                 onClick={confirmDelete}
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setModal(false)}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
