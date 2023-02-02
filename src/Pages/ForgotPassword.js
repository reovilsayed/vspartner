import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../lib/queryClient";
import requests from "../services/httpService";
import Cookies from 'universal-cookie';

function ForgotPassword() {
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const cookies = new Cookies();
    useEffect(() => {
        if (authHeader()) {
            notify("You are already logged in", true);
            navigate("/");
        }
    });
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    };
    const handleRecover = async () => {
        if (email) {
            await requests
                .post(`send-reset-code`, {email: email})
                .then((res) => {
                    if (res) {
                        notify(res.message);
                        cookies.set('partner_email', email, {path: '/'});
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
        }
    };
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
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                        <div className="login_pages_contents_inr11">
                            <div className="login_pages_contents_inr">
                                <a href="dashboard.html" className="main_img">
                                    <img src="images/logo_log.svg" alt="" />
                                </a>
                                <div className="login_pages_contents_hdngg">
                                    <h5>Forgotten Password?</h5>
                                    <p>
                                        To recover your password, please enter
                                        the email <br /> address associated with
                                        your account:
                                    </p>
                                </div>
                                <form>
                                    <div className="login_pages_contents_inr_form">
                                        <div className="row login_pages_contents_inr_form_row">
                                            <div className="col-lg-12 login_pages_contents_inr_form_col">
                                                <div className="input_form_holderr">
                                                    <h6>Email Address</h6>
                                                    <input
                                                        type="email"
                                                        onChange={(e) =>
                                                            handleEmailChange(e)
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 login_pages_contents_inr_form_col">
                                                <span
                                                    onClick={handleRecover}
                                                    className="form_submit"
                                                >
                                                    {" "}
                                                    Recover Password
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

export default ForgotPassword;
