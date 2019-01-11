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

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  image,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  const EyeCatch = styled.img`
    margin: 20px 0 40px;
  `;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <EyeCatch src={image} alt="" />
            <PostContent content={content} />
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

const Meta = ({ post }) => {
  const origin = 'https://shibe97.com';
  let meta = [
    { name: 'description', content: post.frontmatter.description },
    { property: 'og:title', content: post.frontmatter.title },
    { property: 'og:description', content: post.frontmatter.description },
  ];
  if (post.frontmatter.image) {
    meta.push(
      { property: 'og:image', content: `${origin}${post.frontmatter.image}` }
    );
  }

  return (
    <Helmet
      title={`${post.frontmatter.title} | Blog`}
      meta={meta}
    />
  );
};

const BlogPost = ({ data, location }) => {
  const { markdownRemark: post } = data
  const url = `https://shibe97.com${location.pathname}`;

  const SNS = styled.ul`
    display: flex;
    align-items: flex-end;
    margin: 40px 0 0 !important;
  `;

  const List = styled.li`
    list-style: none;
    margin-right: 10px;
  `;

  const Btn = styled.a`
    &:hover {
      opacity: 0.8;
    }
  `;

  const Icon = styled.img`
    height: 20px;
    margin-right: 10px;
  `;

  const Wrapper = styled.div`
    margin: 0 1.5rem;
  `;

  const tags = post.frontmatter.tags;

  return (
    <div>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={<Meta post={post} />}
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
      />
      <Wrapper>
        <div className="container content">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <SNS>
                <List><Btn href={`https://twitter.com/intent/tweet?text=${post.frontmatter.title}&url=${url}`} target="twitter"><Icon src={twImg} alt="Twitterでシェア" /></Btn></List>
                <List><Btn href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="facebook"><Icon src={fbImg} alt="Facebookでシェア" /></Btn></List>
                <List><Btn href={`https://b.hatena.ne.jp/entry/${url}`} target="hatena"><Icon src={hatenaImg} alt="はてなブックマークでシェア" /></Btn></List>
              </SNS>
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
      </Wrapper>
    </div>
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
