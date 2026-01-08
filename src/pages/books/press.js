import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import { GatsbyImage } from 'gatsby-plugin-image'
import { BsArrowUpRight } from 'react-icons/bs'
import Seo from '../../components/seo'
import { PiListBold } from 'react-icons/pi'
import { RiLayoutGridFill } from 'react-icons/ri'

const Press = ({ data }) => {
  const pressItems = data.allContentfulPressItem.nodes
  const [view, setView] = useState()

  useEffect(() => {
    if (localStorage.getItem('view')) {
      setView(localStorage.getItem('view'))
    } else {
      setView('grid')
    }
  }, [])

  return (
    <Layout>
      <div className='press-view-options'>
        <h1 className='press-page-title'>Press</h1>
        <button
          className={`press-view-button ${view === 'grid' ? '' : 'faded'}`}
          onClick={() => {
            localStorage.setItem('view', 'grid')
            setView('grid')
          }}
        >
          Grid
          <RiLayoutGridFill></RiLayoutGridFill>
        </button>
        <button
          className={`press-view-button ${view === 'list' ? '' : 'faded'}`}
          onClick={() => {
            localStorage.setItem('view', 'list')
            setView('list')
          }}
        >
          List
          <PiListBold></PiListBold>
        </button>
      </div>
      {view === 'grid' && (
        <div className='press-container'>
          {pressItems.map((item) => (
            <a
              key={item.id}
              href={item.articleUrl}
              className='press-item'
              target='_blank'
              rel='noreferrer'
            >
              <GatsbyImage
                image={item.pressImage.gatsbyImageData}
                alt={item.pressImage.description}
              ></GatsbyImage>
              <p className='press-date'>
                {new Date(item.publicationDate).toLocaleDateString('en-us')}
              </p>
              <p className='press-publication'>{item.publication}</p>
              <p>{item.title}</p>
              <div className='press-link-out'>
                VIEW ARTICLE <BsArrowUpRight></BsArrowUpRight>
              </div>
            </a>
          ))}
        </div>
      )}
      {view === 'list' && (
        <div className='press-list-container'>
          {pressItems.map((item) => (
            <div key={item.id} className='press-list-row'>
              <a
                href={item.articleUrl}
                className='press-list-item'
                target='_blank'
                rel='noreferrer'
              >
                <p className='press-list-date'>
                  {new Date(item.publicationDate).toLocaleDateString('en-us')}
                </p>
                <p className='press-list-publication'>{item.publication}</p>
                <p className='press-list-title'>{item.title}</p>
                <div className='press-list-link-out'>
                  VIEW ARTICLE <BsArrowUpRight></BsArrowUpRight>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulPressItem(sort: { publicationDate: DESC }) {
      nodes {
        id
        articleUrl
        pressImage {
          description
          gatsbyImageData
        }
        publication
        publicationDate
        title
      }
    }
  }
`
export const Head = () => <Seo title='Press' />

export default Press
