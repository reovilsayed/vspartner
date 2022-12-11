import React, { useContext } from 'react';
import { VideoContext } from '../App';
import getImageURL, { plainDateTime } from '../lib/queryClient';
export default function VideoCard({ items }) {
	const { toggle } = useContext(VideoContext);
	return (
		<>
			<div className='grid_view_content'>
				<div className='row'>
					{items?.map(item => {
						return (
							<div className='item_video decision_done col-md-4'>
								<div className='item_video_image'>
									<img onClick={() => toggle(item)} src={getImageURL(item?.thumbnail)} alt='' />
								</div>
								<div className='item_video_content'>
									<h2>
										{item.title.substring(0,35)}
										<span>{item.id}</span>
									</h2>
									<h3>
										<img src='assets/img/item_video_content_icon_1.svg' alt='' />
										Client Name:
										<span>
											{' '}
											{item.name} {item.last_name}
										</span>
									</h3>
									<h3>
										<img src='assets/img/item_video_content_icon_2.svg' alt='' />
										Email:<span> {item.email}</span>
									</h3>
									<h3 className='decision_statue_text'>
										<img src='assets/img/item_video_content_icon_3.svg' alt='' />
										Submission Date:<span> {plainDateTime(item.created_at)}</span>
									</h3>
									<h4>
										<img src='assets/img/item_video_content_icon_4.svg' alt='' />
										Status: {item.status == 0 ? <span className='orange_text'>Pending</span> : ''}
										{item.status == 1 ? <span className='green_text'>Approved</span> : ''}
										{item.status == 2 ? <span className='red_text'>Rejected</span> : ''}
										{item.status == 3 ? <span className='orange_text'>Inquiry</span> : ''}
										{item.status == 4 ? <span className='red_text'>Deleted</span> : ''}
									</h4>
									<a onClick={() => toggle(item)} href='#' data-toggle='modal' data-target='#video_detail_pop' className='grid_view_detail_btn'>
										View Details<i className='fa fa-arrow-right' aria-hidden='true'></i>
									</a>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
