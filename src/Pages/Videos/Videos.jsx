import React, { useContext, useEffect, useRef, useState } from "react";
import Grid from "./Components/Grid";
import List from "./Components/List";
import Pagination from "../../components/Pagination";
import useFetch from "../../hooks/useFetch";
import { VideoContext, VideoLayoutContext } from "../../App";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { useSearchParams } from "react-router-dom";

const Videos = () => {
  const [fromDate, setfromDate] = useState('');
  const [endDate, setendDate] = useState('');
  const [popup, setPopup] = useState(false);
  const picker = flatpickr("#calender_range", {
    mode: "range",
    altInput: true,
    altFormat: "j F, Y",
    dateFormat: "Y/m/d",
    inline: true,
    defaultDate: [fromDate, endDate]
  });

  const filterByDate = (value) => {

    dateInput.current.value = value;
    const dates = value.split(" to ");
    setfromDate(dates[0]);
    setendDate(dates[1]);

    setPopup(false);
  }

  const { videoDetails, setVideoDetails, toggle } = useContext(VideoContext);
  const STATUS = {
    All: null,
    Approved: 1,
    Rejected: 2,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const {isListView, setIsListView, handleListView} = useContext(VideoLayoutContext);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState();

  const [searchParams] = useSearchParams();
  const [calendarExtended, setCalendarExtended] = useState(false);
  const handleCalenderExtend = () => {
    setCalendarExtended(!calendarExtended);
  }

  const dateInput = useRef(null)


  const { data, refetch, isLoading } = useFetch(
    ["videos", status, fromDate, endDate, search, currentPage,],
    `/videos/12?page=${currentPage}`,
    {
      status: status,
      search: search,
      from_date: fromDate,
      to_date: endDate,

    },
    {
      pagePrefetchKey: ["videos", status, fromDate, endDate, search, currentPage + 1],
    }
  );
  const clearDatePicker = () => {
    picker.clear();
    setfromDate('');
    setendDate('');
    dateInput.current.value = '';
    refetch();
    setPopup(!popup);
  }
  useEffect(() => {
    if (searchParams.get('search')) {
      setSearch(searchParams.get('search'));
    }
  }, [searchParams, search]);

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
                  <a
                    onClick={() => setStatus(STATUS.All)}
                    className={status == STATUS.All ? "active" : ""}
                    id="nav_tab_selecton_all"
                  >
                    All Videos
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setStatus(STATUS.Approved);
                      setCurrentPage(1);
                    }}
                    id="nav_tab_selecton_appr"
                    className={status === STATUS.Approved ? "active" : ""}
                  >
                    Approved
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => {
                      setStatus(STATUS.Rejected);
                      setCurrentPage(1);
                    }}
                    id="nav_tab_selecton_rej"
                    className={status === STATUS.Rejected ? "active" : ""}
                  >
                    Rejected
                  </a>
                </li>
              </ul>
            </div>
            <div className="filter_row">
              <div className="srch_inner">
                <input
                  type="text"
                  placeholder="Search Here......"
                  defaultValue={searchParams.get('search')? searchParams.get('search'): ''}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span className="srch_btn">
                  <img src="images/search.svg" alt="" />
                </span>
              </div>
              <div className="calendar_wrapper dsh_cld">
                <input type="text" ref={dateInput} className={popup ? 'calender_range_value dateSelector active' : 'calender_range_value dateSelector'} id="calender_range_value" onClick={() => setPopup(!popup)} />
                <div className={popup ? "calender_range active" : "calender_range"} id="calender_range_toggle ">
                  <input type="text" className="d-none" id="calender_range" />
                  <div className="range_btn">
                    <div className="range_btn_col">
                      <button className="btn-outline btn-outline-red" onClick={clearDatePicker} id="range_clear">Clear</button>
                    </div>
                    <div className="range_btn_col">
                      {/* <button className="btn-outline btn-outline-blue fill" id="apply_range" onClick={() => filterByDate(picker.input.value)} >Apply</button> */}
                      <button className="btn-outline btn-outline-blue fill" id="apply_range" onClick={() => filterByDate(picker.input.value)} >Apply</button>
                    </div>
                  </div>
                </div>
              </div>


              <div className="view_control">
                <span
                  className={`list_toggle_btn  ${isListView ? "active" : ""}`}
                  id="list_view"
                  onClick={() => setIsListView(!isListView)}
                >
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
                <span
                  className={`grid_toggle_btn ${isListView ? "" : "active"}`}
                  id="grid_view"
                  onClick={() => setIsListView(!isListView)}
                >
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

          <List
            videos={data?.data}
            isLoading={isLoading}
            active={isListView ? true : false}
            toggle={toggle}
          />

          <Grid
            videos={data?.data}
            isLoading={isLoading}
            active={isListView ? false : true}
            toggle={toggle}
          />

          <div className="pagination_panel">
            {data?.total >= 12 && (
              <Pagination
                perPage={12}
                total={data?.total}
                currentPage={currentPage}
                onChange={(e) => setCurrentPage(e)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
