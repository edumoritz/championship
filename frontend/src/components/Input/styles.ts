import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #f0f0f0;
  border-radius: 10px;
  padding: 8px;
  width: 100%;
  border: 2px solid #7b7982;
  color: #666360;
  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #080863;
      border-color: #080863;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #080863;
    `}
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #080863;
    padding: 10px 0px;
    &::placeholder {
      color: #666360;
    }
  }
  svg {
    margin-right: 16px;
    margin-left: 10px;
  }
`;

export const Error = styled(Tooltip)`
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
