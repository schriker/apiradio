const { RateLimiterMongo } = require('rate-limiter-flexible')
const mongoose = require('mongoose')

exports.rateLimiter = ({ duration, playlist_id, user }) => {
  const rateLimiterInstance = new RateLimiterMongo({
    keyPrefix: `limiter_${playlist_id}`,
    storeClient: mongoose.connection,
    points: 1,
    duration: duration
  })

  return new Promise((resolve, reject) => {
    rateLimiterInstance.consume(user, 1)
      .then(() => {
        resolve()
      })
      .catch((err) => {
        reject(`Musisz odczekać ${duration}s aby dodać kolejny utwór.`)
      })
  })
}
