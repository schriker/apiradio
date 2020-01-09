const { 
  songsController,
  songAddedController,
  addSongController
 } = require('../controllers/song')
const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Song {
    _id: ID!
    video_id: String!
    title: String!
    url: String!
    author: String!
    duration: Int!
    playlist_id: String!
    created_at: Date!
  }

  extend type Query {
    songs(playlist_id: String!): [Song]
  }

  extend type Mutation {
    addSong(song: SongInput!): Song!
  }

  extend type Subscription {
    songAdded(playlist_id: String!): Song!
  }

  input SongInput {
    video_id: String!
    title: String!
    url: String!
    author: String!
    duration: Int!
    playlist_id: String!
  }
`

exports.resolvers = {
  Query: {
    songs: songsController
  },
  Subscription: {
    songAdded: {
      subscribe: songAddedController
    }
  },
  Mutation: {
    addSong: addSongController
  }
}
