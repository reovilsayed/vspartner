import React from 'react'
import EarningChart from '../components/EarningChart'
import useBroadcast from '../hooks/useBroadcast';
import useFetch from '../hooks/useFetch';

function MyEearning() {
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth();
	const { data: earningCount,refetch: refetchEarningCount } = useFetch(['earning_counts'], `/earning-count`);
	//const { data: graphData,refetch: refetchGraphData } = useFetch(['graph'], `/graph/${currYear}/${currMonth}`);
    const { data: graphData,refetch: refetchGraphData } = useFetch(['graph'], `/graph/${currYear}/2`);

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
                                            <label><i></i>Revenue</label>
                                            <div className="select_wrapper dsh_op">
                                                <select className="selectize">
                                                    <option value="This month" >This month</option>
                                                    <option value="This Year">This Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dash_body p-0 mb-0">
                                        <div id="chart0" className="chart chart0">
                                        <EarningChart/>
                                        </div>
                                        <div className="column_earning">
                                            <div className="vr_grid_box">
                                                <div className="vr_item grn">
                                                    <i><img src="images/wlt.png" alt="" /></i>
                                                    <h3>My Earnings</h3>
                                                    <label>${earningCount?.total_earning || 0}</label>
                                                </div>
                                                <div className="vr_item grn">
                                                    <i><img src="images/chks.png" alt="" /></i>
                                                    <h3>Approved Submissions</h3>
                                                    {/* <label>{graphData[0].accepted}</label> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="box_model box_model_reciept_download">
                            <div className="line-header">
                                <h5><span>Earning Summary</span></h5>
                            </div>
                            <div className="select_wrapper dsh_op">
                                <select className="selectize">
                                    <option value="This month" >This month</option>
                                    <option value="This Year">This Year</option>
                                </select>
                            </div>
                            <div className="earning_download_lists">
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>January</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$214</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>February</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$252</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>March</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$452</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>April</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$985</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>May</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$742</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>June</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$125</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>July</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$652</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>August</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$325</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>September</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$758</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>October</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$852</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>November</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$125</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="earning_download_lists_col">
                                    <div className="earning_download_lists_col_box">
                                        <div className="earning_download_month">
                                            <p>December</p>
                                        </div>
                                        <div className="earning_download_controller">
                                            <p className="earning_download_price">$952</p>
                                            <button type="button" className="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="earning_download_lists_account">
                                <div className="earning_download_lists_account_line">
                                    <p>Total<span>$75841</span></p>
                                    <a href="#" className="btn-outline btn-outline-blue">Download Reciept</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
    </>
  )
}

export default MyEearning
