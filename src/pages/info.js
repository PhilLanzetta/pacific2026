import React from 'react'
import { graphql } from 'gatsby'
import BodyText from '../components/bodyText'
import ColumnModule from '../components/columnModule'
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import CustomForm from '../components/customForm'
import Seo from '../components/seo'

const Info = ({ data, location }) => {
  const postUrl = process.env.GATSBY_MAIL_KEY
  const { content } = data.contentfulAboutPageRework
  const mainContent = content.slice(0, -1)
  const newsletter = content.pop()
  return (
    <div className='about-page-container'>
      <div className='about-page-padding-top'></div>
      {mainContent.map((item) => {
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
  }
`

export const Head = () => <Seo title='Information' />

export default Info
