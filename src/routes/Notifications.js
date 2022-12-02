import React from 'react'

function Notifications() {
  return (
    <>
        <div class="dashboard_content dashboard_content_notification">
                    <div class="dashboard_content_inner">
                        <div class="notify_row">
                            <div class="lft_notification_all">
                                <div class="dash_head sec_title">
                                    <h4>Notifications</h4>
                                </div>

                                <div class="box_model box_model_notification">
                                    <div class="per_day_notif">
                                        <div class="skeleton line-header">
                                            <h5><span>Today</span></h5>
                                        </div>
                                        <ul class="notify_list">
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 1523) has been approved.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/work.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 356) has been rejected.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/bonus.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">A bonus of $35 has been applied to your account.</p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/token.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton"><strong>Congratulations!</strong> A payment of $792 is set to be
                                                    processed
                                                    shortly. Please visit your Tipalti's Payments History page to
                                                    check its status.</p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">You have received a new note from Jhon Morrison for your video
                                                    submission
                                                    (<a href="#">VSID</a> 750).
                                                </p>
                                                <a href="#" class="skeleton nof_inline_btn">Reply Now</a>
                                                <span class="nof_time skeleton">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">You have received a new note from Jhon Morrison for your video
                                                    submission
                                                    (<a href="#">VSID</a> 3241).
                                                </p>
                                                <a href="#" class="skeleton nof_inline_btn">Reply Now</a>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">You have received a new note from Jhon Morrison for your video
                                                    submission
                                                    (<a href="#">VSID</a> 32).
                                                </p>
                                                <a href="#" class="skeleton nof_inline_btn">Reply Now</a>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 1523) has been approved.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/work.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 356) has been rejected.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="per_day_notif">
                                        <div class="skeleton line-header">
                                            <h5><span>Yesterday</span></h5>
                                        </div>
                                        <ul class="notify_list">
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 1523) has been approved.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/work.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 356) has been rejected.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/bonus.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">A bonus of $35 has been applied to your account.</p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="per_day_notif">
                                        <div class="skeleton line-header">
                                            <h5><span>21.08.2022</span></h5>
                                        </div>
                                        <ul class="notify_list">
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/rocket.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 1523) has been approved.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/work.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">Your video submission (<a href="#">VSID</a> 356) has been rejected.
                                                </p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/bonus.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">A bonus of $35 has been applied to your account.</p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                            <li>
                                                <div class="nof_ico">
                                                    <i class="skeleton"><img src="images/bonus.svg" alt=""/></i>
                                                </div>
                                                <p class="skeleton">A bonus of $35 has been applied to your account.</p>
                                                <span class="skeleton nof_time">9.38 pm</span>
                                                <span class="nt_close" data-notify-close>
                                                    <div class="skeleton">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                                                fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="notification_filter_sec">
                                <div class="notification_filter_inner">
                                    <div class="nt_scroller">
                                        <div class="nt_sticky_top">
                                            <div class="fltr_title">
                                                <h4>Filter</h4>
                                            </div>
                                            <div class="search_box_inner notify_srch_box">
                                                <input type="text" placeholder="Search Here......"/>
                                                <span class="search_btn"><img src="images/search.svg" alt=""/></span>
                                            </div>
                                        </div>
                                        <div class="filter_noti_list">
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Approved Video</span>
                                                </label>
                                            </div>
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Rejected Video</span>
                                                </label>
                                            </div>
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Bonus Applied</span>
                                                </label>
                                            </div>
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Completed Payment</span>
                                                </label>
                                            </div>
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Note From Admin</span>
                                                </label>
                                            </div>
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Note From Manager</span>
                                                </label>
                                            </div>
                                            <div class="form_input_check">
                                                <label>
                                                    <input type="checkbox" vlaue="" />
                                                    <span>Note From Quality Agent</span>
                                                </label>
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

export default Notifications
