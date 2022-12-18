import React, { useState } from 'react';
import { useAuthUser } from "react-auth-kit";
import { useAuthHeader } from "react-auth-kit";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import requests from "../services/httpService";

function Chat() {
    const auth = useAuthUser();
    const authHeader = useAuthHeader();
    const { id } = useParams();
    const { data, refetch } = useFetch(["messages"], `/messages`, {
      inquery_id: id,
    });
    const [messageData, setMessageData] = useState({
        inquery_id: id,
        message: "",
      });
      const sendMessage = e => {
        e.preventDefault();
        if (!messageData.message) {
          alert("Please write something to send");
        }
        setMessageData({ message: "", inquery_id: id });
        requests
          .post("/create-message", messageData, { token: authHeader() })
          .then(response => {});
        refetch();
      };
      const [active,setActive] =useState('about-video');
      const handleActive = (data) =>{

        setActive(data);

      };
      console.log(active);
    return (
        <>
    
            <div class="dashboard_body dashboard_body_chat_detail">
                <div class="fluid_container">
                    <div class="dashboard_body_inner">
                        <div class="body_scroller">
                            <div class="panel_flex">
                                <div class="left-panel">
                                    <div class="panel-box">
                                        <div class="single-video-box mb-0">
                                            <video class="video" loop="1" preload="auto" controls=""
                                                poster="images/video-poster.jpg">
                                                <source src="images/video.mp4" type="video/mp4" />
                                            </video>
                                        </div>
                                    </div>
                                    <div class="panel-box-info">
                                        <ul class="nav_list_tab" data-tab-target="tabgroup3">
                                            <li><a href="#" class={active==='about-video' ? 'active' :''} onClick={()=>handleActive('about-video')}>About Video</a></li>
                                            <li><a href="#" class={active==='about-user' ? 'active' :''}  onClick={()=>handleActive('about-user')}>About User</a></li>
                                            <li><a href="#"  class={active==='copy' ? 'active' :''}  onClick={()=>handleActive('copy')}>Copyrights Ownership</a></li>
                                            <li><a href="#" class={active==='info' ? 'active' :''}  onClick={()=>handleActive('info')}>Submission Information</a></li>
                                            <li><a href="#" class={active==='status' ? 'active' :''}  onClick={()=>handleActive('status')}>Submission Status</a></li>
                                        </ul>
                                        <div data-tab-parent="tabgroup3">
                                            <div class={active==='about-video' ? 'tab_panel active' :'tab_panel'}>
                                                <div class="panel-box-info-wrap column-3">
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Title Of The Video : </span> {data?.inquery?.video?.title}</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Filming Date :  </span> {data?.inquery?.video?.created_at}</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Filming Location : </span> Los Cairo, Cairo, Egypt</p>
                                                    </div>
                                                </div>
                                                <div class="story-description mb-0 border-b-0 pb-0">
                                                    <div class="story-description-scroll">
                                                        <div class="story-description-info">
                                                            <label>Story/Description:</label>
                                                            <div class="story-description-info-content scroller">
                                                                <p>Lorem ipsum dolor sit amet,
                                                                    consectetur adipiscing
                                                                    elit. In et pretium, eros ipsum diam. Et eleifend ipsum
                                                                    cursus et
                                                                    pharetra gravida vel nullam. Vitae arcu viverra sed
                                                                    congue sagittis
                                                                    purus. Egestas ut tempus convallis nunc nunc, fringilla
                                                                    magnis odio.
                                                                    Aliquet. Consectetur adipiscing elit. In et pretium,
                                                                    eros ipsum
                                                                    diam. Et eleifend ipsum cursus et pharetra gravida vel
                                                                    nullam. Vitae
                                                                    arcu viverra sed congue sagittis purus. Egestas ut
                                                                    tempus convallis
                                                                    nunc nunc, fringilla magnis odio. Aliquet.Lorem ipsum dolor
                                                                    sit
                                                                    amet,
                                                                    consectetur adipiscing
                                                                    elit. In et pretium, eros ipsum diam. Et eleifend ipsum
                                                                    cursus et
                                                                    pharetra gravida vel nullam. Vitae arcu viverra sed
                                                                    congue sagittis
                                                                    purus. Egestas ut tempus convallis nunc nunc, fringilla
                                                                    magnis odio.
                                                                    Aliquet. Consectetur adipiscing elit. In et pretium,
                                                                    eros ipsum
                                                                    diam. Et eleifend ipsum cursus et pharetra gravida vel
                                                                    nullam. Vitae
                                                                    arcu viverra sed congue sagittis purus. Egestas ut
                                                                    tempus convallis
                                                                    nunc nunc, fringilla magnis odio. Aliquet.</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={active==='about-user' ? 'tab_panel active' :'tab_panel'}>
                                                <div class="panel-box-info-wrap column-3 border-b-0 pb-0">
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Client Name </span>   {data?.inquery?.video?.first_name +
                    " " +
                    data?.inquery?.video?.last_name}</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Phone Number </span> +00 1234567890</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Date Of Birth </span> 06/07/1996</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Client Email Address </span> Jognsmith@Gmail.Com</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Payment Method  </span> <img src="images/paypal.png" alt="" /></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Paypal Email Address </span> jognsmith@gmail.com</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Signature </span> <img src="images/signature.png" alt="" /></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Video Credit </span> Saimon Jhonson</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col"></div>
                                                </div>
                                            </div>
                                            <div class={active==='copy' ? 'tab_panel active' :'tab_panel'}>
                                                <div class="panel-box-info-wrap tab-inner-scroll column-2_2 border-b-0 pb-0">
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Are There People Appearing In The Video?</span> <mark class="stripe-btn-danger">Yes</mark></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Who Are They? </span> Person Name</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>The Person Who Filmed This Video Is</span> A Security Camera</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col"></div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Did Anyone Reach You About Using This Video?</span> <mark class="stripe-btn-danger">Yes</mark></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Please Share With Us The Name Of The Company/Page </span> Company Name/Page</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Did You Send/Submit/Upload This Video To A Website And/Or Social Media Account </span> <span class="tg grn"><mark class="stripe-btn-danger">Yes A Youtube Account</mark></span></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Where Did You Submit It?</span> Our Instagram, Facebook And YouTube</p>
                                                    </div>

                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Did You Sign A Licensing Agreement For This Video With Another Company/Page</span> <span class="tg grn"><mark class="stripe-btn-danger">Yes, I Have Signed An Exclusive Agreement</mark></span></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Name Of The Company?</span> Company Name</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={active==='info' ? 'tab_panel active' :'tab_panel'}>
                                                <div class="panel-box-info-wrap column-3 border-b-0 pb-0">
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>User IP Address </span> 12356asdsd</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Country </span> United States</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Submission Date  </span> August 23rd, 2021 At 11:15:34 PM UTC</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Terms Of Submission </span> Agreed | Exclusive License</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Terms Of Service </span> Agreed</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Revenue Share </span> 50% Or 60%</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>VSID </span> 17171</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class={active==='status' ? 'tab_panel active' :'tab_panel'}>
                                                <div class="panel-box-info-wrap column-2_2 border-b-0 pb-0">
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Video Status </span> <mark class="stripe-btn-danger">Rejected</mark></p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Acquired By </span> Name Of Partner/Member</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Approved Or Rejected By </span> Manager Name 22.03.2021 @10:55AM</p>
                                                    </div>
                                                    <div class="panel-box-info-wrap-col">
                                                        <p><span>Confirmed Or Declined By  </span> Name Of The Quality Team Agent 22.03.2021 @10:55AM</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="right-panel">
                                    <div class="panel-box-info panel-box-info-xxs-spacing theaming-green mt-0">
                                        <div class="line-header">
                                            <h5><span>Notes</span></h5>
                                        </div>
                                        <div class="form-info">
                                            <ul class="line_list">
                                                <li><label>Quality Agent :</label>
                                                    <span>John Morrison</span>
                                                </li>
                                                <li><label>VSID :</label>
                                                    <span>17171</span>
                                                </li>
                                            </ul>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                                Lorem Ipsum has been the industry's standard
                                                dummy text ever since the 1500s, when an unknown printer took a galley of
                                                type and scrambled it to make a type specimen
                                                book. It has survived not only five centuries, Lorem Ipsum is.</p>
                                        </div>
                                    </div>

                                    <div class="msg_list_sec panel-box-info">
                                        <h4>Subject: Regarding our order...</h4>
                                        <div class="chat-timeline">
                                            <span class="chat-timeline-date">Tuesday, march 1</span>
                                        </div>
                                        <div class="modal-body-message-lists-wrap">
                                            <div class="message-body receiver">
                                                <div class="message-body-row">
                                                    <div class="chat-avatar">
                                                        <img src="images/receiver.png" alt="" />
                                                    </div>
                                                    <div class="chat-content">
                                                        <div class="chat-content-info">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry. Lorem Ipsum has been the industry's standard
                                                                dummy text ever since the 1500s, when an unknown printer took a
                                                                galley of type and scrambled</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="chat-deliver-time">
                                                    <p>12.07.2021<span>@12.55am</span></p>
                                                </div>
                                            </div>
                                            <div class="message-body sender">
                                                <div class="message-body-row">
                                                    <div class="chat-content">
                                                        <div class="chat-content-info">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry. Lorem Ipsum has been the industry's standard
                                                                dummy text ever since the 1500s, when an unknown printer took a
                                                                galley.</p>
                                                        </div>
                                                    </div>
                                                    <div class="chat-avatar">
                                                        <img src="images/sender.png" alt="" />
                                                    </div>
                                                </div>
                                                <div class="chat-deliver-time">
                                                    <p>12.07.2021<span>@12.55am</span></p>
                                                </div>
                                            </div>
                                            <div class="message-body receiver">
                                                <div class="message-body-row">
                                                    <div class="chat-avatar">
                                                        <img src="images/receiver.png" alt="" />
                                                    </div>
                                                    <div class="chat-content">
                                                        <div class="chat-content-info">
                                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting
                                                                industry. Lorem Ipsum has been the industry's standard
                                                                dummy text ever since the 1500s, when an unknown printer took a
                                                                galley of type and scrambled</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="chat-deliver-time">
                                                    <p>12.07.2021<span>@12.55am</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="chat-footer_inner">
                                            <div class="chat-footer-left">
                                                <textarea placeholder="Type your message here..."></textarea>
                                            </div>
                                            <div class="chat-footer-right">
                                                <label for="file" class="file-upload">
                                                    <input type="file" id="file" />
                                                    <img src="images/file-upload.svg" alt="" />
                                                </label>
                                                <button type="button" class="btn-outline btn-outline-black">Done</button>
                                                <button type="button" class="btn-outline btn-outline-red">Send</button>
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

export default Chat
