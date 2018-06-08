import React from 'react'
import Link from 'gatsby-link'
import styled from "styled-components"

const Item = styled.div`
  padding: 1rem 2rem 1rem 0;
  color: #333;
`;

const Navbar = () => (
  <nav className="navbar is-transparent">
    <div className="container">
      <div className="navbar-start">
        <Link to="/">
          <Item>Blog</Item>
        </Link>
        <Link to="/about">
          <Item>About</Item>
        </Link>
        <Link to="/products">
          <Item>Products</Item>
        </Link>
      </div>
      <div className="navbar-end">
      </div>
    </div>
  </nav>
)

export default Navbar
