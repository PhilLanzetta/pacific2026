import React from 'react'
import { graphql, Link } from 'gatsby'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeTile from '../components/homeTile'
import { Fade } from 'react-awesome-reveal'

const Index = ({ data, location }) => {
  const tiles = data.contentfulStudioHome.tiles
  return (
      <div className='home-page-container'>
        {tiles.map((tile) => (
          <HomeTile key={tile.id} project={tile}></HomeTile>
        ))}
        <Fade triggerOnce={true}>
          <div className='journal-cta'>
            <h2>
              Read more about our work through writing and essays via Pacific
              Journal
            </h2>
            <Link to='/journal' className='journal-cta-link'>READ</Link>
          </div>
        </Fade>
      </div>
  )
}

export const query = graphql`
  query {
    contentfulStudioHome {
      tiles {
        id
        tileImage {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        mobileTileImage {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        mobilePosterImage {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        videoPosterImage {
          gatsbyImageData(layout: FULL_WIDTH)
          description
        }
        type
        fontColor
        tileText {
          childMarkdownRemark {
            html
          }
        }
        vimeoId
        mobileVimeoId
        videoHasSound
      }
    }
  }
`

export const Head = () => <Seo title='Home' />

export default Index
