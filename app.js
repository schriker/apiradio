const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')
const merge = require('lodash.merge')
const jwt = require('jsonwebtoken')

const {
  typeDefs: songTypeDefs,
  resolvers: songResolvers
} = require('./schemas/song')

const {
  typeDefs: playlistTypeDefs,
  resolvers: playlistResolvers
} = require('./schemas/playlist')

const {
  typeDefs: roomTypeDefs,
  resolvers: roomResolvers
} = require('./schemas/room')

const {
  typeDefs: notificationTypeDefs,
  resolvers: notificationResolvers
} = require('./schemas/notification')

const {
  typeDefs: dateTypeDefs,
  resolvers: dateResolvers
} = require('./schemas/date')

const MONGO_HOST =
  process.env.NODE_ENV === 'development'
    ? `mongodb://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
    : `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`

const typeDefs = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`

const resolvers = merge(
  songResolvers,
  playlistResolvers,
  roomResolvers,
  notificationResolvers,
  dateResolvers
)

const server = new ApolloServer({
  typeDefs: [
    typeDefs,
    songTypeDefs,
    playlistTypeDefs,
    roomTypeDefs,
    notificationTypeDefs,
    dateTypeDefs
  ],
  resolvers,
  context: async ({ req, connection }) => {
    if (connection) {
      return connection.context
    } else {
      let user = null
      const token = req.headers.authorization || ''
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        { ignoreExpiration: true },
        (err, decoded) => {
          if (!err) {
            user = decoded
          }
        }
      )
      return {
        user
      }
    }
  }
})

mongoose
  .connect(MONGO_HOST, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('MongoDB conected')
    server.listen().then(({ url, subscriptionsUrl }) => {
      console.log(`Apollo Server ready at ${url}`)
      console.log(`Subscriptions ready at ${subscriptionsUrl}`)
    })
  })
  .catch(err => {
    console.log(err)
  })
