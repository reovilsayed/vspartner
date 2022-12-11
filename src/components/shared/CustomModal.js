import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '20%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    maxWidth: '790px',
    transform: 'translate(-50%, -5%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

function CustomModal({
  triggerButton,
  children,
  modalIsOpen,
  handleModalOpen: openModal,
  handleModalClose: closeModal,
  containerClass,
  containerId,
  style = {},
}) {
  return (
    <div style={{ overflow: 'auto', ...style }}>
      <span style={{ cursor: 'pointer' }} onClick={openModal}>
        {triggerButton}
      </span>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          ...customStyles,
          content: { ...customStyles.content, ...style },
        }}
        contentLabel="Example Modal"
        className={containerClass}
        id={containerId || Math.random().toString(36).split(2)}
      >
        <button
          onClick={closeModal}
          type="button"
          className="close modal_close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
        {children}
      </Modal>
    </div>
  );
}

export default CustomModal;
