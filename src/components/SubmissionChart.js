import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function SubmissionChart() {
    const [state,setState]=useState({
        series: [{
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          }, {
            name: 'Free Cash Flow',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
          }],
          options: {
            colors:['#3b92fe', '#90c1e7', 'rgb(209, 227, 241)'],
            chart: {
              type: 'bar',
              height: 350,
              redrawOnParentResize: true,
              redrawOnWindowResize: true,
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded',
                borderRadius: 12,
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            xaxis: {
              categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
              title: {
                text: 'per Month',
                style: {
                  color: "#525050",
                  fontSize: '20px',
                  fontFamily: 'Cabin, sans-serif',
                  fontWeight: 600,
              }
              }
            },
            fill: {
              opacity: 1
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          },
    })
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}

export default SubmissionChart

      
      
      
      
