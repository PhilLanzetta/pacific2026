import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BodyText from '../components/bodyText'
import ColumnModule from '../components/columnModule'
import ImageModule from '../components/imageModule'
import VideoModule from '../components/videoModule'

const JournalTemplate = ({ data, location }) => {
  const { title, subtitle, category, content } = data.contentfulJournalEntry
  return (
    <Layout location={location}>
      <div className='journal-page-container'>
        <div className='journal-page-padding-top'></div>
        <div className='journal-heading'>
          <h1>{title}</h1>
          <h2 className='journal-subheading'>{subtitle}</h2>
          {category && (
            <div className='category-container'>
              {category.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          )}
        </div>
        {content && (
          <div className='journal-content-container'>
            {content.map((item) => {
              if (item.bodyTextId) {
                return (
                  <BodyText content={item} key={item.bodyTextId}></BodyText>
                )
              } else if (item.columnId) {
                return (
                  <ColumnModule
                    key={item.columnId}
                    content={item}
                  ></ColumnModule>
                )
              } else if (item.imageId) {
                return (
                  <ImageModule key={item.imageId} content={item}></ImageModule>
                )
              } else if (item.videoId) {
                return (
                  <VideoModule key={item.videoId} content={item}></VideoModule>
                )
              } else {
                return <div>Unknown Content</div>
              }
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getSingleJournal($slug: String) {
    contentfulJournalEntry(slug: { eq: $slug }) {
      slug
      title
      subtitle
      category
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
                padding
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
          borderPadding
        }
        ... on ContentfulImageModule {
          imageId: id
          imgColumns: columns
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
        ... on ContentfulVideoModule {
          videoId: id
          videoLink
          fullBleed
          title
        }
      }
    }
  }
`

export default JournalTemplate
