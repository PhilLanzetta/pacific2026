import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import NewsItem from '../components/newsItem'
import Seo from '../components/seo'

const News = ({ data, location }) => {
  const newsItems = data.allContentfulNewsItem.nodes
  return (
    <>
      <div className='press-view-options'>
        <h1 className='news-page-title'>News</h1>
      </div>
      {newsItems.map((item) => (
        <NewsItem key={item.id} item={item}></NewsItem>
      ))}
    </>
  )
}

export const query = graphql`
  query {
    allContentfulNewsItem(sort: { date: DESC }) {
      nodes {
        category
        date
        expandedText {
          childMarkdownRemark {
            html
          }
        }
        id
        image {
          description
          gatsbyImageData
        }
        newsTitle
        newsHeadline {
          childMarkdownRemark {
            html
          }
        }
        associatedCaseStudy {
          slug
        }
      }
    }
  }
`
export const Head = () => <Seo title='News' />

export default News
