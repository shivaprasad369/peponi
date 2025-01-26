import React, { useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { useSelector } from 'react-redux';
import styled, { createGlobalStyle } from 'styled-components';

// GlobalStyle to add custom CSS for the legend text


const GlobalStyle = createGlobalStyle`
span.apexcharts-legend-text {
  color:${props => props.theme === 'dark' ? '#fff' : '#000'} !important;
}
`;
const SaleByCategory = () => {
  const theme = useSelector((state) => state.theme);
  const categories = [
    { name: "Folk and Traditional Arts", color: "#8F77F3", value: 44, label: "$44,000" },
    { name: "Applied Arts", color: "#FF7433", value: 33, label: "$33,000" },
    { name: "Literary Arts", color: "#2377FD", value: 22, label: "$22,000" },
  ];

  const chartData = {
    series: categories.map((category) => category.value),
    options: {
      chart: {
        type: 'donut',
        width: '100%',
      },
      labels: categories.map((category) => category.name),
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      colors: categories.map((category) => category.color),
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        labels: {
          style: {
            colors: '#fff', // Custom color for legend text
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
            labels: {
              show: true,
              style: {
                color: theme !== 'dark' ? 'black' : 'white',
              },
            },
          },
        },
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '12px',
          color: theme !== 'dark' ? 'black' : 'white',
        },
      },
    },
  };

  return (
    <div
      className={`md:w-[45%] mb-4 h-[100%] rounded-lg shadow-lg p-6 ${
        theme !== 'dark' ? 'bg-white text-black' : 'bg-gray-800 text-white'
      }`}
    >
      {/* Inject global styles */}
      <GlobalStyle theme={theme} />

      <div className="flex items-center justify-between mb-4">
        <h5
          className={`text-2xl font-bold ${
            theme !== 'dark' ? 'text-gray-800' : 'text-white'
          }`}
        >
          Sale by Category
        </h5>
      </div>

      <div className="flex gap-4 justify-between mb-6">
        <div>
          <div
            className={`text-sm ${theme !== 'dark' ? 'text-gray-500' : 'text-white'}`}
          >
            Total Mar 20, 2023
          </div>
          <div className="flex items-center gap-2">
            <h4
              className={`text-xl font-semibold ${
                theme !== 'dark' ? 'text-gray-800' : 'text-white'
              }`}
            >
              $37,802
            </h4>
            <div className="flex items-center text-green-500">
              <i className="icon-trending-up"></i>
              <div className="text-sm">+0.56%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container mb-6">
        <ApexCharts
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width="100%"
          height="300"
        />
      </div>
    </div>
  );
};

export default SaleByCategory;
