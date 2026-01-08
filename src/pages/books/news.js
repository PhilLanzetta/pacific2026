import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import NewsItem from '../components/newsItem'
import Seo from '../../components/seo'

const News = ({ data }) => {
  const newsItems = data.allContentfulNewsItem.nodes
  return (
    <Layout>
      <h1 className='news-page-title'>News</h1>
      {newsItems.map((item) => (
        <NewsItem key={item.id} item={item}></NewsItem>
      ))}
    </Layout>
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
