import React, { useEffect, useState } from "react";
import EarningChart from "../components/EarningChart";
import useBroadcast from "../hooks/useBroadcast";
import useFetch from "../hooks/useFetch";
import {
    formatMonth,
    getEarningSummary,
    getEarningSummaryMonth,
    getEarningSummaryYear,
    getEarningYearRanges,
} from "../lib/queryClient";

function MyEearning() {
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
    const currDay = new Date().getDay();

    const [queryYear, setQueryYear] = useState(currYear);

    const {
        data: earningCount,
        refetch: refetchEarningCount,
        isLoading: earningCountIsLoading,
    } = useFetch(["earning_count", queryYear], `/total-earning-count/${queryYear}/${currMonth}`);
    const {
        data: earningCountCurrent,
        refetch: refetchEarningCountCurrent,
        isLoading: earningCountCurrentIsLoading,
    } = useFetch(["earning_count_current"], `/total-earning-count/${currYear}/${currMonth}`);
    const {
        data: submissionCount,
        refetch: refetchSubmissionCount,
        isLoading: submissionCountIsLoading,
    } = useFetch(["video_count"], `/video-count/${currYear}/${currMonth}/${currDay}`);

    const {
        data: earningSummary,
        refetch: refetchEarningSummary,
        isLoading: earningSummaryIsLoading,
    } = useFetch(
        ["earning-summary", queryYear],
        `/earning-summary-by-month/${queryYear}`
    );

    const graphRanges = ["This Month", "This Year"];
    const earningRanges = getEarningYearRanges(currYear);
    const [graphRange, setGraphRange] = useState(graphRanges[0]);
    const [earningRange, setEarningRange] = useState(earningRanges[0]);

    const [earningSummaryData, setEarningSummaryData] = useState(
        getEarningSummary()
    );
    const [dropdownsOpen, setDropDownsOpen] = useState({
        earningDrop: false,
        graphDrop: false,
    });
    const handleDropdown = (dropIndex = 0) => {
        setDropDownsOpen((curr) => {
            if (dropIndex === 0) {
                return { ...curr, earningDrop: !curr.earningDrop };
            }
            return { ...curr, graphDrop: !curr.graphDrop };
        });
    };
    useEffect(() => {
        refetchEarningCount();
        refetchSubmissionCount();
        setEarningSummaryData(
            getEarningSummary(earningSummary)
        );
        /* setEarningSummaryYearData(getEarningSummaryYear(earningSummaryByYear)); */
    }, [
        earningCountIsLoading,
        submissionCountIsLoading,
        earningSummaryIsLoading
    ]);

    return (
        <>
            <div className="dashboard_content dashboard_content_earning">
                <div className="dashboard_content_inner">
                    <div className="box_model">
                        <div className="dsh_row row">
                            <div className="left_chart w-100">
                                <div className="dash_head">
                                    <h4>My Earnings</h4>
                                    <div>
                                        <label>
                                            <i></i>Revenue
                                        </label>
                                        <div className="select_wrapper dsh_op">
                                            {/* <select
                                                className="selectize"
                                                onChange={(e) => {
                                                    setGraphRange(
                                                        e.target.value
                                                    );
                                                }}
                                            >
                                                {graphRanges.map(
                                                    (item, index) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item}
                                                                hidden={
                                                                    item ===
                                                                    graphRange
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                {item}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                            </select> */}
                                        <div
                                            className={`nice-select selectize ${
                                                dropdownsOpen?.graphDrop
                                                    ? "open"
                                                    : ""
                                            }`}
                                            tabIndex={0}
                                                onClick={() => handleDropdown(1)}
                                        >
                                            <span
                                                className="current"
                                            >
                                                {graphRange}
                                            </span>
                                            <div className="nice-select-dropdown">
                                                <ul className="list">
                                                    {graphRanges.map(
                                                        (item, index) => {
                                                            return item !==
                                                                graphRange ? (
                                                                <li
                                                                    data-value="This month"
                                                                    key={index}
                                                                    className="option selected null focus"
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        setGraphRange(
                                                                            item
                                                                        );
                                                                        handleDropdown(1);
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
                                <div className="dash_body p-0 mb-0">
                                    <div id="chart0" className="chart chart0">
                                        <EarningChart
                                        />
                                    </div>
                                    <div className="column_earning">
                                        <div className="vr_grid_box">
                                            <div className="vr_item grn">
                                                <i>
                                                    <img
                                                        src="images/wlt.png"
                                                        alt=""
                                                    />
                                                </i>
                                                <h3>My Earnings</h3>
                                                <label>
                                                    $
                                                    {graphRange ===
                                                    graphRanges[0]
                                                        ? earningCountCurrent?.month_total
                                                            ? earningCountCurrent.month_total
                                                            : "0"
                                                        : earningCountCurrent?.year_total
                                                        ? earningCountCurrent.year_total
                                                        : "0"}
                                                </label>
                                            </div>
                                            <div className="vr_item grn">
                                                <i>
                                                    <img
                                                        src="images/chks.png"
                                                        alt=""
                                                    />
                                                </i>
                                                <h3>Approved Submissions</h3>
                                                <label>
                                                    {graphRange ===
                                                    graphRanges[0]
                                                        ? submissionCount
                                                              ?.month_total
                                                              ?.accepted
                                                            ? submissionCount
                                                                  .month_total
                                                                  .accepted
                                                            : "0"
                                                        : submissionCount
                                                              ?.year_total
                                                              ?.accepted
                                                        ? submissionCount
                                                              .year_total
                                                              .accepted
                                                        : "0"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="box_model box_model_reciept_download">
                        <div className="line-header">
                            <h5>
                                <span>Earning Summary</span>
                            </h5>
                        </div>
                        <div className="select_wrapper dsh_op">
                            {/* <select
                                className="selectize"
                                onChange={(e) => {
                                    setEarningRange(e.target.value);
                                }}
                            >
                                {earningRanges.map((item, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={item}
                                            hidden={
                                                item === earningRange
                                                    ? true
                                                    : false
                                            }
                                        >
                                            {item}
                                        </option>
                                    );
                                })}
                            </select> */}
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
                                                                        setQueryYear(
                                                                            item
                                                                        )
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
                        <div className="earning_download_lists">
                            {earningSummaryData
                                ? earningSummaryData.map((data, index) => {
                                      return (
                                          <div
                                              key={index}
                                              className="earning_download_lists_col"
                                          >
                                              <div
                                                  className="earning_download_lists_col_box"
                                                  style={{
                                                      backgroundColor:
                                                          data.available
                                                              ? "#FBFBFB"
                                                              : "#D9D9D9",
                                                  }}
                                              >
                                                  <div className="earning_download_month">
                                                      <p
                                                          style={{
                                                              color: data.available
                                                                  ? "#525050"
                                                                  : "#595959",
                                                          }}
                                                      >
                                                          {data.date}
                                                      </p>
                                                  </div>
                                                  <div className="earning_download_controller">
                                                      <p
                                                          className="earning_download_price"
                                                          style={{
                                                              color: data.available
                                                                  ? "#000"
                                                                  : "#595959",
                                                          }}
                                                      >
                                                          ${data.total}
                                                      </p>
                                                      <button
                                                          type="button"
                                                          className="earning_download_btn"
                                                      >
                                                          <img
                                                              src="images/earning-download-icon.svg"
                                                              alt=""
                                                          />
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>
                        <div className="earning_download_lists_account">
                            <div className="earning_download_lists_account_line">
                                <p>
                                    Total<span>${earningCount?.year_total? earningCount.year_total: '0'}</span>
                                </p>
                                <a
                                    href="#"
                                    className="btn-outline btn-outline-blue"
                                >
                                    Download Reciept
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyEearning;
