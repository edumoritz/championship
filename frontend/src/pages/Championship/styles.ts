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
  .form-control {
    margin: 4px;
    width: 100%;
  }
  .chips {
    display: flex;
  }
  .chip {
    margin: 2px;
  }
  .noLabel {
    margin-top: 3px;
  }
  .text-field {
    margin-bottom: 5px;
  }
`;
