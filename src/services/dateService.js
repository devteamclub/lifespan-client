export const formatISOdate = (ISOdate) => {
  if (!ISOdate) return ''
  const [year, month, day] = ISOdate.substring(0, 10).split('-')
  return `${month}/${day}/${year}`
}

export const getYear = (date) => {
  if (!date) return ''
  const [year] = date.substring(0, 10).split('-')
  return year
}
