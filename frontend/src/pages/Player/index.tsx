import React from 'react';
import { Container, Content } from './styles';

import Loading from '../../components/Loading';

const Player: React.FC = () => {
  return (
    <Container>
      <Content>
        <div className="title">Create Player</div>
        <Loading />
      </Content>
    </Container>
  );
};

export default Player;
