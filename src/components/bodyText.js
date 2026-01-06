import React from 'react'
import { Fade } from 'react-awesome-reveal'

const BodyText = ({ content }) => {
  const classes = ['body-text']
  if (content.padding) {
    if (content.padding === 'Large') {
      classes.push('large-margin-text')
    } else if (content.padding === 'Medium') {
      classes.push('medium-margin')
    } else if (content.padding === 'Small') {
      classes.push('primary-margin')
    }
  }

  if (content.alignment) {
    if (content.alignment === 'Left') {
      classes.push('left-aligned')
    } else if (content.alignment === 'Center') {
      classes.push('center-aligned')
    } else if (content.alignment === 'Right') {
      classes.push('right-aligned')
    }
  }

  if (content.fontFamily) {
    if (content.fontFamily === 'Serif') {
      classes.push('serif')
    } else {
      classes.push('sans-serif')
    }
  }

  return (
    <Fade triggerOnce>
      <div
        dangerouslySetInnerHTML={{
          __html: content.text?.childMarkdownRemark.html,
        }}
        className={classes.join(' ')}
      ></div>
    </Fade>
  )
}

export default BodyText
