export default function roundCoord (nb, factor = 100) {
  return Math.round(nb * factor) / factor
}
