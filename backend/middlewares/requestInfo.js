const requestInfo = (req, res, next) => {
  const path = req.originalUrl
  console.log(`${req.method} ${path}`.white.inverse)
  next()
}
export { requestInfo }
