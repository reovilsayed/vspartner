import userEvent from "@testing-library/user-event";
import useFetch from "../hooks/useFetch";
import React, { useEffect, useState } from "react";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import getImageURL, { getDateTime, notify } from "../lib/queryClient";
import requests from "../services/httpService";
import { Link } from "react-router-dom";

function Setting() {
  const authHeader = useAuthHeader();
  const {
    data: user,
    refetch,
    isError,
    isSuccess,
    isLoading,
  } = useFetch(["user-prof"], `/user`, {}, { token: authHeader() });
  useEffect(() => {
    refetch();
  }, [user, isError, isSuccess, isLoading]);

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

  const [formData, setFormData] = useState({
    name: user?.name ? user.name : "",
    last_name: user?.last_name ? user.last_name : "",
    email: user?.email ? user.email : "",
    phone: user?.phone ? user.phone : "",
    country: user?.country ? user.country : "",
    password: user?.password ? user.password : "",
  });

  const resetFormData = (user) => {
    const tmp = {
      name: user?.name ? user.name : "",
      last_name: user?.last_name ? user.last_name : "",
      email: user?.email ? user.email : "",
      phone: user?.phone ? user.phone : "",
      country: user?.country ? user.country : "",
      password: user?.password ? user.password : "",
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
      updateProfile(formData);
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
  const setCountryData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, country: e.target.value });
  };
  const setPasswordData = (e) => {
    e.preventDefault();
    setFormData({ ...formData, password: e.target.value });
  };
  useEffect(() => {
    resetFormData(user);
  }, [user, isLoading, isSuccess]);

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
                              {countriField ? (
                                <select
                                  className="selectize  data-input"
                                  value={formData.country}
                                  style={{ padding: "0 10px" }}
                                  onChange={(e) => {
                                    setCountryData(e);
                                  }}
                                >
                                  <option value="Afghanistan" data-class="af">
                                    Afghanistan
                                  </option>
                                  <option value="Aland Islands" data-class="ax">
                                    Aland Islands
                                  </option>
                                  <option value="Albania" data-class="al">
                                    Albania
                                  </option>
                                  <option value="Algeria" data-class="dz">
                                    Algeria
                                  </option>
                                  <option
                                    value="American Samoa"
                                    data-class="as"
                                  >
                                    American Samoa
                                  </option>
                                  <option value="Andorra" data-class="ad">
                                    Andorra
                                  </option>
                                  <option value="Angola" data-class="ao">
                                    Angola
                                  </option>
                                  <option value="Anguilla" data-class="ai">
                                    Anguilla
                                  </option>
                                  <option value="Antarctica" data-class="aq">
                                    Antarctica
                                  </option>
                                  <option
                                    value="Antigua And Barbuda"
                                    data-class="ag"
                                  >
                                    Antigua And Barbuda
                                  </option>
                                  <option value="Argentina" data-class="ar">
                                    Argentina
                                  </option>
                                  <option value="Armenia" data-class="am">
                                    Armenia
                                  </option>
                                  <option value="Aruba" data-class="aw">
                                    Aruba
                                  </option>
                                  <option value="Australia" data-class="au">
                                    Australia
                                  </option>
                                  <option value="Austria" data-class="at">
                                    Austria
                                  </option>
                                  <option value="Azerbaijan" data-class="az">
                                    Azerbaijan
                                  </option>
                                  <option value="Bahamas" data-class="bs">
                                    Bahamas
                                  </option>
                                  <option value="Bahrain" data-class="bh">
                                    Bahrain
                                  </option>
                                  <option value="Bangladesh" data-class="bd">
                                    Bangladesh
                                  </option>
                                  <option value="Barbados" data-class="bb">
                                    Barbados
                                  </option>
                                  <option value="Belarus" data-class="by">
                                    Belarus
                                  </option>
                                  <option value="Belgium" data-class="be">
                                    Belgium
                                  </option>
                                  <option value="Belize" data-class="bz">
                                    Belize
                                  </option>
                                  <option value="Benin" data-class="bj">
                                    Benin
                                  </option>
                                  <option value="Bermuda" data-class="bm">
                                    Bermuda
                                  </option>
                                  <option value="Bhutan" data-class="bt">
                                    Bhutan
                                  </option>
                                  <option
                                    value="Bolivia, Plurinational State Of"
                                    data-class="bo"
                                  >
                                    Bolivia, Plurinational State Of
                                  </option>
                                  <option
                                    value="Bonaire, Sint Eustatius and Saba"
                                    data-class="bq"
                                  >
                                    Bonaire, Sint Eustatius and Saba
                                  </option>
                                  <option
                                    value="Bosnia And Herzegovina"
                                    data-class="ba"
                                  >
                                    Bosnia And Herzegovina
                                  </option>
                                  <option value="Botswana" data-class="bw">
                                    Botswana
                                  </option>
                                  <option value="Brazil" data-class="br">
                                    Brazil
                                  </option>
                                  <option
                                    value="British Indian Ocean Territory"
                                    data-class="io"
                                  >
                                    British Indian Ocean Territory
                                  </option>
                                  <option
                                    value="Brunei Darussalam"
                                    data-class="bn"
                                  >
                                    Brunei Darussalam
                                  </option>
                                  <option value="Bulgaria" data-class="bg">
                                    Bulgaria
                                  </option>
                                  <option value="Burkina Faso" data-class="bf">
                                    Burkina Faso
                                  </option>
                                  <option value="Burundi" data-class="bi">
                                    Burundi
                                  </option>
                                  <option value="Cabo Verde" data-class="cv">
                                    Cabo Verde
                                  </option>
                                  <option value="Cambodia" data-class="kh">
                                    Cambodia
                                  </option>
                                  <option value="Cameroon" data-class="cm">
                                    Cameroon
                                  </option>
                                  <option value="Canada" data-class="ca">
                                    Canada
                                  </option>
                                  <option
                                    value="Cayman Islands"
                                    data-class="ky"
                                  >
                                    Cayman Islands
                                  </option>
                                  <option
                                    value="Central African Republic"
                                    data-class="cf"
                                  >
                                    Central African Republic
                                  </option>
                                  <option value="Chad" data-class="td">
                                    Chad
                                  </option>
                                  <option value="Chile" data-class="cl">
                                    Chile
                                  </option>
                                  <option value="China" data-class="cn">
                                    China
                                  </option>
                                  <option
                                    value="Christmas Island"
                                    data-class="cx"
                                  >
                                    Christmas Island
                                  </option>
                                  <option
                                    value="Cocos (Keeling) Islands"
                                    data-class="cc"
                                  >
                                    Cocos (Keeling) Islands
                                  </option>
                                  <option value="Colombia" data-class="co">
                                    Colombia
                                  </option>
                                  <option value="Comoros" data-class="km">
                                    Comoros
                                  </option>
                                  <option value="Congo" data-class="cg">
                                    Congo
                                  </option>
                                  <option
                                    value="Congo, The Democratic Republic Of The"
                                    data-class="cd"
                                  >
                                    Congo, The Democratic Republic Of The
                                  </option>
                                  <option value="Cook Islands" data-class="ck">
                                    Cook Islands
                                  </option>
                                  <option value="Costa Rica" data-class="cr">
                                    Costa Rica
                                  </option>
                                  <option
                                    value="Cote d'Invoire"
                                    data-class="ci"
                                  >
                                    Cote d'Invoire
                                  </option>
                                  <option value="Croatia" data-class="hr">
                                    Croatia
                                  </option>
                                  <option value="Cuba" data-class="cu">
                                    Cuba
                                  </option>
                                  <option value="Curacao" data-class="cw">
                                    Curacao
                                  </option>
                                  <option value="Cyprus" data-class="cy">
                                    Cyprus
                                  </option>
                                  <option value="Czechia" data-class="cz">
                                    Czechia
                                  </option>
                                  <option value="Denmark" data-class="dk">
                                    Denmark
                                  </option>
                                  <option value="Djibouti" data-class="dj">
                                    Djibouti
                                  </option>
                                  <option value="Dominica" data-class="dm">
                                    Dominica
                                  </option>
                                  <option
                                    value="Dominican Republic"
                                    data-class="do"
                                  >
                                    Dominican Republic
                                  </option>
                                  <option value="Ecuador" data-class="ec">
                                    Ecuador
                                  </option>
                                  <option value="Egypt" data-class="eg">
                                    Egypt
                                  </option>
                                  <option value="El Salvador" data-class="sv">
                                    El Salvador
                                  </option>
                                  <option
                                    value="Equatorial Guinea"
                                    data-class="gq"
                                  >
                                    Equatorial Guinea
                                  </option>
                                  <option value="Eritrea" data-class="er">
                                    Eritrea
                                  </option>
                                  <option value="Estonia" data-class="ee">
                                    Estonia
                                  </option>
                                  <option value="Ethiopia" data-class="et">
                                    Ethiopia
                                  </option>
                                  <option
                                    value="Falkland Islands (Malvinas)"
                                    data-class="fk"
                                  >
                                    Falkland Islands (Malvinas)
                                  </option>
                                  <option value="Faroe Islands" data-class="fo">
                                    Faroe Islands
                                  </option>
                                  <option value="Fiji" data-class="fj">
                                    Fiji
                                  </option>
                                  <option value="Finland" data-class="fi">
                                    Finland
                                  </option>
                                  <option value="France" data-class="fr">
                                    France
                                  </option>
                                  <option value="French Guiana" data-class="gf">
                                    French Guiana
                                  </option>
                                  <option
                                    value="French Polynesia"
                                    data-class="pf"
                                  >
                                    French Polynesia
                                  </option>
                                  <option
                                    value="French Southern Territories"
                                    data-class="tf"
                                  >
                                    French Southern Territories
                                  </option>
                                  <option value="Gabon" data-class="ga">
                                    Gabon
                                  </option>
                                  <option value="Gambia" data-class="gm">
                                    Gambia
                                  </option>
                                  <option value="Georgia" data-class="ge">
                                    Georgia
                                  </option>
                                  <option value="Germany" data-class="de">
                                    Germany
                                  </option>
                                  <option value="Ghana" data-class="gh">
                                    Ghana
                                  </option>
                                  <option value="Gibraltar" data-class="gi">
                                    Gibraltar
                                  </option>
                                  <option value="Greece" data-class="gr">
                                    Greece
                                  </option>
                                  <option value="Greenland" data-class="gl">
                                    Greenland
                                  </option>
                                  <option value="Grenada" data-class="gd">
                                    Grenada
                                  </option>
                                  <option value="Guadeloupe" data-class="gp">
                                    Guadeloupe
                                  </option>
                                  <option value="Guam" data-class="gu">
                                    Guam
                                  </option>
                                  <option value="Guatemala" data-class="gt">
                                    Guatemala
                                  </option>
                                  <option value="Guernsey" data-class="gg">
                                    Guernsey
                                  </option>
                                  <option value="Guinea" data-class="gn">
                                    Guinea
                                  </option>
                                  <option value="Guinea-Bissau" data-class="gw">
                                    Guinea-Bissau
                                  </option>
                                  <option value="Guyana" data-class="gy">
                                    Guyana
                                  </option>
                                  <option value="Haiti" data-class="ht">
                                    Haiti
                                  </option>
                                  <option value="Holy See" data-class="va">
                                    Holy See
                                  </option>
                                  <option value="Honduras" data-class="hn">
                                    Honduras
                                  </option>
                                  <option value="Hong Kong" data-class="hk">
                                    Hong Kong
                                  </option>
                                  <option value="Hungary" data-class="hu">
                                    Hungary
                                  </option>
                                  <option value="Iceland" data-class="is">
                                    Iceland
                                  </option>
                                  <option value="India" data-class="in">
                                    India
                                  </option>
                                  <option value="Indonesia" data-class="id">
                                    Indonesia
                                  </option>
                                  <option
                                    value="Iran, Islamic Republic Of"
                                    data-class="ir"
                                  >
                                    Iran, Islamic Republic Of
                                  </option>
                                  <option value="Iraq" data-class="iq">
                                    Iraq
                                  </option>
                                  <option value="Ireland" data-class="ie">
                                    Ireland
                                  </option>
                                  <option value="Isle Of Man" data-class="im">
                                    Isle Of Man
                                  </option>
                                  <option value="Israel" data-class="il">
                                    Israel
                                  </option>
                                  <option value="Italy" data-class="it">
                                    Italy
                                  </option>
                                  <option value="Jamaica" data-class="jm">
                                    Jamaica
                                  </option>
                                  <option value="Japan" data-class="jp">
                                    Japan
                                  </option>
                                  <option value="Jersey" data-class="je">
                                    Jersey
                                  </option>
                                  <option value="Jordan" data-class="jo">
                                    Jordan
                                  </option>
                                  <option value="Kazakhstan" data-class="kz">
                                    Kazakhstan
                                  </option>
                                  <option value="Kenya" data-class="ke">
                                    Kenya
                                  </option>
                                  <option value="Kiribati" data-class="ki">
                                    Kiribati
                                  </option>
                                  <option
                                    value="Korea, Democratic People's Republic Of"
                                    data-class="kp"
                                  >
                                    Korea, Democratic People's Republic Of
                                  </option>
                                  <option
                                    value="Korea, Republic Of"
                                    data-class="kr"
                                  >
                                    Korea, Republic Of
                                  </option>
                                  <option value="Kuwait" data-class="kw">
                                    Kuwait
                                  </option>
                                  <option value="Kyrgyzstan" data-class="kg">
                                    Kyrgyzstan
                                  </option>
                                  <option
                                    value="Lao People's Democratic Republic"
                                    data-class="la"
                                  >
                                    Lao People's Democratic Republic
                                  </option>
                                  <option value="Latvia" data-class="lv">
                                    Latvia
                                  </option>
                                  <option value="Lebanon" data-class="lb">
                                    Lebanon
                                  </option>
                                  <option value="Lesotho" data-class="ls">
                                    Lesotho
                                  </option>
                                  <option value="Liberia" data-class="lr">
                                    Liberia
                                  </option>
                                  <option value="Libya" data-class="ly">
                                    Libya
                                  </option>
                                  <option value="Liechtenstein" data-class="li">
                                    Liechtenstein
                                  </option>
                                  <option value="Lithuania" data-class="lt">
                                    Lithuania
                                  </option>
                                  <option value="Luxembourg" data-class="lu">
                                    Luxembourg
                                  </option>
                                  <option value="Macao" data-class="mo">
                                    Macao
                                  </option>
                                  <option
                                    value="Macedonia, The Former Yugoslav Republic Of"
                                    data-class="mk"
                                  >
                                    Macedonia, The Former Yugoslav Republic Of
                                  </option>
                                  <option value="Madagascar" data-class="mg">
                                    Madagascar
                                  </option>
                                  <option value="Malawi" data-class="mw">
                                    Malawi
                                  </option>
                                  <option value="Malaysia" data-class="my">
                                    Malaysia
                                  </option>
                                  <option value="Maldives" data-class="mv">
                                    Maldives
                                  </option>
                                  <option value="Mali" data-class="ml">
                                    Mali
                                  </option>
                                  <option value="Malta" data-class="mt">
                                    Malta
                                  </option>
                                  <option
                                    value="Marshall Islands"
                                    data-class="mh"
                                  >
                                    Marshall Islands
                                  </option>
                                  <option value="Martinique" data-class="mq">
                                    Martinique
                                  </option>
                                  <option value="Mauritania" data-class="mr">
                                    Mauritania
                                  </option>
                                  <option value="Mauritius" data-class="mu">
                                    Mauritius
                                  </option>
                                  <option value="Mayotte" data-class="yt">
                                    Mayotte
                                  </option>
                                  <option value="Mexico" data-class="mx">
                                    Mexico
                                  </option>
                                  <option
                                    value="Micronesia, Federated States Of"
                                    data-class="fm"
                                  >
                                    Micronesia, Federated States Of
                                  </option>
                                  <option
                                    value="Moldova, Republic Of"
                                    data-class="md"
                                  >
                                    Moldova, Republic Of
                                  </option>
                                  <option value="Monaco" data-class="mc">
                                    Monaco
                                  </option>
                                  <option value="Mongolia" data-class="mn">
                                    Mongolia
                                  </option>
                                  <option value="Montenegro" data-class="me">
                                    Montenegro
                                  </option>
                                  <option value="Montserrat" data-class="ms">
                                    Montserrat
                                  </option>
                                  <option value="Morocco" data-class="ma">
                                    Morocco
                                  </option>
                                  <option value="Mozambique" data-class="mz">
                                    Mozambique
                                  </option>
                                  <option value="Myanmar" data-class="mm">
                                    Myanmar
                                  </option>
                                  <option value="Namibia" data-class="na">
                                    Namibia
                                  </option>
                                  <option value="Nauru" data-class="nr">
                                    Nauru
                                  </option>
                                  <option value="Nepal" data-class="np">
                                    Nepal
                                  </option>
                                  <option value="Netherlands" data-class="nl">
                                    Netherlands
                                  </option>
                                  <option value="New Caledonia" data-class="nc">
                                    New Caledonia
                                  </option>
                                  <option value="New Zealand" data-class="nz">
                                    New Zealand
                                  </option>
                                  <option value="Nicaragua" data-class="ni">
                                    Nicaragua
                                  </option>
                                  <option value="Niger" data-class="ne">
                                    Niger
                                  </option>
                                  <option value="Nigeria" data-class="ng">
                                    Nigeria
                                  </option>
                                  <option value="Niue" data-class="nu">
                                    Niue
                                  </option>
                                  <option
                                    value="Norfolk Island"
                                    data-class="nf"
                                  >
                                    Norfolk Island
                                  </option>
                                  <option
                                    value="Northern Mariana Islands"
                                    data-class="mp"
                                  >
                                    Northern Mariana Islands
                                  </option>
                                  <option value="Norway" data-class="no">
                                    Norway
                                  </option>
                                  <option value="Oman" data-class="om">
                                    Oman
                                  </option>
                                  <option value="Pakistan" data-class="pk">
                                    Pakistan
                                  </option>
                                  <option value="Palau" data-class="pw">
                                    Palau
                                  </option>
                                  <option
                                    value="Palestine, State Of"
                                    data-class="ps"
                                  >
                                    Palestine, State Of
                                  </option>
                                  <option value="Panama" data-class="pa">
                                    Panama
                                  </option>
                                  <option
                                    value="Papua New Guinea"
                                    data-class="pg"
                                  >
                                    Papua New Guinea
                                  </option>
                                  <option value="Paraguay" data-class="py">
                                    Paraguay
                                  </option>
                                  <option value="Peru" data-class="pe">
                                    Peru
                                  </option>
                                  <option value="Philippines" data-class="ph">
                                    Philippines
                                  </option>
                                  <option value="Pitcairn" data-class="pn">
                                    Pitcairn
                                  </option>
                                  <option value="Poland" data-class="pl">
                                    Poland
                                  </option>
                                  <option value="Portugal" data-class="pt">
                                    Portugal
                                  </option>
                                  <option value="Puerto Rico" data-class="pr">
                                    Puerto Rico
                                  </option>
                                  <option value="Qatar" data-class="qa">
                                    Qatar
                                  </option>
                                  <option value="Reunion" data-class="re">
                                    Reunion
                                  </option>
                                  <option value="Romania" data-class="ro">
                                    Romania
                                  </option>
                                  <option
                                    value="Russian Federation"
                                    data-class="ru"
                                  >
                                    Russian Federation
                                  </option>
                                  <option value="Rwanda" data-class="rw">
                                    Rwanda
                                  </option>
                                  <option
                                    value="Saint Barthelemy"
                                    data-class="bl"
                                  >
                                    Saint Barthelemy
                                  </option>
                                  <option
                                    value="Saint Helena, Ascension And Tristan Da Cunha"
                                    data-class="sh"
                                  >
                                    Saint Helena, Ascension And Tristan Da Cunha
                                  </option>
                                  <option
                                    value="Saint Kitts And Nevis"
                                    data-class="kn"
                                  >
                                    Saint Kitts And Nevis
                                  </option>
                                  <option value="Saint Lucia" data-class="lc">
                                    Saint Lucia
                                  </option>
                                  <option value="Saint Martin" data-class="mf">
                                    Saint Martin
                                  </option>
                                  <option
                                    value="Saint Pierre and Miquelon"
                                    data-class="pm"
                                  >
                                    Saint Pierre and Miquelon
                                  </option>
                                  <option
                                    value="Saint Vincent And The Grenadines"
                                    data-class="vc"
                                  >
                                    Saint Vincent And The Grenadines
                                  </option>
                                  <option value="Samoa" data-class="ws">
                                    Samoa
                                  </option>
                                  <option value="San Marino" data-class="sm">
                                    San Marino
                                  </option>
                                  <option
                                    value="Sao Tome And Principe"
                                    data-class="st"
                                  >
                                    Sao Tome And Principe
                                  </option>
                                  <option value="Saudi Arabia" data-class="sa">
                                    Saudi Arabia
                                  </option>
                                  <option value="Senegal" data-class="sn">
                                    Senegal
                                  </option>
                                  <option value="Serbia" data-class="rs">
                                    Serbia
                                  </option>
                                  <option value="Seychelles" data-class="sc">
                                    Seychelles
                                  </option>
                                  <option value="Sierra Leone" data-class="sl">
                                    Sierra Leone
                                  </option>
                                  <option value="Singapore" data-class="sg">
                                    Singapore
                                  </option>
                                  <option value="Sint Maarten" data-class="sx">
                                    Sint Maarten
                                  </option>
                                  <option value="Slovakia" data-class="sk">
                                    Slovakia
                                  </option>
                                  <option value="Slovenia" data-class="si">
                                    Slovenia
                                  </option>
                                  <option
                                    value="Solomon Islands"
                                    data-class="sb"
                                  >
                                    Solomon Islands
                                  </option>
                                  <option value="Somalia" data-class="so">
                                    Somalia
                                  </option>
                                  <option value="South Africa" data-class="za">
                                    South Africa
                                  </option>
                                  <option
                                    value="South Georgia and the South Sandwich Islands"
                                    data-class="gs"
                                  >
                                    South Georgia and the South Sandwich Islands
                                  </option>
                                  <option value="South Sudan" data-class="ss">
                                    South Sudan
                                  </option>
                                  <option value="Spain" data-class="es">
                                    Spain
                                  </option>
                                  <option value="Sri Lanka" data-class="lk">
                                    Sri Lanka
                                  </option>
                                  <option value="Sudan" data-class="sd">
                                    Sudan
                                  </option>
                                  <option value="Suriname" data-class="sr">
                                    Suriname
                                  </option>
                                  <option
                                    value="Svalbard And Jan Mayen"
                                    data-class="sj"
                                  >
                                    Svalbard And Jan Mayen
                                  </option>
                                  <option value="Swaziland" data-class="sz">
                                    Swaziland
                                  </option>
                                  <option value="Sweden" data-class="se">
                                    Sweden
                                  </option>
                                  <option value="Switzerland" data-class="ch">
                                    Switzerland
                                  </option>
                                  <option
                                    value="Syrian Arab Republic"
                                    data-class="sy"
                                  >
                                    Syrian Arab Republic
                                  </option>
                                  <option value="Taiwan" data-class="tw">
                                    Taiwan
                                  </option>
                                  <option value="Tajikistan" data-class="tj">
                                    Tajikistan
                                  </option>
                                  <option
                                    value="Tanzania, United Republic Of"
                                    data-class="tz"
                                  >
                                    Tanzania, United Republic Of
                                  </option>
                                  <option value="Thailand" data-class="th">
                                    Thailand
                                  </option>
                                  <option value="Timor-Leste" data-class="tl">
                                    Timor-Leste
                                  </option>
                                  <option value="Togo" data-class="tg">
                                    Togo
                                  </option>
                                  <option value="Tokelau" data-class="tk">
                                    Tokelau
                                  </option>
                                  <option value="Tonga" data-class="to">
                                    Tonga
                                  </option>
                                  <option
                                    value="Trinidad And Tobago"
                                    data-class="tt"
                                  >
                                    Trinidad And Tobago
                                  </option>
                                  <option value="Tunisia" data-class="tn">
                                    Tunisia
                                  </option>
                                  <option value="Turkey" data-class="tr">
                                    Turkey
                                  </option>
                                  <option value="Turkmenistan" data-class="tm">
                                    Turkmenistan
                                  </option>
                                  <option
                                    value="Turks and Caicos Islands"
                                    data-class="tc"
                                  >
                                    Turks and Caicos Islands
                                  </option>
                                  <option value="Tuvalu" data-class="tv">
                                    Tuvalu
                                  </option>
                                  <option value="Uganda" data-class="ug">
                                    Uganda
                                  </option>
                                  <option value="Ukraine" data-class="ua">
                                    Ukraine
                                  </option>
                                  <option
                                    value="United Arab Emirates"
                                    data-class="ae"
                                  >
                                    United Arab Emirates
                                  </option>
                                  <option
                                    value="United Kingdom"
                                    data-class="gb"
                                  >
                                    United Kingdom
                                  </option>
                                  <option value="United States" data-class="us">
                                    United States
                                  </option>
                                  <option
                                    value="United States Minor Outlying Islands"
                                    data-class="um"
                                  >
                                    United States Minor Outlying Islands
                                  </option>
                                  <option value="Uruguay" data-class="uy">
                                    Uruguay
                                  </option>
                                  <option value="Uzbekistan" data-class="uz">
                                    Uzbekistan
                                  </option>
                                  <option value="Vanuatu" data-class="vu">
                                    Vanuatu
                                  </option>
                                  <option
                                    value="Venezuela, Bolivarian Republic Of"
                                    data-class="ve"
                                  >
                                    Venezuela, Bolivarian Republic Of
                                  </option>
                                  <option value="Viet Nam" data-class="vn">
                                    Viet Nam
                                  </option>
                                  <option
                                    value="Virgin Islands, British"
                                    data-class="vg"
                                  >
                                    Virgin Islands, British
                                  </option>
                                  <option
                                    value="Virgin Islands, U.S."
                                    data-class="vi"
                                  >
                                    Virgin Islands, U.S.
                                  </option>
                                  <option
                                    value="Wallis and Futuna"
                                    data-class="wf"
                                  >
                                    Wallis and Futuna
                                  </option>
                                  <option
                                    value="Western Sahara"
                                    data-class="eh"
                                  >
                                    Western Sahara
                                  </option>
                                  <option value="Yemen" data-class="ye">
                                    Yemen
                                  </option>
                                  <option value="Zambia" data-class="zm">
                                    Zambia
                                  </option>
                                  <option value="Zimbabwe" data-class="zw">
                                    Zimbabwe
                                  </option>
                                </select>
                              ) : (
                                <select
                                  className="selectize disabled data-input"
                                  disabled
                                >
                                  <option
                                    value={
                                      formData?.country
                                        ? formData.country
                                        : "None"
                                    }
                                    data-class="af"
                                  >
                                    {formData?.country
                                      ? formData.country
                                      : "None"}
                                  </option>
                                </select>
                              )}
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
                                <input
                                  type="password"
                                  onChange={(e) => {
                                    setPasswordData(e);
                                  }}
                                  className=" data-input"
                                />
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
