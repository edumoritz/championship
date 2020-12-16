import React from 'react';

import { Container, Content } from './styles';
import Loading from '../../components/Loading';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Content>
        <div className="title">
          <strong>Welcome to Championship App</strong>
        </div>
        <div className="description">
          <p>
            You can create a game and championship, you can also visualize your
            score in scores table.
          </p>
          <p>On the side menu, you can navigate among the pages.</p>
        </div>
        <Loading />
      </Content>
    </Container>
  );
};

export default Dashboard;
