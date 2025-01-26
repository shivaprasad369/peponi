import React from "react";
    import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

const SalesChart = ({color,title,icon,chartIcon}) => {
  const theme=useSelector((state)=>state.theme)
  const chartOptions = {
    chart: {
      type: "line", 
      height: 0, 
      toolbar: { show: false },
    },
    colors: [color],
    stroke: {
      curve: "smooth",
      width: 5,
    },
    grid: {   
      show: false,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    tooltip: {
      enabled: true,
      theme:theme==="dark"?"dark":"light"
    },
    dataLabels: {
      enabled: false, // Disable data labels on the line
    },
  };

  const chartSeries = [
    {
      name: "Sales",
      data: [20, 12.5, 23.25, 0, 17.5, 5],
    },
  ];
  return (
    <div>
      <div className={`wg-chart-default  border-[1px] px-2  pt-2 rounded-lg ${theme!=="dark"?"bg-white border-gray-300":"bg-[#282D37] border-gray-800 " }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="image type-white relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="52"
                viewBox="0 0 48 52"
                fill="none"
                className="relative flex items-center justify-center"
              >                                                             
                <path
                  d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921
                   9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z"
                  fill={color}
                ></path>
              </svg>
                <div className="absolute top-0 w-[100%] h-[100%] flex items-center justify-center">
                  {icon}
                </div>
            </div>
            <div>
              <div className="body-text mb-0">{title}</div>
              <h4>34,945</h4>
            </div>
          </div>
          <div className="flex items-center gap-2 ">
          {chartIcon}
            <div className="body-title number font-semibold">1.56%</div>
          </div>
        </div>
        <div className="w-[100%] h-fit mt-[-2rem] mb-[-1rem] pb-1">
          <Chart options={chartOptions} series={chartSeries} type="area" height={100} />
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
