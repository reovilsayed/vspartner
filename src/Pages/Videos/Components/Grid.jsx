import React from 'react';
import GridSkeleton from '../../../components/Skleton/GridSkeleton';
import getImageURL from '../../../lib/queryClient';

const Grid = ({ videos, isLoading, active }) => {
    return (
        <div className={`view_box grid_view_box grid_view_box_selection ${active?'active_view':''}`}>
            <div className="all_tab_panel" data-tab-parent="tabgroup1">
                <div className="tab_panel active">
                    <div className="panel_inner">
                        <div className="grid_row">
                            {isLoading ? <GridSkeleton /> : (
                                videos.map(video => {
                                    return (
                                        <div className="grid_item" key={video.id}>
                                            <div className="grid_item_inner">
                                                <figure className="grid_imgs ">
                                                    <img src={getImageURL(video.thumbnail)} alt={video.title} />
                                                    <label className="">{video.id}</label>
                                                </figure>
                                                <div className="grid_content">
                                                    <h5 className="">
                                                        <a href="#">{video.title}</a>
                                                    </h5>
                                                    <ul>
                                                        <li className="">
                                                            <i>
                                                                <img src="images/usr.svg" alt="" />
                                                            </i>
                                                            <label>Client Name:</label>
                                                            <p>{`${video.first_name} ${video.last_name}`}</p>
                                                        </li>
                                                        <li className="">
                                                            <i>
                                                                <img src="images/eml.svg" alt="" />
                                                            </i>
                                                            <label>Email:</label>
                                                            <a href={`mailto:${video.email}`}>
                                                                {video.email}
                                                            </a>
                                                        </li>
                                                        <li className="">
                                                            <i>
                                                                <img src="images/dt.svg" alt="" />
                                                            </i>
                                                            <label>Submission Date:</label>
                                                            <p>{video.created_at}</p>
                                                        </li>
                                                        <li className="">
                                                            <i>
                                                                <img src="images/stc.svg" alt="" />
                                                            </i>
                                                            <label>Status:</label>
                                                            <p className={`grn ${video.status === 0 ? 'yel' : video.status === 1 ? 'grn' : video.status === 2 ? 'red' : ''}`}>{video.status === 0 ? 'Pending' : video.status === 1 ? 'Approved' : video.status === 2 ? 'Rejected' : 'Unknown'}</p>

                                                        </li>
                                                    </ul>
                                                    <a
                                                        href="#"
                                                        className="view_btns "
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#video_modal"
                                                    >
                                                        View Details
                                                        <svg
                                                            width="22"
                                                            height="12"
                                                            viewBox="0 0 22 12"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })

                            )}

                        </div>
                    </div>
                </div>

                <div className="tab_panel">
                    <div className="panel_inner">
                        <div className="grid_row">
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big6.jpeg" alt="" />
                                        <label className="">101</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big1.jpeg" alt="" />
                                        <label className="">102</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big5.jpeg" alt="" />
                                        <label className="">103</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="rd">
                                                    Rejected
                                                    <img
                                                        src="images/q.svg"
                                                        alt=""
                                                        tabIndex="0"
                                                        data-bs-custom-class="white"
                                                        data-tip=""
                                                        data-bs-toggle="tooltip"
                                                        title="Hello from speech bubble!"
                                                    />
                                                </p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big4.jpeg" alt="" />
                                        <label className="">104</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big5.jpeg" alt="" />
                                        <label className="">105</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big6.jpeg" alt="" />
                                        <label className="">106</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big2.jpeg" alt="" />
                                        <label className="">107</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big1.jpeg" alt="" />
                                        <label className="">108</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big3.jpeg" alt="" />
                                        <label className="">109</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="rd">
                                                    Rejected{" "}
                                                    <img
                                                        src="images/q.svg"
                                                        alt=""
                                                        tabIndex="0"
                                                        data-bs-custom-class="white"
                                                        data-tip=""
                                                        data-bs-toggle="tooltip"
                                                        title="Hello from speech bubble!"
                                                    />
                                                </p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="grid_item">
                                <div className="grid_item_inner">
                                    <figure className="grid_imgs ">
                                        <img src="images/video_big4.jpeg" alt="" />
                                        <label className="">110</label>
                                    </figure>
                                    <div className="grid_content">
                                        <h5 className="">
                                            <a href="#">Rabbit on fence</a>
                                        </h5>
                                        <ul>
                                            <li className="">
                                                <i>
                                                    <img src="images/usr.svg" alt="" />
                                                </i>
                                                <label>Client Name:</label>
                                                <p>Jhon Smith</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/eml.svg" alt="" />
                                                </i>
                                                <label>Email:</label>
                                                <p>johnsmith@gmail.com</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/dt.svg" alt="" />
                                                </i>
                                                <label>Submission Date:</label>
                                                <p>12/12/2021 | 12:55 PM UTC</p>
                                            </li>
                                            <li className="">
                                                <i>
                                                    <img src="images/stc.svg" alt="" />
                                                </i>
                                                <label>Status:</label>
                                                <p className="grn">Approved</p>
                                            </li>
                                        </ul>
                                        <a
                                            href="#"
                                            className="view_btns "
                                            data-bs-toggle="modal"
                                            data-bs-target="#video_modal"
                                        >
                                            View Details
                                            <svg
                                                width="22"
                                                height="12"
                                                viewBox="0 0 22 12"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989593 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75H21V5.25H0V6.75Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grid;