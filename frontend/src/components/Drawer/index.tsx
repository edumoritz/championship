import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaTrophy } from 'react-icons/fa';
import { FiPower, FiUserPlus, FiChevronLeft } from 'react-icons/fi';
import { GiSoccerField, GiSoccerBall, GiLaurelsTrophy } from 'react-icons/gi';
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

import { useStyles } from './styles';

import { useAuth } from '../../hooks/auth';

const MenuDrawer: React.FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { signOut, player } = useAuth();
  const [open, setOpen] = React.useState(false);

  console.log(children);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
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
            <span>Bem-vindo, </span>
            <Link to="/profile">
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
          <ListItem button key="Novo Jogador">
            <ListItemIcon>
              <FiUserPlus />
            </ListItemIcon>
            <ListItemText primary="Novo Jogador" />
          </ListItem>

          <ListItem button key="Novo Jogo">
            <ListItemIcon>
              <GiSoccerBall />
            </ListItemIcon>
            <ListItemText primary="Novo Jogo" />
          </ListItem>

          <ListItem button key="Tabela de Jogos">
            <ListItemIcon>
              <GiSoccerField />
            </ListItemIcon>
            <ListItemText primary="Tabela de Jogos" />
          </ListItem>

          <ListItem button key="Criar Campeonato">
            <ListItemIcon>
              <GiLaurelsTrophy />
            </ListItemIcon>
            <ListItemText primary="Criar Campeonato" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MenuDrawer;
