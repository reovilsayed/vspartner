import React from 'react';
import '../App.css';


function Login() {
  return (
    <div className='auth_body'>
    <div class="wrapper_scroll_cmn">    
        <div class="login_pages_contents">
            <img src="images/auth-page-bg.png" class="auth-page-bg" alt=""/>
            <div class="login_pages_contents_left">
                <ul class="circles_animated">
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
                <div class="login_pages_contents_inr11">
                    <div class="login_pages_contents_inr">
                        <a href="dashboard.html" class="main_img"><img src="images/logo_log.svg" alt=""/></a>
                        <div class="login_pages_contents_hdngg">
                            <h5>Login</h5>
                            <p>Welcome back! please enter your details</p>
                        </div>
                        <form>
                            <div class="login_pages_contents_inr_form">
                                <div class="row login_pages_contents_inr_form_row">
                                    <div class="col-lg-12 login_pages_contents_inr_form_col">
                                        <div class="input_form_holderr">
                                            <h6>Email Address</h6>
                                            <input type="email" placeholder="company@example.com"/>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 login_pages_contents_inr_form_col">
                                        <div class="input_form_holderr password_hold" data-toggle-password>
                                            <h6>Password</h6>
                                            <input type="password" placeholder="*********" id="myInput"/>
                                            <a href="Javascript:void(0);" class="toggle_open_eye"></a>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 login_pages_contents_inr_form_col">
                                        <div class="row remember_pass_row">
                                            <div class="col-6 remember_pass_col_in">
                                                <div class="custom_checked_remmbr">
                                                    <div class="form_input_check">
                                                        <label>
                                                            <input type="checkbox" checked=""/>
                                                            <span>Remember session?</span>
                                                        </label>
                                                    </div>  
                                                </div>
                                            </div>

                                            <div class="col-6 remember_pass_col_in">
                                                <a href="forgot_password.html" class="cmn_anc_nn">Forgot password?</a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-lg-12 login_pages_contents_inr_form_col">
                                        <button type="submit">Sign in</button>
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
  )
}

export default Login
