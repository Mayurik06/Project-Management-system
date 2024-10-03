import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

const DepartmentWiseChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://projectmangerbackend.onrender.com/api/getProjectStatus'); // Fetch from your backend API
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching project stats:', error);
      }
    };
    fetchData();
  }, []);

  // Map department names to their abbreviations
  const getDepartmentAbbreviation = (department) => {
    switch (department) {
      case 'Strategy':
        return 'STR';
      case 'Finance':
        return 'FIN';
      case 'Quality':
        return 'QLT';
      case 'Maintenance':
        return 'MAN';
      case 'Stores':
        return 'STO';
      case 'Human Resources':
        return 'HR';
      default:
        return department; // Default to full name if no match
    }
  };

  // Create the x-axis labels with success percentage
  const xTitle = chartData.map((item) => 
    `<div style="display:flex; flex-direction:column; align-items:center; justify-content:center">
      <p style="font-weight: bold; margin: 0; color:#010202">${item.successPercentage}%</p>
      <p style="color:#010202">${getDepartmentAbbreviation(item.department)}</p>
    </div>`
  );

  const options = {
    chart: {
      type: 'column',
      spacing: [50, 30, 30, 30],
      borderRadius: 10,
    },
    title: {
      text: '',
    },
    xAxis: {
      categories: xTitle,
      crosshair: true,
      labels: {
        useHTML: true, // Enables HTML in x-axis labels
        style: {
          whiteSpace: 'nowrap',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: '',
      },
      gridLineWidth: 0,
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 8,
        dataLabels: {
          enabled: true, // Enable data labels
          inside: false, // Display data labels outside of the bar
          style: {
            fontWeight: 'bold',
            color: '#010202',
          },
        },
      },
    },
    series: [
      {
        name: 'Total',
        data: chartData.map((item) => item.totalProjects),
        color: '#025AAB', 
        dataLabels: {
          enabled: true,
          formatter: function () {
            return this.y; 
          },
          style: {
            fontWeight: 'bold'
          },
        },
      },
      {
        name: 'Closed',
        data: chartData.map((item) => item.closedProjects),
        color: '#5AA647',
        dataLabels: {
          enabled: true, 
          formatter: function () {
            return this.y; 
          },
          style: {
            fontWeight: 'bold',
          },
        },
      },
    ],
    tooltip: {
      formatter: function () {
        const department = chartData[this.point.index].department;
        const total = this.series.chart.series[0].data[this.point.index].y;
        const closed = this.series.chart.series[1].data[this.point.index].y;
        const percentage = chartData[this.point.index].successPercentage;
        return `<b>${department}</b><br>Total: ${total}<br>Closed: ${closed}<br>Success: ${percentage}%`;
      },
    },
  };

  return (
    <div>
      <p className='text-[20px] text-[#010202] mb-4 leading-[27px]'>Department wise - Total Vs Closed</p>
      <div className='shadow-custom rounded-[10px]'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
};

export default DepartmentWiseChart;
