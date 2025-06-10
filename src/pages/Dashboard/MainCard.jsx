import React from 'react';

export default function MainCard({data}) {
  return (
    <>
    
    <div className="  bg-white  shadow-card rounded-card">
      {/* Header Section */}
      <div className=" pt-[19px] px-[36px] pb-0">
        <h1 className='text-xl font-bold my-2'>Congratulations</h1>
        <p>This Section display all offer</p>
      </div>

      {/* Orders Summary Section */}
      <div className="grid px-[36px] pt-0 grid-cols-1 my-[20px] gap-4">
        <OrderSummary
          count={data?.total_offers || 0}
          label="Total Offers"
          // status="all"
          color="bg-[#DFFFF3] "
        />
        <OrderSummary
          count={data?.active_offers || 0}
          label="Active Offers"
          // status="active"
          color="bg-[#FFF6EA]  "
        />
        <OrderSummary
          count={data?.inactive_offers || 0}
          label="Inactive Offers"
          // status="Not Started"
          color="bg-[#E1F5FA] "
        />
      </div>
    </div>


    </>
  )
}

const OrderSummary = ({ count, label, color }) => {
    return (
      <div className=" flex gap-1 items-center">
        <div className={`  rounded-full ${color} w-[46px] h-[46px] `} />
        <div>
          <div className=" flex items-center text-[18px] font-medium gap-1 text-primary">
            <div className="  font-bold">{count}</div>
            <div className=" ">{label}</div>
          </div>
        </div>
      </div>
    );
  };
