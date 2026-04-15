import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Control from './control'
import { formatTime } from '../utils/formatTime'
import full from '../images/fullScreen.svg'
import small from '../images/smallScreen.svg'
import play from '../images/play.svg'
import screenfull from 'screenfull'
import useWindowSize from '../utils/useWindowSize'
import { Fade } from 'react-awesome-reveal'
import useOnScreen from '../utils/useOnScreen'

let count = 0

const VideoModule = ({ content, onVideoPlay, autoplayVideos }) => {
  const { videoId, videoLink, autoplay } = content
  const videoPlayerRef = useRef(null)
  const controlRef = useRef(null)
  const fullScreenRef = useRef(null)
  const elementRef = useRef(null)
  const isOnScreen = useOnScreen(elementRef)
  const { width, height } = useWindowSize()
  const isMobile = height > width ? width < 769 : width < 900

  const [videoState, setVideoState] = useState({
    playing: false,
    muted: autoplay && !isMobile,
    volume: isMobile || !autoplay ? 1 : 0,
    playbackRate: 1.0,
    played: 0,
    playsinline: true,
    seeking: false,
  })

  const [userInteraction, setUserInteraction] = useState(false)
  const [fullScreenState, setFullScreenState] = useState(false)
  const [mobileHasStarted, setMobileHasStarted] = useState(false)
  const [playerReady, setPlayerReady] = useState(false)
  const [thumbnail, setThumbnail] = useState(null)

  // Fetch Vimeo thumbnail for mobile poster
  useEffect(() => {
    if (!videoLink) return
    fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(videoLink)}`,
    )
      .then((res) => res.json())
      .then((data) => {
        const hires = data.thumbnail_url?.replace(/_\d+$/, '_1280')
        setThumbnail(hires || data.thumbnail_url)
      })
      .catch(() => null)
  }, [videoLink])

  // Autoplay when scrolled into view — desktop only
  useEffect(() => {
    if (!autoplayVideos || !autoplay) return
    if (isOnScreen && !userInteraction) {
      setVideoState((prev) => ({ ...prev, playing: true }))
    } else {
      setVideoState((prev) => ({ ...prev, playing: false }))
    }
  }, [isOnScreen, autoplayVideos])

  const { playing, muted, volume, playbackRate, played, seeking } = videoState

  const currentTime = videoPlayerRef.current
    ? videoPlayerRef.current.getCurrentTime()
    : '00:00'
  const duration = videoPlayerRef.current
    ? videoPlayerRef.current.getDuration()
    : '00:00'

  const formatCurrentTime = formatTime(currentTime)
  const formatDuration = formatTime(duration)

  const handlePlay = () => {
    if (isMobile) setMobileHasStarted(true)
    if (onVideoPlay) {
      onVideoPlay({
        pause: () => setVideoState((prev) => ({ ...prev, playing: false })),
      })
    }
  }

  const playPauseHandler = () => {
    setUserInteraction(true)
    setVideoState((prev) => ({ ...prev, playing: !prev.playing }))
  }

  const rewindHandler = () => {
    setUserInteraction(true)
    if (videoPlayerRef.current.getCurrentTime() > 5) {
      videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() - 5)
    } else {
      videoPlayerRef.current.seekTo(0)
    }
  }

  const handleFastFoward = () => {
    setUserInteraction(true)
    videoPlayerRef.current.seekTo(videoPlayerRef.current.getCurrentTime() + 5)
  }

  const progressHandler = (state) => {
    if (count > 5) {
      if (controlRef.current && fullScreenRef.current) {
        controlRef.current.style.visibility = 'hidden'
        fullScreenRef.current.style.visibility = 'hidden'
      }
    } else {
      count += 1
    }
    if (!seeking) {
      setVideoState((prev) => ({ ...prev, ...state }))
    }
  }

  const seekHandler = (e, value) => {
    setUserInteraction(true)
    setVideoState((prev) => ({ ...prev, played: parseFloat(value / 100) }))
    videoPlayerRef.current.seekTo(parseFloat(value / 100))
  }

  const seekMouseUpHandler = (e, value) => {
    setUserInteraction(true)
    setVideoState((prev) => ({ ...prev, seeking: false }))
    videoPlayerRef.current.seekTo(value / 100)
  }

  const volumeChangeHandler = (e, value) => {
    setUserInteraction(true)
    const newVolume = parseFloat(value) / 100
    setVideoState((prev) => ({
      ...prev,
      volume: newVolume,
      muted: Number(newVolume) === 0,
    }))
  }

  const volumeSeekUpHandler = (e, value) => {
    setUserInteraction(true)
    const newVolume = parseFloat(value) / 100
    setVideoState((prev) => ({
      ...prev,
      volume: newVolume,
      muted: newVolume === 0,
    }))
  }

  const muteHandler = () => {
    setUserInteraction(true)
    setVideoState((prev) => ({ ...prev, muted: !prev.muted }))
  }

  const onSeekMouseDownHandler = () => {
    setUserInteraction(true)
    setVideoState((prev) => ({ ...prev, seeking: true }))
  }

  const mouseMoveHandler = () => {
    controlRef.current.style.visibility = 'visible'
    fullScreenRef.current.style.visibility = 'visible'
    count = 0
  }

  const handleClickFullscreen = () => {
    if (!fullScreenState && !isMobile && screenfull.isEnabled) {
      screenfull.request(document.getElementById(videoId))
      setFullScreenState(true)
    } else if (isMobile && !fullScreenState && screenfull.isEnabled) {
      const videoDiv = document.getElementById(videoId)
      screenfull.request(videoDiv.getElementsByTagName('iframe')[0])
      setFullScreenState(true)
    } else {
      document.exitFullscreen()
      setFullScreenState(false)
    }
  }

  return (
    <Fade triggerOnce>
      <div
        className={`video-module-container ${
          content.fullBleed
            ? 'fullbleed-video'
            : content.threeQuartersWidth
            ? 'three-quarters-video'
            : content.marginWidth
            ? 'margin-width-video'
            : 'large-padding'
        } ${content.roundedCorners ? 'video-border-radius' : ''}`}
      >
        <div
          id={videoId}
          className='video-module'
          onMouseMove={isMobile ? null : mouseMoveHandler}
          key={isMobile}
          ref={elementRef}
        >
          {/* Thumbnail overlay — visible on mobile until player is ready */}
          {isMobile && !playerReady && (
            <div
              className={`mobile-play-overlay${
                mobileHasStarted ? ' mobile-play-overlay--loading' : ''
              }`}
              onClick={
                !mobileHasStarted
                  ? () => {
                      setMobileHasStarted(true)
                      setUserInteraction(true)
                      setVideoState((prev) => ({ ...prev, playing: true }))
                    }
                  : undefined
              }
              role={!mobileHasStarted ? 'button' : undefined}
              aria-label={!mobileHasStarted ? 'Play video' : undefined}
            >
              {thumbnail && (
                <img
                  src={thumbnail}
                  alt=''
                  className='mobile-video-thumbnail'
                />
              )}
              {/* Hide the play icon once tapped — thumbnail holds space while player loads */}
              {!mobileHasStarted && (
                <img src={play} alt='play' className='mobile-play-icon' />
              )}
            </div>
          )}

          {/* Player — mounts on mobile as soon as user taps, always mounted on desktop */}
          {(!isMobile || mobileHasStarted) && (
            <ReactPlayer
              url={videoLink}
              ref={videoPlayerRef}
              width={'100%'}
              height={'100%'}
              className='module-video-player'
              progressInterval={1}
              controls={isMobile}
              playing={playing}
              playsinline
              volume={volume}
              muted={muted}
              onReady={() => setPlayerReady(true)}
              onPlay={handlePlay}
              onProgress={progressHandler}
              onEnded={() => videoPlayerRef.current.seekTo(0)}
            />
          )}

          {/* Desktop controls */}
          {!isMobile && (
            <Control
              ref={controlRef}
              onPlayPause={playPauseHandler}
              playing={playing}
              onRewind={rewindHandler}
              onForward={handleFastFoward}
              played={played}
              onSeek={seekHandler}
              onSeekMouseUp={seekMouseUpHandler}
              volume={volume}
              onVolumeChangeHandler={volumeChangeHandler}
              onVolumeSeekUp={volumeSeekUpHandler}
              mute={muted}
              onMute={muteHandler}
              playRate={playbackRate}
              duration={formatDuration}
              currentTime={formatCurrentTime}
              onMouseSeekDown={onSeekMouseDownHandler}
            />
          )}
          {!isMobile && (
            <div
              className='full-screen-btn'
              ref={fullScreenRef}
              onClick={handleClickFullscreen}
            >
              <img src={fullScreenState ? small : full} alt='full screen' />
            </div>
          )}
          {!isMobile && (
            <button
              className='video-play-pause-overlay'
              onClick={playPauseHandler}
              aria-label='play or pause'
            />
          )}
        </div>
      </div>
    </Fade>
  )
}

export default VideoModule
