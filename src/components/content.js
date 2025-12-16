import React from 'react'
import ImageModule from './imageModule'
import TextModule from './textModule'
import VideoModule from './videoModule'

const Content = ({ content, scope }) => {
  const primaryContent = content[0]
  const secondaryContent = content.slice(1)

  return (
    <div className='content-holder'>
      <TextModule primary content={primaryContent}></TextModule>
      <p className='case-scope'>
        {scope?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </p>
      {secondaryContent.map((item) => {
        if (item.imageId) {
          return <ImageModule key={item.imageId} content={item}></ImageModule>
        } else if (item.bodyTextId) {
          return <TextModule key={item.bodyTextId} content={item}></TextModule>
        } else if (item.videoId) {
          return <VideoModule key={item.videoId} content={item}></VideoModule>
        } else {
          return <div>Unknown Content Type</div>
        }
      })}
    </div>
  )
}

export default Content
