import { Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';

import snackbar from '../lib/redux/actions/snackbarA';

const useStyles = makeStyles((theme) => ({
  alertRoot: { borderRadius: 10 },
}));

const ConsecutiveSnackbars = (props) => {
  const classes = useStyles();
  const queueRef = useRef([]);
  const [open, setOpen] = React.useState(false);

  const { queue } = props;

  const [messageInfo, setMessageInfo] = useState({ severity: '', message: '' });

  const processQueue = () => {
    if (queueRef.current.length > 0) {
      setMessageInfo(queueRef.current.shift());
      setOpen(true);
    }
  };

  const handleTrigger = ({ severity, message }) => () => {
    queueRef.current.push({
      severity,
      message,
      key: new Date().getTime(),
    });

    if (open) {
      // immediately begin dismissing current message
      // to start showing new one
      setOpen(false);
    } else {
      processQueue();
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    processQueue();
  };

  // Call handle trigger everytime redux state queue changes
  useEffect(() => handleTrigger(queue), [queue]);

  return (
    <Snackbar
      key={messageInfo ? messageInfo.key : undefined}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      // autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
      message={messageInfo ? messageInfo.message : undefined}
    >
      <Alert
        classes={{ root: classes.alertRoot }}
        onClose={handleClose}
        variant="filled"
        severity={messageInfo.severity}
      >
        {messageInfo.message}
      </Alert>
    </Snackbar>
  );
};

ConsecutiveSnackbars.getInitialProps = async (context) => {
  const { isServer, store } = context;

  if (isServer) {
    await store.dispatch(snackbar.success('yo'));
  }
  return {};
};

const mapStateToProps = (state) => {
  return { queue: state.snackbar };
};

export default connect(mapStateToProps, null)(ConsecutiveSnackbars);
