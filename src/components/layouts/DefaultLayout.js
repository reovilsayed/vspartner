import React from 'react'
import Sidebar from './Sidebar'

function DefaultLayout({children}) {
  return (
<>
<div className="dashboard_header">
    <div className="fluid_container">
        <div className="header_row">
 
            <a href="#" className="logo">
                <img src="images/logo.png" alt="" />
            </a>

            <div className="search_panel">
                <span className="search_btn m_srch_trigger_btn" id="m_srch_trigger"><img src="images/search.svg"
                        alt="" /></span>
                <div className="search_box_inner earch_box_desktop">
                    <input type="text" placeholder="Search Here......" />
                    <span className="search_btn"><img src="images/search.svg" alt="" /></span>
                </div>
            </div>
            <div className="search_box_mobile" id="m_srch_trigger_box">
                <div className="search_box_inner">
                    <input type="text" placeholder="Search Here......" />
                    <span className="search_btn"><img src="images/search.svg" alt="" /></span>
                </div>
            </div>

            <div className="float_header_right">
                <div className="message_panel panel_inline">
                    <a href="#" className="nof_btn">
                        <img src="images/msg.svg" alt="" />
                        <span className="bdg">2</span>
                    </a>
                </div>

                <div className="notification_panel panel_inline">
                    <a href="#" className="nof_btn" id="nof_btn">
                        <img src="images/notification.svg" alt="" />
                        <span className="bdg">2</span>
                    </a>
                    <div className="notification_box">
                        <div className="notification_box_inner">
                            <ul className="notify_list">
                                <li>
                                    <i className="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>Your video submission (<a href="#">VSID</a> 1523) has been approved.....</p>
                                    <span className="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i className="nof_ico"><img src="images/work.svg" alt="" /></i>
                                    <p>Your video submission (<a href="#">VSID</a> 356) has been rejected...</p>
                                    <span className="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i className="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>A bonus of $35 has been applied to your account......</p>
                                    <span className="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i className="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>You have received a new note from (<a href="#">VSID</a> 750) for your
                                        video.....
                                    </p>
                                    <a href="#" className="nof_inline_btn">Reply Now</a>
                                    <span className="nof_time">9.38 pm</span>
                                </li>
                                <li>
                                    <i className="nof_ico"><img src="images/rocket.svg" alt="" /></i>
                                    <p>You have received a new note from (<a href="#">VSID</a> 3241) for your
                                        ........
                                    </p>
                                    <a href="#" className="nof_inline_btn">Reply Now</a>
                                    <span className="nof_time">9.38 pm</span>
                                </li>
                            </ul>
                        </div>
                        <a href="#" className="nof_all">See All Notification</a>
                    </div>
                </div>

                <div className="admin_panel panel_inline">
                    <span>jhon morrison</span>
                    <span className="nav_avatar">
                        <a href="#">
                            <img src="images/avatar.png" alt=""/>
                        </a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</div>
<div className="dashboard_body">
        <div className="fluid_container">
            <div className="dashboard_body_inner">
              <Sidebar/>

                {children}
            </div>
        </div>
    </div>
</>
  )
}

export default DefaultLayout
