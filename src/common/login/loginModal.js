import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';

export default function AddModal() {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    console.log('opening model');
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {openModal()}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <Button onClick={closeModal}>close</Button>
        <div>I am a modal</div>
        <form>
          <input />
          {/* eslint-disable-next-line react/button-has-type */}
          <Button>tab navigation</Button>
          <Button>stays</Button>
          <Button>inside</Button>
          <Button>the modal</Button>
        </form>
      </Modal>
    </div>
  );
}
