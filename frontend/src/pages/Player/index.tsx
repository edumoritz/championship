import React, { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Container, Content } from './styles';

import Loading from '../../components/Loading';

interface CreatePlayerFormData {
  name: string;
  email: string;
  password: string;
}

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
