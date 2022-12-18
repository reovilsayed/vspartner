import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const MessageModal = (props) => {
  


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Body>
                <div className="line-header">
                    <h5>
                        <span>New Inquiry?</span>
                    </h5>
                    <button
                        className="cross"
                        onClick={() => props.modal(false)}
                        aria-label="Close"
                    >
                        <img src="images/circle-cross.svg" alt="" />
                    </button>
                </div>
                <div className="inq_form_box">
                    <form>
                        <div className="input_group">
                            <input
                                type="text"
                                placeholder="Enter Subject"
                                onChange={(e) =>
                                    props.setInquiry({
                                        ...props.inquiry,
                                        subject: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="input_group">
                            <textarea
                                placeholder="Type the note here.........."
                                onChange={(e) =>
                                    props.setInquiry({
                                        ...props.inquiry,
                                        message: e.target.value,
                                    })
                                }
                            ></textarea>
                            <div className="file_attachment">
                                <svg
                                    width="21"
                                    height="21"
                                    viewBox="0 0 19 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1 1V6.88462C1 7.57826 1.27555 8.24349 1.76603 8.73397C2.25651 9.22445 2.92174 9.5 3.61538 9.5C4.30903 9.5 4.97426 9.22445 5.46474 8.73397C5.95522 8.24349 6.23077 7.57826 6.23077 6.88462V2.96154C6.23077 2.61472 6.09299 2.2821 5.84775 2.03686C5.60251 1.79162 5.2699 1.65385 4.92308 1.65385C4.57626 1.65385 4.24364 1.79162 3.9984 2.03686C3.75316 2.2821 3.61538 2.61472 3.61538 2.96154V7.53846M8.19231 1.65385H16.6923C17.0391 1.65385 17.3717 1.79162 17.617 2.03686C17.8622 2.2821 18 2.61472 18 2.96154V18.6538C18 19.0007 17.8622 19.3333 17.617 19.5785C17.3717 19.8238 17.0391 19.9615 16.6923 19.9615H3.61538C3.26856 19.9615 2.93595 19.8238 2.69071 19.5785C2.44547 19.3333 2.30769 19.0007 2.30769 18.6538V11.4615M14.7308 6.88462H9.5M14.7308 10.8077H9.5M14.7308 14.7308H5.57692"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                </svg>
                                <input id="inquiry_file" type="file" />
                            </div>
                        </div>
                        <div className="uploaded_file_info" id="uploaded_file_info">
                            <p>
                                <span className="file_name"></span>
                                <span className="file_size"></span>
                                <span className="file_del" id="file_del">
                                    <i className="far fa-trash-alt"></i>
                                </span>
                            </p>
                        </div>
                        <div className="input_group">
                            <input
                                type="submit"
                                value="Send Now"
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.handleFormSubmit()
                                }}
                            />
                        </div>
                    </form>
                </div>
            </Modal.Body>

        </Modal>
    );
};

export default MessageModal;