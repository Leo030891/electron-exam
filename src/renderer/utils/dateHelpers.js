export function getDateString(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  let day = date.getDate()
  let month = date.getMonth()
  let year = date.getFullYear()
  return `${month + 1}/${day}/${year}`
}

export function getTimeString(date) {
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  let ampm = date.getHours() >= 12 ? 'PM' : 'AM'
  let hour = date.getHours()
  if (hour === 12 || hour === 0 || hour === 24) {
    hour = 12
  } else {
    hour = hour % 12
  }
  let minute = date
    .getMinutes()
    .toString()
    .padStart(2, '0')
  return `${hour}:${minute} ${ampm}`
}

function formatTimeString(str) {
  var re = /0|:/
  if (re.test(str[0]) && str.length > 4) {
    return formatTimeString(str.slice(1))
  }
  return str
}

export function getTimeHHMMSS(sec) {
  let str = new Date(sec * 1000).toISOString().substr(11, 8)
  return formatTimeString(str)
}
