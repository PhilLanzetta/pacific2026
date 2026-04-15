import React, { useRef, useCallback } from 'react'
import { graphql } from 'gatsby'
import BodyText from '../components/bodyText'
import ColumnModule from '../components/columnModule'
import ImageModule from '../components/imageModule'
import VideoModule from '../components/videoModule'
import { Fade } from 'react-awesome-reveal'
import JournalTile from '../components/journalTile'
import Seo from '../components/seo'

const useIsMobile = () => {
  if (typeof window === 'undefined') return false
  const { innerWidth: width, innerHeight: height } = window
  return height > width ? width < 769 : width < 900
}

const JournalTemplate = ({ data, location }) => {
  const { title, subtitle, category, content, projectCredits, related } =
    data.contentfulJournalEntry

  const activeVideoRef = useRef(null)
  const isMobile = useIsMobile()

  const handleVideoPlay = useCallback((videoHandle) => {
    if (activeVideoRef.current) {
      activeVideoRef.current.pause()
    }
    activeVideoRef.current = videoHandle
  }, [])

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
          <div className='category-container'>{formatter.format(category)}</div>
        )}
      </div>
      {content && (
        <div
          className={`journal-content-container ${
            !content[0].bodyTextId ? 'extra-top-margin' : ''
          }`}
        >
          {content.map((item) => {
            if (item.bodyTextId) {
              return <BodyText content={item} key={item.bodyTextId} />
            } else if (item.columnId) {
              return <ColumnModule key={item.columnId} content={item} />
            } else if (item.imageId) {
              return <ImageModule key={item.imageId} content={item} />
            } else if (item.videoId) {
              return (
                <VideoModule
                  key={item.videoId}
                  content={item}
                  onVideoPlay={handleVideoPlay}
                  autoplayVideos={!isMobile}
                />
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
                <JournalTile tile={item} key={item.id} related={true} />
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
        ... on ContentfulVideoModule {
          videoId: id
          videoLink
          fullBleed
          marginWidth
          threeQuartersWidth
          autoplay
          title
          roundedCorners
        }
        ... on ContentfulImageModule {
          imageId: id
          imgColumns: columns
          containerWidth
          isACarousel
          fixedHeightCarousel
          images {
            caption
            cropTo10801350
            id
            image {
              gatsbyImageData(layout: FULL_WIDTH)
              description
              height
              width
            }
          }
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

export const Head = ({ data }) => (
  <Seo title={data.contentfulJournalEntry.title} />
)

export default JournalTemplate
