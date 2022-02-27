export default async function getPlaceName(position, locale) {
  const nameRes = await fetch(
    `/api/name?lang=${locale}&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
  )
  return nameRes.text()
}
