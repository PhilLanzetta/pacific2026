import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { Fade } from 'react-awesome-reveal'
import HomeHero from './homeHero'

const JournalTile = ({ tile, related }) => {
  const {
    title,
    subtitle,
    slug,
    tileImage,
    category,
    tileSize,
    tileVideoUrl,
    tileExcerptText,
  } = tile

  const formatter = new Intl.ListFormat('en', {
    style: 'short',
    type: 'conjunction',
  })

  const classSize =
    tileSize === '33%'
      ? 'tile-one-third'
      : tileSize === '66%'
      ? 'tile-two-thirds'
      : 'tile-full'

  return (
    <Link
      to={`/journal/${slug}`}
      className={related ? 'related-tile' : classSize}
    >
      <Fade triggerOnce>
        {tileVideoUrl ? (
          <HomeHero
            poster={tileImage}
            url={tileVideoUrl}
            landscape={true}
          ></HomeHero>
        ) : (
          <div className='tile-image-container'>
            <GatsbyImage
              image={tileImage.gatsbyImageData}
              alt={tileImage.description}
            ></GatsbyImage>
            {tileExcerptText && tileSize !== '100%' && (
              <div
                className='tile-excerpt-text'
                dangerouslySetInnerHTML={{
                  __html: tileExcerptText.childMarkdownRemark.html,
                }}
              ></div>
            )}
          </div>
        )}
        <div className='journal-tile-info'>
          <div>
            {category && (
              <div className='tile-category-container'>
                {formatter.format(category)}
              </div>
            )}
            <div className='journal-tile-title'>{title}</div>
            <div className='journal-tile-subtitle'>{subtitle}</div>
          </div>
          {tileSize === '100%' && tileExcerptText && (
            <div
              className='tile-excerpt-text-full'
              dangerouslySetInnerHTML={{
                __html: tileExcerptText.childMarkdownRemark.html,
              }}
            ></div>
          )}
        </div>
      </Fade>
    </Link>
  )
}

export default JournalTile
