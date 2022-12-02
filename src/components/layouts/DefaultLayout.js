import React from 'react'

function DefaultLayout() {
  return (
<>
<div class="dashboard_header">
    <div class="fluid_container">
        <div class="header_row">
 
            <a href="#" class="logo">
                <img src="images/logo.png" alt="" />
            </a>

            <div class="search_panel">
                <span class="search_btn m_srch_trigger_btn" id="m_srch_trigger"><img src="images/search.svg"
                        alt="" /></span>
                <div class="search_box_inner earch_box_desktop">
                    <input type="text" placeholder="Search Here......" />
                    <span class="search_btn"><img src="images/search.svg" alt="" /></span>
                </div>
            </div>
            <div class="search_box_mobile" id="m_srch_trigger_box">
                <div class="search_box_inner">
                    <input type="text" placeholder="Search Here......" />
                    <span class="search_btn"><img src="images/search.svg" alt="" /></span>
                </div>
            </div>

            <div class="float_header_right">
                <div class="message_panel panel_inline">
                    <a href="#" class="nof_btn">
                        <img src="images/msg.svg" alt="" />
                        <span class="bdg">2</span>
                    </a>
                </div>

                <div class="notification_panel panel_inline">
                    <a href="#" class="nof_btn" id="nof_btn">
                        <img src="images/notification.svg" alt="" />
                        <span class="bdg">2</span>
                    </a>
                    <div class="notification_box">
                        <div class="notification_box_inner">
                            <ul class="notify_list">
                                <li>
                                    <i class="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>Your video submission (<a href="#">VSID</a> 1523) has been approved.....</p>
                                    <span class="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i class="nof_ico"><img src="images/work.svg" alt="" /></i>
                                    <p>Your video submission (<a href="#">VSID</a> 356) has been rejected...</p>
                                    <span class="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i class="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>A bonus of $35 has been applied to your account......</p>
                                    <span class="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i class="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>You have received a new note from (<a href="#">VSID</a> 750) for your
                                        video.....
                                    </p>
                                    <a href="#" class="nof_inline_btn">Reply Now</a>
                                    <span class="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i class="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>You have received a new note from (<a href="#">VSID</a> 3241) for your
                                        ........
                                    </p>
                                    <a href="#" class="nof_inline_btn">Reply Now</a>
                                    <span class="nof_time">9.38 pm</span>
                                </li>
                            </ul>
                        </div>
                        <a href="#" class="nof_all">See All Notification</a>
                    </div>
                </div>

                <div class="admin_panel panel_inline">
                    <span>jhon morrison</span>
                    <span class="nav_avatar">
                        <a href="#">
                            <img src="images/avatar.png" alt=""/>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="dashboard_body">
        <div class="fluid_container">
            <div class="dashboard_body_inner">
                <div class="navigation" id="navigation">
                    <div class="nav_inner">
                        <ul class="nav_list">
                            <li class="current-menu-item">
                                <a href="dashboard.html">
                                    <i>
                                        <img src="images/nav1.png" alt="" />
                                        <img src="images/nav1_hov.png" alt="" />
                                    </i>
                                    <span>Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a href="my_video.html">
                                    <i>
                                        <img src="images/nav2.png" alt="" />
                                        <img src="images/nav2_hov.png" alt="" />
                                    </i>
                                    <span>My Videos</span>
                                </a>
                            </li>
                            <li>
                                <a href="earnings.html">
                                    <i>
                                        <img src="images/nav3.png" alt="" />
                                        <img src="images/nav3_hov.png" alt="" />
                                    </i>
                                    <span>My Earnings</span>
                                </a>
                            </li>
                            <li>
                                <a href="messages.html">
                                    <i>
                                        <img src="images/nav4.png" alt="" />
                                        <img src="images/nav4_hov.png" alt="" />
                                    </i>
                                    <span>My Messages</span>
                                </a>
                            </li>
                            <li>
                                <a href="notification.html">
                                    <i>
                                        <img src="images/nav5.png" alt="" />
                                        <img src="images/nav5_hov.png" alt="" />
                                    </i>
                                    <span>Notifications</span>
                                </a>
                            </li>
                            <li>
                                <a href="setting.html">
                                    <i>
                                        <img src="images/nav6.png" alt="" />
                                        <img src="images/nav6_hov.png" alt="" />
                                    </i>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i>
                                        <img src="images/nav7.png" alt="" />
                                        <img src="images/nav7_hov.png" alt="" />
                                    </i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

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
                                        <div class="chart-title__heading">
                                            <div id="chart1" class="chart chart1">
                                            </div>
                                            <h3 class="chart-title">My Submissions</h3>
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
            </div>
        </div>
    </div>
</>
  )
}

export default DefaultLayout
