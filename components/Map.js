import { useContext, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import get from 'lodash.get'

import useWindowSize from '../use/windowSize'
import styles from '../styles/Map.module.css'
import LocaleContext from '../ctx/locale'
import PositionContext from '../ctx/position'
import texts from '../texts'
import { maxWidth, mapHeight, mapZoom, mapHost } from '../config'
import getMapUrl from '../lib/getMapUrl'

const token = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

function Map () {
  const locale = useContext(LocaleContext)
  const {position} = useContext(PositionContext)
  const { width: windowWidth } = useWindowSize()
  const [containerWidth, setContainerWidth] = useState(windowWidth)
  const container = useRef(null)

  const txt = texts[locale]
  const lat = get(position, ['coords','latitude'], 0)
  const lon = get(position, ['coords','longitude'], 0)
  const width = Math.min(containerWidth, maxWidth) || 1200

  useEffect(() => {
    if (container.current) {
      setContainerWidth(container.current.offsetWidth)
    }
  }, [windowWidth])

  const getSrc = getMapUrl(mapHost, lon, lat, mapZoom, width, mapHeight, token)

  const imgSrc = {
    light: getSrc('light-v10'),
    dark: getSrc('dark-v10')
  }
  return (
    <div
      className={styles.container}
      ref={container}
      style={{
        height: mapHeight
      }}
    >
      <div>
        {lat === 0 && lon === 0 ? (
          <Image
            key='placeholder'
            src='https://static.thenounproject.com/png/59554-200.png'
            width={mapHeight}
            height={mapHeight}
            alt={txt.worldMap}
            title={txt.worldComment}
          />
        ) : (
          <picture>
            <source className={'hide-if-theme-toggled'} srcSet={imgSrc.dark} media='(prefers-color-scheme: dark)' />
            <img
              className={styles.youAreHere}
              key='you-are-here'
              src={imgSrc.light}
              width={width}
              height={mapHeight}
              alt={position.name}
              title={position.name}
            />
          </picture>
        )}
      </div>
    </div>
  )
}

export default Map
