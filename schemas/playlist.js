const {
  playlistController,
  roomPlaylistsController
} = require('../controllers/playlist')
const { gql } = require('apollo-server')

exports.typeDefs = gql`
  type Playlist {
    _id: ID!
    name: String!
    room: String!
    settings: PlaylistSettings!
    created_at: String!
  }

  type PlaylistSettings {
    is_radio: Boolean!
    songs_limit: Int!
    add_song_timeout: Int!
    order: Int!
    is_skippable: Boolean!
  }

  extend type Query {
    playlist(playlist_id: String!): Playlist
    roomPlaylists(room_id: String!): [Playlist]
  }
`

exports.resolvers = {
  Query: {
    playlist: playlistController,
    roomPlaylists: roomPlaylistsController
  }
}
