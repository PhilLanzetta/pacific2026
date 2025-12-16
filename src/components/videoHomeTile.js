import React, { useState, useRef, useEffect } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactPlayer from 'react-player'
import useOnScreen from '../utils/useOnScreen'
import { AnimatePresence, motion } from 'framer-motion'

const VideoHomeTile = ({ project }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)

  useEffect(() => {
    if (isOnScreen) {
      setIsPlaying(true)
    }
  }, [isOnScreen])

  return (
    <div className='video-tile' ref={elementRef}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='video-poster'
          >
            <GatsbyImage
              image={project.videoPosterImage?.gatsbyImageData}
              alt={project.videoPosterImage?.description}
              className='poster-image'
            ></GatsbyImage>
          </motion.div>
        )}
      </AnimatePresence>
      <ReactPlayer
        url={`https://player.vimeo.com/video/${project.vimeoId}`}
        width={'100%'}
        height={'100%'}
        className='module-video-player'
        controls={false}
        playing={isPlaying}
        playsinline
        loop
        muted
        onStart={() => setIsLoading(false)}
      ></ReactPlayer>
    </div>
  )
}

export default VideoHomeTile
