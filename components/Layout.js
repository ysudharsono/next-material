import { faLightbulb, faListAlt, faTrashAlt, faUser } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppBar,
  Avatar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => {
  const drawerWidthOpen = theme.spacing(25);
  const drawerWidthClose = theme.spacing(8);

  return {
    root: {
      display: 'flex',
      background: theme.palette.customBackground,
    },

    // App Bar
    //   appBar: {
    //     zIndex: theme.zIndex.drawer + 1,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.leavingScreen/2,
    //     }),
    //   },
    //   appBarShift: {
    //     marginLeft: drawerWidthOpen,
    //     width: `calc(100% - ${drawerWidthOpen}px)`,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //       easing: theme.transitions.easing.sharp,
    //       duration: theme.transitions.duration.enteringScreen/2,
    //     }),
    //   },
    //   menuButton: {
    //     marginRight: 36,
    //   },
    //   hide: {
    //     display: 'none',
    //   },

    // Main
    content: {
      width: '100%',
      paddingLeft: theme.spacing(3),
      '@media print': {
        padding: 0,
      },
    },
    toolbar: {
      // display: 'flex',
      // alignItems: 'center',
      // justifyContent: 'flex-end',
      // padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      // ...theme.mixins.toolbar,
    },
    paper: {
      // flexGrow: 1,
      height: '100vh',
      padding: theme.spacing(3),
    },
    // List Item
    listItemOpenGutter: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    listItemCloseGutter: {
      paddingLeft: 0,
      paddingRight: 0,
      display: 'grid',
      placeContent: 'center',
    },
    listItemTextClose: {
      display: 'none',
    },
    listItemIconOpen: { minWidth: theme.spacing(5) },
    listItemIconClose: {
      minWidth: 0,
      marginTop: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
    },
    lightColor: {
      color: theme.palette.getContrastText(theme.palette.primary.dark),
    },
    svg: {
      fontSize: theme.typography.fontSize * 1.25,
    },

    // Logo
    logoContainer: {
      color: theme.palette.getContrastText(theme.palette.drawerColor),
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: 100,
      marginBottom: theme.spacing(1),
      '@media print': {
        display: 'none',
      },
    },

    // Drawer
    drawer: {
      width: drawerWidthOpen,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      '@media print': {
        display: 'none',
      },
    },
    drawerOpen: {
      background: theme.palette.drawerColor,
      width: drawerWidthOpen,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen / 2,
      }),
    },
    drawerClose: {
      background: theme.palette.drawerColor,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen / 2,
      }),
      overflowX: 'hidden',
      width: drawerWidthClose,
      //   [theme.breakpoints.up('sm')]: {
      //     width: drawerWidthClose,
      //   },
    },
    drawerButton: {
      position: 'fixed',
      fontSize: theme.typography.fontSize * 1,
      zIndex: theme.zIndex.drawer + 2,
      top: theme.spacing(6.5),
      background: theme.palette.getContrastText(theme.palette.primary.main),
      color: theme.palette.primary.main,
      width: theme.spacing(3),
      height: theme.spacing(3),
      display: 'grid',
      placeContent: 'center',
      borderRadius: theme.spacing(5),
      boxShadow: theme.shadows[1],
      cursor: 'pointer',
      '&:focus': {
        outline: 'none',
      },
      '&:hover': {
        transform: 'scale(1.5)',
        color: theme.palette.getContrastText(theme.palette.primary.main),
        background: theme.palette.primary.main,
      },
      '@media print': {
        display: 'none',
      },
    },
    drawerButtonOpen: {
      left: drawerWidthOpen - 12,
      transition: theme.transitions.create(['left', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen / 2,
      }),
    },
    drawerButtonClose: {
      left: drawerWidthClose - 12,
      transition: theme.transitions.create(['left', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen / 2,
      }),
    },
    arrowLeft: {
      marginLeft: -2,
      transition: theme.transitions.create(['left', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen * 3,
      }),
    },
    arrowRight: {
      marginLeft: 0,
      transform: 'rotateY(180deg)',
      transition: theme.transitions.create(['left', 'transform'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen * 3,
      }),
    },

    // Tooltip
    tooltip: {
      marginLeft: -theme.spacing(3),
    },
  };
});

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { children } = props;
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <div
        role="button"
        tabIndex="-1"
        className={clsx(classes.drawerButton, {
          [classes.drawerButtonOpen]: open,
          [classes.drawerButtonClose]: !open,
        })}
        onClick={open ? handleDrawerClose : handleDrawerOpen}
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className={clsx({ [classes.arrowRight]: !open, [classes.arrowLeft]: open })}
        />
      </div>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.logoContainer}>
          <img
            src="static/logo.png"
            alt="Logo"
            height={open ? '70' : '50'}
            width={open ? '70' : '50'}
          />
          {open && <Typography variant="body1">My App</Typography>}
        </div>
        <Divider color="white" />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <Tooltip
              classes={{ popper: classes.tooltip }}
              title={open ? '' : text}
              aria-label={text}
              key={text}
              placement="right"
              TransitionComponent={Zoom}
            >
              <ListItem
                button
                key={text}
                classes={{
                  gutters: open ? classes.listItemOpenGutter : classes.listItemCloseGutter,
                }}
              >
                <ListItemIcon
                  className={classes.lightColor}
                  classes={{ root: open ? classes.listItemIconOpen : classes.listItemIconClose }}
                >
                  <FontAwesomeIcon
                    icon={index % 2 === 0 ? faTrashAlt : faUser}
                    className={classes.svg}
                  />
                </ListItemIcon>
                {open && <ListItemText className={clsx(classes.lightColor)} primary={text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <Tooltip
              classes={{ popper: classes.tooltip }}
              title={open ? '' : text}
              aria-label={text}
              key={text}
              placement="right"
              TransitionComponent={Zoom}
            >
              <ListItem
                button
                classes={{
                  gutters: open ? classes.listItemOpenGutter : classes.listItemCloseGutter,
                }}
              >
                <ListItemIcon
                  className={classes.lightColor}
                  classes={{ root: open ? classes.listItemIconOpen : classes.listItemIconClose }}
                >
                  <FontAwesomeIcon
                    icon={index % 2 === 0 ? faListAlt : faLightbulb}
                    className={classes.svg}
                  />
                </ListItemIcon>
                {open && <ListItemText className={classes.lightColor} primary={text} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Paper square className={classes.paper} elevation={0}>
          <div className={classes.toolbar} />
          {children}
        </Paper>
      </main>
    </div>
  );
};

export default Layout;
