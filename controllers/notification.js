const Notification = require('../models/notification')
const { RedisPubSub } = require('graphql-redis-subscriptions')
const { withFilter } = require('apollo-server')

const pubsub = new RedisPubSub()
const NOTIFICATION_ADDED = 'NOTIFICATION_ADDED'

const notificationsController = async (parent, args) => {
  const notifications = await Notification.find({
    room: args.room_id
  }).sort({ created_at: -1 }).limit(10)
  return notifications
}

const addNotificationController = async (parent, args) => {
  const notification = new Notification(args.notification)
  await notification.save()
  pubsub.publish(NOTIFICATION_ADDED, { notificationAdded: notification })
  return notification
}

const notificationAddedController = withFilter(() => pubsub.asyncIterator([NOTIFICATION_ADDED]), (payload, variables) => payload.notificationAdded.room === variables.room_id) 

module.exports = {
  notificationsController,
  addNotificationController,
  notificationAddedController
}