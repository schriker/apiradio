const mongoose = require('mongoose')

const Schema = mongoose.Schema

const room = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true
    },
    ranking: {
      type: Array
    },
    notifications: {
      type: Array
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: false
    }
  }
)

module.exports = mongoose.model('room', room)