const { roomController } = require('../controllers/room')
const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Ranking {
    name: String!
    points: Int!
  }

  type Room {
    _id: ID!
    name: String!
    owner: String!
    ranking: [Ranking]
    created_at: String!
  }

  extend type Query {
    room(room_id: String!): Room
  }
`

exports.resolvers = {
  Query: {
    room: roomController
  }
}