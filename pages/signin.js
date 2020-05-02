import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { FastField, Formik } from 'formik';
import dynamic from 'next/dynamic';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import PasswordInput from '../components/PasswordInput';
import { signin } from '../lib/redux/actions/authA';

const ParticlesBg = dynamic(import('particles-bg'), { ssr: false });

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
  transparent: {
    [theme.breakpoints.up('sm')]: {
      opacity: 0.92,
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
    [theme.breakpoints.only('sm')]: {
      margin: '15vh 15vw',
    },
    [theme.breakpoints.up('md')]: {
      margin: '15vh 7vw',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    height: theme.spacing(11),
    width: theme.spacing(11),
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
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: theme.palette.primary.light,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const validationSchema = Yup.object().shape({
  username: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
});

const Signin = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          className={clsx(classes.image, classes.transparent)}
        />
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Paper}
          elevation={6}
          square
          className={classes.transparent}
        >
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FontAwesomeIcon icon={faUserAstronaut} size="4x" />
            </Avatar>

            <Typography component="h1" variant="h4" className={classes.heading}>
              sign in
            </Typography>
            <Formik
              initialValues={{ username: 'asdkf@lsdjfk.com', password: 'asdf' }}
              validationSchema={validationSchema}
              onSubmit={({ username, password }, { setSubmitting }) => {
                dispatch(signin({ username, password })).catch(() =>
                  setTimeout(() => {
                    setSubmitting(false);
                  }, 400)
                );
              }}
            >
              {({
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form className={classes.form} noValidate autoComplete="off">
                  <FastField name="username">
                    {({
                      field, // { name, value, onChange, onBlur }
                      meta,
                    }) => (
                      <TextField
                        {...field}
                        error={meta.error && meta.touched}
                        helperText={meta.error && meta.touched && meta.error}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Email Address"
                        type="email"
                        autoComplete="email"
                        autoFocus
                      />
                    )}
                  </FastField>
                  <FastField name="password">
                    {({
                      field, // { name, value, onChange, onBlur }
                      meta,
                    }) => (
                      <FormControl variant="outlined" fullWidth margin="normal">
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <PasswordInput
                          id="password"
                          {...field}
                          error={meta.error && meta.touched}
                          fullWidth
                          label="Password"
                          autoComplete="current-password"
                        />
                        {meta.error && meta.touched && (
                          <FormHelperText error>{meta.error}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </FastField>

                  <div className={classes.wrapper}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                    >
                      sign in
                    </Button>
                    {isSubmitting && (
                      <CircularProgress size={24} className={classes.buttonProgress} />
                    )}
                  </div>
                </form>
              )}
            </Formik>

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
          </div>
        </Grid>
      </Grid>
      <ParticlesBg type="circle" bg />
    </>
  );
};

export default Signin;
