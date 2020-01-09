const mongoose = require('mongoose')

const Schema = mongoose.Schema

const playlist = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    room: {
      type: Schema.Types.ObjectId,
      required: true
    },
    settings: {
      type: Object,
      required: true,
      is_radio: {
        type: Boolean,
        required: true
      },
      songs_limit: {
        type: Number,
        required: true
      },
      add_song_timeout: {
        type: Number,
        required: true
      },
      order: {
        type: Number,
        required: true
      },
      is_skippable: {
        type: Boolean,
        required: true
      }
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false
    }
  }
)

module.exports = mongoose.model('playlist', playlist)
