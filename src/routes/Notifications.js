import axios from "axios";
import { format, sub } from "date-fns";
import { getTime } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import { useAuthHeader } from "react-auth-kit";
import Pagination from "../components/Pagination";
import useFetch from "../hooks/useFetch";
import getImageURL from "../lib/queryClient";

function Notifications() {
  const [isFilter, setIsFilter] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [filtersArray, setFiltersArray] = useState("");

  const { data, refetch } = useFetch(
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
  useEffect(() => setCurrentPage(1), [search]);
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
                    {data?.total > 0 ? (
                      <div className="notification_body_content">
                        {Object.keys(groupedData)?.map((notificationGroup) => (
                          <React.Fragment key={notificationGroup}>
                            <h2>{notificationGroup}</h2>
                            <div
                              className={`mobile_filter_btn ${
                                isFilter ? "active" : ""
                              }`}
                              onClick={() => setIsFilter(!isFilter)}
                            >
                              Filter
                            </div>
                            {groupedData?.[notificationGroup]?.map(
                              (notification) =>
                                notification?.video_id ? (
                                  <a
                                    onClick={() =>
                                      setEditModal({
                                        isOpen: true,
                                        data: notification,
                                      })
                                    }
                                    href="javascript:void(0)"
                                    className="noti_body_content_col video_notification"
                                    data-toggle="modal"
                                    data-target="#video_notify_popup"
                                  >
                                    <div className="noti_body_content_col_image">
                                      <img
                                        src={getImageURL(
                                          notification?.video?.thumbnail
                                        )}
                                        alt=""
                                      />
                                    </div>
                                    <div className="noti_body_content_col_content">
                                      <h3>
                                        Video ID:{" "}
                                        <strong>{notification.video_id}</strong>
                                      </h3>
                                      <h4>{notification.title}...</h4>
                                    </div>
                                    <p>
                                      From:{" "}
                                      {notification.user?.name +
                                        " " +
                                        notification.user.last_name}
                                      <br />
                                      {format(
                                        new Date(notification.created_at),
                                        "hh:mm a"
                                      )}
                                    </p>
                                  </a>
                                ) : (
                                  <a
                                    key={notification.id}
                                    href="javascript:void(0)"
                                    onClick={() =>
                                      setGeneralModal({
                                        isOpen: true,
                                        data: notification,
                                      })
                                    }
                                    className="noti_body_content_col"
                                    data-toggle="modal_general"
                                    data-target="#notify_general_popup"
                                  >
                                    <div className="noti_body_content_col_image">
                                      <img
                                        src={getImageURL(
                                          notification?.user?.avatar
                                        )}
                                        alt=""
                                      />
                                    </div>
                                    <div className="noti_body_content_col_content">
                                      <h3>{notification.description}</h3>
                                      <h4>
                                        {notification.user?.name +
                                          " " +
                                          notification.user.last_name}
                                      </h4>
                                    </div>
                                    <p>
                                      {format(
                                        new Date(notification.created_at),
                                        "hh:mm a"
                                      )}
                                    </p>
                                  </a>
                                )
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          height: "80vh",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <h2>No notifications available!</h2>
                      </div>
                    )}
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
                        onBlur={(e) => setSearch(e.target.value)}
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
