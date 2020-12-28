import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { FaTrophy } from 'react-icons/fa';

import { Container, Content, useStyles } from './styles';

const ViewChampionship: React.FC = () => {
  const classes = useStyles();

  return (
    <Container>
      <Content>
        <div className="title">
          <strong>View Championship</strong>
        </div>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper} elevation={3}>
                <FaTrophy />
                Champion
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} elevation={3}>
                Second
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} elevation={3}>
                Second
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item xs={1}>
              {/* <Paper className={classes.paper} elevation={3}>
                -
              </Paper> */}
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item xs={1}>
              {/* <Paper className={classes.paper} elevation={3}>
                -
              </Paper> */}
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item xs={1}>
              {/* <Paper className={classes.paper} elevation={3}>
                -
              </Paper> */}
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
            <Grid item>
              <Paper className={classes.paper} elevation={3}>
                Player
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Content>
    </Container>
  );
};

export default ViewChampionship;
