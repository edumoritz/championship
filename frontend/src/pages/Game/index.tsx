import React from 'react';
import { Container, Content } from './styles';
import Loading from '../../components/Loading';

const Game: React.FC = () => {
  return (
    <Container>
      <Content>
        <div className="title">Create Game</div>
        <Loading />
      </Content>
    </Container>
  );
};

export default Game;
