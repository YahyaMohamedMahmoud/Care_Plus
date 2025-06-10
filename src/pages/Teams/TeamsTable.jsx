import React from "react";

export default function TeamsTable({ admins }) {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="overflow-y-auto max-h-[510px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-2">Full Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Last Login</th>
                <th className="p-2">Active</th>
              </tr>
            </thead>
            <tbody>
              {admins.length <= 0 ? (
                <tr className="text-center">
                  {/* Empty row with centered content */}
                  <td colSpan="12" className="py-8 text-gray-700">
                    <div>
                      <h2 className="text-2xl font-semibold">
                        No admins available at the moment.
                      </h2>
                    </div>
                  </td>
                </tr>
              ) : (
                admins?.map((admin, index) => (
                  <tr
                    key={admin.id || index}
                    className="border-b border-gray-300"
                  >
                    <td className="p-2 flex gap-2 items-center mt-2">
                      <img
                        src={admin.photo}
                        alt="admin"
                        loading="lazy"
                        className="w-8 h-8 rounded-full"
                      />
                      {/* <img src={image } alt="admin" className="w-8 h-8 rounded-full" /> */}
                      {admin.first_name} {admin.last_name}
                    </td>
                    <td className="p-2">{admin.email}</td>
                    <td className="p-2 w-48">{admin.role}</td>
                    <td className="p-2">
                      {`${admin.days_last_login} days left`}
                    </td>

                    <td className="p-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          defaultChecked={admin.status === "active"}
                        />
                        <div
                          className={`relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                        ></div>
                      </label>
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
