import React, { useContext } from 'react';
import { VideoContext } from '../App';
import getImageURL, { plainDateTime } from '../lib/queryClient';

export default function VideoTable({ items }) {
	const { toggle } = useContext(VideoContext);
	return (
		<>
			<div className='list_view_content'>
				<div className='boxes'>
					<div className='help_sec_table'>
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>VSID.</th>
									<th scope='col'>Video</th>
									<th scope='col'>Title</th>
									<th scope='col'>Client Name</th>
									<th scope='col'>Email</th>
									<th scope='col'>Submission Date</th>
									<th scope='col'>Status</th>
									<th scope='col'>View</th>
								</tr>
							</thead>
							<tbody>
								{items?.map(item => {
									return (
										<tr data-category='Approved' key={item.id}>
											<td>{item?.id}</td>
											<td>
												<a onClick={() => toggle(item)} href='javascript:void(0)' className='list_view_content_image' data-toggle='modal' data-target='#video_detail_pop'>
													<img src={getImageURL(item?.thumbnail)} alt='' />
												</a>
											</td>
											<td>{item.title}</td>
											<td>
												{item.first_name} {item.last_name}
											</td>
											<td>{item.email}</td>
											<td>
												{plainDateTime(item.created_at)}
											</td>
											<td>
												{item.status == 0 ? <p className='orange_text'>Pending</p> : ''}
												{item.status == 1 ? <p className='green_text'>Approved</p> : ''}
												{item.status == 2? <p className='red_text'>Rejected</p> : ''}
											</td>
											<td>
												<a onClick={() => toggle(item)} href='javascript:void(0)' className='already_view'></a>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
