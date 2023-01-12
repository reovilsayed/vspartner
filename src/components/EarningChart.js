import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import useFetch from '../hooks/useFetch';
import { formatMonth } from '../lib/queryClient';

function EarningChart({byYear = false}) {
    
  const currYear = new Date().getFullYear();
  const currMonth = new Date().getMonth();
    const {
      data: earningByMonths,
      refetch: refetchEarningByMonths,
      isLoading: earningByMonthsIsLoading,
      isSuccess: earningByMonthsSuccess,
  } = useFetch(["earning-report-by-month"], `/graph-earning/2022/2`);
  const {
      data: earningByYears,
      refetch: refetchEarningByYears,
      isLoading: earningByYearsIsLoading,
      isSuccess: earningByYearsSuccess,
  } = useFetch(["earning-report-by-year"], `/graph-earning-year/2022`);
  const formatGraphData = (data, byYear = false) => {
      if (!data) return {
        revenues: [1, 1, 1, 1],
        dates: [1, 1, 1, 1],
      };
      let formattedData;
      if(byYear){
        formattedData = {
          revenues: Array.from(data, (item) => item.revenue),
          dates: Array.from(
              data,
              (item) => `${formatMonth(currMonth)} ${item.date}th`
          ),
      };} else {
        formattedData = {
          revenues: Array.from(data, (item) => item.revenue),
          dates: Array.from(
              data,
              (item) => `${currYear} ${formatMonth(parseInt(item.date) - 1)}`
          ),
      };
      }
      return formattedData;
  };

    const [state,setState]=useState({
        series: [{
            name: 'Revenue',
            data: byYear? formatGraphData(earningByMonths).revenues: formatGraphData(earningByYears, true).revenues,
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
              categories: byYear? formatGraphData(earningByMonths).dates: formatGraphData(earningByYears, true).dates,
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
        data: byYear? formatGraphData(earningByMonths).revenues: formatGraphData(earningByYears, true).revenues,
      }, ],
      options: {
        ...state.options,
        xaxis: {
          ...state.options.xaxis,
          categories: byYear? formatGraphData(earningByMonths).dates: formatGraphData(earningByYears, true).dates,}
      }
    })
    }, [earningByMonthsIsLoading, earningByYearsIsLoading, byYear])
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="area" height={224} />
    </div>
  )
}

export default EarningChart

      
      
      
      
