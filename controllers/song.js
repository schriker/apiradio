const Song = require('../models/song')
const Playlist = require('../models/playlist')
const { withFilter } = require('apollo-server')
const { rateLimiter } = require('../middlewares/rateLimiter')
const { RedisPubSub } = require('graphql-redis-subscriptions')

const pubsub = new RedisPubSub()
const SONG_ADDED = 'SONG_ADDED'

const songsController = async (parent, args) => {
  try {
    const playlist = await Playlist.findById(args.playlist_id)
    const songs = await Song.find({ playlist_id: args.playlist_id })
      .sort({ created_at: playlist.settings.order })
      .limit(playlist.settings.songs_limit)
    return songs
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const songAddedController = withFilter(() => pubsub.asyncIterator([SONG_ADDED]), (payload, variables) => payload.songAdded.playlist_id === variables.playlist_id)

const addSongController = async (parent, args, context) => {
  try {
    if (!context.user) {
      throw new Error('Nieprawidłowy token.')
    }
    const { song: songData } = args
    const playlist = await Playlist.findById(songData.playlist_id)
    await rateLimiter({
      playlist_id: songData.playlist_id,
      duration: playlist.settings.add_song_timeout,
      user: songData.author
    })
    const latestSongs = await Song.find({ playlist_id: playlist._id })
      .sort({ created_at: playlist.settings.order })
      .limit(playlist.settings.songs_limit)

    if (latestSongs.some(song => song.url === songData.url)) {
      throw new Error('Podany utwór jest już na liście.')
    }

    const song = new Song({
      ...songData,
      expire_at: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
    })
    await song.save()
    pubsub.publish(SONG_ADDED, { songAdded: song })
    return song
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

module.exports = {
  songsController,
  songAddedController,
  addSongController
}