import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { updateCard } from "../../Store/Cards/cards";
import { useDispatch } from "react-redux";

export default function EditCard({ onClose , card}) {
  const dispatch = useDispatch();
  const [name, setName] = useState(card.name);
  const [amount, setAmount] = useState(card.amount || '');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(updateCard({ name, amount: Number(amount) })).unwrap();
      onClose();
    } catch (err) {
      console.error('Failed to update the card: ', err);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 mx-[0px!important]">
        <div className="bg-white w-[30%] rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">New Card</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <IoMdClose />
            </button>
          </div>

            <form onSubmit={handleSubmit}>
          <div className="w-[90%] mx-auto py-3">

           
             <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Name:</label>
                <div className='flex flex-col w-full mt-2'>
                <input
                  type="text"
                  defaultValue={name}
                  className={`w-full p-2 border rounded-sm focus:outline-none`}
                />

                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700">Amount:</label>
                <div className='flex flex-col w-full mt-2'>

                <input
                    type="number"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full p-2 border focus:outline-none`}
                  />
                </div>
              </div> 

          
          </div>

          <div className="flex justify-end p-4 border-t">
            <button
              className="px-4 py-2 mr-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>

           </form>
        </div>
      </div>
    </>
  );
}
