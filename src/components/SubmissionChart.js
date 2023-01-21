import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import useFetch from '../hooks/useFetch';

function SubmissionChart() {
	const options = {
		chart: {
			type: 'bar',
			height: 400,
			redrawOnParentResize: true,
			redrawOnWindowResize: true,
			toolbar: {
				show: false,
			},
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
			enabled: false,
		},
		stroke: {
			show: false,
		},
		grid: {
			show: false,
		},
		xaxis: {
			categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			tickAmount: 12,
			labels: {
				show: true,
				rotate: 0,
				trim: true,
				style: {
					colors: '#000000',
					fontSize: '12px',
					fontFamily: 'Cabin, sans-serif',
					fontWeight: 600,
				},
			},
			axisBorder: {
				show: false,
				color: '#456456',
				height: 1,
				width: '100%',
				offsetX: 0,
				offsetY: 0,
			},
		},
		yaxis: {
			tickAmount: 8,
			title: {
				text: 'Per Month',
				style: {
					color: '#525050',
					fontSize: '20px',
					fontFamily: 'Cabin, sans-serif',
					fontWeight: 600,
				},
			},
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
		fill: {
			opacity: 1,
			colors: ['#008FFB', '#90C1E7', '#D1E3F1'],
		},
		stroke: {
			width: 3,
			colors: ['#008FFB', '#90C1E7', '#D1E3F1'],
		},
		tooltip: {
			y: {
				formatter: function (val) {
					return val;
				},
			},
		},
		legend: {
			fontSize: '14px',
			fontFamily: 'Cabin, sans-serif',
			fontWeight: 600,
			labels: {
				colors: '#525050',
			},
			markers: {
				fillColors: ['#008FFB', '#90C1E7', '#D1E3F1'],
				radius: 12,
			},
			itemMargin: {
				horizontal: 30,
				vertical: 0,
			},
		},
	};
	const [series, setSeries] = useState([
		{
			name: 'Approved',
			data: [],
		},
		{
			name: 'Rejected',
			data: [],
		},
		{
			name: 'Pending',
			data: [],
		},
	]);
	const { data: videoGraph, refetch, isLoading, isSuccess } = useFetch(['graph-submissions'], `/submission-graph`);
	useEffect(() => {
		const videoGraphSeries = [];
		if (isSuccess) {
			videoGraphSeries.push({
				name: 'Pending',
				data: Array.from(videoGraph, item => item.pending),
			});
			videoGraphSeries.push({
				name: 'Approved',
				data: Array.from(videoGraph, item => item.accepted),
			});
			videoGraphSeries.push({
				name: 'Rejected',
				data: Array.from(videoGraph, item => item.rejected),
			});

			setSeries(videoGraphSeries);
		}
	}, [videoGraph]);

	return (
		<div>
			<ReactApexChart options={options} series={series} type='bar' height={350} />
		</div>
	);
}

export default SubmissionChart;
