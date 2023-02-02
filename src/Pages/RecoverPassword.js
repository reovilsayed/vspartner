import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie/cjs/Cookies";
import { notify } from "../lib/queryClient";
import requests from "../services/httpService";

function RecoverPassword() {
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [formData, setFormData] = useState({
        email: '',
        reset_code: "",
        password: "",
    });
    const handleResetCodeChange = (e) => {
        e.preventDefault();
        setFormData((curr) => {
            return { ...formData, reset_code: e.target.value };
        });
    };
    const handlePasswordChange = (e) => {
        e.preventDefault();
        setFormData((curr) => {
            return { ...formData, password: e.target.value };
        });
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((currShow) => {
            return !currShow;
        });
    };
    const handleReset = async () => {
        let email = cookies.get('partner_email');
        if (!email) {
            notify('Please try again', true);
            navigate('/forgot-password');
        }
        if (formData) {
            await requests
                .post(`reset-password`, { ...formData, email: email })
                .then((res) => {
                    if (res) {
                        notify(res.message);
                        cookies.remove('partner_email')
                        navigate("/login");
                    } else {
                        notify(res.message, true);
                    }
                })
                .catch((res) => {
                    if (res) {
                        notify(res.message, true);
                    } else {
                        notify(res.message, true);
                    }
                });
        }
    };
    
    const resendCode = async () => {
        let email = cookies.get('partner_email');
        if (email) {
            await requests
                .post(`send-reset-code`, {email: email})
                .then((res) => {
                    if (res) {
                        notify(res.message);
                        navigate('/recover-password');
                    } else {
                        notify(res.message, true);
                    }
                })
                .catch((res) => {
                    if (res) {
                        notify('User not found. Please try different email', true);
                    } else {
                        notify('User not found. Please try different email', true);
                    }
                });
        } else {
            notify('Please try again', true);
            navigate('/forgot-password');
        }
    };
    useEffect(() => {
        if (authHeader()) {
            notify("You are already logged in", true);
            navigate("/");
        }
    });
    return (
        <div className="auth_body">
            <div className="wrapper_scroll_cmn hidden">
                <div className="login_pages_contents">
                    <img
                        src="images/auth-page-bg.png"
                        className="auth-page-bg"
                        alt=""
                    />
                    <div className="login_pages_contents_left">
                        <ul className="circles_animated">
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                            <li />
                        </ul>
                        <div className="login_pages_contents_inr11">
                            <div className="login_pages_contents_inr">
                                <Link to={'/'} className="main_img">
                                    <img src="images/logo_log.svg" alt="" />
                                </Link>
                                <div className="login_pages_contents_hdngg">
                                    <h5>Reset Password?</h5>
                                    <p>
                                        To reset your password, please enter the
                                        OTP sent to <br /> the email address
                                        associated with your account:
                                    </p>
                                </div>
                                <form>
                                    <div className="login_pages_contents_inr_form">
                                        <div className="row login_pages_contents_inr_form_row">
                                            <div className="col-lg-12 login_pages_contents_inr_form_col">
                                                <div className="input_form_holderr password_hold">
                                                    <h6>OTP</h6>
                                                    <input
                                                        type="text"
                                                        placeholder="The OTP sent to your email address"
                                                        onChange={(e) =>
                                                            handleResetCodeChange(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 login_pages_contents_inr_form_col">
                                                <div
                                                    className="input_form_holderr password_hold"
                                                    data-toggle-password=""
                                                >
                                                    <h6>New Password</h6>
                                                    <input
                                                        type={
                                                            showPassword
                                                                ? "text"
                                                                : "password"
                                                        }
                                                        onChange={(e) =>
                                                            handlePasswordChange(
                                                                e
                                                            )
                                                        }
                                                        placeholder="*********"
                                                    />
                                                    <a
                                                        onClick={
                                                            handleShowPassword
                                                        }
                                                        className="toggle_open_eye"
                                                    />
                                                </div>
                                            </div>
                      <div className="col-lg-12 login_pages_contents_inr_form_col">
                        <div className="row remember_pass_row login_pages_contents_hdngg">
                          <div className="col-6 remember_pass_col_in">
                            <p>Didn't recieve an OTP</p>
                            </div>
                          <div className="col-6 remember_pass_col_in">
                       
                              <span className="cmn_anc_nn" onClick={resendCode}>Resend Code?</span>
                         
                          </div>
                          </div>
                          </div>
                                            <div className="col-lg-12 login_pages_contents_inr_form_col">
                                                <span
                                                    className="form_submit"
                                                    onClick={handleReset}
                                                >
                                                    Reset Password
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecoverPassword;
