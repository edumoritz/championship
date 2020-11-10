import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
        color: ${shade(0.2, '#080863')};
      }
    }
  }
  > a {
    color: #080863;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      color: ${shade(0.2, '#080863')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background-size: cover;
`;
