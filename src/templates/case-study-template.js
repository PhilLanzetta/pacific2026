import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Content from '../components/content'
import Layout from '../components/layout'
import Seo from '../components/seo'
import RelatedCarousel from '../components/relatedCarousel'
import { Fade } from 'react-awesome-reveal'

const CaseStudy = ({ data }) => {
  const { headerImage, content, headerText, scope, related } =
    data.contentfulCaseStudy

  return (
    <Layout>
      <div className='case-study-page'>
        {headerImage && !headerText && (
          <div className='header-image'>
            <GatsbyImage
              image={headerImage.image.gatsbyImageData}
              alt={headerImage.image.description}
              className='header-image-image'
            ></GatsbyImage>
            <p className='header-image-caption'>{headerImage.caption}</p>
          </div>
        )}
        {headerImage && headerText && (
          <div className='header-image-with-text'>
            <div className='header-image-with-text-image'>
              <GatsbyImage
                image={headerImage.image.gatsbyImageData}
                alt={headerImage.image.description}
              ></GatsbyImage>
              <p className='header-image-caption'>{headerImage.caption}</p>
            </div>
            <div
              className='header-image-with-text-text'
              dangerouslySetInnerHTML={{
                __html: headerText.childMarkdownRemark.html,
              }}
            ></div>
          </div>
        )}
        {headerText && !headerImage && (
          <div
            className='text-header'
            dangerouslySetInnerHTML={{
              __html: headerText.childMarkdownRemark.html,
            }}
          ></div>
        )}
        <div className='case-study-body'>
          {content && <Content content={content} scope={scope}></Content>}
        </div>
      </div>
      {related && (
        <Fade triggerOnce>
          <div className='related-projects'>
            <h2>Explore More</h2>
            <RelatedCarousel slideCount={3} data={related}></RelatedCarousel>
          </div>
        </Fade>
      )}
    </Layout>
  )
}

export const query = graphql`
  query getSingleCaseStudy($slug: String) {
    contentfulCaseStudy(slug: { eq: $slug }) {
      slug
      title
      year
      location
      scope
      shopifyHandle
      client
      awards {
        childMarkdownRemark {
          html
        }
      }
      press {
        id
        publication
        articleUrl
      }
      headerImage {
        caption
        image {
          description
          gatsbyImageData
        }
      }
      headerText {
        childMarkdownRemark {
          html
        }
      }
      related {
        id
        slug
        title
        subtitle
        tileImage {
          image {
            description
            gatsbyImageData
          }
        }
      }
      content {
        ... on ContentfulBodyText {
          bodyTextId: id
          columns
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulVideoModule {
          videoId: id
          videoLink
          fullBleed
          title
        }
        ... on ContentfulImageModule {
          imageId: id
          columns
          fullBleed
          isACarousel
          images {
            caption
            id
            image {
              gatsbyImageData
              description
            }
          }
        }
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.contentfulCaseStudy.title} />

export default CaseStudy
