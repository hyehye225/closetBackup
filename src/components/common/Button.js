import React from 'react';
import palette from '../../lib/styles/palette';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const sizeStyles = css`
  /*크기*/
  ${(props) =>
    props.size === 'large' &&
    css`
      height: 5rem;
      font-size: 1.25rem;
    `}
  ${(props) =>
    props.size === 'medium' &&
    css`
      height: 3rem;
      font-size: 1rem;
    `}
    ${(props) =>
    props.size === 'small' &&
    css`
      height: 2.5rem;
      font-size: 0.9rem;
    `}
`;
// Button.defaultProps = {
//   size: 'medium',
//   color: 'black',
// };
const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}
  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;
const StyledButton = styled.button`
  ${buttonStyle}
`;

const StyledLink = styled(Link)`
  ${buttonStyle}
`;

const Button = (props) => {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
};

export default Button;
