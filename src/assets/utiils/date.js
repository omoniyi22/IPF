let date = require('date-and-time')

export const DateForm = (data) => {
  let year = +data.substr(0, 4)
  let month = +data.substr(5, 2) - 1
  let day = +data.substr(8, 2)
  let pattern = date.compile('ddd, MMM DD YYYY');

  let dats = date.format(new Date(year, month, day), pattern)

  return dats
}

export const TimeForm = (tim) => {
  let time = tim.substr(0, 5)
  time = date.transform(time, 'HH:mm', 'hh:mm A');
  return (time)
}