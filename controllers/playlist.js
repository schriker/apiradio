const Playlist = require('../models/playlist')

const playlistController = async (parent, args) => {
  try {
    const playlist = await Playlist.findById(args.playlist_id)
    return playlist
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const roomPlaylistsController = async (parent, args) => {
  try {
    const playlists = await Playlist.find({ room: args.room_id }).sort({
      created_at: -1
    })
    return playlists
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = {
  playlistController,
  roomPlaylistsController
}