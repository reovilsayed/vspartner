import React from 'react'
import EarningChart from '../components/EarningChart'

function MyEearning() {
  return (
    <>
    <div class="dashboard_content dashboard_content_earning">
                    <div class="dashboard_content_inner">
                        <div class="box_model">
                            <div class="dsh_row row">
                                <div class="left_chart w-100">
                                    <div class="dash_head">
                                        <h4>My Earnings</h4>
                                        <div>
                                            <label><i></i>Revenue</label>
                                            <div class="select_wrapper dsh_op">
                                                <select class="selectize">
                                                    <option value="This month" selected>This month</option>
                                                    <option value="This Year">This Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash_body p-0 mb-0">
                                        <div id="chart0" class="chart chart0">
                                        <EarningChart/>
                                        </div>
                                        <div class="column_earning">
                                            <div class="vr_grid_box">
                                                <div class="vr_item grn">
                                                    <i><img src="images/wlt.png" alt="" /></i>
                                                    <h3>My Earnings</h3>
                                                    <label>$3250</label>
                                                </div>
                                                <div class="vr_item grn">
                                                    <i><img src="images/chks.png" alt="" /></i>
                                                    <h3>Approved Submissions</h3>
                                                    <label>150</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="box_model box_model_reciept_download">
                            <div class="line-header">
                                <h5><span>Earning Summary</span></h5>
                            </div>
                            <div class="select_wrapper dsh_op">
                                <select class="selectize">
                                    <option value="This month" selected>This month</option>
                                    <option value="This Year">This Year</option>
                                </select>
                            </div>
                            <div class="earning_download_lists">
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>January</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$214</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>February</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$252</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>March</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$452</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>April</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$985</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>May</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$742</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>June</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$125</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>July</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$652</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>August</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$325</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>September</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$758</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>October</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$852</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>November</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$125</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="earning_download_lists_col">
                                    <div class="earning_download_lists_col_box">
                                        <div class="earning_download_month">
                                            <p>December</p>
                                        </div>
                                        <div class="earning_download_controller">
                                            <p class="earning_download_price">$952</p>
                                            <button type="button" class="earning_download_btn"><img
                                                    src="images/earning-download-icon.svg" alt=""/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="earning_download_lists_account">
                                <div class="earning_download_lists_account_line">
                                    <p>Total<span>$75841</span></p>
                                    <a href="#" class="btn-outline btn-outline-blue">Download Reciept</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
    </>
  )
}

export default MyEearning
