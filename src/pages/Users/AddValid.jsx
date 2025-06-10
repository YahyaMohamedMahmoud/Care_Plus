import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { setValidDate } from '../../Store/Users/users';
import toast from 'react-hot-toast';

export default function AddValid({onClose , singleID}) {
   
    function handleClose(){
        onClose();
    }

    const [validDate, setValidDateState] = useState('');
    const dispatch = useDispatch();
    
    const { loading , errors} = useSelector(
        (state) => state.users
      );
      
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validDate > new Date().toISOString().split('T')[0]) {
          dispatch(setValidDate({ id: singleID, validDate }));
                 
        toast.success("Card valid date updated successfully");
          onClose()
        } else {
          toast.error("The Date must be a date after today")
        }
      };

  return (
   <>
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50 mx-[0px!important]">
        <div className="bg-white w-[20%] rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-medium">Edit Date</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <IoMdClose />
            </button>
          </div>
  
          {/* Content */} 
          <form onSubmit={handleSubmit}>
  
          <div className="p-4">
                <div className="mb-2 flex flex-col items-start gap-2 justify-center">
                  <label className="block text-sm font-medium text-black-700">End Cart:</label>
                  <div className='flex flex-col w-full'>
                  <input
                      type="date"
                      name="valid"
                      value={validDate}
                      onChange={(e) => setValidDateState(e.target.value)}
                  
                    className={`w-full p-2 border rounded-md`}
                    
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
            <button type='submit' disabled={loading} className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">  
            {loading ? 'Saving...' : 'Save'} 
            </button>
          </div>
          </form>
  
          {/* Footer */}
        </div>
      </div>
   </>
  )
}
