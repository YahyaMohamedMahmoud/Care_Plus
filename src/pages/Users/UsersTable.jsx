import React, { useState } from "react";
import { BsHandIndexThumb } from "react-icons/bs";
import AddValid from "./AddValid";


export default function UsersTable({ users , handlePageChange , totalPages , currentPage , filters}) {

  const filteredUsers = users.filter((user) => {
    const matchesStatus = !filters.status || user?.status === filters.status;
    const matchesSearch =
      user?.user?.full_name.toLowerCase().includes(filters.search?.toLowerCase()) ||
      user.job.toString().toLowerCase().includes(filters.search?.toLowerCase()) ||
      user?.title.toString().toLowerCase().includes(filters.search?.toLowerCase()) ||
      user?.type?.name.toString().toLowerCase().includes(filters.search?.toLowerCase()) ||
      user?.address?.toString().toLowerCase().includes(filters.search?.toLowerCase()) ||
      user?.user?.email?.toString().toLowerCase().includes(filters.search?.toLowerCase()); 

    return matchesStatus && matchesSearch;
  });

  const [Modal, setModal] = useState(false);
  const [singleID, setID] = useState(null);


  function handleVaild (id){
    setModal(true)
    setID(id)
  }
  
  
  

  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-y-auto max-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2">#</th>
                <th className="p-2">Full Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Mobile Number</th>
                <th className="p-2">Address</th>
                <th className="p-2">Job</th>
                <th className="p-2">Card</th>
                <th className="p-2">Type of Card</th>
                <th className="p-2">Created</th>
                <th className="p-2">Status</th> 
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length <= 0 ? (
                <tr className="text-center">
                  {/* Empty row with centered content */}
                  <td colSpan="12" className="py-8 text-gray-700">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        No users available at the moment.
                      </h2>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-300">
                    <td className="p-2">{index + 1}</td>
                    <td className="py-2 flex justify-start gap-2 items-center mt-1">
                      <img
                        src={user.photo}
                        alt="user"
                        loading="lazy"
                        className="w-8 h-8 rounded-full"
                      />
                      {user?.user?.full_name}
                    </td>
                    <td className="p-2">{user?.user?.email}</td>
                    <td className="p-2">{user?.user?.phone}</td>
                    <td className="p-2 w-32">{user.address}</td>
                    <td className="p-2">{user.job}</td>

                    <td className="p-2">{user.title}</td>
                    <td className="p-2">{user?.type?.name}</td>
                    <td className="p-2">{`${user.created_days} days left`}</td>
                    <td className="p-2">
                      <p className={`text-xs text-center font-semibold px-2 py-1 rounded-full ${user.status === "valid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                  {user.status}

                      </p>
                    </td>
                    <td className="text-center">
                      <button onClick={()=>handleVaild(user.id)}>
                      <BsHandIndexThumb />

                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
          <div className="flex justify-center items-center mt-4 w-52 overflow-x-auto mx-auto">
            <div className="flex items-center space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>

      {Modal && <AddValid onClose={() => setModal(false)} singleID={singleID}/>}

    </>
  );
}
