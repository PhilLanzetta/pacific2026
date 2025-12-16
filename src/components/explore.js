import React, { useState, useEffect } from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { Fade } from 'react-awesome-reveal'

const Explore = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulTag {
        nodes {
          id
          name
        }
      }
    }
  `)

  const [randomTags, setRandomTags] = useState(
    data.allContentfulTag.nodes.slice(0, 20)
  )

  const shuffleData = (array) => {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  useEffect(() => {
    const randomData = shuffleData(data.allContentfulTag.nodes).slice(0, 20)
    setRandomTags(randomData)
  }, [])

  return (
    <div className='explore-container'>
      <Fade triggerOnce>
        <h2>Explore Our Website</h2>
        <div className='explore-tag-container'>
          {randomTags.map((tag, index) => {
            if (tag.name.split(': ')[1]) {
              return (
                <Link
                  to={`/projects/?filter=${tag.name
                    .split(': ')[1]
                    .replaceAll(' & ', '')
                    .replaceAll(' ', '')}`}
                  key={index}
                  className='explore-tag-link'
                >
                  {tag.name.split(': ')[1]}
                </Link>
              )
            } else return null
          })}
        </div>
      </Fade>
    </div>
  )
}

export default Explore
