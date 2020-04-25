import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typical from 'react-typical';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    background: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
    height: '100vh',
    userSelect: 'none',
  },
  fontFamily: {
    fontFamily: 'monospace',
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Typography variant="h4" align="center" classes={{ h4: classes.fontFamily }}>
          <Typical steps={['404, page not found.', 3000, '', 1000]} loop={Infinity} wrapper="p" />
        </Typography>
      </div>
    </>
  );
};

export default NotFound;
