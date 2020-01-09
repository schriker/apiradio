const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notification = new Schema(
  {
    content: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    room: {
      type: Schema.Types.ObjectId,
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

notification.index({ created_at: 1 }, { expires: 2592000 })

module.exports = mongoose.model('notification', notification)
