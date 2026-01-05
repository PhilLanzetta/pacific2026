import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BodyText from '../components/bodyText'
import ColumnModule from '../components/columnModule'

const Info = ({ data }) => {
  const { content } = data.contentfulAboutPageRework
  return (
    <Layout>
      <div className='about-page-padding-top'></div>
      {content.map((item) => {
        if (item.bodyTextId) {
          return <BodyText content={item} key={item.bodyTextId}></BodyText>
        } else if (item.columnId) {
          return (
            <ColumnModule key={item.columnId} content={item}></ColumnModule>
          )
        } else {
          return <div>Unknown Content</div>
        }
      })}
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutPageRework {
      content {
        ... on ContentfulBodyText {
          bodyTextId: id
          alignment
          fontFamily
          padding
          text {
            childMarkdownRemark {
              html
            }
          }
        }
        ... on ContentfulColumnContentContainer {
          columnId: id
          border
          headingText {
            childMarkdownRemark {
              html
            }
          }
          columns {
            id
            content {
              ... on ContentfulBodyText {
                bodyTextId: id
                alignment
                fontFamily
                text {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulImageModule {
                imageId: id
                fullBleed
                images {
                  caption
                  id
                  image {
                    description
                    gatsbyImageData(layout: FULL_WIDTH)
                  }
                  isAGif
                }
                isACarousel
              }
            }
          }
          mobileWrap
          wrapReverse
        }
      }
    }
  }
`

export default Info
