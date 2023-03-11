const getFormattedDate = () => {
  const formattedDate = new Date().toLocaleString()
    .replaceAll('/', '-')
    .replaceAll(':', '_')

  return formattedDate
}

module.exports = { getFormattedDate }
