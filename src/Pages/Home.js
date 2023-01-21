import React, { useEffect, useState } from "react";
import EarningChart from "../components/EarningChart";
import SubmissionChart from "../components/SubmissionChart";
import useFetch from "../hooks/useFetch";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
    const currDay = new Date().getDay();
    const [earningTimeRange, setEarningTimeRange] = useState('this_month');
    const { data: earningCount, refetch: refetchEarningCount } = useFetch(
        ["earning_count", earningTimeRange],
        `/earning-count`,
        {time_range: earningTimeRange}
    );
    const [submissionTimeRange, setSubmissionTimeRange] = useState('this_month');
    const { data: submissionCount, refetch: refetchSubmissionCount } = useFetch(
        ["video_count", submissionTimeRange],
        `/video-count`,
        {time_range: submissionTimeRange}
    );
    const earningRanges = ["This Month", "This Year"];
    const submissionRanges = [
        "This Month",
        "This Week",
        "Last Month",
        "This Year",
    ];
    const [earningRange, setEarningRange] = useState(earningRanges[0]);
    const [submissionRange, setSubmissionRange] = useState(submissionRanges[0]);
    const [dropdownsOpen, setDropDownsOpen] = useState({
        earningDrop: false,
        submissionDrop: false,
    });
    const handleDropdown = (dropIndex = 0) => {
        setDropDownsOpen((curr) => {
            if (dropIndex === 0) {
                return { ...curr, earningDrop: !curr.earningDrop };
            }
            return { ...curr, submissionDrop: !curr.submissionDrop };
        });
    };
    useEffect(() => {
        setEarningTimeRange(curr => {
            if (earningRange === 'This Month') return 'this_month';
            return 'this_year';
        })
    }, [earningRange]);
    useEffect(() => {
        setSubmissionTimeRange(curr => {
            if (submissionRange === 'This Month') return 'this_month';
            else if (submissionRange === 'This Week') return 'this_week';
            else if (submissionRange === 'Last Month') return 'last_month';
            return 'this_year';
        })
    }, [submissionRange]);
    return (
        <div className="dashboard_content">
            <div className="dashboard_content_inner">
                <div className="box_model">
                    <div className="dsh_row row">
                        <div className="left_chart">
                            <div className="dash_head">
                                <h4>My Earnings</h4>
                                <div>
                                    <label>
                                        <i></i>Revenue
                                    </label>
                                    <div className="show_md">
                                        <div className="select_wrapper dsh_op">
                                            <div
                                                className={`nice-select selectize ${
                                                    dropdownsOpen?.earningDrop
                                                        ? "open"
                                                        : ""
                                                }`}
                                                tabIndex={0}
                                            >
                                                <span
                                                    className="current"
                                                    onClick={() =>
                                                        handleDropdown()
                                                    }
                                                >
                                                    {earningRange}
                                                </span>
                                                <div className="nice-select-dropdown">
                                                    <ul className="list">
                                                        {earningRanges.map(
                                                            (item, index) => {
                                                                return item !==
                                                                    earningRange ? (
                                                                    <li
                                                                        data-value="This month"
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="option selected null focus"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            setEarningRange(
                                                                                item
                                                                            );
                                                                            handleDropdown();
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ) : (
                                                                    ""
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dash_body">
                                <div
                                    id="chart0"
                                    className="chart chart0"
                                    style={{ minHeight: "240px" }}
                                >
                                    <EarningChart
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rt_box">
                            <div className="hide_md">
                                <div className="dash_head">
                                    <div className="select_wrapper dsh_op">
                                        <div
                                            className={`nice-select selectize ${
                                                dropdownsOpen?.earningDrop
                                                    ? "open"
                                                    : ""
                                            }`}
                                            tabIndex={0}
                                                onClick={() => handleDropdown()}
                                        >
                                            <span
                                                className="current"
                                            >
                                                {earningRange}
                                            </span>
                                            <div className="nice-select-dropdown">
                                                <ul className="list">
                                                    {earningRanges.map(
                                                        (item, index) => {
                                                            return item !==
                                                                earningRange ? (
                                                                <li
                                                                    data-value="This month"
                                                                    key={index}
                                                                    className="option selected null focus"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        setEarningRange(
                                                                            item
                                                                        );
                                                                        handleDropdown();
                                                                    }}
                                                                >
                                                                    {item}
                                                                </li>
                                                            ) : (
                                                                ""
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="vr_grid_box">
                                <div className="vr_item grn">
                                    <i>
                                        <img src="images/wlt.png" alt="" />
                                    </i>
                                    <h3>My Earnings</h3>
                                    <label>
                                        $
                                        {
                                            earningCount?.earning?
                                                earningCount.earning: '0'
                                        }
                                    </label>
                                </div>
                                <div className="vr_item grn">
  <i>
    <img src="images/chks.png" alt="" />
  </i>
  <h3>Approved Submissions</h3>
  <label>{
    earningCount?.videos?
    earningCount.videos: '0'
  }</label>
</div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="box_model">
                    <div className="dsh_row row">
                        <div className="left_chart">
                            <div className="dash_body">
                                <div className="show_md w-100">
                                    <div className="dash_head">
                                        <div className="calendar_wrapper dsh_cld">
                                            {/* <input type="text" className="dateSelector" value="2022/10/10">  */}
                                        </div>
                                        <div className="select_wrapper dsh_op">
                                            <div
                                                className={`nice-select selectize ${
                                                    dropdownsOpen?.submissionDrop
                                                        ? "open"
                                                        : ""
                                                }`}
                                                tabIndex={0}
                                                    onClick={() =>
                                                        handleDropdown(1)
                                                    }
                                            >
                                                <span
                                                    className="current"
                                                >
                                                    {submissionRange}
                                                </span>
                                                <div className="nice-select-dropdown">
                                                    <ul className="list">
                                                        {submissionRanges.map(
                                                            (item, index) => {
                                                                return item !==
                                                                    submissionRange ? (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="option selected null focus"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            setSubmissionRange(
                                                                                item
                                                                            );
                                                                            handleDropdown(
                                                                                1
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ) : (
                                                                    ""
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="chart-title__heading">
                                    <div className="chart chart1">
                                        <SubmissionChart />
                                        <h3 className="chart-title">
                                            My Submissions
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rt_box">
                            <div className="hide_md">
                                <div className="dash_head">
                                    <div className="calendar_wrapper dsh_cld">
                                        {/* <input type="text" className="dateSelector" value="2022/10/10"> */}
                                    </div>
                                    <div className="select_wrapper dsh_op">
                                        <div className="select_wrapper dsh_op">
                                            <div
                                                className={`nice-select selectize ${
                                                    dropdownsOpen?.submissionDrop
                                                        ? "open"
                                                        : ""
                                                }`}
                                                tabIndex={0}
                                                    onClick={() =>
                                                        handleDropdown(1)
                                                    }
                                            >
                                                <span
                                                    className="current"
                                                >
                                                    {submissionRange}
                                                </span>
                                                <div className="nice-select-dropdown">
                                                    <ul className="list">
                                                        {submissionRanges.map(
                                                            (item, index) => {
                                                                return item !==
                                                                    submissionRange ? (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="option selected null focus"
                                                                        onClick={(
                                                                            e
                                                                        ) => {
                                                                            setSubmissionRange(
                                                                                item
                                                                            );
                                                                            handleDropdown(
                                                                                1
                                                                            );
                                                                        }}
                                                                    >
                                                                        {item}
                                                                    </li>
                                                                ) : (
                                                                    ""
                                                                );
                                                            }
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="vr_grid_box">
                                <div className="vr_item">
                                    <i>
                                        <img src="images/chks.png" alt="" />
                                    </i>
                                    <h3>Approved Submissions</h3>
                                    <label>
                                        {
                                            submissionCount?.accepted?
                                                submissionCount.accepted: '0'
                                        }
                                    </label>
                                </div>
                                <div className="vr_item">
                                    <i>
                                        <img src="images/clos.png" alt="" />
                                    </i>
                                    <h3>Rejected Submissions</h3>
                                    <label>
                                        {
                                            submissionCount?.rejected?
                                                submissionCount.rejected: '0'
                                        }
                                    </label>
                                </div>
                                <div className="vr_item">
                                    <i>
                                        <img src="images/infs.png" alt="" />
                                    </i>
                                    <h3>Pending Submissions</h3>
                                    <label>
                                        {
                                            submissionCount?.pending?
                                                submissionCount.pending: '0'
                                        }
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="dsh_btns_group">
                    <div className="dsh_row row">
                        <div className="col-lg-4 col-md-6">
                            <div className="box_model">
                                <div className="dash_head">
                                    <h4>Manage Account</h4>
                                    {/* <a href="#" className="inline_btn">Edit Now</a> */}
                                    <Link
                                        to={"/setting"}
                                        className="inline_btn"
                                    >
                                        Edit Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box_model">
                                <div className="dash_head">
                                    <h4>View My Videos</h4>
                                    {/* <a href="#" className="inline_btn">View Now</a> */}
                                    <Link
                                        to={"/my-videos"}
                                        className="inline_btn"
                                    >
                                        View Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="box_model">
                                <div className="dash_head">
                                    <h4>Need Help?</h4>
                                    {/* <a href="#" className="inline_btn">Contact Us</a> */}
                                    <Link
                                        className="inline_btn"
                                        to={"/my-messages"}
                                    >
                                        Contact Us
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
