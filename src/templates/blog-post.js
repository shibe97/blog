import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Content, { HTMLContent } from '../components/Content'

import twImg from '../img/ic_tw_144.png';
import fbImg from '../img/ic_fb_144.png';
import hatenaImg from '../img/ic_hatena_144.png';

const Btn = styled.a`
  &:hover {
    opacity: 0.8;
  }
`;

const Icon = styled.img`
  height: 20px;
  margin-right: 10px;
`;

const SNS = styled.ul`
  display: flex;
  align-items: flex-end;
  margin: 40px 0 0 !important;
`;

const List = styled.li`
  list-style: none;
  margin-right: 10px;
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            <div>
              <SNS>
                <List><Btn href=""><Icon src={twImg} alt="" /></Btn></List>
                <List><Btn href=""><Icon src={fbImg} alt="" /></Btn></List>
                <List><Btn href=""><Icon src={hatenaImg} alt="" /></Btn></List>
              </SNS>
            </div>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
}

const Meta = ({ post }) => (
  <Helmet
    title={`${post.frontmatter.title} | Blog`}
  	meta={[
      { name: 'description', content: post.frontmatter.description },
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.frontmatter.description },
      { property: 'og:image', content: `${location.origin}${post.frontmatter.image}` },
    ]}
  />
);

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data
  console.log(post);

  return (
    <BlogPostTemplate
      content={post.html}
      contentComponent={HTMLContent}
      description={post.frontmatter.description}
      helmet={<Meta post={post} />}
      tags={post.frontmatter.tags}
      title={post.frontmatter.title}
    />
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image
        tags
      }
    }
  }
`
