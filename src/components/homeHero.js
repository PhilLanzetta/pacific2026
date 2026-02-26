import React, { useState, useEffect, useRef } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import useOnScreen from '../utils/useOnScreen'
import ReactPlayer from 'react-player'

const HomeHero = ({ videoId, poster, landscape, fontColor, sound, url }) => {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    if (isOnScreen) {
      setPlaying(true)
    } else {
      setPlaying(false)
    }
  }, [isOnScreen])

  return (
    <div
      className={url ? 'journal-video-container' : 'hero-container'}
      ref={elementRef}
    >
      <GatsbyImage
        image={poster?.gatsbyImageData}
        alt={poster?.description}
        className={`poster-image ${!isLoading && 'fade-away'}`}
      ></GatsbyImage>
      <div className={url ? '' : 'hero-video-container'}>
        <ReactPlayer
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
            opacity: 1,
            zIndex: 5,
          }}
          url={url ? url : `https://player.vimeo.com/video/${videoId}`}
          width={url ? '100%' : '100vw'}
          height={
            url
              ? '100%'
              : landscape === true
              ? 'calc(100vw * 9 / 16)'
              : 'calc(100vw * 16 / 9)'
          }
          controls={false}
          playing={playing}
          playsinline
          loop
          muted={muted}
          volume={1}
          onPlay={() => setIsLoading(false)}
          onError={() => setIsLoading(true)}
        ></ReactPlayer>
      </div>
      {sound === true && (
        <button
          onClick={() => setMuted(!muted)}
          style={{ color: fontColor }}
          className={muted ? 'home-muted-button' : 'home-sound-button'}
          aria-label='mute or unmute'
        >
          {muted ? (
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10.906 14.541'>
              <g id='Group_61' data-name='Group 61' transform='translate(0)'>
                <path
                  id='Path_2'
                  data-name='Path 2'
                  d='M-3496-19960.061h3.378l4.777-4.1h1.053v14.541h-1.229l-2.73-2.23-1.872-1.52H-3496Z'
                  transform='translate(3496 19964.156)'
                  fill='currentColor'
                />
                <ellipse
                  id='Ellipse_5'
                  data-name='Ellipse 5'
                  cx='2.337'
                  cy='2.337'
                  rx='2.337'
                  ry='2.337'
                  transform='translate(6.232 4.674)'
                  fill='currentColor'
                />
                <ellipse
                  id='Ellipse_6'
                  data-name='Ellipse 6'
                  cx='2.337'
                  cy='2.337'
                  rx='2.337'
                  ry='2.337'
                  transform='translate(6.232 4.674)'
                  fill='currentColor'
                />
              </g>
            </svg>
          ) : (
            <svg
              viewBox='0 0 35 31'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <g clip-path='url(#clip0_19_13)'>
                <path
                  d='M7 10.323H13.1946L21.9551 2.99268H23.8861V28.9927H21.6323L16.6259 25.0045L13.1928 22.2875H7V10.323Z'
                  fill='currentColor'
                />
                <path
                  d='M22.7134 19.7148C25.0804 19.7148 26.9992 17.8439 26.9992 15.5361C26.9992 13.2283 25.0804 11.3574 22.7134 11.3574C20.3465 11.3574 18.4277 13.2283 18.4277 15.5361C18.4277 17.8439 20.3465 19.7148 22.7134 19.7148Z'
                  fill='currentColor'
                />
                <path
                  d='M22.7134 19.7148C25.0804 19.7148 26.9992 17.8439 26.9992 15.5361C26.9992 13.2283 25.0804 11.3574 22.7134 11.3574C20.3465 11.3574 18.4277 13.2283 18.4277 15.5361C18.4277 17.8439 20.3465 19.7148 22.7134 19.7148Z'
                  fill='currentColor'
                />
              </g>
              <rect
                width='44.2055'
                height='1.76822'
                transform='matrix(-0.766044 -0.642788 -0.642788 0.766044 35 29)'
                fill='currentColor'
              />
              <defs>
                <clipPath id='clip0_19_13'>
                  <rect
                    width='20'
                    height='26'
                    fill='white'
                    transform='translate(7 3)'
                  />
                </clipPath>
              </defs>
            </svg>
          )}
        </button>
      )}
    </div>
  )
}

export default HomeHero
