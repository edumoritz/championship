import styled from 'styled-components';
import { shade } from 'polished';

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
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon {
    color: #080863;
    height: 60px;
    width: 60px;
  }
  form {
    width: 340px;
    text-align: center;
    h1 {
      margin-bottom: 24px;
      color: #080863;
    }
    a {
      color: #080863;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.5, '#080863')};
      }
    }
  }
  > a {
    color: #080863;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.5, '#080863')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;
