import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'material-ui/Modal';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import styled from 'react-emotion';

const PortalModal = styled(Modal)`
  width: 380px;
  padding: 30px;
  left: calc(50% - 190px);
  top: calc(30% - 150px);
  height: auto;
`;

export default function InfoModal({ info, closeModal }) {
  return ReactDOM.createPortal(
    <PortalModal open={info.length > 0}>
      <Paper>
        <Typography variant="body2" color="error">
          {info}
        </Typography>
        <Button onClick={closeModal}>Close</Button>
      </Paper>
    </PortalModal>,
    document.querySelector('#info-modal'),
  );
}
