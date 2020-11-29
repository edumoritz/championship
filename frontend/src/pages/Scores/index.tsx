import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { motion } from 'framer-motion';
import { Score } from '../../dto/IScoresDTO';
import {
  Container,
  Content,
  StyledTableCell,
  StyledTableRow,
  useStyles,
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { player } = useAuth();
  const classes = useStyles();

  const [playersScores, setPlayersScores] = useState<Score[]>([]);
  useEffect(() => {
    api.get(`/scores`).then(response => {
      setPlayersScores(response.data);
    });
  }, [player.id]);

  return (
    <Container>
      <Content>
        <div className="title">
          <strong>Tabela de Jogos</strong>
        </div>
        <motion.div layout transition={{ duration: 0.5 }}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                  <StyledTableCell align="right">Pontos</StyledTableCell>
                  <StyledTableCell align="right">Jogos</StyledTableCell>
                  <StyledTableCell align="right">Vitórias</StyledTableCell>
                  <StyledTableCell align="right">Derrotas</StyledTableCell>
                  <StyledTableCell align="right">Empates</StyledTableCell>
                  <StyledTableCell align="right">Gols</StyledTableCell>
                  <StyledTableCell align="right">Gols Contra</StyledTableCell>
                  <StyledTableCell align="right">
                    Diferença de Gols
                  </StyledTableCell>
                  <StyledTableCell align="right">%</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playersScores.map(row => (
                  <StyledTableRow key={row.player.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.player.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.points}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.games}</StyledTableCell>
                    <StyledTableCell align="right">{row.wins}</StyledTableCell>
                    <StyledTableCell align="right">{row.loss}</StyledTableCell>
                    <StyledTableCell align="right">{row.ties}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.goal_pro}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.goal_against}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.goal_difference}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.utilization}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </Content>
    </Container>
  );
};

export default Dashboard;
