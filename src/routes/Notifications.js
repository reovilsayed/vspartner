import axios from "axios";
import { format, getDate, sub } from "date-fns";
import { getTime } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import Pagination from "../components/Pagination";
import useFetch from "../hooks/useFetch";
import getImageURL from "../lib/queryClient";
import requests from "../services/httpService";

function Notifications() {
  const authHeader = useAuthHeader();
  const [isFilter, setIsFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [filtersArray, setFiltersArray] = useState("");
  const noteTypesId = [5, 6, 7, 8, 13, 14, 16, 19, 20, 23, 24];

  const {
    data,
    refetch,
    isLoading: notificationsIsLoading,
  } = useFetch(
    ["notifications", filtersArray, currentPage, search],
    `/notifications?page=${currentPage}`,
    {
      notification_type_id: filtersArray,
      search,
    },
    {
      pagePrefetchKey: ["notifications", filtersArray, currentPage + 1, search],
    }
  );
  const { data: notificationTypes } = useFetch(
    ["notificationTypes"],
    `/notification-types`
  );
  const groupedData = {};
  data?.data?.forEach((notification) => {
    const today = format(new Date(), "dd.MM.yyyy");
    const yesterDay = sub(new Date(), {
      days: 1,
    });
    let dateOfNotification = format(
      new Date(notification.created_at),
      "dd.MM.yyyy"
    );
    dateOfNotification =
      today === dateOfNotification
        ? "Today"
        : dateOfNotification === yesterDay
        ? "Yesterday"
        : dateOfNotification;
    if (!groupedData?.[dateOfNotification]) {
      groupedData[dateOfNotification] = [];
    }
    groupedData?.[dateOfNotification].push(notification);
  });
  useEffect(() => {setCurrentPage(1); refetch()}, [search]);
  const toggleCheck = (filterNo) => {
    const updateItems = { ...filters, [filterNo]: !filters[filterNo] };
    const updateFilter = Object.keys(updateItems)
      .filter((item, index) => updateItems[item])
      .join(",");
    console.log(updateFilter);
    setFiltersArray(updateFilter);
    setFilters({ ...filters, [filterNo]: !filters[filterNo] });

    setCurrentPage(1);
  };
  // const [modelIsOpen, setModalIsOpen] = useState(false);
  const [editModal, setEditModal] = useState({ isOpen: false, data: {} });
  const [generalModal, setGeneralModal] = useState({ isOpen: false, data: {} });

  // const handleModalClose = () => setModalIsOpen(false);
  const handleEditModal = (id) => {
    const userData = data?.data.find((item) => item.id === id);
    setEditModal({
      ...editModal,
      isOpen: !editModal.isOpen,
      user: userData,
    });
  };
  const handleGeneralModal = () => {
    setGeneralModal({
      ...generalModal,
      isOpen: !generalModal.isOpen,
    });
  };
  useEffect(() => {
    if (notificationTypes?.length > 0) {
      const items = {};
      notificationTypes.forEach((item) => {
        items[item.id] = false;
      });
      setFilters(items);
    }
  }, [notificationTypes]);

  const handleGeneralModalOpen = () => {
    setGeneralModal({ isOpen: true });
  };
  const handleGeneralModalClose = () => {
    setGeneralModal({ isOpen: false });
  };

  const dismissNotification = (notification_id) => {
    const mes = requests.post(`notification-status-update`, {'notification_id': notification_id}, {token: authHeader()});
    console.log(mes);
    refetch();
  }

  return (
    <>
      <div className="dashboard_content dashboard_content_notification">
        <div className="dashboard_content_inner">
          <div className="notify_row">
            <div className="lft_notification_all">
              <div className="dash_head sec_title">
                <h4>Notifications</h4>
              </div>

              <div className="box_model box_model_notification">
                <div className="per_day_notif">
                  <ul className="notify_list">
                    <div className="notification_body_content">
                      {notificationsIsLoading ? (
                        <>
                          <div className="skeleton line-header">
                            <h5>
                              <span></span>
                            </h5>
                          </div>
                          <ul className="notify_list">
                            {[0, 0, 0, 0, 0].map((notification) => {
                              return (
                                <li>
                                  <div className="nof_ico">
                                    <i className="skeleton">
                                      <img src="images/rocket.svg" alt="" />
                                    </i>
                                  </div>
                                  <p className="skeleton">
                                    Your video submission (<a href="#">VSID</a>{" "}
                                    1523) has been approved.
                                  </p>
                                  <span className="skeleton nof_time">9.38 pm</span>
                                  <span className="nt_close" data-notify-close>
                                    <div className="skeleton">
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </div>
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      ) : (
                        Object.keys(groupedData)?.map((notificationGroup) => (
                          <React.Fragment key={notificationGroup}>
                            <div className="line-header">
                              <h5>
                                <span>{notificationGroup}</span>
                              </h5>
                            </div>
                            <ul className="notify_list">
                              {groupedData?.[notificationGroup]?.map(
                                (notification, index) => {
                                  return (notification.seen === 0 && notification.status === 0)? (
                                    <li key={index}>
                                      <div className="nof_ico">
                                        <i className="">
                                          <img src="images/rocket.svg" alt="" />
                                        </i>
                                      </div>
                                      <p className="">
                                        {notification.title}
                                      </p>
                                      {
                                        (noteTypesId.includes(notification.notification_type_id))? <a href="#" className="nof_inline_btn">Reply Now</a>: ''
                                      }
                                      <span className=" nof_time">{notification.created_at}</span>
                                      <span className="nt_close" onClick={() => {dismissNotification(notification.id)}}>
                                        <div className="">
                                          <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              clipRule="evenodd"
                                              d="M0.390524 0.390524C0.911223 -0.130175 1.75544 -0.130175 2.27614 0.390524L8 6.11438L13.7239 0.390524C14.2446 -0.130175 15.0888 -0.130175 15.6095 0.390524C16.1302 0.911223 16.1302 1.75544 15.6095 2.27614L9.88562 8L15.6095 13.7239C16.1302 14.2446 16.1302 15.0888 15.6095 15.6095C15.0888 16.1302 14.2446 16.1302 13.7239 15.6095L8 9.88562L2.27614 15.6095C1.75544 16.1302 0.911223 16.1302 0.390524 15.6095C-0.130175 15.0888 -0.130175 14.2446 0.390524 13.7239L6.11438 8L0.390524 2.27614C-0.130175 1.75544 -0.130175 0.911223 0.390524 0.390524Z"
                                              fill="currentColor"
                                            />
                                          </svg>
                                        </div>
                                      </span>
                                    </li>
                                  ): '';
                                }
                              )}
                            </ul>
                          </React.Fragment>
                        ))
                      )}
                    </div>
                    {data?.total > 12 && (
                      <Pagination
                        perPage={12}
                        total={data?.total}
                        currentPage={currentPage}
                        onChange={(e) => setCurrentPage(e)}
                      />
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="notification_filter_sec">
              <div className="notification_filter_inner">
                <div className="nt_scroller">
                  <div className="nt_sticky_top">
                    <div className="fltr_title">
                      <h4>Filter</h4>
                    </div>
                    <div className="search_box_inner notify_srch_box">
                      <input
                        type="text"
                        placeholder="Search Here......"
                        name
                        // value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <span
                        className="search_btn"
                        name
                        onClick={() => setSearch(search)}
                      >
                        <img src="images/search.svg" alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="filter_noti_list">
                    {notificationTypes?.map((type) => (
                      <div className="form_input_check">
                        <label key={type.id}>
                          {type.name}
                          <input
                            type="checkbox"
                            checked={filters[type.id]}
                            onClick={() => toggleCheck(type.id)}
                          />
                          <span>Approved Video</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
