import React, { useState } from 'react'
import EditCard from './EditCard';

export default function CardsTable({typecards}) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    function updateCard(card){
        setSelectedCard(card)
        setIsModalOpen(true)
    }
  return (
    <>
    <div className="relative overflow-hidden">
     <div className="overflow-y-auto max-h-[453px]">
  
     <table className="w-full text-center">
        <thead>
          <tr className="border-b border-gray-300">
            <th className="p-2">#</th>
            <th className="p-2">Type of Card</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {
           typecards?.length <= 0 ? (
            <tr className="text-center">
              <td colSpan="12" className="py-8 text-gray-700">
                <div>
                  <h2 className="text-2xl font-semibold">No Cards available at the moment.</h2>
                </div>
              </td>
            </tr>
          ) : 
          typecards?.map((card , index) => (
            <tr key={card.id || index} className="border-b border-gray-300">
              <td className="p-4">
                {index + 1}
              </td>
              <td className="p-2">{card.name}</td>
              <td className="p-2">{card.amount === null ? '0' : Number(card.amount)}</td>
              <td className="p-2 flex justify-center mt-[10px]">
                  <button
                    className="update text-blue-500"
                    onClick={() => updateCard(card)}
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
          
                </td>

            </tr>
          ))}
        </tbody>
      </table>

          {/* Edit Card */}
          {isModalOpen && 
          <EditCard onClose={()=>setIsModalOpen(false)}  card={selectedCard}/>
          }

  </div>
      </div>
    </>
  )
}
