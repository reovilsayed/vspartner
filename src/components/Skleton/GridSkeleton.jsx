import React from 'react';

const GridSkeleton = ({ count = 10 }) => {
    const ROWS = [];
    for (let i = 0; i < count; i++) {
        ROWS.push(<div className="grid_item">
            <div className="grid_item_inner">
                <figure className="grid_imgs skeleton_v1">
                    <img src="images/video_big1.jpeg" alt="" />
                    <label className="skeleton_v1">101</label>
                </figure>
                <div className="grid_content">
                    <h5 className="skeleton_v1">
                        <a href="#">Rabbit on fence</a>
                    </h5>
                    <ul>
                        <li className="skeleton_v1">
                            <i>
                                <img src="images/usr.svg" alt="" />
                            </i>
                            <label>Client Name:</label>
                            <p>Jhon Smith</p>
                        </li>
                        <li className="skeleton_v1">
                            <i>
                                <img src="images/eml.svg" alt="" />
                            </i>
                            <label>Email:</label>
                            <p>johnsmith@gmail.com</p>
                        </li>
                        <li className="skeleton_v1">
                            <i>
                                <img src="images/dt.svg" alt="" />
                            </i>
                            <label>Submission Date:</label>
                            <p>12/12/2021 | 12:55 PM UTC</p>
                        </li>
                        <li className="skeleton_v1">
                            <i>
                                <img src="images/stc.svg" alt="" />
                            </i>
                            <label>Status:</label>
                            <p className="grn">Approved</p>
                        </li>
                    </ul>
                    <a
                        href="#"
                        className="view_btns skeleton_v1"
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
        </div>)
    }
    return (
        <>
            {ROWS}
        </>

    );
};

export default GridSkeleton;