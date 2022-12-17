import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

function EarningChart({ chartData }) {

    const [state,setState]=useState({
        series: [{
            name: 'series1',
            data: chartData? chartData: [31, 40, 28, 51, 42, 109, 100]
          }, ],
          options: {
            colors: ['#72efc5'],
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'date',
              tickAmount: 11,
              categories: ["Sep 1st", "Sep 4th", "Sep 7th", "Sep 10th", "Sep 13th", "Sep 16th", "Sep 19th", "Sep 21th", "Sep 24th", "Sep 27th", "Sep 30th"],
              labels: {
                show: true,
                rotate: 0,
                // trim: true,
                style: {
                    colors: "#000000",
                    fontSize: '12px',
                    fontFamily: 'Cabin, sans-serif',
                    fontWeight: 600,
                },
            }
            },
            yaxis: {
              title: {
                text: '$',
                style: {
                  color: "#525050",
                  fontSize: '20px',
                  fontFamily: 'Cabin, sans-serif',
                  fontWeight: 600,
              }
              }
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy'
              },
            },
          },
    })
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="area" height={224} />
    </div>
  )
}

export default EarningChart

      
      
      
      
