import PropTypes from 'prop-types'
export const positionType = PropTypes.shape({
  coords: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  })
})
