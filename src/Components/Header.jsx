import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContainer>
      <Title>Pre-flight-checklist</Title>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: #26547c;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  margin: 0;
`;
