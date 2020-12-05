import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import { FaTrophy, FaDashcube, FaFutbol } from 'react-icons/fa';
import { FiPower, FiUserPlus, FiChevronLeft } from 'react-icons/fi';
import { GiSoccerField, GiTrophy } from 'react-icons/gi';
import { motion } from 'framer-motion';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { useStyles, Button } from './styles';

import { useAuth } from '../../hooks/auth';

const MenuDrawer: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { signOut, player } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  // const handlePushRoute = (route: string) => {
  //   history.push(`/${route}`);
  // };

  const handlePushRoute = useCallback(
    (route: string) => {
      history.push(`/${route}`);
    },
    [history],
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: '#080863' }}
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
            <FaTrophy />
          </IconButton>
          <Typography variant="h6" noWrap>
            <span>Welcome, </span>
            <Link to="/">
              <strong>{player?.name}</strong>
            </Link>
          </Typography>
          <Button onClick={signOut}>
            <motion.div whileHover={{ scale: 1.2 }} animate={{ rotate: 360 }}>
              <FiPower />
            </motion.div>
          </Button>
        </Toolbar>
      </AppBar>
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
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <FaTrophy /> : <FiChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => handlePushRoute('dashboard')}>
            <ListItemIcon>
              <FaDashcube size="25" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => handlePushRoute('player')}>
            <ListItemIcon>
              <FiUserPlus size="25" />
            </ListItemIcon>
            <ListItemText primary="New Player" />
          </ListItem>

          <ListItem button onClick={() => handlePushRoute('game')}>
            <ListItemIcon>
              <FaFutbol size="25" />
            </ListItemIcon>
            <ListItemText primary="New Game" />
          </ListItem>

          <ListItem button onClick={() => handlePushRoute('scores')}>
            <ListItemIcon>
              <GiSoccerField size="25" />
            </ListItemIcon>
            <ListItemText primary="Games Table" />
          </ListItem>

          <ListItem button onClick={() => handlePushRoute('championship')}>
            <ListItemIcon>
              <GiTrophy size="25" />
            </ListItemIcon>
            <ListItemText primary="Create Championships" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MenuDrawer;
