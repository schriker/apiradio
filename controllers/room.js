const Room = require('../models/room')

const roomController = async (parent, args) => {
  const room = await Room.findById(args.room_id)
  return room
}

module.exports = {
  roomController
}