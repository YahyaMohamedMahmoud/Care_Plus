import React from "react";

export default function AboutCard({data}) {

  const cardType2 =  [
    {
        "type_name": "Virtaul Card",
        "user_count": 3,
        "total_amount": "1200.00"
    },
    {
        "type_name": "Physical Card",
        "user_count": 3,
        "total_amount": "300.00"
    }
]
  const cardType = data?.card_types.map((card) => card) || cardType2;  
  
  return (
    <>
      <div className="relative overflow-hidden bg-white  shadow-card rounded-card pt-3">
        <div className="overflow-y-auto max-h-[453px]">
          <h1 className="text-xl font-bold my-2 px-5">Cards</h1>
          <table className="w-full text-center">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2">#</th>
                <th className="p-2">Type of Card</th>
                <th className="p-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cardType?.length <= 0 ? (
                <tr className="text-center">
                  <td colSpan="12" className="py-8 text-gray-700">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        No Cards available at the moment.
                      </h2>
                    </div>
                  </td>
                </tr>
              ) : (
                cardType?.map((card, index) => (
                  <tr
                    key={card.id || index}
                    className="border-b border-gray-300"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-2">{card.type_name}</td>
                    <td className="p-2">
                      {card.amount === null ? "0" : Number(card.total_amount)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
