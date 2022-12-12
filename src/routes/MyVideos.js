import React, { useContext, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useBroadcast from "../hooks/useBroadcast";
import useFetch from "../hooks/useFetch";
import Pagination from "../components/Pagination";
import DateRangePicker from "../components/DateRangePicker";

import VideoCard from "../components/VideoCard";
import VideoTable from "../components/VideoTable";
import { format } from "date-fns/esm";
import { useAuth, useAuthUser } from "react-auth-kit";
import useFetchVideos from "../hooks/useFetchVideos";
import getImageURL from "../lib/queryClient";

function MyVideos() {
  const baseURL = process.env.REACT_APP_API_BASE;
  const [searchParams] = useSearchParams();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isListView, setIsListView] = useState(true);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState();

  const [activeTab, setActiveTab] = useState("All");

  const auth = useAuthUser();
  const {
    data: videos,
    refetch,
    isLoading,
  } = useFetchVideos(
    ["videos", status, search, endDate, currentPage],
    `${baseURL}/videos/12?page=${currentPage}`,
    {
      status: status,
      search: search,
      from_date: startDate
        ? format(new Date(startDate?.toISOString()), "yyyy-MM-dd")
        : null,
      to_date: endDate
        ? format(new Date(endDate?.toISOString()), "yyyy-MM-dd")
        : null,
    },
    {
      pagePrefetchKey: ["videos", status, search, endDate, currentPage + 1],
    }
  );
  useBroadcast('video', refetch);
	useEffect(() => {
		if (searchParams.get('search')) {
			setSearch(searchParams.get('search'));
		}
	}, [searchParams]);
  return (
    <>
      <div className="dashboard_content">
        <div className="dashboard_content_inner">
          <div className="head_row">
            <div className="tab_row">
              <ul
                className="nav_tab nav_tab_selecton"
                data-tab-target="tabgroup1"
              >
                <li>
                  <a href="#" className="active" id="nav_tab_selecton_all">
                    All Videos
                  </a>
                </li>
                <li>
                  <a href="#" id="nav_tab_selecton_appr">
                    Approved
                  </a>
                </li>
                <li>
                  <a href="#" id="nav_tab_selecton_rej">
                    Rejected
                  </a>
                </li>
              </ul>
            </div>
            <div className="filter_row">
              <div className="srch_inner">
                <input type="text" placeholder="Search Here......" />
                <span className="srch_btn">
                  <img src="images/search.svg" alt="" />
                </span>
              </div>
              <div className="calendar_wrapper dsh_cld">
                <input
                  type="text"
                  className="calender_range_value"
                  id="calender_range_value"
                />
                <div className="calender_range" id="calender_range_toggle">
                  <input type="text" className="d-none" id="calender_range" />
                  <div className="range_btn">
                    <div className="range_btn_col">
                      <button
                        className="btn-outline btn-outline-red"
                        id="range_clear"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="range_btn_col">
                      <button
                        className="btn-outline btn-outline-blue fill"
                        id="apply_range"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="view_control">
                <span className="list_toggle_btn active" id="list_view">
                  <svg
                    width="34"
                    height="31"
                    viewBox="0 0 34 31"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M32.064 17.1302H1.66006C0.742545 17.1302 0 16.3876 0 15.4701C0 14.5526 0.742584 13.8101 1.66006 13.8101H32.1077C33.0252 13.8101 33.7677 14.5526 33.7677 15.4701C33.7677 16.3876 33.0251 17.1302 32.064 17.1302H32.064Z"
                      fill="currentColor"
                    />
                    <path
                      d="M32.064 4.0252H1.66006C0.742545 4.0252 0 3.28262 0 2.36514C0 1.44766 0.742584 0.705078 1.66006 0.705078H32.1077C33.0252 0.705078 33.7677 1.44766 33.7677 2.36514C33.7677 3.28262 33.0251 4.0252 32.064 4.0252H32.064Z"
                      fill="currentColor"
                    />
                    <path
                      d="M32.064 30.2357H1.66006C0.742545 30.2357 0 29.4931 0 28.5756C0 27.6581 0.742584 26.9155 1.66006 26.9155H32.1077C33.0252 26.9155 33.7677 27.6581 33.7677 28.5756C33.7677 29.4931 33.0251 30.2357 32.064 30.2357H32.064Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="grid_toggle_btn" id="grid_view">
                  <svg
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6102 0H1.02293C0.457804 0 0 0.457802 0 1.02292V11.6102C0 12.1753 0.457804 12.6331 1.02293 12.6331H11.6102C12.1754 12.6331 12.6332 12.1753 12.6332 11.6102V1.02292C12.6332 0.457802 12.1748 0 11.6102 0ZM10.5873 10.5872H2.04586V2.04585H10.5873V10.5872ZM27.9771 0H17.3898C16.8246 0 16.3668 0.457802 16.3668 1.02292V11.6102C16.3668 12.1753 16.8246 12.6331 17.3898 12.6331H27.9771C28.5422 12.6331 29 12.1753 29 11.6102V1.02292C29 0.457802 28.5416 0 27.9771 0ZM26.9541 10.5872H18.4127V2.04585H26.9541V10.5872ZM11.6102 16.3669H1.02293C0.457804 16.3669 0 16.8247 0 17.3898V27.9771C0 28.5422 0.457804 29 1.02293 29H11.6102C12.1754 29 12.6332 28.5422 12.6332 27.9771V17.3898C12.6332 16.8247 12.1748 16.3669 11.6102 16.3669ZM10.5873 26.9542H2.04586V18.4128H10.5873V26.9542ZM27.9771 16.3669H17.3898C16.8246 16.3669 16.3668 16.8247 16.3668 17.3898V27.9771C16.3668 28.5422 16.8246 29 17.3898 29H27.9771C28.5422 29 29 28.5422 29 27.9771V17.3898C29 16.8247 28.5416 16.3669 27.9771 16.3669ZM26.9541 26.9542H18.4127V18.4128H26.9541V26.9542Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          {/* List View Begin */}
          <div className="view_box list_view_box active_view">
            <div className="all_tab_panel" data-tab-parent="tabgroup1">
              <div className="tab_panel active">
                <div className="panel_inner panel_inner_scrollable">
                  <table className="list_table all">
                    <thead>
                      <tr>
                        <th>NO.</th>
                        <th>Video</th>
                        <th>Title</th>
                        <th>Client Name</th>
                        <th>Email</th>
                        <th>Submission Date</th>
                        <th>Status</th>
                        <th>View</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading
                        ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
                            return (
                              <tr>
                                <td>
                                  <div className="skeleton_v1">01</div>
                                </td>
                                <td>
                                  <span className="video_inline_img skeleton_v1">
                                    <img src="images/video1.jpeg" alt="" />
                                  </span>
                                </td>
                                <td>
                                  <div className="skeleton_v1">
                                    Rabbit on fence
                                  </div>
                                </td>
                                <td>
                                  <div className="skeleton_v1">John Smith</div>
                                </td>
                                <td>
                                  <div className="skeleton_v1">
                                    <div href="mailto:johnsmith@gmail.com">
                                      johnsmith@gmail.com
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="skeleton_v1">
                                    12/12/2021 | 12:55 PM UTC
                                  </div>
                                </td>
                                <td>
                                  <span className="tg grn skeleton_v1">
                                    Approved
                                  </span>
                                </td>
                                <td>
                                  <div className="skeleton_v1">
                                    <a
                                      href="#"
                                      className="view_ico_btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#video_modal"
                                    >
                                      <svg
                                        width={32}
                                        height={32}
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M30.9401 15.66C29.7639 12.6176 27.722 9.98662 25.0669 8.09209C22.4117 6.19756 19.2595 5.12257 16.0001 5C12.7406 5.12257 9.58845 6.19756 6.93326 8.09209C4.27808 9.98662 2.23622 12.6176 1.06006 15.66C0.98063 15.8797 0.98063 16.1203 1.06006 16.34C2.23622 19.3824 4.27808 22.0134 6.93326 23.9079C9.58845 25.8024 12.7406 26.8774 16.0001 27C19.2595 26.8774 22.4117 25.8024 25.0669 23.9079C27.722 22.0134 29.7639 19.3824 30.9401 16.34C31.0195 16.1203 31.0195 15.8797 30.9401 15.66ZM16.0001 25C10.7001 25 5.10006 21.07 3.07006 16C5.10006 10.93 10.7001 7 16.0001 7C21.3001 7 26.9001 10.93 28.9301 16C26.9001 21.07 21.3001 25 16.0001 25Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10ZM16 20C15.2089 20 14.4355 19.7654 13.7777 19.3259C13.1199 18.8864 12.6072 18.2616 12.3045 17.5307C12.0017 16.7998 11.9225 15.9956 12.0769 15.2196C12.2312 14.4437 12.6122 13.731 13.1716 13.1716C13.731 12.6122 14.4437 12.2312 15.2196 12.0769C15.9956 11.9225 16.7998 12.0017 17.5307 12.3045C18.2616 12.6072 18.8864 13.1199 19.3259 13.7777C19.7654 14.4355 20 15.2089 20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : videos?.data?.data
                        ? videos.data.data.map((video, index) => {
                            return (
                              <tr>
                                <td>
                                  <div className="">{video.id}</div>
                                </td>
                                <td>
                                  <span className="video_inline_img ">
                                    <img
                                      src={getImageURL(video.thumbnail)}
                                      alt=""
                                    />
                                  </span>
                                </td>
                                <td>
                                  <div className="">{video.title}</div>
                                </td>
                                <td>
                                  <div className="">{`${video.first_name} ${video.last_name}`}</div>
                                </td>
                                <td>
                                  <div className="">
                                    <div href={`mailto:${video.email}`}>
                                      {video.email}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="">{video.created_at}</div>
                                </td>
                                <td>
                                  <span className={`tg ${video.status === 0? 'yel': video.status === 1? 'grn': video.status === 2? 'red': ''}`}>{video.status === 0? 'Pending': video.status === 1? 'Approved': video.status === 2? 'Rejected': 'Unknown'}</span>
                                </td>
                                <td>
                                  <div className="">
                                    <a
                                      href="#"
                                      className="view_ico_btn"
                                      data-bs-toggle="modal"
                                      data-bs-target="#video_modal"
                                    >
                                      <svg
                                        width={32}
                                        height={32}
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M30.9401 15.66C29.7639 12.6176 27.722 9.98662 25.0669 8.09209C22.4117 6.19756 19.2595 5.12257 16.0001 5C12.7406 5.12257 9.58845 6.19756 6.93326 8.09209C4.27808 9.98662 2.23622 12.6176 1.06006 15.66C0.98063 15.8797 0.98063 16.1203 1.06006 16.34C2.23622 19.3824 4.27808 22.0134 6.93326 23.9079C9.58845 25.8024 12.7406 26.8774 16.0001 27C19.2595 26.8774 22.4117 25.8024 25.0669 23.9079C27.722 22.0134 29.7639 19.3824 30.9401 16.34C31.0195 16.1203 31.0195 15.8797 30.9401 15.66ZM16.0001 25C10.7001 25 5.10006 21.07 3.07006 16C5.10006 10.93 10.7001 7 16.0001 7C21.3001 7 26.9001 10.93 28.9301 16C26.9001 21.07 21.3001 25 16.0001 25Z"
                                          fill="currentColor"
                                        />
                                        <path
                                          d="M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10ZM16 20C15.2089 20 14.4355 19.7654 13.7777 19.3259C13.1199 18.8864 12.6072 18.2616 12.3045 17.5307C12.0017 16.7998 11.9225 15.9956 12.0769 15.2196C12.2312 14.4437 12.6122 13.731 13.1716 13.1716C13.731 12.6122 14.4437 12.2312 15.2196 12.0769C15.9956 11.9225 16.7998 12.0017 17.5307 12.3045C18.2616 12.6072 18.8864 13.1199 19.3259 13.7777C19.7654 14.4355 20 15.2089 20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </a>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* List View End */}

          <div className="view_box grid_view_box grid_view_box_selection">
            <div className="all_tab_panel" data-tab-parent="tabgroup1">
              <div className="tab_panel active">
                <div className="panel_inner">
                  <div className="grid_row">
                    <div className="grid_item">
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big2.jpeg" alt="" />
                          <label className="skeleton_v1">102</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big3.jpeg" alt="" />
                          <label className="skeleton_v1">103</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
                          <label className="skeleton_v1">104</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big5.jpeg" alt="" />
                          <label className="skeleton_v1">105</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big6.jpeg" alt="" />
                          <label className="skeleton_v1">106</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big2.jpeg" alt="" />
                          <label className="skeleton_v1">107</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big1.jpeg" alt="" />
                          <label className="skeleton_v1">108</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big3.jpeg" alt="" />
                          <label className="skeleton_v1">109</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
                          <label className="skeleton_v1">110</label>
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab_panel">
                <div className="panel_inner">
                  <div className="grid_row">
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big6.jpeg" alt="" />
                          <label className="skeleton_v1">102</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big1.jpeg" alt="" />
                          <label className="skeleton_v1">103</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
                          <label className="skeleton_v1">104</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big5.jpeg" alt="" />
                          <label className="skeleton_v1">105</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big6.jpeg" alt="" />
                          <label className="skeleton_v1">106</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big2.jpeg" alt="" />
                          <label className="skeleton_v1">107</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big1.jpeg" alt="" />
                          <label className="skeleton_v1">108</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big3.jpeg" alt="" />
                          <label className="skeleton_v1">109</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
                          <label className="skeleton_v1">110</label>
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
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab_panel">
                <div className="panel_inner">
                  <div className="grid_row">
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big6.jpeg" alt="" />
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big1.jpeg" alt="" />
                          <label className="skeleton_v1">102</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big5.jpeg" alt="" />
                          <label className="skeleton_v1">103</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
                          <label className="skeleton_v1">104</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big5.jpeg" alt="" />
                          <label className="skeleton_v1">105</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big6.jpeg" alt="" />
                          <label className="skeleton_v1">106</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big2.jpeg" alt="" />
                          <label className="skeleton_v1">107</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big1.jpeg" alt="" />
                          <label className="skeleton_v1">108</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big3.jpeg" alt="" />
                          <label className="skeleton_v1">109</label>
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
                    </div>
                    <div className="grid_item">
                      <div className="grid_item_inner">
                        <figure className="grid_imgs skeleton_v1">
                          <img src="images/video_big4.jpeg" alt="" />
                          <label className="skeleton_v1">110</label>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pagination_panel">
            <ul className="pagination">
              <li>
                <a href="#">
                  <svg
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 1L1 4.5L4 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Previous
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <span>2</span>
              </li>
              <li>
                <span>3</span>
              </li>
              <li>
                <span>..</span>
              </li>
              <li>
                <span>6</span>
              </li>
              <li>
                <a href="#">
                  Next
                  <svg
                    width="5"
                    height="9"
                    viewBox="0 0 5 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 8L4 4.5L1 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyVideos;
