import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import { Fade } from 'react-awesome-reveal'

const AudioModule = ({ content }) => {
  return (
    <Fade triggerOnce>
      <div className='audio-module-container'>
        <p>{content.title}</p>
        {!content.audioEmbed && (
          <AudioPlayer
            src={content.audioFile?.file?.url || content.audioUrl}
            layout={'horizontal-reverse'}
            showJumpControls={false}
            className='audio-player'
            customIcons={{
              play: (
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 86 86'>
                  <g
                    id='Group_427'
                    data-name='Group 427'
                    transform='translate(1591 -442) rotate(90)'
                  >
                    <g
                      id='Ellipse_33'
                      data-name='Ellipse 33'
                      transform='translate(442 1505)'
                      fill='#fff'
                      stroke='#000'
                      stroke-width='1'
                    >
                      <circle cx='43' cy='43' r='43' stroke='none' />
                      <circle cx='43' cy='43' r='42.5' fill='none' />
                    </g>
                    <g
                      id='Polygon_2'
                      data-name='Polygon 2'
                      transform='translate(463 1524)'
                      fill='#fff'
                    >
                      <path
                        d='M 44.13430023193359 38.5 L 0.8657015562057495 38.5 L 22.5 1.00054931640625 L 44.13430023193359 38.5 Z'
                        stroke='none'
                      />
                      <path
                        d='M 22.5 2.001117706298828 L 1.731414794921875 38 L 43.26858520507812 38 L 22.5 2.001117706298828 M 22.5 0 L 45 39 L 0 39 L 22.5 0 Z'
                        stroke='none'
                        fill='#000'
                      />
                    </g>
                  </g>
                </svg>
              ),
            }}
          ></AudioPlayer>
        )}
        {content.audioEmbed && (
          <div
            className='audio-embed'
            dangerouslySetInnerHTML={{
              __html: content.audioEmbed.childMarkdownRemark.html,
            }}
          ></div>
        )}
        <p className='audio-description'>{content.audioDescription}</p>
      </div>
    </Fade>
  )
}

export default AudioModule
