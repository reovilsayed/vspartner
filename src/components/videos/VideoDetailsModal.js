import React, { useContext, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useCreate } from '../../hooks/useUpdate';
import { VideoContext } from '../../App';
import useFetch from '../../hooks/useFetch';
import requests from '../../services/httpService';
import getImageURL, { notify, plainDateTime } from '../../lib/queryClient';
import VideoPlayer from './VideoPlayer';

const VideoDetailsModal = ({ toggle }) => {
	const [toggleWeTransfer, settoggleWeTransfer] = useState(false);
	const authHeader = useAuthHeader();
	const sendNotification = async video_id => {
		await requests.post('/send-notification', { video_id: video_id }, { token: authHeader() });
		notify();
	};
	const { videoDetails } = useContext(VideoContext);
	const { id, title, thumbnail, email, first_name, last_name, created_at } = videoDetails;
	const { data: video } = useFetch(['video', id], `/video/${id}`);
	const { status } = video || {};

	const { mutateAsync: mutateNote } = useCreate('note');
	const createNote = async payload => {
		mutateNote({ payload }).finally(() => {
			// refetch();
			// refetchEarning();
		});
	};
	const [tabItem, setTabItem] = useState(1);
	const [showNotForCopyWriterInput, setShowNotForCopyWriterInput] = useState(false);
	const [showNotForEditorInput, setShowNotForEditorInput] = useState(false);
	const filterNote = (notes, key) => {
		if (notes) {
			const filtered_note = notes.filter(note => {
				return note.note_key === key;
			});
			if (filtered_note.length > 0) {
				return filtered_note[0].note;
			}
		}
	};
	const [editableFields, setEditableFields] = useState({});

	const handleOnChange = e => {
		setEditableFields({ ...editableFields, [e.target.name]: e.target.value });
	};
	return (
		<div
			className='modal fade profile_popup add_member_pop in'
			id='video_detail_pop'
			tabIndex={-1}
			role='dialog'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
			style={{ display: 'block', paddingLeft: '0px', overflowY: 'scroll' }}>
			<div className='modal-dialog' role='document'>
				<div className='modal-content'>
					<button onClick={() => toggle()} aria-label='Close' className='close' data-dismiss='modal' type='button'>
						<span aria-hidden='true'>×</span>
					</button>
					<div className='video_detail_area'>
						<div className='video_detail_left'>
							<div className='item_detail_col_item_img'>
								{/* <VideoPlayer src={`${process.env.REACT_APP_VIDEO_BASE}${video?.converted_url? video.converted_url: ''}`} poster={getImageURL(thumbnail)} /> */}
							</div>
							<ul className='btn_option'>
								<li>
									<a className='btn_option_download' href={`https://downloads.viralsnare.com/${video?.video}`}>
										<span>
											<i aria-hidden='true' className='fa fa-download'></i>
										</span>{' '}
										Download Video
									</a>
								</li>
								<li>
									<a className='btn_option_approve' onClick={() => sendNotification(video?.id)}>
										<span>
											<i aria-hidden='true' className='fa fa-share-alt'></i>
										</span>{' '}
										Send Notification
									</a>
								</li>
							</ul>
							<div className='video_info_detail'>
								<div className='row'>
									<div className='col-md-12'>
										<h3>
											<span>About Video</span>
										</h3>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Title of the video</h4>
											<h2>{title}</h2>
											<h4>Country</h4>
											<h2>{video?.country}</h2>
										</div>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Submission Date:</h4>
											<h2>{plainDateTime(created_at)}</h2>
											<h4>City</h4>
											<h2>{video?.city}</h2>
										</div>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>When was this video filmed?</h4>
											<h2>On {video?.when_filmed}</h2>
											<h4>State</h4>
											<h2>{video?.state}</h2>
										</div>
									</div>
									<div className='col-md-12'>
										<div className='video_info_detail_col'>
											<h4>Story/Description:</h4>
											<h2>{video?.description}</h2>
										</div>
									</div>
								</div>
							</div>
							<a className='add_youtube_link' href='' onClick={() => settoggleWeTransfer(!toggleWeTransfer)}>
								WeTransfer Link
							</a>
							<div className={toggleWeTransfer ? 'youtube_link_area  show' : 'youtube_link_area '}>
								<div className='video_info_detail'>
									<div className='row'>
										<div className='col-md-12'>
											<h3>
												<span>WeTransfer Link</span>
											</h3>
										</div>
										<div className='col-md-12'>
											<div className='video_info_detail_col'>
												<input name='' defaultValue={video?.video_meta?.wetransfer_link? video.video_meta.wetransfer_link : ''} placeholder='Enter WeTransfer Link here' type='text' />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='video_detail_right'>
							<div className='video_info_detail'>
								<div className='row'>
									<div className='col-md-12'>
										<h3>
											<span>About User</span>
										</h3>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Client Name:</h4>
											<h2>
												{first_name} {last_name}
											</h2>
											<h4>Date of Birth</h4>
											<h2>On {video?.birthdate}</h2>
											<h4>Signature:</h4>
											<div className='video_info_detail_col_image'>
												<img src={getImageURL(video?.signature? video.signature: '')} style={{ width: '70px' }} />
											</div>
										</div>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Email Address:</h4>
											<h2>{email}</h2>
											<h4>Payment Method</h4>
											<div className='video_info_detail_col_image'>
												{video?.payment_method === 'paypal-content' ? <img src='assets/img/payment/paypal.png' alt='' /> : ''}
												{video?.payment_method === 'bank-transfer' ? <img src='assets/img/payment/bank.png' /> : ''}
												{video?.payment_method === 'transfer-wisp-content' ? <img src='assets/img/payment/transferwise.png' /> : ''}
											</div>
											<h4>Video Credit</h4>
											<h2>{video?.video_credit}</h2>
										</div>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Phone Number</h4>
											<h2>{video?.phone}</h2>
											{video?.payment_method === 'paypal-content' && (
												<>
													<h4>Paypal Email Address:</h4>
													<h2>{video?.paypal_email}</h2>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
							<div className='video_info_detail'>
								<div className='row'>
									<div className='col-md-12'>
										<h3>
											<span>Copyrights Ownership</span>
										</h3>
									</div>
									<div className='col-md-12'>
										<div className='video_info_detail_col'>
											<h4>Are There People Appearing In The Video?</h4>
											<h2>{video?.people_appearing}</h2>
											{video?.people_appearing_list && (
												<>
													<h4>Who Are They?</h4>
													<h2>{video?.people_appearing_list}</h2>
												</>
											)}
											<h4>The person who filmed this video is</h4>
											<h2>
												{video?.person_who_filmed}
												{video?.person_who_filmed && <> -{video?.person_who_filmed_other}</>}
											</h2>
											<h4>Did You Send/Submit/Upload This Video To A Website And/Or Social Media Account?</h4>
											<h2>{video?.submit_other_website} </h2>
											{video?.submit_place && (
												<>
													<h4>Where Did You Submit It?</h4>
													<h2>{video?.submit_place} </h2>
												</>
											)}
											<h4>Did Anyone Reach You About Using This Video?</h4>
											<h2>
												{video?.did_anyone_reach} {video?.share_reach_name}
											</h2>
											{video?.share_reach_name && (
												<>
													<h4>Please Share With Us The Name Of The Company/Page:</h4>
													<h2>{video?.share_reach_name}</h2>
												</>
											)}
											<h4>Did You Sign A Licensing Agreement For This Video With Another Company/Page?</h4>
											<h2>{video?.aggrement_with_another_company}</h2>
										</div>
									</div>
								</div>
							</div>
							<div className='video_info_detail'>
								<div className='row'>
									<div className='col-md-12'>
										<h3>
											<span>Submission Information</span>
										</h3>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Video Status:</h4>
											{status === 0 && <h2 className='fw-bold'>Pending</h2>}
											{status === 1 && <h2 className='fw-bold green_text'>Approved</h2>}
											{status === 2 && <h2 className='fw-bold red_text'>Rejected</h2>}
											{status === 3 && <h2 className='fw-bold'>Inquiry</h2>}
											{status === 4 && <h2 className='fw-bold'>Delete</h2>}
										</div>
									</div>
									<div className='col-md-3'>
										<div className='video_info_detail_col'>
											<h4>User IP address:</h4>
											<h2>{video?.video_meta?.ip_address || 'N/A'}</h2>
										</div>
									</div>
									<div className='col-md-5'>
										<div className='video_info_detail_col'>
											<h4>Submission date:</h4>
											{/* <h2>August 23rd, 2021 at 11:15:34 PM UTC</h2>  */}
											<h2>{new Date(created_at).toUTCString().slice(0, -3)}</h2>
										</div>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Terms of Submission:</h4>
											<h2>Exclusive License | Agreed</h2>
										</div>
									</div>
									<div className='col-md-3'>
										<div className='video_info_detail_col'>
											<h4>Terms of Service:</h4>
											<h2>Agreed</h2>
										</div>
									</div>
									<div className='col-md-5'>
										<div className='video_info_detail_col'>
											<h4>Revenue Share:</h4>
											<h2>{video?.user?.revenue_share}%</h2>
										</div>
									</div>
									<div className='col-md-4'>
										<div className='video_info_detail_col'>
											<h4>Acquired By</h4>
											<h2>
												{video?.user?.name} {video?.user?.last_name}
											</h2>
										</div>
									</div>
									<div className='col-md-3'>
										<div className='video_info_detail_col'>
											<h4>VSID</h4>
											<h2>{video?.id}</h2>
										</div>
									</div>
									{video?.manager_decision && (
										<div className='col-md-5'>
											<div className='video_info_detail_col'>
												<h4> {video?.manager_decision === 1 ? 'Approved' : 'Rejected'} By</h4>
												<h2>
													{video?.manager?.name || '-'} {video?.manager?.last_name || '-'} <br />
													{plainDateTime(video?.video_meta?.manager_updated_at)}
												</h2>
											</div>
										</div>
									)}
									{video?.quality_team_decision && (
										<div className='col-md-5'>
											<div className='video_info_detail_col'>
												<h4>{video?.quality_team_decision === 1 ? 'Confirmed' : 'Declined'} By</h4>
												<h2>
													{video?.quality_team?.name || '-'} {video?.quality_team?.last_name || '-'} On <br />
													{plainDateTime(video?.video_meta?.quality_team_updated_at)}
												</h2>
											</div>
										</div>
									)}
								</div>
							</div>

							<div className='video_info_detail'>
								<div className='row'>
									<div className='col-md-12'>
										<h3>
											<span>Notes</span>
										</h3>
									</div>
									<div className='col-md-12'>
										{filterNote(video?.notes, 'editor_to_partner') ||
										filterNote(video?.notes, 'copyright_to_partner') ||
										filterNote(video?.notes, 'manager_to_partner') ? (
											<div className='container--tabs'>
												<div className='nav_tabs_area'>
													<ul className='nav nav-tabs'>
														<li onClick={() => setTabItem(1)} className={`${tabItem === 1 ? 'active' : ''}`}>
															<a href=''>Editor</a>
														</li>
														<li onClick={() => setTabItem(2)} className={`${tabItem === 2 ? 'active' : ''}`}>
															<a href=''>Copywriter</a>
														</li>
														<li onClick={() => setTabItem(3)} className={`${tabItem === 3 ? 'active' : ''}`}>
															<a href=''>Manager</a>
														</li>
													</ul>
												</div>
												<div className='tab-contents'>
													<div id='tab-3' className={`tab-pane ${tabItem === 1 ? 'active' : ''}`}>
														<p>{filterNote(video?.notes, 'editor_to_admin')}</p>
													</div>
													<div id='tab-4' className={`tab-pane ${tabItem === 2 ? 'active' : ''}`}>
														<p>{filterNote(video?.notes, 'copyright_to_admin')}</p>
													</div>
													<div id='tab-5' className={`tab-pane ${tabItem === 3 ? 'active' : ''}`}>
														<p>{filterNote(video?.notes, 'manager_to_admin')}</p>
													</div>
												</div>
											</div>
										) : (
											<h3 style={{ top: '0px' }}>No notes available!</h3>
										)}
									</div>
								</div>
							</div>
							{videoDetails.statusGroup !== 'lost' && videoDetails.statusGroup !== 'published' && (
								<div className='video_info_detail_btn'>
									<div className='row'>
										<div className='col-md-5'>
											{!showNotForCopyWriterInput && (
												<a href='' onClick={() => setShowNotForCopyWriterInput(true)} className='admin_note_btn'>
													Leave a note for Copywriter
												</a>
											)}

											{showNotForCopyWriterInput && (
												<>
													{' '}
													<div className='video_info_detail note_admin active'>
														<div className='row'>
															<div className='col-md-12'>
																<h3>
																	<span>Leave a Note for Copywriter</span>
																</h3>
															</div>
															<div className='col-md-12'>
																<div className='video_info_detail_col'>
																	<textarea
																		placeholder='Type the note here..'
																		className='autosize'
																		defaultValue={''}
																		name='noteForCopyWriter'
																		onChange={handleOnChange}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className='admin_note_save_area activate'>
														<a
															onClick={() => {
																createNote({
																	note: editableFields.noteForCopyWriter || 'hi',
																	role: 'copyright',
																	video_id: video?.id,
																});
																setShowNotForCopyWriterInput(false);
															}}
															href=''>
															Save
														</a>
														<a href='' onClick={() => setShowNotForCopyWriterInput(false)} className='cancel_admin_note'>
															Cancel
														</a>
													</div>
												</>
											)}
										</div>
										<div className='col-md-5'>
											{!showNotForEditorInput && (
												<a href='' onClick={() => setShowNotForEditorInput(true)} className='editor_note_btn'>
													Leave a note for Editor
												</a>
											)}
											{showNotForEditorInput && (
												<>
													<div className='video_info_detail note_editor active'>
														<div className='row'>
															<div className='col-md-12'>
																<h3>
																	<span>Leave a Note for Editor</span>
																</h3>
															</div>
															<div className='col-md-12'>
																<div className='video_info_detail_col'>
																	<textarea
																		placeholder='Type the note here..'
																		className='autosize'
																		defaultValue={''}
																		name='noteForEditor'
																		onChange={handleOnChange}
																	/>
																</div>
															</div>
														</div>
													</div>
													<div className='editor_note_save_area activate'>
														<a
															onClick={() => {
																createNote({
																	note: editableFields.noteForEditor || 'hi',
																	role: 'editor',
																	video_id: video?.id,
																});
																setShowNotForEditorInput(false);
															}}
															href=''>
															Save
														</a>
														<a href='' className='cancel_editor_note' onClick={() => setShowNotForEditorInput(false)}>
															Cancel
														</a>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VideoDetailsModal;
