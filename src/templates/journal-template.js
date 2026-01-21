import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import BodyText from '../components/bodyText'
import ColumnModule from '../components/columnModule'
import ImageModule from '../components/imageModule'
import VideoModule from '../components/videoModule'
import { Fade } from 'react-awesome-reveal'
import JournalTile from '../components/journalTile'

const JournalTemplate = ({ data, location }) => {
  const { title, subtitle, category, content, projectCredits, related } =
    data.contentfulJournalEntry

  const formatter = new Intl.ListFormat('en', {
    style: 'short',
    type: 'conjunction',
  })

  return (
      <div className='journal-page-container'>
        <div className='journal-page-padding-top'></div>
        <div className='journal-heading'>
          <h1>{title}</h1>
          <h2 className='journal-subheading'>{subtitle}</h2>
          {category && (
            <div className='category-container'>
              {formatter.format(category)}
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
        {projectCredits && (
          <Fade triggerOnce>
            <div className='journal-credits'>
              <p>Project Credits</p>
              <div className='journal-credits-table'>
                {projectCredits.map((credit, index) => (
                  <div key={index} className='journal-credit'>
                    {credit}
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        )}
        {related && (
          <Fade triggerOnce>
            <div className='related-journal'>
              <p>Related</p>
              <div className='related-journal-tile-container'>
                {related.map((item) => (
                  <JournalTile
                    tile={item}
                    key={item.id}
                    related={true}
                  ></JournalTile>
                ))}
              </div>
            </div>
          </Fade>
        )}
      </div>
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
                mobileAlignment
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
      projectCredits
      related {
        id
        slug
        title
        subtitle
        category
        tileImage {
          description
          gatsbyImageData
        }
      }
    }
  }
`

export default JournalTemplate
