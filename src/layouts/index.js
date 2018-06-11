import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import Navbar from '../components/Navbar'
import './all.sass'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Shibe97"
      meta={[
        { property: 'og:type', content: 'blog' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@shibe97' },
      ]}
      link={[
        { rel: 'shortcut icon', href: '/img/favicon.png' }
      ]}
    />
    <Navbar />
    <div>{children()}</div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
