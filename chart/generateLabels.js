import Chart from 'chart.js'

import texts from '../texts'

export default function generateLabels (chart, locale) {
  const txt = texts[locale]
  if (chart.data.datasets.length === 0) {
    return []
  }
  return chart.data.datasets.reduce((labels, dataset, idx) => {
    const label = dataset.label
    if (label === txt.daysLabel) {
      return labels
    }
    var meta = chart.getDatasetMeta(idx)
    var arc = meta.data[idx]
    var custom = arc && arc.custom || {}
    var arcOpts = chart.options.elements.arc
    var fill = custom.backgroundColor
      ? custom.backgroundColor
      : Chart.helpers.getValueAtIndexOrDefault(dataset.backgroundColor, idx, arcOpts.backgroundColor)
    var stroke = custom.borderColor
      ? custom.borderColor
      : Chart.helpers.getValueAtIndexOrDefault(dataset.borderColor, idx, arcOpts.borderColor)
    var bw = custom.borderWidth
      ? custom.borderWidth
      : Chart.helpers.getValueAtIndexOrDefault(dataset.borderWidth, idx, arcOpts.borderWidth)
    labels.push({
      text: label,
      fillStyle: fill,
      strokeStyle: stroke,
      lineWidth: bw,
      hidden: arc && arc.hidden,
      index: idx
    })
    return labels
  }, [])
}
