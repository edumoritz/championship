import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;
  .title {
    text-align: center;
    font-size: 40px;
    color: #080863;
    margin-bottom: 20px;
  }
  .description {
    text-align: center;
    font-size: 20px;
    margin-bottom: 10px;
  }
  svg {
    margin: 0 20px;
    align-items: center;
  }
`;
export const PlayersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const GoalsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: 20px;
`;
