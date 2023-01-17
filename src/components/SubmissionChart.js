import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import useFetch from '../hooks/useFetch'
import { getSubmissionChart } from '../lib/queryClient';

function SubmissionChart() {
  
  const currYear = new Date().getFullYear();
    const {
      data: submissions,
      refetch: refetchSubmissions,
      isLoading: submissionsIsLoading,
      isSuccess: submissionsSuccess,
  } = useFetch(["graph-submissions"], `/graph-submission/${currYear}`);
  const [data, setData] = useState(getSubmissionChart(submissions));
  const formatGraphData = (data) => {
    if (!data) return {
      accepted: [1, 1, 1, 1],
      rejected: [1, 1, 1, 1],
      pending: [1, 1, 1, 1],
    };
    let formattedData;
      formattedData = {
        accepted: Array.from(data, (item) => item.accepted),
        rejected: Array.from(data, (item) => item.rejected),
        pending: Array.from(data, (item) => item.pending),
        dates: Array.from(
            data,
            (item) => item.date
        ),
    };
    return formattedData;
};
    const [state,setState]=useState({
        series: [{
            name: 'Approved',
            data: formatGraphData(data).accepted
          }, {
            name: 'Rejected',
            data: formatGraphData(data).rejected
          }, {
            name: 'Pending',
            data: formatGraphData(data).pending
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
              categories: formatGraphData(data).dates,
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
    useEffect(() => {
      setData(getSubmissionChart(submissions));
      console.log(formatGraphData(data));
    }, [submissions, submissionsIsLoading, submissionsSuccess])
  return (
    <div>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
    </div>
  )
}

export default SubmissionChart

      
      
      
      
