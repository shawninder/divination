import { useState, useEffect } from 'react'
import debounce from 'lodash.debounce'

import { resizeDebounce, resizeMaxDebounce } from '../config'

export default function useWindowSize () {
  const [size, setSize] = useState({ width: 0, height: 0 })
  const debouncedSetSize = debounce((event) => {
    setSize({
      width: event.target.innerWidth,
      height: event.target.innerHeight
    })
  }, resizeDebounce, {
    maxWait: resizeMaxDebounce
  })

  useEffect(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight
    })
    window.addEventListener('resize', debouncedSetSize, false)
    return () => {
      window.removeEventListener('resize', debouncedSetSize, false)
    }
  }, [])

  return size
}
