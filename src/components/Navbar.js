import React from 'react'
import { navigateTo } from 'gatsby-link'
import styled from "styled-components"

const Item = styled.div`
  margin: 1rem 2rem 1rem 0;
  color: #333;
  cursor: pointer;
`;

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-start">
        <Item onClick={() => navigateTo('/')}>
          Blog
        </Item>
        <Item onClick={() => navigateTo('/about')}>
          About
        </Item>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  </nav>
)

export default Navbar
