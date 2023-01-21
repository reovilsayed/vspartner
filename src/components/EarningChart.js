import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useFetch from '../hooks/useFetch';
import { formatMonth } from '../lib/queryClient';

function EarningChart() {
	const [options, setOptions] = useState({
		chart: {
			type: 'area',
			height: 225,
			redrawOnParentResize: true,
			redrawOnWindowResize: true,
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
			width: 3,
			fill: '#00E396',
		},
		xaxis: {
			type: 'date',
			tickAmount: 11,
			categories: [],
			labels: {
				show: true,
				rotate: 0,
				// trim: true,
				style: {
					colors: '#000000',
					fontSize: '12px',
					fontFamily: 'Cabin, sans-serif',
					fontWeight: 600,
				},
			},
		},
		yaxis: {
			tickAmount: 5,
			labels: {
				show: true,
				style: {
					colors: '#000000',
					fontSize: '12px',
					fontFamily: 'Cabin, sans-serif',
					fontWeight: 600,
				},
			},
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy',
			},
		},
		yaxis: {
			title: {
				text: '$',
				style: {
					color: '#525050',
					fontSize: '20px',
					fontFamily: 'Cabin, sans-serif',
					fontWeight: 600,
				},
			},
		},
		fill: {
			opacity: 1,
			colors: ['#00E396', '#fff'],
			gradient: {
				shade: 'light',
				type: 'vertical',
				shadeIntensity: 0.5,
				gradientToColors: undefined,
				inverseColors: true,
				opacityFrom: 0.7,
				opacityTo: 0.2,
			},
		},
		responsive: [
			{
				breakpoint: 1600,
				options: {},
			},
		],
	});
	const [series, setSeries] = useState([
		{
			name: 'Revenue',
			data: [],
		},
	]);
	const { data: earningGraph, refetch, isLoading, isSuccess } = useFetch(['earning-report'], `/graph-earning`);
	useEffect(() => {
    if(earningGraph){
      setSeries([
        {
          name: 'Revenue',
          data: Array.from(earningGraph, item => item.revenue),
        },
      ])
			setOptions({
        ...options,
        xaxis:{
          categories:Array.from(earningGraph, item => item.date)
        }
      });
    }
	}, [earningGraph]);
	return (
		<div>
			<ReactApexChart options={options} series={series} type='area' height={224} />
		</div>
	);
}

export default EarningChart;
