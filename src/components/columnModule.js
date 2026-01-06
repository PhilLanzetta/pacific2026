import React from 'react'
import BodyText from './bodyText'
import ImageModule from './imageModule'

const ColumnModule = ({ content }) => {
  const outerClass = ['outer-column-base']
  const innerClass = ['inner-column-base']
  if (content.border) {
    if (content.border.includes('Top')) {
      outerClass.push('border-top')
    }
    if (content.border.includes('Right')) {
      outerClass.push('border-right')
    }
    if (content.border.includes('Left')) {
      outerClass.push('border-left')
    }
    if (content.border.includes('Bottom')) {
      outerClass.push('border-bottom')
    }
  }

  if (content.borderPadding) {
    outerClass.push('outer-column-padding')
  }

  if (content.mobileWrap) {
    if (content.wrapReverse) {
      innerClass.push('mobile-wrap-reverse')
    } else {
      innerClass.push('mobile-wrap')
    }
  }


  return (
    <div className={outerClass.join(' ')}>
      {content.headingText && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.headingText.childMarkdownRemark.html,
          }}
        ></div>
      )}
      <div className={innerClass.join(' ')}>
        {content.columns.map((column) => (
          <div key={column.id}>
            {column.content.map((item) => {
              if (item.bodyTextId) {
                return (
                  <BodyText key={item.bodyTextId} content={item}></BodyText>
                )
              } else if (item.imageId) {
                return (
                  <div key={item.imageId} className={content.borderPadding ? 'image-with-margin' : 'full-bleed-image-container'}>
                    <ImageModule content={item}></ImageModule>
                  </div>
                )
              } else {
                return <div>Unknown Content</div>
              }
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColumnModule
