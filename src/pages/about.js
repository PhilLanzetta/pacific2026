import React, { useState } from 'react'
import { graphql } from 'gatsby'
import BodyText from '../components/bodyText'
import ColumnModule from '../components/columnModule'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import CustomForm from '../components/customForm'
import Seo from '../components/seo'
import { GatsbyImage } from 'gatsby-plugin-image'
import { AnimatePresence, motion } from 'framer-motion'

const About = ({ data, location }) => {
  const [lizExpand, setLizExpand] = useState(false)
  const [adamExpand, setAdamExpand] = useState(false)
  const postUrl = process.env.GATSBY_MAIL_KEY
  const { content } = data.contentfulAboutPageRework
  const mainContent = content.slice(0, -1)
  const newsletter = content.pop()
  const { lizBio, adamBio, lizHeadshot, adamHeadshot } =
    data.contentfulAboutPage

  const adamBioArray = adamBio.childMarkdownRemark.html.split('</p>')
  const adamFirst = adamBioArray[0]
  const adamRest = adamBioArray.slice(1).join('')

  const lizBioArray = lizBio.childMarkdownRemark.html.split('</p>')
  const lizFirst = lizBioArray[0]
  const lizRest = lizBioArray.slice(1).join('')

  return (
    <div className='about-page-container'>
      <div className='about-page-padding-top'></div>
      {mainContent.slice(0, 6).map((item) => {
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
      <div className='outer-column-padding border-bottom'>
        <h2>Leadership</h2>
        <div className='leadership-container sans-serif body-text'>
          <div>
            <GatsbyImage
              image={lizHeadshot.gatsbyImageData}
              alt={lizHeadshot.description}
            ></GatsbyImage>
          </div>
          <div>
            <p className='upper'>Elizabeth Karp-Evans</p>
            <div dangerouslySetInnerHTML={{ __html: lizFirst }}></div>
            <AnimatePresence>
              {lizExpand && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  dangerouslySetInnerHTML={{ __html: lizRest }}
                ></motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setLizExpand(!lizExpand)}>
              <p>
                {lizExpand ? '-' : '+'} READ {lizExpand ? 'LESS' : 'MORE'}
              </p>
            </button>
          </div>
          <div>
            <GatsbyImage
              image={adamHeadshot.gatsbyImageData}
              alt={adamHeadshot.description}
            ></GatsbyImage>
          </div>
          <div>
            <p className='upper'>Adam Turnbull</p>
            <div dangerouslySetInnerHTML={{ __html: adamFirst }}></div>
            <AnimatePresence>
              {adamExpand && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  dangerouslySetInnerHTML={{ __html: adamRest }}
                ></motion.div>
              )}
            </AnimatePresence>
            <button onClick={() => setAdamExpand(!adamExpand)}>
              <p>
                {adamExpand ? '-' : '+'} READ {adamExpand ? 'LESS' : 'MORE'}
              </p>
            </button>
          </div>
        </div>
      </div>
      {mainContent.slice(6).map((item) => {
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
      <div className='info-newsletter-container'>
        <BodyText content={newsletter}></BodyText>
        <div className='about-mail-form'>
          <MailchimpSubscribe
            url={postUrl}
            render={({ subscribe, status, message }) => (
              <CustomForm
                status={status}
                message={message}
                onValidated={(formData) => subscribe(formData)}
                about={true}
              ></CustomForm>
            )}
          />
        </div>
      </div>
    </div>
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
                padding
                text {
                  childMarkdownRemark {
                    html
                  }
                }
              }
              ... on ContentfulImageModule {
                imageId: id
                containerWidth
                images {
                  caption
                  cropTo10801350
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
      }
    }
    contentfulAboutPage(title: { eq: "Studio About Page" }) {
      lizBio {
        childMarkdownRemark {
          html
        }
      }
      adamBio {
        childMarkdownRemark {
          html
        }
      }
      adamHeadshot {
        gatsbyImageData
        description
      }
      lizHeadshot {
        gatsbyImageData
        description
      }
    }
  }
`

export const Head = () => <Seo title='About' />

export default About
