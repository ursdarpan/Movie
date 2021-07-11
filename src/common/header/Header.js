/* eslint-disable react/prop-types */
// Header indicating logo and buttons

import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import BasicTabs from '../login/ModalForm';
import logo from '../../assets/logo.svg';
import './Header.css';

Modal.setAppElement('body');
const Header = ({ showButton = 'none', buttonName = 'Login' }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';

  }

  function closeModal() {
    setIsOpen(false);
  }

  function buttonShow() {
    const x = document.getElementById('bookButton');
    if (showButton === 'none') {
      x.style.display = 'none';
    }
    if (showButton === 'block') {
      x.style.display = 'block';
    }
  }

  useEffect(() => {
    buttonShow();
  }, [showButton]);

  return (
    <div>
      <div className="heading-container">
        <div className="logo-container">
          <div>
            <img className="logo" src={logo} alt="Logo" />
          </div>
        </div>
        <div className="book-button-container">
          {/* <Link to={BookShow}> */}
          <Button
            id="bookButton"
            className="bookButton"
            variant="contained"
            color="primary"
            display="none"
          >
            Book Show
          </Button>
          {/* </Link> */}
        </div>
        <div className="login-button-container">
          <Button
            id="loginButton"
            variant="contained"
            color="default"
            onClick={openModal}
          >
            {buttonName}
          </Button>
          <Modal
            name="LoginRegisterModal"
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Login/Register Modal"
          >
            <BasicTabs />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Header;
