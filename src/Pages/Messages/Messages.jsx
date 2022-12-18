import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import useBroadcast from '../../hooks/useBroadcast';
import useFetch from '../../hooks/useFetch';
import { notify } from '../../lib/queryClient';
import requests from '../../services/httpService';
import MessageModal from './Components/MessageModal';


const Messages = () => {
  const [modalShow, setModalShow] = useState(false);

  const {
    data: inquiries,
    refetch,
    isLoading,
  } = useFetch(["inquiries"], `/inquiry`);

  useBroadcast("inquiry", refetch, [
    ".InquiryCreated",
    ".InquiryUpdated",
    ".InquiryDeleted",
  ]);
  const authHeader = useAuthHeader();
  const [inquiry, setInquiry] = useState({ to_user_id: 1, role: "admin" });
  const handleFormSubmit = () => {

    requests.post(`inquiry-create`, inquiry, { token: authHeader() });
    notify();
    refetch();
    setModalShow(false);
  };

  return (
    <div>
      <div className="dashboard_content dashboard_content_message">
        <div className="dashboard_content_inner">
          <div className="top_welcome_box">
            <div className="lft_element">
              <h4>Hello, We are here to help</h4>
              <p>
                Need some help with your transactions or got a question about
                your submission? Feel free to inquire now!
              </p>
            </div>
            <div className="rt_element">
              <button
                className="btn-outline btn-outline-blue"

                onClick={() => setModalShow(true)}
              >
                New Inquiry?
              </button>
            </div>
          </div>

          <div className="message_table">
            <table className="msg_tb">
              <thead>
                <tr>
                  <th>NO.</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? [0, 0, 0, 0, 0].map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="skeleton_v1"></td>
                        <td className="skeleton_v1"></td>
                        <td className="skeleton_v1"></td>
                        <td className="skeleton_v1"></td>
                        <td className="skeleton_v1">
                          <span class="tg grn"></span>
                        </td>
                        <td className="skeleton_v1">
                        <Link to={"/chat-details/" + inquiry?.id} className="view_ico_btn">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.9401 15.66C29.7639 12.6176 27.722 9.98662 25.0669 8.09209C22.4117 6.19756 19.2595 5.12257 16.0001 5C12.7406 5.12257 9.58845 6.19756 6.93326 8.09209C4.27808 9.98662 2.23622 12.6176 1.06006 15.66C0.98063 15.8797 0.98063 16.1203 1.06006 16.34C2.23622 19.3824 4.27808 22.0134 6.93326 23.9079C9.58845 25.8024 12.7406 26.8774 16.0001 27C19.2595 26.8774 22.4117 25.8024 25.0669 23.9079C27.722 22.0134 29.7639 19.3824 30.9401 16.34C31.0195 16.1203 31.0195 15.8797 30.9401 15.66ZM16.0001 25C10.7001 25 5.10006 21.07 3.07006 16C5.10006 10.93 10.7001 7 16.0001 7C21.3001 7 26.9001 10.93 28.9301 16C26.9001 21.07 21.3001 25 16.0001 25Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10ZM16 20C15.2089 20 14.4355 19.7654 13.7777 19.3259C13.1199 18.8864 12.6072 18.2616 12.3045 17.5307C12.0017 16.7998 11.9225 15.9956 12.0769 15.2196C12.2312 14.4437 12.6122 13.731 13.1716 13.1716C13.731 12.6122 14.4437 12.2312 15.2196 12.0769C15.9956 11.9225 16.7998 12.0017 17.5307 12.3045C18.2616 12.6072 18.8864 13.1199 19.3259 13.7777C19.7654 14.4355 20 15.2089 20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </Link>
                        </td>
                      </tr>
                    );
                  })
                  : inquiries?.data?.map((inquiry, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="skeleton">
                          {inquiry?.created_at ? inquiry.created_at : ""}
                        </td>
                        <td>{inquiry?.subject ? inquiry.subject : ""}</td>
                        <td>{inquiry?.message ? inquiry.message : ""}</td>
                        <td>
                          <span class="tg grn">
                            {inquiry?.status ? inquiry.status : "Pending"}
                          </span>
                        </td>
                        <td>
                        <Link to={"/chat-details/" + inquiry?.id} className="view_ico_btn">
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M30.9401 15.66C29.7639 12.6176 27.722 9.98662 25.0669 8.09209C22.4117 6.19756 19.2595 5.12257 16.0001 5C12.7406 5.12257 9.58845 6.19756 6.93326 8.09209C4.27808 9.98662 2.23622 12.6176 1.06006 15.66C0.98063 15.8797 0.98063 16.1203 1.06006 16.34C2.23622 19.3824 4.27808 22.0134 6.93326 23.9079C9.58845 25.8024 12.7406 26.8774 16.0001 27C19.2595 26.8774 22.4117 25.8024 25.0669 23.9079C27.722 22.0134 29.7639 19.3824 30.9401 16.34C31.0195 16.1203 31.0195 15.8797 30.9401 15.66ZM16.0001 25C10.7001 25 5.10006 21.07 3.07006 16C5.10006 10.93 10.7001 7 16.0001 7C21.3001 7 26.9001 10.93 28.9301 16C26.9001 21.07 21.3001 25 16.0001 25Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M16 10C14.8133 10 13.6533 10.3519 12.6666 11.0112C11.6799 11.6705 10.9109 12.6075 10.4567 13.7039C10.0026 14.8003 9.88378 16.0067 10.1153 17.1705C10.3468 18.3344 10.9182 19.4035 11.7574 20.2426C12.5965 21.0818 13.6656 21.6532 14.8295 21.8847C15.9933 22.1162 17.1997 21.9974 18.2961 21.5433C19.3925 21.0892 20.3295 20.3201 20.9888 19.3334C21.6481 18.3467 22 17.1867 22 16C22 14.4087 21.3679 12.8826 20.2426 11.7574C19.1174 10.6321 17.5913 10 16 10ZM16 20C15.2089 20 14.4355 19.7654 13.7777 19.3259C13.1199 18.8864 12.6072 18.2616 12.3045 17.5307C12.0017 16.7998 11.9225 15.9956 12.0769 15.2196C12.2312 14.4437 12.6122 13.731 13.1716 13.1716C13.731 12.6122 14.4437 12.2312 15.2196 12.0769C15.9956 11.9225 16.7998 12.0017 17.5307 12.3045C18.2616 12.6072 18.8864 13.1199 19.3259 13.7777C19.7654 14.4355 20 15.2089 20 16C20 17.0609 19.5786 18.0783 18.8284 18.8284C18.0783 19.5786 17.0609 20 16 20Z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MessageModal
        show={modalShow}
        modal={(status) => setModalShow(status)}
        refetch={refetch}
        handleFormSubmit={handleFormSubmit}
        inquiry={inquiry}
        setInquiry={setInquiry}

      />
    </div>
  );
};
export default Messages;

