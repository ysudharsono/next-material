import { Avatar, Box, Button, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Face } from '@material-ui/icons';
import React from 'react';
import { connect } from 'react-redux';

import { signin } from '../lib/redux/actions/authA';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Your Website {new Date().getFullYear()}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5),
    },
  },
  image: {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1543269664-7eef42226a21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80)', // 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(8),
    width: theme.spacing(8),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

const Signin = (props) => {
  const classes = useStyles();
  const { signin } = props;

  const handleSignin = () => {
    signin({ username: 'sd', password: 'df' });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={false} md={7} className={classes.image} />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Face fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h4" className={classes.heading}>
            sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSignin}
            >
              sign in
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  Don&apos;t have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Box mt={8}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = { signin };

export default connect(null, mapDispatchToProps)(Signin);
