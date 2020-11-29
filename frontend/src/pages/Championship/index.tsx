import React from 'react';
import { Container, Content } from './styles';

import Loading from '../../components/Loading';

const Championship: React.FC = () => {
  return (
    <Container>
      <Content>
        <div className="title">Create Championship</div>
        <Loading />
      </Content>
    </Container>
  );
};

export default Championship;
