import React from 'react'
import { navigateTo } from 'gatsby-link'
import styled from 'styled-components'

import img from '../img/shibe97.png';

const Nav = styled.nav`
  margin: 0 auto;
  width: calc(100% - 3rem);
  display: flex;
  align-items: center;
`;

const ProfImg = styled.img`
  width: 40px;
  height: 40px;
`;

const Item = styled.div`
  margin: 1rem 1.5rem 1rem 0;
  color: #333;
  cursor: pointer;
`;

const Line = styled.div`
  width: 1px;
  height: 40px;
  background-color: #ccc;
`;

const Navbar = () => (
  <Nav>
    <Item onClick={() => navigateTo('/')}>
      <ProfImg src={img} alt="shibe97" />
    </Item>
    <Item>
      <Line />
    </Item>
    <Item onClick={() => navigateTo('/')}>
      Blog
    </Item>
    <Item onClick={() => navigateTo('/about')}>
      About
    </Item>
    <Item onClick={() => navigateTo('/products')}>
      Products
    </Item>
  </Nav>
)

export default Navbar
