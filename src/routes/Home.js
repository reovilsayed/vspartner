import React from 'react'
import EarningChart from '../components/EarningChart'
import SubmissionChart from '../components/SubmissionChart'

function Home() {
  return (
        <div class="dashboard_content">
                    <div class="dashboard_content_inner">
                        <div class="box_model">
                            <div class="dsh_row row">
                                <div class="left_chart">
                                    <div class="dash_head">
                                        <h4>My Earnings</h4>
                                        <div>
                                            <label><i></i>Revenue</label>
                                            <div class="show_md">
                                                <div class="select_wrapper dsh_op">
                                                    <select class="selectize">
                                                        <option value="This month" selected>This month</option>
                                                        <option value="This Year">This Year</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="dash_body">
                                        <div id="chart0" class="chart chart0">
                                        <EarningChart/>
                                        </div>
                                    </div>
                      
                                </div>
                                <div class="rt_box">
                                    <div class="hide_md">
                                        <div class="dash_head">
                                            <div class="select_wrapper dsh_op">
                                                <select class="selectize">
                                                    <option value="This month" selected>This month</option>
                                                    <option value="This Year">This Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
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

                        <div class="box_model">
                            <div class="dsh_row row">
                                <div class="left_chart">
                                    <div class="dash_body">
                                        <div class="show_md w-100">
                                            <div class="dash_head">
                                                <div class="calendar_wrapper dsh_cld">
                                                {/* <input type="text" class="dateSelector" value="2022/10/10">  */}
                                                </div>
                                                <div class="select_wrapper dsh_op">
                                                    <select class="selectize">
                                                        <option value="This month" selected>This month</option>
                                                        <option value="This week">This week</option>
                                                        <option value="Last Month">Last Month</option>
                                                        <option value="This Year">This Year</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="chart-title__heading" >
                                        <div class="chart chart1">
                                        <SubmissionChart/>
                                        <h3 class="chart-title" >My Submissions</h3>
                                            </div>
                                        
              
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="rt_box">
                                    <div class="hide_md">
                                        <div class="dash_head">
                                            <div class="calendar_wrapper dsh_cld">
                                                 {/* <input type="text" class="dateSelector" value="2022/10/10"> */}
                                            </div>
                                            <div class="select_wrapper dsh_op">
                                                <select class="selectize">
                                                   {/* <option value="" selected disabled>This month</option>  */}
                                                        <option value="This month" selected>This month</option>
                                                        <option value="This week">This week</option>
                                                        <option value="Last Month">Last Month</option>
                                                        <option value="This Year">This Year</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="vr_grid_box">
                                        <div class="vr_item">
                                            <i><img src="images/chks.png" alt="" /></i>
                                            <h3>Approved Submissions</h3>
                                            <label>130</label>
                                        </div>
                                        <div class="vr_item">
                                            <i><img src="images/clos.png" alt="" /></i>
                                            <h3>Rejected Submissions</h3>
                                            <label>150</label>
                                        </div>
                                        <div class="vr_item">
                                            <i><img src="images/infs.png" alt="" /></i>
                                            <h3>Pending Submissions</h3>
                                            <label>150</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dsh_btns_group">
                            <div class="dsh_row row">
                                <div class="col-lg-4 col-md-6">
                                    <div class="box_model">
                                        <div class="dash_head">
                                            <h4>Manage Account</h4>
                                            <a href="#" class="inline_btn">Edit Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="box_model">
                                        <div class="dash_head">
                                            <h4>View My Videos</h4>
                                            <a href="#" class="inline_btn">View Now</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="box_model">
                                        <div class="dash_head">
                                            <h4>Need Help?</h4>
                                            <a href="#" class="inline_btn">Contact Us</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default Home
