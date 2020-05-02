import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import Typical from 'react-typical';

const ParticlesBg = dynamic(import('particles-bg'), { ssr: false });

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    placeContent: 'center',
    background: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    height: '100vh',
    userSelect: 'none',
    opacity: 0.92,
  },
  fontFamily: {
    fontFamily: 'monospace',
  },
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" classes={{ h4: classes.fontFamily }}>
        <Typical
          steps={['You are not authorized to view this page.', 3000, '', 1000]}
          loop={Infinity}
          wrapper="p"
        />
      </Typography>
      <ParticlesBg type="cobweb" bg />
    </div>
  );
};

export default NotFound;
