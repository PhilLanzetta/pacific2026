import React, { useState } from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { BsArrowRight } from 'react-icons/bs'

const NewsItem = ({ item }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => setOpen(!open)
  return (
    <div className='news-outer-container'>
      <div className='news-main-row'>
        <div className='news-date'>
          {new Date(item.date).toLocaleDateString('en-us')}
        </div>
        <div className='news-category'>{item.category}</div>
        <div className='news-title'>{item.newsTitle}</div>
        <div
          className='news-headline'
          dangerouslySetInnerHTML={{
            __html: item.newsHeadline.childMarkdownRemark.html,
          }}
        ></div>
        <div className='news-learn-more'>
          <button onClick={toggleOpen}>
            {open ? (
              <div className='news-more-link'>
                Close <AiOutlineClose></AiOutlineClose>
              </div>
            ) : (
              <div className='news-more-link'>
                Learn More <AiOutlinePlus></AiOutlinePlus>
              </div>
            )}
          </button>
        </div>
      </div>
      <div
        className={`news-secondary-row ${open ? 'news-secondary-show' : ''}`}
      >
        <div className='news-expanded-text'>
          <div
            dangerouslySetInnerHTML={{
              __html: item.expandedText.childMarkdownRemark.html,
            }}
            className='news-expanded-text-text'
          ></div>
          {item.associatedCaseStudy && (
            <Link
              to={`/studio/${item.associatedCaseStudy.slug}`}
              className='news-view-project'
            >
              VIEW PROJECT <BsArrowRight></BsArrowRight>
            </Link>
          )}
        </div>
        {item.image && (
          <GatsbyImage
            image={item.image.gatsbyImageData}
            alt={item.image.description}
            className='news-image'
          ></GatsbyImage>
        )}
      </div>
    </div>
  )
}

export default NewsItem
