import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import useFetch from '../hooks/useFetch';
import { formatMonth } from '../lib/queryClient';

function EarningChart() {
    
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
    const {
      data: earning,
      refetch: refetchEarning,
      isLoading: earningIsLoading,
      isSuccess: earningSuccess,
  } = useFetch(["earning-report"], `/graph-earning`);
  const formatGraphData = (data) => {
      if (!data) return {
        revenues: [0, 0, 0, 0],
        dates: [0, 0, 0, 0],
      };
      let formattedData;
        formattedData = {
          revenues: Array.from(data, (item) => item.revenue),
          dates: Array.from(
              data,
              (item) => item.date
          ),
      };
      return formattedData;
  };

    const [state,setState]=useState({
        series: [{
            name: 'Revenue',
            data: formatGraphData(earning).revenues,
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
              categories: formatGraphData(earning).dates,
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
    useEffect(() => {
      setState({...state, series: [{
        name: 'Revenue',
        data: formatGraphData(earning).revenues,
      }, ],
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          categories: formatGraphData(earning).dates}
      }
    })
    }, [earningIsLoading])
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="area" height={224} />
    </div>
  )
}

export default EarningChart

      
      
      
      
