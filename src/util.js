export function showTime(t) {
  const created = Date.parse(t.replace(' ', 'T')+'Z')
  const now = Date.now() //utcDate()
  const diffSecs = Math.floor((now - created) / 1000)
  if (diffSecs < 60) {
    return `${diffSecs} ${plural('second', diffSecs)}`
  } else if (diffSecs < 60 * 60) {
    const m = Math.floor(diffSecs / 60)
    return `${m} ${plural('minute', m)}`
  } else if (diffSecs < 60 * 60 *24) {
    const h = Math.floor(diffSecs / 60 / 60)
    return `${h} ${plural('hour', h)}`
  }
  const days = Math.floor(diffSecs / 24 / 60 / 60)
  return days === 1 ? 'yesterday' : `${days} days`
}

function plural(word, n) {
  return n === 1 ? word : `${word}s`
}

/**
 * 
 * @param {Date} d 
 */
export function toISO8601String(d) {
  return d.toISOString().replace('T', ' ').replace('Z', '')
}
