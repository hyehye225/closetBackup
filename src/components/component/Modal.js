import React from 'react';
import Modal from 'react-modal';

const Modal = (props) => {
  const [modal, setModal] = React.useState(true); // 모달창

  const modalOff = () => {
    setModal(false);
  };

  return (
    <>
      <Modal
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={modalOff}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 15, 15, 0.79)',
          },
          content: {
            position: 'absolute',
            top: '60px',
            left: '35%',
            width: '30%',
            height: '80%',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
          },
        }}
      ></Modal>
    </>
  );
};

export default Modal;
