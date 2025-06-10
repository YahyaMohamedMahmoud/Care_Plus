import React from 'react';

export default function ReportsTable({ data }) {


  return (
   <>

<div className="relative overflow-hidden">
     <div className="overflow-y-auto max-h-[453px]">
  
     <table className="w-full text-center">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-2">
              <input type="checkbox" />
            </th>
            <th className="p-2">#</th>
            <th className="p-2">Card</th>
            <th className="p-2">Type of Card</th>
            <th className="p-2">Subscription</th>
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {
           data?.length <= 0 ? (
            <tr className="text-center">
              {/* Empty row with centered content */}
              <td colSpan="12" className="py-8 text-gray-700">
                <div>
                  <h2 className="text-2xl font-semibold">No Cards available at the moment.</h2>
                </div>
              </td>
            </tr>
          ) : 
          
          data?.map((offer, index) => (
            <tr key={offer.id || index} className="border-b border-gray-300">
              <td className="py-4 px-2">
                <input type="checkbox" />
              </td>
              <td className="p-2">
                {index + 1}
              </td>
              <td className="p-2">{offer.title}</td>
              <td className="p-2">{offer.type?.name}</td>
              <td className="p-2">{offer.subscription_count}</td>
              <td className="p-2">{offer.total_amount}</td>

            </tr>
          ))}
        </tbody>
      </table>
  </div>
      </div>



 
   </>
  )
}
