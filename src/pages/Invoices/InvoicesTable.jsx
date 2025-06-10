import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvoices } from '../../Store/Invoice/invoice';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export default function InvoicesTable({search}) {

    const columns = [
      "#",
        "Invoice",
        "Customer",
        "Amount",
        "Date",
        "Visa",
        "Status",
        "",
      ];


      const dispatch = useDispatch();
      const { invoices} = useSelector((state) => state.invoices);

      
      useEffect(() => {
        dispatch(fetchInvoices());
      }, [dispatch]);

        const filteredInvoices = useMemo(() => {
          return invoices?.filter((invoice) => {
            const matchesSearch =
              invoice.customer_name?.toLowerCase().includes(search) ||
              invoice?.status?.toLowerCase().includes(search) ||
              invoice?.invoice_number?.toLowerCase().includes(search) ||
              invoice?.card_last4?.toLowerCase().includes(search) 

            return matchesSearch
          });
        }, [invoices, search]);


          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 7;
          const totalPages = Math.ceil(filteredInvoices?.length / itemsPerPage);
          const startIndex = (currentPage - 1) * itemsPerPage;
          const currentPageData = filteredInvoices?.slice(startIndex, startIndex + itemsPerPage);
        
          
        
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
      <table
        className={`text-[16px] w-full overflow-y-auto`}>
        <thead>
          <tr className="border-b">
            {columns.map((col, index) => (
              <th
                key={col}
                className={`text-left py-2 leading-[16px]  font-medium`}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
           currentPageData?.length <= 0 ? (
            <tr className="text-center">
              {/* Empty row with centered content */}
              <td colSpan="12" className="py-8 text-gray-700">
                <div>
                  <h2 className="text-2xl font-semibold">No invoices available at the moment.</h2>
                </div>
              </td>
            </tr>
          ) : 
          currentPageData?.map((invoice, index) => (
            <tr
              key={invoice?.id}
              className="border-b hover:bg-[#707070] hover:bg-opacity-15 font-normal last:border-b-0">
              <td className="py-4">
              <input type="checkbox" />
              </td>
              <td className="py-4">{invoice.invoice_number}</td>
              <td className="py-4   ">{invoice.customer_name}</td>
              <td className="py-3 text-gray-800">{invoice.amount}{invoice.currency}</td>
              <td className="py-3 text-gray-800">{invoice.date}</td>
              <td className="py-3 text-gray-800">{`***${invoice.card_last4}`}</td>

              {invoice.status && (
                <td className="py-4 ">
                  <span className="bg-[#DFFFF3]  text-[#5AD595] border border-[#5AD595] text-xs font-medium px-3 py-[1px]  rounded-full">
                    {invoice.status}
                  </span>
                </td>
              )}
              {/* <td className="py-5 text-left">
                <button className="text-gray-400 hover:text-gray-600">
                  <GoKebabHorizontal
                    className=" text-[16px] rotate-90"
                    size={16}
                  />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
       <div className="flex items-center justify-center space-x-2">
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
    </>
  )
}
