import React, { useState } from "react";
import EarningChart from "../components/EarningChart";
import SubmissionChart from "../components/SubmissionChart";
import useFetch from "../hooks/useFetch";
import "../App.css";
import { Link } from "react-router-dom";

function Home() {
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
    const { data: earningCount, refetch: refetchEarningCount } = useFetch(
        ["earning_counts"],
        `/earning-count`
    );
    //const { data: graphData,refetch: refetchGraphData } = useFetch(['graph'], `/graph/${currYear}/${currMonth}`);
    const { data: graphData, refetch: refetchGraphData } = useFetch(
        ["graph"],
        `/graph/${currYear}/2`
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
                                            <select
                                                className="selectize"
                                                onChange={(e) => {
                                                    setEarningRange(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {earningRanges.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item}
                                                                hidden={
                                                                    item ===
                                                                    earningRange
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                {item}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
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
                                    <EarningChart byYear={!(earningRange === earningRanges[0])} />
                                </div>
                            </div>
                        </div>
                        <div className="rt_box">
                            <div className="hide_md">
                                <div className="dash_head">
                                    <div className="select_wrapper dsh_op">
                                        <select
                                            className="selectize"
                                            onChange={(e) => {
                                                setEarningRange(e.target.value);
                                            }}
                                        >
                                            {earningRanges.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item}
                                                            hidden={
                                                                item ===
                                                                earningRange
                                                                    ? true
                                                                    : false
                                                            }
                                                        >
                                                            {item}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
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
                                        {earningCount?.total_earning
                                            ? earningCount.total_earning
                                            : "0"}
                                    </label>
                                </div>
                                <div className="vr_item grn">
                                    <i>
                                        <img src="images/chks.png" alt="" />
                                    </i>
                                    <h3>Approved Submissions</h3>
                                    <label>
                                        {graphData
                                            ? graphData[0]?.accepted
                                                ? graphData[0]?.accepted
                                                : "0"
                                            : "0"}
                                    </label>
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
                                            <select
                                                className="selectize"
                                                onChange={(e) => {
                                                    setSubmissionRange(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {submissionRanges.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item}
                                                                hidden={
                                                                    item ===
                                                                    submissionRange
                                                                }
                                                            >
                                                                {item}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select>
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
                                        <select
                                            className="selectize"
                                            onChange={(e) => {
                                                setSubmissionRange(
                                                    e.target.value
                                                );
                                            }}
                                        >
                                            {submissionRanges.map(
                                                (item, index) => {
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={item}
                                                            hidden={
                                                                item ===
                                                                submissionRange
                                                            }
                                                        >
                                                            {item}
                                                        </option>
                                                    );
                                                }
                                            )}
                                        </select>
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
                                        {graphData
                                            ? graphData[0]?.accepted
                                                ? graphData[0].accepted
                                                : "0"
                                            : "0"}
                                    </label>
                                </div>
                                <div className="vr_item">
                                    <i>
                                        <img src="images/clos.png" alt="" />
                                    </i>
                                    <h3>Rejected Submissions</h3>
                                    <label>
                                        {graphData
                                            ? graphData[0]?.rejected
                                                ? graphData[0].rejected
                                                : "0"
                                            : "0"}
                                    </label>
                                </div>
                                <div className="vr_item">
                                    <i>
                                        <img src="images/infs.png" alt="" />
                                    </i>
                                    <h3>Pending Submissions</h3>
                                    <label>
                                        {graphData
                                            ? graphData[0]?.pending
                                                ? graphData[0].pending
                                                : "0"
                                            : "0"}
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
