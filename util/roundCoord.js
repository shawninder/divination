export default function roundCoord (x, factor = 100) {
  return Math.round(x * factor) / factor
}
