import React from 'react';
import { useUpdateStatus } from '../../hooks/useUpdate'; 
import getImageURL from '../../lib/queryClient'; 

const VideoNotificationModal = ({ data, refetch }) => {
  const { mutateAsync } = useUpdateStatus('notification');

  const handleUpdateStatus = async ({ id, status }) => {
    mutateAsync({ id, status }).finally(() => refetch());
  };
  return (
    <div
      id="video_notify_popup"
      style={{ background: '#fff', width: '100%', maxWidth: 600 }}
      className=" add_member_pop notify_popup in"
    >
      <div className="">
        <div className="modal-content">
          <div className="add_member_body">
            <div className="video_notify_popup_col">
              <div className="video_notify_popup_col_image">
                <img src={getImageURL(data?.video?.thumbnail)} alt="" />
              </div>
              <div className="video_notify_popup_col_content">
                <h3>
                  Video ID: <strong>{data?.id}</strong>
                </h3>
                <h3>
                  Subject: <strong>{data?.title}</strong>
                </h3>
                <h3>
                  From:{' '}
                  <strong>
                    {data?.user?.name + ' ' + data?.user.last_name}
                  </strong>
                </h3>
              </div>
              <p>{data.description}</p>
            </div>
          </div>
          <div className="video_notify_popup_col_btn">
            {/* <a
              onClick={() =>
                handleUpdateStatus({ id: data?.video?.id, status: 1 })
              }
              href="javascript:void(0)"
            >
              Respond
            </a> */}
            <a
              onClick={() =>
                handleUpdateStatus({ id: data?.video?.id, status: 0 })
              }
              href="javascript:void(0)"
            >
              On it
            </a>
            <a
              onClick={() =>
                handleUpdateStatus({ id: data?.video?.id, status: 1 })
              }
              href="javascript:void(0)"
            >
              Done
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoNotificationModal;
