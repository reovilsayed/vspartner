import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <>
       <div className="navigation" id="navigation">
                    <div className="nav_inner">
                        <ul className="nav_list">
                            <li className="current-menu-item">
                                <Link to={'/'}>
                                    <i>
                                        <img src="images/nav1.png" alt="" />
                                        <img src="images/nav1_hov.png" alt="" />
                                    </i>
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/my-videos'}>
                                    <i>
                                        <img src="images/nav2.png" alt="" />
                                        <img src="images/nav2_hov.png" alt="" />
                                    </i>
                                    <span>My Videos</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/my-earnings'}>
                                    <i>
                                        <img src="images/nav3.png" alt="" />
                                        <img src="images/nav3_hov.png" alt="" />
                                    </i>
                                    <span>My Earnings</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/my-messages'}>
                                    <i>
                                        <img src="images/nav4.png" alt="" />
                                        <img src="images/nav4_hov.png" alt="" />
                                    </i>
                                    <span>My Messages</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/notification'}>
                                    <i>
                                        <img src="images/nav5.png" alt="" />
                                        <img src="images/nav5_hov.png" alt="" />
                                    </i>
                                    <span>Notifications</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/setting'}>
                                    <i>
                                        <img src="images/nav6.png" alt="" />
                                        <img src="images/nav6_hov.png" alt="" />
                                    </i>
                                    <span>Settings</span>
                                </Link>
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
    </>
  )
}

export default Sidebar
