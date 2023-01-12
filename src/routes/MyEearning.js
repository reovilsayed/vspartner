import React, { useEffect, useState } from "react";
import EarningChart from "../components/EarningChart";
import useBroadcast from "../hooks/useBroadcast";
import useFetch from "../hooks/useFetch";
import {
    formatMonth,
    getEarningSummary,
    getEarningSummaryMonth,
    getEarningSummaryYear,
} from "../lib/queryClient";

function MyEearning() {
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
    const {
        data: earningCount,
        refetch: refetchEarningCount,
        isLoading: earningCountIsLoading,
        isSuccess,
    } = useFetch(["earning_counts"], `/earning-count`);
    const {
        data: graphData,
        refetch: refetchGraphData,
        isLoading: graphDataIsLoading,
    } = useFetch(["graph"], `/graph/2021/7`);

    const {
        data: earningSummaryByMonth,
        refetch: refetchEarningSummaryByMonth,
        isLoading: earningSummaryByMonthIsLoading,
    } = useFetch(
        ["earning-summary-by-month"],
        `/earning-summary-by-month/2022`
    );

    const {
        data: earningSummaryByYear,
        refetch: refetchEarningSummaryByYear,
        isLoading: earningSummaryByYearIsLoading,
    } = useFetch(["earning-summary-by-year"], `/earning-summary-by-year`);

    const graphRanges = ["This Month", "This Year"];
    const earningRanges = ["This Month", "This Year"];
    const [graphRange, setGraphRange] = useState(graphRanges[0]);
    const [earningRange, setEarningRange] = useState(earningRanges[0]);

    const [earningSummaryMonthData, setEarningSummaryMonthData] = useState(
        getEarningSummaryMonth()
    );
    const [earningSummaryYearData, setEarningSummaryYearData] = useState(
        getEarningSummaryYear()
    );
    useEffect(() => {
        refetchEarningCount();
        refetchGraphData();
        setEarningSummaryMonthData(
            getEarningSummaryMonth(earningSummaryByMonth)
        );
        setEarningSummaryYearData(getEarningSummaryYear(earningSummaryByYear));
    }, [
        earningCountIsLoading,
        graphDataIsLoading,
        earningSummaryByMonthIsLoading,
        earningSummaryByYearIsLoading,
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
                                            <select
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
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="dash_body p-0 mb-0">
                                    <div id="chart0" className="chart chart0">
                                        <EarningChart
                                            byYear={
                                                !(graphRange === graphRanges[0])
                                            }
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
                                                    {earningCount?.total_earning
                                                        ? earningCount.total_earning
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
                                                    {graphData
                                                        ? graphData[0]?.accepted
                                                            ? graphData[0]
                                                                  .accepted
                                                            : "0"
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
                            <select
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
                            </select>
                        </div>
                        <div className="earning_download_lists">
                            {earningRange === earningRanges[1]
                                ? earningSummaryYearData
                                    ? earningSummaryYearData.map(
                                          (data, index) => {
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
                                          }
                                      )
                                    : ""
                                : earningSummaryMonthData
                                ? earningSummaryMonthData.map((data, index) => {
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
                                    Total<span>$75841</span>
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
