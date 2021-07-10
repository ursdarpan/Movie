/* eslint-disable react/prop-types */

import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Modal from 'react-modal';
import BasicTabs from '../login/ModalForm';
// import BookShow from '../../screens/bookshow/BookShow';
import logo from '../../assets/logo.svg';
import './Header.css';

Modal.setAppElement('body');
const Header = (props) => {
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
  Header.defaultProps = {
    buttonName: 'Login',
  };
  return (
    <div>
      <div className="heading-container">
        <Grid container className="grid-container" spacing={8} justifyContent="flex-start" alignItems="center" direction="row">
          <Grid key={1} item>
            <img className="logo" src={logo} alt="Logo" />
          </Grid>
        </Grid>
        <Grid container className="grid-container" spacing={8} justifyContent="flex-end" alignItems="center" direction="row">
          <Grid key={2} item>
            <Button
              className="BookButton"
              variant="contained"
              color="primary"
              onClick={openModal}
            >
              Book Show
            </Button>
            <Modal
              className="modalClass"
              overlayClassName="Overlay"
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              contentLabel="Login/Register Modal"
            >
              { /*   <Button onClick={closeModal}>close</Button> */}
              <BasicTabs />
            </Modal>
          </Grid>
          <Grid key={3} item>
            <Button className="Button" variant="contained" color="default">{props.buttonName}</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Header;
