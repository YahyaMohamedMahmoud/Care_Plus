import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function Chart({data}) {
  const leadStatuses = [
    { status_name: "Total Offers", leads_count: data?.total_offers || 0 },
    { status_name: "Inactive Offers", leads_count: data?.inactive_offers || 0 },
    { status_name: "Active Offers", leads_count: data?.active_offers || 0 },
  ];

  const colorPalette = ["#2E93fA" ,"red", "green",];
  const datasets = leadStatuses.map((status, index) => ({
    label: status.status_name,
    data: [status.leads_count],
    color: colorPalette[index % colorPalette.length],
  }));
  
  const seriesData = datasets.map((data) => data.data[0]);
  const labels = datasets.map((status) => status.label);
  const colors = datasets.map((data) => data.color);


  const options = {
    series: seriesData,
    chart: {
      height: 350,
      width: 250,

      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "18px",
          },
          value: {
            fontSize: "16px",
            show: true, // Show the raw value instead of percentage
            formatter: function (val) {
              return Math.round(val); // Show the exact value (round if necessary)
            },
          },
          total: {
            show: true,
            label: "Total Offer",
            formatter: function () {
              return seriesData.reduce((acc, val) => val, 0);
            },
          },
        },
        track: {
          show: true,
        },
      },
    },
    labels: labels,
    colors: colors,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
    stroke: {
      lineCap: "round",
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [datasets]);

  return (
    <>
      <div className="bg-white  shadow-card rounded-card py-3 px-4">
        <h1 className="text-xl font-bold my-2">Status</h1>
        <div className="w-full max-w-md mx-auto p-4">
          <div
            id="chart"
            className="w-full flex justify-center items-center h-40"
          ></div>
        </div>
      </div>
    </>
  );
}
