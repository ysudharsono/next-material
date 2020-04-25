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
import { ChevronLeft, ChevronRight, FilterNone, Inbox, Mail, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  //     marginLeft: drawerWidth,
  //     width: `calc(100% - ${drawerWidth}px)`,
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
  toolbar: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  content: {
    paddingLeft: theme.spacing(3),
  },
  paper: {
    flexGrow: 1,
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

  // Logo
  logoContainer: {
    color: theme.palette.secondary.light,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 100,
    marginBottom: theme.spacing(1),
    transition: theme.transitions.create(['opacity', 'margin-bottom'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen / 2,
    }),
  },
  logoContainerClose: {
    opacity: 0,
    marginBottom: 0,
    transition: theme.transitions.create(['opacity', 'margin-bottom'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen / 2,
    }),
  },

  // Drawer
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    background: theme.palette.primary.dark,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen / 2,
    }),
  },
  drawerClose: {
    background: theme.palette.primary.dark,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen / 2,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8),
    },
  },
  drawerButton: {
    position: 'fixed',
    zIndex: theme.zIndex.drawer + 2,
    top: theme.spacing(1),
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  drawerButtonOpen: {
    left: drawerWidth - 20,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen / 2,
    }),
  },
  drawerButtonClose: {
    left: theme.spacing(8) - 20,
    transition: theme.transitions.create('left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen / 2,
    }),
  },

  // Tooltip
  tooltip: {
    marginLeft: -theme.spacing(3),
  },
}));

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
        className={clsx(classes.drawerButton, {
          [classes.drawerButtonOpen]: open,
          [classes.drawerButtonClose]: !open,
        })}
      >
        <Avatar>
          <IconButton
            color="primary"
            size="small"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Avatar>
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
        <div className={clsx(classes.logoContainer, { [classes.logoContainerClose]: !open })}>
          <img src="static/logo.png" alt="Smiley face" height="60" width="60" />
          {open && <Typography variant="h6">My App</Typography>}
        </div>
        <Divider />
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
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
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
                  {index % 2 === 0 ? <Inbox /> : <Mail />}
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
