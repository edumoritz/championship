import React from 'react';
import { Container } from './styles';
import ChampionshipCreate from '../../components/championship-create';
import ChampionshipUpdate from '../../components/championship-update';

const Championship: React.FC = () => {
  return (
    <Container>
      <ChampionshipCreate />
      <ChampionshipUpdate />
    </Container>
  );
};

export default Championship;
