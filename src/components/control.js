import React, { forwardRef } from 'react'
import Slider from '@mui/material/Slider'
import back from '../images/rewind.svg'
import play from '../images/play.svg'
import pause from '../images/pause.svg'
import forward from '../images/forward.svg'
import sound from '../images/sound.svg'

const Control = forwardRef((props, controlRef) => {
  const {
    onPlayPause,
    playing,
    onRewind,
    onForward,
    played,
    onSeek,
    onSeekMouseUp,
    onVolumeChangeHandler,
    onVolumeSeekUp,
    volume,
    mute,
    onMute,
    duration,
    currentTime,
    onMouseSeekDown,
  } = props

  return (
    <div className='video-controls' ref={controlRef}>
      <div className='progress-bar'>
        <Slider
          min={0}
          max={100}
          value={played * 100}
          onChange={onSeek}
          onChangeCommitted={onSeekMouseUp}
          onMouseDown={onMouseSeekDown}
          sx={{
            '& .MuiSlider-thumb': {
              color: '#fff',
              height: '10px',
              width: '10px',
              '&:focus, &:hover, &.Mui-active': {
                boxShadow: 'none',
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                  boxShadow: 'none',
                },
              },
            },
            '& .MuiSlider-track': {
              color: '#fff',
              height: '2px',
            },
            '& .MuiSlider-rail': {
              color: '#fff',
              height: '2px',
            },
          }}
        />
      </div>
      <div className='controls-container'>
        <div>
          {currentTime} / {duration}
        </div>
        <div className='seek-and-play-controls'>
          <img src={back} alt='seek back' onClick={onRewind}></img>
          <img
            src={play}
            alt='play'
            onClick={playing ? null : onPlayPause}
          ></img>
          <img
            src={pause}
            alt='pause'
            onClick={playing ? onPlayPause : null}
          ></img>
          <img src={forward} alt='seek forward' onClick={onForward}></img>
        </div>
        <div className='sound-container'>
          <img src={sound} alt='sound icon'></img>
          <Slider
            onChange={onVolumeChangeHandler}
            value={volume * 100}
            onChangeCommitted={onVolumeSeekUp}
            sx={{
              width: '50%',
              '& .MuiSlider-thumb': {
                color: '#fff',
                height: '10px',
                width: '10px',
                '&:focus, &:hover, &.Mui-active': {
                  boxShadow: 'none',
                  // Reset on touch devices, it doesn't add specificity
                  '@media (hover: none)': {
                    boxShadow: 'none',
                  },
                },
              },
              '& .MuiSlider-track': {
                color: '#fff',
                height: '2px',
              },
              '& .MuiSlider-rail': {
                color: '#fff',
                height: '2px',
              },
            }}
          />
        </div>
      </div>
    </div>
  )
})

export default Control
