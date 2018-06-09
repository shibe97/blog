import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;

const FeatureGrid = ({ gridItems }) => (
  <div className="columns is-multiline">
    {gridItems.map(item => (
      <div key={item.image} className="column is-6">
        <section className="section">
          <p className="has-text-centered">
            <img alt="" src={item.image} />
          </p>
          <Title>{item.title}</Title>
          <p>{item.text}</p>
        </section>
      </div>
    ))}
  </div>
)

FeatureGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

export default FeatureGrid
