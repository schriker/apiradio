const { 
  notificationsController, 
  addNotificationController,
  notificationAddedController
} = require('../controllers/notification')
const { gql } = require('apollo-server')

exports.typeDefs = gql`
  enum NotificationType {
    PLAYLIST
    SKIP
  }

  type Notification {
    _id: ID!
    content: String!
    type: NotificationType
    room: String!
    created_at: String!
  }

  extend type Query {
    notifications(room_id: String!): [Notification]
  }

  extend type Subscription {
    notificationAdded(room_id: String!): Notification!
  }

  extend type Mutation {
    addNotification(notification: NotificationInput!): Notification
  }

  input NotificationInput {
    content: String!
    type: NotificationType
    room: String!
  }
`

exports.resolvers = {
  Query: {
    notifications: notificationsController
  },
  Mutation: {
    addNotification: addNotificationController
  },
  Subscription: {
    notificationAdded: {
      subscribe: notificationAddedController 
    }
  }
}
