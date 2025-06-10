import React, { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import TeamsTable from './TeamsTable'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdmins } from '../../Store/Teams/teams';

export default function Teams() {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const isAddTeamRoute = location.pathname === '/teams/addteam';

  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.teams);
  
  

  const debouncedSearch = useMemo(() => {
    const handler = setTimeout(() => {
      if (search) {
        dispatch(fetchAdmins(search));
      } else {
        dispatch(fetchAdmins('')); 
      }
    }); 
    return () => clearTimeout(handler);
  }, [search, dispatch]); 

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    debouncedSearch();
  }, [debouncedSearch]);
  
  useEffect(() => {
    dispatch(fetchAdmins())
  }, [dispatch]);


  
  return (
    <>
    {
      !isAddTeamRoute ? (
        <>
        <div className="flex space-x-2 items-center mb-5 mt-5 me-4">
        <div className='heading flex-grow'>
        <div className='flex items-center space-x-5'>

        <Link to="/teams/addteam" className="px-11 py-3 text-sm text-white bg-[#2697E0] rounded-md font-medium">
          New User Member
        </Link>



        </div>

        </div>
        
        <div>
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
    onChange={handleSearchChange}
    placeholder="Try to Searching..."
    className="w-full px-10 py-2 text-sm border border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500"
  />
        </div>
        </div>

        
       
      </div>

  
      <div>
        <TeamsTable admins={admins}/>  
      </div>
        </>
      ) : ( <Outlet />)
    }

          

    </>
  )
}
