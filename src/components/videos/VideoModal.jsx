import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import { useCreate } from "../../hooks/useUpdate";
import { VideoContext } from "../../App";
import useFetch from "../../hooks/useFetch";
import requests from "../../services/httpService";
import getImageURL, {
    getAffermation,
    notify,
    plainDateTime,
    styledDateTime,
} from "../../lib/queryClient";
import VideoPlayer from "./VideoPlayer";

const VideoModal = (props) => {
    const [toggleWeTransfer, settoggleWeTransfer] = useState(false);
    const authHeader = useAuthHeader();
    const sendNotification = async (video_id) => {
        await requests.post(
            "/send-notification",
            { video_id: video_id },
            { token: authHeader() }
        );
        notify();
    };
    const { videoDetails } = useContext(VideoContext);
    const { id, title, thumbnail, email, first_name, last_name, created_at } =
        videoDetails;
    const { data: video } = useFetch(["video", id], `/video/${id}`);
    const { status } = video || {};
    console.log(video);

    const { mutateAsync: mutateNote } = useCreate("note");
    const createNote = async (payload) => {
        mutateNote({ payload }).finally(() => {
            // refetch();
            // refetchEarning();
        });
    };
    const [tabItem, setTabItem] = useState(1);
    const [showNotForCopyWriterInput, setShowNotForCopyWriterInput] =
        useState(false);
    const [showNotForEditorInput, setShowNotForEditorInput] = useState(false);
    const filterNote = (notes, key) => {
        if (notes) {
            const filtered_note = notes.filter((note) => {
                return note.note_key === key;
            });
            if (filtered_note.length > 0) {
                return filtered_note[0].note;
            }
        }
    };
    const [editableFields, setEditableFields] = useState({});

    const handleOnChange = (e) => {
        setEditableFields({
            ...editableFields,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            <Modal
                fullscreen={true}
                show={props.show}
                onHide={() => props.toggle()}
            >
                <Modal.Body>
                    <div className="fluid_container">
                        <div className="panel_right_spacing">
                            <div className="panel_flex flex-start">
                                <div className="left-panel sticky_box">
                                    <div className="panel-box">
                                        <div className="single-video-box">
                                            <VideoPlayer
                                                src={`${process.env.REACT_APP_VIDEO_BASE}${video?.converted_url}`}
                                                poster={getImageURL(thumbnail)}
                                            />
                                        </div>
                                        <div className="btn-wrap">
                                            <a
                                                href={`https://downloads.viralsnare.com/${video?.video}`}
                                                className="btn-outline btn-outline-blue"
                                            >
                                                <img
                                                    src="images/icon-download.svg"
                                                    className="icon"
                                                    alt=""
                                                />
                                                Download Videos
                                            </a>
                                            <a
                                                className="btn-outline btn-outline-red"
                                                onClick={() =>
                                                    sendNotification(video?.id)
                                                }
                                            >
                                                <img
                                                    src="images/icon-bell.svg"
                                                    className="icon"
                                                    alt=""
                                                />
                                                Send Notifications
                                            </a>
                                        </div>
                                    </div>
                                    <div className="panel-box-info">
                                        <div className="line-header">
                                            <h5>
                                                <span>About Video</span>
                                            </h5>
                                        </div>
                                        <div className="panel-box-info-wrap">
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>
                                                        Title of the video :
                                                    </span>
                                                    {video?.title
                                                        ? video.title
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Filming Date : </span>
                                                    {video?.when_filmed
                                                        ? video.when_filmed
                                                              .split("-")
                                                              .join("/")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>
                                                        Filming Location :{" "}
                                                    </span>
                                                    {video?.city
                                                        ? video.city
                                                        : "N/A"}
                                                    ,{" "}
                                                    {video?.state
                                                        ? video.state
                                                        : "N/A"}
                                                    ,{" "}
                                                    {video?.country
                                                        ? video.country
                                                        : "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="story-description">
                                            <div className="story-description-scroll">
                                                <div className="story-description-info">
                                                    <label>
                                                        Story/Description:
                                                    </label>
                                                    <div className="story-description-info-content">
                                                        <div className="overflow_scroll">
                                                            <p>
                                                                {video?.description
                                                                    ? video.description
                                                                    : "N/A"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="btn-wrap inline_popup"
                                            data-pop-block="url_note"
                                        >
                                            <a
                                                href={`https://downloads.viralsnare.com/${video?.video}`}
                                                className="btn-outline btn-outline-blue"
                                                data-btn="url_note"
                                            >
                                                <img
                                                    src="images/icon-file-link.svg"
                                                    className="icon"
                                                    alt=""
                                                />
                                                Original File
                                            </a>
                                            <div
                                                className="super_admin_note"
                                                data-modal="url_note"
                                            >
                                                <div className="panel-box-info panel-box-info-xs-spacing mt-0">
                                                    <div className="line-header">
                                                        <h5>
                                                            <span>
                                                                Original Video
                                                                File
                                                            </span>
                                                        </h5>
                                                    </div>
                                                    <form>
                                                        <div className="form-field">
                                                            <input
                                                                type="text"
                                                                placeholder="Enter link"
                                                                data-text="url_note"
                                                            />
                                                        </div>
                                                        <div className="message-note-btn">
                                                            <button
                                                                type="button"
                                                                className="btn-outline btn-outline-blue"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn-outline btn-outline-red"
                                                                data-cancel="url_note"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="right-panel">
                                    <div className="panel-box-info panel-box-info-xs-spacing mt-0">
                                        <div className="line-header">
                                            <h5>
                                                <span>About User</span>
                                            </h5>
                                            <button
                                                onClick={() => props.toggle()}
                                                className="cross"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <img
                                                    src="images/circle-cross.svg"
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                        <div className="panel-box-info-wrap column-4 border-b-0">
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Client Name :</span>
                                                    {video?.first_name}{" "}
                                                    {video?.last_name}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Email Address: </span>
                                                    {video?.email}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Phone Number :</span>
                                                    {video?.phone}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Date of Birth :</span>
                                                    {video?.birthdate
                                                        ? video.birthdate
                                                              .split("-")
                                                              .join("/")
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>
                                                        Payment Method :{" "}
                                                    </span>{" "}
                                                    {video?.payment_method ==
                                                    "paypal-content" ? (
                                                        <img
                                                            src="images/payment/paypal.png"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                    {video?.payment_method ==
                                                    "bank-transfer" ? (
                                                        <img
                                                            src="images/payment/bank.png"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                    {video?.payment_method ==
                                                    "transfer-wisp-content" ? (
                                                        <img
                                                            src="images/payment/transferwise.png"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>
                                                        Paypal Email Address :
                                                    </span>{" "}
                                                    {video?.paypal_email
                                                        ? video.paypal_email
                                                        : "N/A"}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Signature : </span>{" "}
                                                    {video?.signature ? (
                                                        <img
                                                            src={getImageURL(
                                                                video.signature
                                                            )}
                                                            className="signs"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="panel-box-info-wrap-col">
                                                <p>
                                                    <span>Video Credit :</span>
                                                    {video?.person_who_filmed
                                                        ? video.person_who_filmed
                                                        : "person_who_filmed"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-box-info panel-box-info-xxs-spacing theaming-red-box">
                                        <div className="line-header">
                                            <h5>
                                                <span>
                                                    Copyrights Ownership
                                                </span>
                                            </h5>
                                        </div>
                                        <div className="column-wrap">
                                            <div className="panel-box-info-wrap column-2">
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Are There People
                                                            Appearing In the
                                                            Video?{" "}
                                                        </span>{" "}
                                                        {getAffermation(
                                                            video?.people_appearing
                                                        ) ? (
                                                            <mark className="stripe-btn-danger">
                                                                {video?.people_appearing
                                                                    ? video?.people_appearing
                                                                    : "No"}
                                                            </mark>
                                                        ) : (
                                                            <span>
                                                                {video?.people_appearing
                                                                    ? video?.people_appearing
                                                                    : "No"}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                {video?.people_appearing_list && (
                                                    <div className="panel-box-info-wrap-col m-0">
                                                        <p>
                                                            <span>
                                                                Who Are They?{" "}
                                                            </span>
                                                            {video?.people_appearing_list
                                                                ? video?.people_appearing_list
                                                                : "N/A"}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="panel-box-info-wrap column-2">
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            The person who
                                                            filmed this video is{" "}
                                                        </span>{" "}
                                                        {video?.person_who_filmed
                                                            ? video?.person_who_filmed
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="panel-box-info-wrap column-2">
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Did Anyone Reach You
                                                            About Using This
                                                            Video?
                                                        </span>{" "}
                                                        {getAffermation(
                                                            video?.did_anyone_reach
                                                        ) ? (
                                                            <mark className="stripe-btn-danger">
                                                                {video?.did_anyone_reach
                                                                    ? video?.did_anyone_reach
                                                                    : "N/A"}
                                                            </mark>
                                                        ) : (
                                                            <span>
                                                                {video?.did_anyone_reach
                                                                    ? video?.did_anyone_reach
                                                                    : "N/A"}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                {video?.share_reach_name && (
                                                    <>
                                                        <div className="panel-box-info-wrap-col m-0">
                                                            <p>
                                                                <span>
                                                                    Please Share
                                                                    With Us The
                                                                    Name Of The
                                                                    Company/Page:
                                                                </span>{" "}
                                                                {video?.share_reach_name
                                                                    ? video?.share_reach_name
                                                                    : "N/A"}
                                                            </p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                            <div className="panel-box-info-wrap column-2">
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        Did You
                                                        Send/Submit/Upload This
                                                        Video To A Website
                                                        And/Or Social Media
                                                        Account?{" "}
                                                        {getAffermation(
                                                            video?.submit_other_website
                                                        ) ? (
                                                            <mark className="stripe-btn-danger">
                                                                {video?.submit_other_website
                                                                    ? video?.submit_other_website
                                                                    : "N/A"}
                                                            </mark>
                                                        ) : (
                                                            <span>
                                                                {video?.submit_other_website
                                                                    ? video?.submit_other_website
                                                                    : "N/A"}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                {video?.submit_place && (
                                                    <div className="panel-box-info-wrap-col m-0">
                                                        <p>
                                                            <span>
                                                                Where Did You
                                                                Submit It?{" "}
                                                            </span>
                                                            {video?.submit_place
                                                                ? video?.submit_place
                                                                : ""}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="panel-box-info-wrap column-2">
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Did You Sign A
                                                            Licensing Agreement
                                                            For This Video With
                                                            Another
                                                            Company/Page?
                                                        </span>
                                                        {getAffermation(
                                                            video?.aggrement_with_another_company
                                                        ) ? (
                                                            <mark className="stripe-btn-danger">
                                                                {video?.aggrement_with_another_company
                                                                    ? video?.aggrement_with_another_company
                                                                    : "N/A"}
                                                            </mark>
                                                        ) : (
                                                            <span>
                                                                {video?.aggrement_with_another_company
                                                                    ? video?.aggrement_with_another_company
                                                                    : "N/A"}
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Name of the company?{" "}
                                                        </span>{" "}
                                                        {video?.aggrement_company_name
                                                            ? video?.aggrement_company_name
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-box-info panel-box-info-xxs-spacing">
                                        <div className="line-header">
                                            <h5>
                                                <span>
                                                    Submission Information
                                                </span>
                                            </h5>
                                        </div>
                                        <div className="column-wrap">
                                            <div className="panel-box-info-wrap column-4">
                                                <div className="panel-box-info-wrap-col mb-md-0 mb-3">
                                                    <p>
                                                        <span>
                                                            User IP address :{" "}
                                                        </span>{" "}
                                                        {video?.video_meta
                                                            ?.ip_address
                                                            ? video?.video_meta
                                                                  ?.ip_address
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col mb-md-0 mb-3">
                                                    <p>
                                                        <span>Country : </span>{" "}
                                                        {video?.country
                                                            ? video.country
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Submission date :
                                                        </span>{" "}
                                                        {plainDateTime(
                                                            video?.created_at
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Terms of Submission
                                                            :
                                                        </span>{" "}
                                                        Agreed | Exclusive
                                                        License
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="panel-box-info-wrap column-4">
                                                <div className="panel-box-info-wrap-col mb-md-0 mb-3">
                                                    <p>
                                                        <span>
                                                            Terms of Service :
                                                        </span>
                                                        Agreed
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col mb-md-0 mb-3">
                                                    <p>
                                                        <span>
                                                            Revenue Share:{" "}
                                                        </span>{" "}
                                                        {video?.user
                                                            ?.revenue_share
                                                            ? video?.user
                                                                  ?.revenue_share +
                                                              "%"
                                                            : "N/A"}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>VSID : </span>{" "}
                                                        {video?.id}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0"></div>
                                            </div>
                                            {/* <div className='panel-box-info-wrap column-1'>
												<div className='panel-box-info-wrap-col-strip'>
													<div className='stript-info'>
														<span>*Heads-up! We Have received one or more submissions from this user</span>
														<a href='#'> VSID:15645,</a>
														<a href='#'>VSID:54689,</a>
														<a href='#'>VSID:15486</a>
														<span>*</span>
													</div>
												</div>
											</div> */}
                                        </div>
                                    </div>
                                    <div className="panel-box-info panel-box-info-xxs-spacing csts">
                                        <div className="line-header">
                                            <h5>
                                                <span>Submission Status</span>
                                            </h5>
                                        </div>
                                        <div className="column-wrap">
                                            <div className="panel-box-info-wrap column-4 p-0">
                                                <div className="panel-box-info-wrap-col mb-md-0 mb-3">
                                                    <p>
                                                        <span>
                                                            Video Status :{" "}
                                                        </span>
                                                        {video?.status == 1 && (
                                                            <>
                                                                <mark className="stripe-btn-success">
                                                                    Approved
                                                                </mark>
                                                            </>
                                                        )}
                                                        {video?.status == 0 && (
                                                            <>
                                                                <mark className="stripe-btn">
                                                                    Pending
                                                                </mark>
                                                            </>
                                                        )}
                                                        {video?.status == 2 && (
                                                            <>
                                                                <mark className="stripe-btn-danger">
                                                                    Rejected
                                                                </mark>
                                                            </>
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col mb-md-0 mb-3">
                                                    <p>
                                                        <span>
                                                            Acquired By :{" "}
                                                        </span>{" "}
                                                        {video?.user?.name}{" "}
                                                        {video?.user?.last_name}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            approved or rejected
                                                            By :
                                                        </span>{" "}
                                                        {video?.manager?.name}{" "}
                                                        {
                                                            video?.manager
                                                                ?.last_name
                                                        }{" "}
                                                        {plainDateTime(
                                                            video?.video_meta
                                                                ?.manager_updated_at
                                                        )}
                                                    </p>
                                                </div>
                                                <div className="panel-box-info-wrap-col m-0">
                                                    <p>
                                                        <span>
                                                            Confirmed or
                                                            declined By :
                                                        </span>{" "}
                                                        {
                                                            video?.quality_team
                                                                ?.name
                                                        }{" "}
                                                        {
                                                            video?.quality_team
                                                                ?.last_name
                                                        }{" "}
                                                        {plainDateTime(
                                                            video?.video_meta
                                                                ?.quality_team_updated_at
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className='panel-box-info panel-box-info-xxs-spacing empty-data-panel'>
										<div className='line-header'>
											<h5>
												<span>Notes</span>
											</h5>
										</div>
										<div>
											<p>No Notes Available!</p>
										</div>
									</div>
									<div className='panel-box-info panel-box-info-xxs-spacing theaming-green'>
										<div className='line-header'>
											<h5>
												<span>Notes</span>
											</h5>
										</div>
										<div className='form-panel'>
											<ul className='tab_nav_list' data-tab-target='tabgroup2'>
												<li>
													<a href='#' className='active'>
														Editor
													</a>
												</li>
												<li>
													<a href='#'>Quality Team</a>
												</li>
												<li>
													<a href='#'>Manager</a>
												</li>
											</ul>
											<div className='notes_tab' data-tab-parent='tabgroup2'>
												<div className='tab_panel active'>
													<div className='form-info'>
														<p>
															Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
															dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
															book. It has survived not only five centuries, Lorem Ipsum is simply dummy text of the printing and typesetting
															industry. Lorem Ipsum has been the industry's standard dummy .
														</p>
													</div>
													<div className='form-btn-wrap'>
														<button type='button' className='btn-outline btn-outline-blue'>
															Acknowledged
														</button>
														<button type='button' className='btn-outline btn-outline-blue' data-bs-toggle='modal' data-bs-target='#messageNote'>
															Reply Now
														</button>
													</div>
												</div>
												<div className='tab_panel'>
													<div className='form-info'>
														<p>
															Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
															the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
															not only five centuries, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
															the industry's standard dummy .
														</p>
													</div>
													<div className='form-btn-wrap'>
														<button type='button' className='btn-outline btn-outline-blue'>
															Acknowledged
														</button>
														<button type='button' className='btn-outline btn-outline-blue' data-bs-toggle='modal' data-bs-target='#messageNote'>
															Reply Now
														</button>
													</div>
												</div>
												<div className='tab_panel'>
													<div className='form-info'>
														<p>
															Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
															type and scrambled it to make a type specimen book. It has survived not only five centuries, Lorem Ipsum is simply dummy
															text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy .
														</p>
													</div>
													<div className='form-btn-wrap'>
														<button type='button' className='btn-outline btn-outline-blue'>
															Acknowledged
														</button>
														<button type='button' className='btn-outline btn-outline-blue' data-bs-toggle='modal' data-bs-target='#messageNote'>
															Reply Now
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className='message-note'>
										<div className='row'>
											<div className='col-md-6 col-6 message-note-left inline_popup data-goto' data-pop-block='admin_note'>
												<a href='#' className='btn-outline btn-outline-blue' data-btn='admin_note'>
													Leave a Note for Super Admin
												</a>
												<div className='super_admin_note' data-modal='admin_note'>
													<div className='panel-box-info panel-box-info-xs-spacing mt-0'>
														<div className='line-header'>
															<h5>
																<span>Leave a Note for Super Admin</span>
															</h5>
														</div>
														<form>
															<div className='form-field'>
																<textarea placeholder='Type the Note here...............' data-text='admin_note'></textarea>
															</div>
															<div className='message-note-btn'>
																<button type='button' className='btn-outline btn-outline-blue'>
																	Send
																</button>
																<button type='button' className='btn-outline btn-outline-red' data-cancel='admin_note'>
																	Cancel
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
											<div className='col-md-6 col-6 message-note-right inline_popup data-goto' data-pop-block='leave_note'>
												<a href='#' className='btn-outline btn-outline-red' data-btn='leave_note'>
													Leave a Note for Manager
												</a>
												<div className='super_admin_note' data-modal='leave_note'>
													<div className='panel-box-info panel-box-info-xs-spacing mt-0'>
														<div className='line-header'>
															<h5>
																<span>Leave a Note for Manager</span>
															</h5>
														</div>
														<form>
															<div className='form-field'>
																<textarea placeholder='Type the Note here...............' data-text='leave_note'></textarea>
															</div>
															<div className='message-note-btn'>
																<button type='button' className='btn-outline btn-outline-blue'>
																	Send
																</button>
																<button type='button' className='btn-outline btn-outline-red' data-cancel='leave_note'>
																	Cancel
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default VideoModal;
