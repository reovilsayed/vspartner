import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../lib/queryClient";
import requests from "../services/httpService";

function RecoverPassword() {
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        reset_code: "",
        password: "",
    });
    const handleEmailChange = (e) => {
        e.preventDefault();
        setFormData((curr) => {
            return { ...formData, email: e.target.value };
        });
    };
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
        // console.log(formData);
        if (formData) {
            await requests
                .post(`reset-password`, { ...formData })
                .then((res) => {
                    if (res) {
                        notify(res.message);
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
                                                    <h6>Email Address</h6>
                                                    <input
                                                        type="text"
                                                        placeholder="Your email address"
                                                        onChange={(e) =>
                                                            handleEmailChange(e)
                                                        }
                                                    />
                                                </div>
                                            </div>
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
