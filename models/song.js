const mongoose = require('mongoose')

const Schema = mongoose.Schema

const song = new Schema(
  {
    video_id: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    playlist_id: {
      type: Schema.Types.ObjectId,
      required: true
    },
    expire_at: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false
    }
  }
)

song.index({ expire_at: 1 }, { expires: 0 })

module.exports = mongoose.model('song', song)
