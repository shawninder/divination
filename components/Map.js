import { useContext, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import get from 'lodash.get'

import useWindowSize from '../use/windowSize'
import roundCoord from '../util/roundCoord'
import styles from '../styles/Map.module.css'
import ThemeContext from '../ctx/theme'
import LocaleContext from '../ctx/locale'
import PositionContext from '../ctx/position'
import texts from '../texts'
import { maxWidth, mapHeight, mapZoom, mapHost } from '../config'

const token = process.env.NEXT_PUBLIC_MAPBOX_PUBLIC_TOKEN

function Map () {
  const locale = useContext(LocaleContext)
  const {position} = useContext(PositionContext)
  const theme = useContext(ThemeContext)
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

  return (
    <div
      className={styles.container}
      ref={container}
      style={{
        height: mapHeight
      }}
    >
      <div>
        {(lat === 0 && lon === 0)
          ? (
            <Image
              key='placeholder'
              src='https://static.thenounproject.com/png/59554-200.png'
              width={mapHeight}
              height={mapHeight}
              alt={txt.worldMap}
              title={txt.worldComment}
            />
          ) : (
            <Image
              className={styles.youAreHere}
              key='you-are-here'
              src={`${mapHost}/styles/v1/mapbox/${theme.mapBoxTheme}/static/${roundCoord(lon)},${roundCoord(lat)},${mapZoom},0/${width}x${mapHeight}?access_token=${token}`}
              width={width}
              height={mapHeight}
              alt={txt.position(position)}
              title={txt.position(position)}
            />
          )}
        </div>
    </div>
  )
}

export default Map
