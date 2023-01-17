import userEvent from "@testing-library/user-event";
import useFetch from "../hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import getImageURL, { getDateTime, notify } from "../lib/queryClient";
import requests from "../services/httpService";
import { Link } from "react-router-dom";
import countries from "../countries";

function Setting() {
  const authHeader = useAuthHeader();
  const {
    data: user,
    refetch,
    isError,
    isSuccess,
    isLoading,
  } = useFetch(["user-prof"], `/user`, {}, { token: authHeader() });
  /* useEffect(() => {
    refetch();
  }, [user, isError, isSuccess, isLoading]); */

  const [countryDrop, setCountryDrop] = useState(false);
  const handleCountryDrop = () => {
    setCountryDrop(curr => {
      return !curr;
    });
  }

  const [nameField, setnameField] = useState(false);
  const [emailField, setEmailField] = useState(false);
  const [phoneField, setphoneField] = useState(false);
  const [countriField, setcountriField] = useState(false);
  const [passField, setpassField] = useState(false);
  const baseURL = process.env.REACT_APP_API_BASE;
  const updateProfile = (formData) => {
    if (formData) {
      requests.post(`update-profile`, formData, { token: authHeader() }).then((res) => {
        if (res) {
          notify(res.message);
        } else {
          notify(res.message, true);
        }
      });
      refetch();
      resetFormData(user);
    }
  };
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    password: "",
  });
  const updatePassword= (passwordData) => {
    if (passwordData) {
      requests.post(`change-password`, passwordData, { token: authHeader() }).then((res) => {
        if (res) {
          notify(res.message);
        } else {
          notify(res.message, true);
        }
      });
      refetch();
      setPasswordData(curr => {
        return {
          old_password: "",
          password: "",
        }
      });
    }
  };

  const [formData, setFormData] = useState({
    name: user?.name ? user.name : "",
    last_name: user?.last_name ? user.last_name : "",
    email: user?.email ? user.email : "",
    phone: user?.phone ? user.phone : "",
    country: user?.country ? user.country : "",
  });

  const resetFormData = (user) => {
    const tmp = {
      name: user?.name ? user.name : "",
      last_name: user?.last_name ? user.last_name : "",
      email: user?.email ? user.email : "",
      phone: user?.phone ? user.phone : "",
      country: user?.country ? user.country : "",
    };
    setFormData(tmp);
  };

  function handalNameField(e) {
    e.preventDefault();
    if (nameField) {
      updateProfile(formData);
    }
    setnameField(!nameField);
  }
  function handalEmailField(e) {
    e.preventDefault();
    if (emailField) {
      updateProfile(formData);
    }
    setEmailField(!emailField);
  }
  function handalPhoneField(e) {
    e.preventDefault();
    if (phoneField) {
      updateProfile(formData);
    }
    setphoneField(!phoneField);
  }
  function handalCountriField(e) {
    e.preventDefault();
    if (countriField) {
      updateProfile(formData);
    }
    setcountriField(!countriField);
  }
  function handalPassField(e) {
    e.preventDefault();
    if (passField) {
      updatePassword(passwordData);
    }
    setpassField(!passField);
  }

  const setNameData = (e) => {
    e.preventDefault();
    const full_name = e.target.value.split(" ");
    setFormData({ ...formData, name: full_name[0], last_name: full_name[1] });
  };
  const setEmailData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email: e.target.value });
  };
  const setPhoneData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, phone: e.target.value });
  };
  const setCountryData = (value) => {
    setFormData({ ...formData, country: value });
  };
  useEffect(() => {
    refetch();
    resetFormData(user);
  }, [user, isError, isSuccess, isLoading]);
  return (
    <>
      <div className="dashboard_content dashboard_content_setting">
        <div className="dashboard_content_inner">
          <div className="dashboard_profs_row">
            <div className="dashboard_profs_row_lft">
              <div className="box_model">
                <div className="box_row">
                  <div className="profile_pic_lft">
                    <div className="prf_row">
                      <div className="prf_lft">
                        <div className="prf_box">
                          <div className="prf" data-profile-image>
                            {/* <img src={getImageURL(user.avater)} alt="" /> */}
                            <img src="/images/sender.png" alt="user-image" />
                            <span className="prf_pic_change">
                              <input type="file" accept="image/*" />
                              <svg
                                width="20"
                                height="16"
                                viewBox="0 0 20 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M17.3365 2.54808H14.3942L13.6933 0.583654C13.6448 0.449234 13.5561 0.333042 13.4392 0.250952C13.3222 0.168861 13.1828 0.124874 13.0399 0.125H6.4024C6.11034 0.125 5.84856 0.308894 5.7512 0.583654L5.04808 2.54808H2.10577C1.14952 2.54808 0.375 3.3226 0.375 4.27885V14.1442C0.375 15.1005 1.14952 15.875 2.10577 15.875H17.3365C18.2928 15.875 19.0673 15.1005 19.0673 14.1442V4.27885C19.0673 3.3226 18.2928 2.54808 17.3365 2.54808ZM9.72115 12.4135C7.80865 12.4135 6.25962 10.8644 6.25962 8.95192C6.25962 7.03942 7.80865 5.49039 9.72115 5.49039C11.6337 5.49039 13.1827 7.03942 13.1827 8.95192C13.1827 10.8644 11.6337 12.4135 9.72115 12.4135ZM7.64423 8.95192C7.64423 9.50276 7.86305 10.031 8.25255 10.4205C8.64205 10.81 9.17032 11.0288 9.72115 11.0288C10.272 11.0288 10.8003 10.81 11.1898 10.4205C11.5793 10.031 11.7981 9.50276 11.7981 8.95192C11.7981 8.40109 11.5793 7.87282 11.1898 7.48332C10.8003 7.09382 10.272 6.875 9.72115 6.875C9.17032 6.875 8.64205 7.09382 8.25255 7.48332C7.86305 7.87282 7.64423 8.40109 7.64423 8.95192Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="prf_rt">
                            <h4>
                              {user?.name ? user.name : ""}{" "}
                              {user?.last_name ? user.last_name : ""}
                            </h4>
                            <p>
                              <img src="images/pr_msg.png" alt="" />
                              <a
                                href={`mailto:${user?.email ? user.email : ""}`}
                              >
                                {user?.email ? user.email : ""}
                              </a>
                            </p>
                            <p>
                              <img src="images/pr_cal.png" alt="" />
                              joined{" "}
                              {user?.joined_at
                                ? getDateTime(user.joined_at).date
                                : ""}
                            </p>
                          </div>
                        </div>

                        <div className="prf_data_box">
                          <div className="prf_data_row">
                            <div className="label">Name</div>
                            <div className="input">
                              {nameField ? (
                                <input
                                  type="text"
                                  autoFocus
                                  className="data-input"
                                  onChange={(e) => setNameData(e)}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={`${formData.name} ${formData.last_name}`}
                                  placeholder="Name"
                                  disabled
                                  className="disabled data-input"
                                />
                              )}
                            </div>
                            <div className="rt_edit">
                              {nameField ? (
                                <a
                                  href="#"
                                  data-save
                                  className="prf_edit sv_btn "
                                  onClick={handalNameField}
                                >
                                  Save
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 512 512"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M416 496C412.719 495.997 409.519 494.986 406.832 493.104L256 387.536L105.168 493.136C102.768 494.814 99.9542 495.801 97.0323 495.99C94.1103 496.179 91.1926 495.562 88.5968 494.207C86.001 492.853 83.8268 490.811 82.311 488.306C80.7951 485.801 79.9958 482.928 80 480V92.8C80.0212 72.4379 88.1194 52.9158 102.518 38.5176C116.916 24.1194 136.438 16.0212 156.8 16H355.2C375.562 16.0212 395.084 24.1194 409.482 38.5176C423.881 52.9158 431.979 72.4379 432 92.8V480C432 484.243 430.314 488.313 427.314 491.314C424.313 494.314 420.243 496 416 496ZM256 352C259.281 352.003 262.481 353.014 265.168 354.896L400 449.264V92.8C400 80.9183 395.28 69.5232 386.878 61.1216C378.477 52.72 367.082 48 355.2 48H156.8C144.918 48 133.523 52.72 125.122 61.1216C116.72 69.5232 112 80.9183 112 92.8V449.264L246.832 354.864C249.523 352.993 252.723 351.993 256 352Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  data-edit
                                  className="prf_edit"
                                  onClick={handalNameField}
                                >
                                  Edit
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6232 1.32764H5.31173C3.11477 1.32764 1.32812 3.11428 1.32812 5.31124V13.9424C1.32813 14.1185 1.39808 14.2874 1.52259 14.4119C1.6471 14.5364 1.81597 14.6063 1.99206 14.6063H10.6232C12.8202 14.6063 14.6068 12.8197 14.6068 10.6227V5.31124C14.6068 3.11428 12.8202 1.32764 10.6232 1.32764ZM13.2789 10.6227C13.2789 12.0874 12.0878 13.2785 10.6232 13.2785H2.65599V5.31124C2.65599 3.8466 3.84709 2.65551 5.31173 2.65551H10.6232C12.0878 2.65551 13.2789 3.8466 13.2789 5.31124V10.6227Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M4.64844 9.95031V11.2775H5.97564L9.64654 7.61126L8.31999 6.28472L4.64844 9.95031ZM10.272 6.98584L8.94542 5.65797L9.95659 4.64746L11.2845 5.97467L10.272 6.98584Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="prf_data_row" data-editable>
                            <div className="label">Email Address</div>
                            <div className="input">
                              {emailField ? (
                                <input
                                  type="email"
                                  className=" data-input"
                                  onChange={(e) => setEmailData(e)}
                                />
                              ) : (
                                <input
                                  type="email"
                                  value={formData.email}
                                  placeholder="Email Address"
                                  disabled
                                  className="disabled data-input"
                                />
                              )}
                            </div>
                            <div className="rt_edit">
                              {emailField ? (
                                <a
                                  href="#"
                                  onClick={handalEmailField}
                                  data-save
                                  className="prf_edit sv_btn "
                                >
                                  Save
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 512 512"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M416 496C412.719 495.997 409.519 494.986 406.832 493.104L256 387.536L105.168 493.136C102.768 494.814 99.9542 495.801 97.0323 495.99C94.1103 496.179 91.1926 495.562 88.5968 494.207C86.001 492.853 83.8268 490.811 82.311 488.306C80.7951 485.801 79.9958 482.928 80 480V92.8C80.0212 72.4379 88.1194 52.9158 102.518 38.5176C116.916 24.1194 136.438 16.0212 156.8 16H355.2C375.562 16.0212 395.084 24.1194 409.482 38.5176C423.881 52.9158 431.979 72.4379 432 92.8V480C432 484.243 430.314 488.313 427.314 491.314C424.313 494.314 420.243 496 416 496ZM256 352C259.281 352.003 262.481 353.014 265.168 354.896L400 449.264V92.8C400 80.9183 395.28 69.5232 386.878 61.1216C378.477 52.72 367.082 48 355.2 48H156.8C144.918 48 133.523 52.72 125.122 61.1216C116.72 69.5232 112 80.9183 112 92.8V449.264L246.832 354.864C249.523 352.993 252.723 351.993 256 352Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  onClick={handalEmailField}
                                  data-edit
                                  className="prf_edit"
                                >
                                  Edit
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6232 1.32764H5.31173C3.11477 1.32764 1.32812 3.11428 1.32812 5.31124V13.9424C1.32813 14.1185 1.39808 14.2874 1.52259 14.4119C1.6471 14.5364 1.81597 14.6063 1.99206 14.6063H10.6232C12.8202 14.6063 14.6068 12.8197 14.6068 10.6227V5.31124C14.6068 3.11428 12.8202 1.32764 10.6232 1.32764ZM13.2789 10.6227C13.2789 12.0874 12.0878 13.2785 10.6232 13.2785H2.65599V5.31124C2.65599 3.8466 3.84709 2.65551 5.31173 2.65551H10.6232C12.0878 2.65551 13.2789 3.8466 13.2789 5.31124V10.6227Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M4.64844 9.95031V11.2775H5.97564L9.64654 7.61126L8.31999 6.28472L4.64844 9.95031ZM10.272 6.98584L8.94542 5.65797L9.95659 4.64746L11.2845 5.97467L10.272 6.98584Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="prf_data_row" data-editable>
                            <div className="label">Phone Number</div>
                            <div className="input">
                              {phoneField ? (
                                <input
                                  type="tel"
                                  onChange={(e) => {
                                    setPhoneData(e);
                                  }}
                                  className=" data-input"
                                />
                              ) : (
                                <input
                                  type="tel"
                                  value={formData.phone}
                                  placeholder="Phone Number"
                                  disabled
                                  className="disabled data-input"
                                />
                              )}
                            </div>
                            <div className="rt_edit">
                              {!phoneField ? (
                                <a
                                  href="#"
                                  data-edit
                                  className="prf_edit"
                                  onClick={handalPhoneField}
                                >
                                  Edit
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6232 1.32764H5.31173C3.11477 1.32764 1.32812 3.11428 1.32812 5.31124V13.9424C1.32813 14.1185 1.39808 14.2874 1.52259 14.4119C1.6471 14.5364 1.81597 14.6063 1.99206 14.6063H10.6232C12.8202 14.6063 14.6068 12.8197 14.6068 10.6227V5.31124C14.6068 3.11428 12.8202 1.32764 10.6232 1.32764ZM13.2789 10.6227C13.2789 12.0874 12.0878 13.2785 10.6232 13.2785H2.65599V5.31124C2.65599 3.8466 3.84709 2.65551 5.31173 2.65551H10.6232C12.0878 2.65551 13.2789 3.8466 13.2789 5.31124V10.6227Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M4.64844 9.95031V11.2775H5.97564L9.64654 7.61126L8.31999 6.28472L4.64844 9.95031ZM10.272 6.98584L8.94542 5.65797L9.95659 4.64746L11.2845 5.97467L10.272 6.98584Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  onClick={handalPhoneField}
                                  data-save
                                  className="prf_edit sv_btn"
                                >
                                  Save
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 512 512"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M416 496C412.719 495.997 409.519 494.986 406.832 493.104L256 387.536L105.168 493.136C102.768 494.814 99.9542 495.801 97.0323 495.99C94.1103 496.179 91.1926 495.562 88.5968 494.207C86.001 492.853 83.8268 490.811 82.311 488.306C80.7951 485.801 79.9958 482.928 80 480V92.8C80.0212 72.4379 88.1194 52.9158 102.518 38.5176C116.916 24.1194 136.438 16.0212 156.8 16H355.2C375.562 16.0212 395.084 24.1194 409.482 38.5176C423.881 52.9158 431.979 72.4379 432 92.8V480C432 484.243 430.314 488.313 427.314 491.314C424.313 494.314 420.243 496 416 496ZM256 352C259.281 352.003 262.481 353.014 265.168 354.896L400 449.264V92.8C400 80.9183 395.28 69.5232 386.878 61.1216C378.477 52.72 367.082 48 355.2 48H156.8C144.918 48 133.523 52.72 125.122 61.1216C116.72 69.5232 112 80.9183 112 92.8V449.264L246.832 354.864C249.523 352.993 252.723 351.993 256 352Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              )}

                              <a
                                href="#"
                                data-save
                                className="prf_edit sv_btn hide"
                              >
                                Save
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 512 512"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M416 496C412.719 495.997 409.519 494.986 406.832 493.104L256 387.536L105.168 493.136C102.768 494.814 99.9542 495.801 97.0323 495.99C94.1103 496.179 91.1926 495.562 88.5968 494.207C86.001 492.853 83.8268 490.811 82.311 488.306C80.7951 485.801 79.9958 482.928 80 480V92.8C80.0212 72.4379 88.1194 52.9158 102.518 38.5176C116.916 24.1194 136.438 16.0212 156.8 16H355.2C375.562 16.0212 395.084 24.1194 409.482 38.5176C423.881 52.9158 431.979 72.4379 432 92.8V480C432 484.243 430.314 488.313 427.314 491.314C424.313 494.314 420.243 496 416 496ZM256 352C259.281 352.003 262.481 353.014 265.168 354.896L400 449.264V92.8C400 80.9183 395.28 69.5232 386.878 61.1216C378.477 52.72 367.082 48 355.2 48H156.8C144.918 48 133.523 52.72 125.122 61.1216C116.72 69.5232 112 80.9183 112 92.8V449.264L246.832 354.864C249.523 352.993 252.723 351.993 256 352Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </a>
                            </div>
                          </div>
                          <div className="prf_data_row" data-editable>
                            <div className="label">Country</div>
                            <div className="input">
                            <div className={`nice-select selectize data-input ${!countriField? 'disabled': ''} ${countryDrop? 'open': ''}`} tabIndex={0}>
                                <span className="current" onClick={handleCountryDrop}>{formData.country}</span>
                                <div className="nice-select-dropdown">
                                  <ul className="list">
                                    {
                                      countries.map((country, index) => {
                                        return (
                                          <li data-value={country} key={index} className="option null" onClick={() => {setCountryData(country); handleCountryDrop();}}>
                                            {country}
                                          </li>
                                          );
                                      })
                                    }
                                  </ul>
                                </div>
                              </div>

                            </div>
                            <div className="rt_edit">
                              {!countriField ? (
                                <a
                                  href="#"
                                  data-edit
                                  className="prf_edit"
                                  onClick={handalCountriField}
                                >
                                  Edit
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6232 1.32764H5.31173C3.11477 1.32764 1.32812 3.11428 1.32812 5.31124V13.9424C1.32813 14.1185 1.39808 14.2874 1.52259 14.4119C1.6471 14.5364 1.81597 14.6063 1.99206 14.6063H10.6232C12.8202 14.6063 14.6068 12.8197 14.6068 10.6227V5.31124C14.6068 3.11428 12.8202 1.32764 10.6232 1.32764ZM13.2789 10.6227C13.2789 12.0874 12.0878 13.2785 10.6232 13.2785H2.65599V5.31124C2.65599 3.8466 3.84709 2.65551 5.31173 2.65551H10.6232C12.0878 2.65551 13.2789 3.8466 13.2789 5.31124V10.6227Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M4.64844 9.95031V11.2775H5.97564L9.64654 7.61126L8.31999 6.28472L4.64844 9.95031ZM10.272 6.98584L8.94542 5.65797L9.95659 4.64746L11.2845 5.97467L10.272 6.98584Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  data-save
                                  className="prf_edit sv_btn "
                                  onClick={handalCountriField}
                                >
                                  Save
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 512 512"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M416 496C412.719 495.997 409.519 494.986 406.832 493.104L256 387.536L105.168 493.136C102.768 494.814 99.9542 495.801 97.0323 495.99C94.1103 496.179 91.1926 495.562 88.5968 494.207C86.001 492.853 83.8268 490.811 82.311 488.306C80.7951 485.801 79.9958 482.928 80 480V92.8C80.0212 72.4379 88.1194 52.9158 102.518 38.5176C116.916 24.1194 136.438 16.0212 156.8 16H355.2C375.562 16.0212 395.084 24.1194 409.482 38.5176C423.881 52.9158 431.979 72.4379 432 92.8V480C432 484.243 430.314 488.313 427.314 491.314C424.313 494.314 420.243 496 416 496ZM256 352C259.281 352.003 262.481 353.014 265.168 354.896L400 449.264V92.8C400 80.9183 395.28 69.5232 386.878 61.1216C378.477 52.72 367.082 48 355.2 48H156.8C144.918 48 133.523 52.72 125.122 61.1216C116.72 69.5232 112 80.9183 112 92.8V449.264L246.832 354.864C249.523 352.993 252.723 351.993 256 352Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="prf_data_row" data-editable>
                            <div className="label">Password</div>
                            <div className="input">
                              {passField ? (
                                <div>
                                <input
                                  type={passwordData?.old_password? 'password': 'text'}
                                  value={passwordData?.old_password? passwordData.old_password: ''}
                                  placeholder='Old Password'
                                  onChange={(e) => {
                                    setPasswordData(curr => {
                                      return {
                                        ...curr,
                                        old_password: e.target.value,
                                      }
                                    });
                                  }}
                                  className=" data-input"
                                />
                                <input
                                  type={passwordData?.password? 'password': 'text'}
                                  value={passwordData?.password? passwordData.password: ''}
                                  placeholder='New Password'
                                  onChange={(e) => {
                                    setPasswordData(curr => {
                                      return {
                                        ...curr,
                                        password: e.target.value,
                                      }
                                    });
                                  }}
                                  className=" data-input"
                                />
                                </div>
                              ) : (
                                <input
                                  type="password"
                                  value={formData.password}
                                  placeholder="********"
                                  disabled
                                  className="disabled data-input"
                                />
                              )}
                            </div>
                            <div className="rt_edit">
                              {!passField ? (
                                <a
                                  href="#"
                                  data-edit
                                  className="prf_edit"
                                  onClick={handalPassField}
                                >
                                  Edit
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10.6232 1.32764H5.31173C3.11477 1.32764 1.32812 3.11428 1.32812 5.31124V13.9424C1.32813 14.1185 1.39808 14.2874 1.52259 14.4119C1.6471 14.5364 1.81597 14.6063 1.99206 14.6063H10.6232C12.8202 14.6063 14.6068 12.8197 14.6068 10.6227V5.31124C14.6068 3.11428 12.8202 1.32764 10.6232 1.32764ZM13.2789 10.6227C13.2789 12.0874 12.0878 13.2785 10.6232 13.2785H2.65599V5.31124C2.65599 3.8466 3.84709 2.65551 5.31173 2.65551H10.6232C12.0878 2.65551 13.2789 3.8466 13.2789 5.31124V10.6227Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M4.64844 9.95031V11.2775H5.97564L9.64654 7.61126L8.31999 6.28472L4.64844 9.95031ZM10.272 6.98584L8.94542 5.65797L9.95659 4.64746L11.2845 5.97467L10.272 6.98584Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              ) : (
                                <a
                                  href="#"
                                  data-save
                                  className="prf_edit sv_btn "
                                  onClick={handalPassField}
                                >
                                  Save
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 512 512"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M416 496C412.719 495.997 409.519 494.986 406.832 493.104L256 387.536L105.168 493.136C102.768 494.814 99.9542 495.801 97.0323 495.99C94.1103 496.179 91.1926 495.562 88.5968 494.207C86.001 492.853 83.8268 490.811 82.311 488.306C80.7951 485.801 79.9958 482.928 80 480V92.8C80.0212 72.4379 88.1194 52.9158 102.518 38.5176C116.916 24.1194 136.438 16.0212 156.8 16H355.2C375.562 16.0212 395.084 24.1194 409.482 38.5176C423.881 52.9158 431.979 72.4379 432 92.8V480C432 484.243 430.314 488.313 427.314 491.314C424.313 494.314 420.243 496 416 496ZM256 352C259.281 352.003 262.481 353.014 265.168 354.896L400 449.264V92.8C400 80.9183 395.28 69.5232 386.878 61.1216C378.477 52.72 367.082 48 355.2 48H156.8C144.918 48 133.523 52.72 125.122 61.1216C116.72 69.5232 112 80.9183 112 92.8V449.264L246.832 354.864C249.523 352.993 252.723 351.993 256 352Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard_profs_row_rtt">
              <div className="dashboard_rt_fltd">
                <div className="dashboard_rt_fltd_wrap">
                  <figure className="main_img">
                    <img src="images/tripati_logo.png" alt="" />
                  </figure>
                  <p>
                    Please register on Tipalti using the button Below to Receive
                    Payments From ViralSnare
                  </p>
                  <Link to={"/login"} className="reg_btn_part">
                    Register
                  </Link>
                </div>
              </div>
              <div className="dashboard_rt_fltd">
                <div className="dashboard_rt_fltd_wrap">
                  <figure className="main_img">
                    <img src="images/tripati_logo.png" alt="" />
                  </figure>
                  <p>
                    Please login on Tipalti using the button Below to Receive
                    Payments From ViralSnare
                  </p>
                  <Link to={"/login"} className="reg_btn_part">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setting;
