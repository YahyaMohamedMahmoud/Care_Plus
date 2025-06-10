import React, { useEffect, useState } from "react";
import Hashtag from "../../components/Hashtag";
import UsersTable from "./UsersTable";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../Store/Users/users";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { users, loading, error, currentPage, totalPages } = useSelector((state) => state.users);
  
  const queryParams = new URLSearchParams(location.search);

  const [filters, setFilterss] = useState({
    status: queryParams.get("status") || "",
    type_id: queryParams.get("type_id") || "",
    search: queryParams.get("search") || "",
    model_id: queryParams.get("model_id") || "",
    page: queryParams.get("page") || 1,
  });

  useEffect(() => {
    dispatch(fetchUsers(filters));
  }, [filters, dispatch]);
  

  const handlePageChange = (newPage) => {
    const newFilters = { ...filters, page: newPage }; // Set the new page

    // Update the filters state
    setFilterss(newFilters);

    // Create URLSearchParams for filters including the new page
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilterss(newFilters);

    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    navigate({
      pathname: location.pathname,
      search: params.toString(),
    });
  };

  return (
    <>
      <div className="p-4">
        {/* Filter Section */}
        <div className="head">
          <h1 className="font-bold py-3">Filter by</h1>
        </div>

        <div className="flex items-center justify-between py-2 rounded-md">
          {/* Filter By Section */}
          <div className="flex space-x-5">
            <div>
              <select
                name="status"
                className="w-72 p-2 mt-1 text-sm border border-gray-300 rounded-md"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">Filter as a Valid </option>
                <option value="not_valid">Not Valid</option>
                <option value="valid">Valid</option>
              </select>
            </div>
            <div>
              <select
                className="w-72 p-2 mt-1 text-sm border border-gray-300 rounded-md"
                name="type_id"
                value={filters.type_id}
                onChange={handleFilterChange}
              >
                <option value="">Type of Card</option>
                <option value="1">Virtual Card</option>
                <option value="2">Physical Card</option>
              </select>
            </div>
            {/* <div>
              <select
                className="w-72 p-2 mt-1 text-sm border border-gray-300 rounded-md"
                name="model_id"
                value={filters.model_id}
                onChange={handleFilterChange}
              >
                <option value="">Select Country</option>
                <option value="1">Egypt</option>
                <option value="2">Dubai</option>
              </select>
            </div> */}
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
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Try to Searching..."
                className="w-full px-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
        </div>

        {/* Head offers */}
        <div className="py-3">
          <Hashtag># All Users</Hashtag>
        </div>

        {/* Table Users */}
        <UsersTable
          users={users}
          loading={loading}
          error={error}
          handlePageChange={handlePageChange}
          filters={filters}
          currentPage={currentPage}
          totalPages={totalPages}
        />

        {/* Modal  For Vaild*/}
      </div>
    </>
  );
}
