import { plainDateTime } from '../../lib/queryClient';
import icon from '../../assets/images/notify_popup_icon_1.png';
const GeneralNotificationModal = ({ data, handleModalClose }) => {
  return (
    <div
      id="video_notify_popup"
      style={{
        background: '#fff',
        width: '100%',
        maxWidth: 600,
        borderRadius: '25px',
      }}
      className=" add_member_pop notify_popup in"
      onClick={() => {
        handleModalClose();
      }}
    >
      <div className="" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content" style={{ borderRadius: '25px' }}>
       
          <div>
            <div
              className="video_notify_popup_col  text-center "
              style={{ padding: '20px 10px 20px 10px' }}
            >
              <img
                src={icon}
              />
              <h3>{data?.description}</h3>
              <div className="text-center">
                {plainDateTime(data?.created_at)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralNotificationModal;
