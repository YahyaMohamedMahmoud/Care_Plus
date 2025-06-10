import React from "react";

export default function AboutUsers({data}) {

  return (
    <>
      <div className="bg-white  shadow-card rounded-card py-6 px-7">
        {/* Chart */}
        <h1 className="text-xl font-bold my-2">Users</h1>
        <div className="flex flex-col gap-2 justify-between">
          <div className="flex justify-between items-center text-[16px] 2xl:text-[19px] font-medium leading-[28px] mt-6">
            <div>{data?.total_users || "Not users added"} <span className="text-[14px]">user</span></div>
          </div>
          <div className="w-full h-1 bg-[#BFE0F6] relative rounded-full">
          <div
        className="h-1 bg-[#0085DB] absolute top-0 rounded-full"
        style={{ width: `${data?.total_users || 100 }%` }}
      />
          </div>
        </div>
      </div>
    </>
  );
}
