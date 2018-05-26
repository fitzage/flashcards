import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards:notifications'

export function submitDeck(key, deck) {
  return AsyncStorage.mergeItem(key, JSON.stringify(deck))
}

export function listDecks() {
  return AsyncStorage.getAllKeys()
}

export function removeDeck(key) {
  return AsyncStorage.removeItem(key)
}

export function getDeck(key) {
  return AsyncStorage.getItem(key).then(deck => {
    return deck
  })
}

export function submitCard(deck, card) {
  return AsyncStorage.getItem(deck).then(results => {
    let data = JSON.parse(results)
    data.questions = [...data.questions, card]
    AsyncStorage.mergeItem(deck, JSON.stringify(data))
  })
}

export function removeCard(deck, index) {
  return AsyncStorage.getItem(deck).then(results => {
    let data = JSON.parse(results)
    data.questions.splice(index, 1)
    AsyncStorage.mergeItem(deck, JSON.stringify(data))
  })
}

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync(),
  )
}

export function createNotification() {
  return {
    title: 'Improve your mind!',
    body: "Don't forget to take a quiz.",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(status => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync()
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(0)

            Notifications.scheduleLocalNotificationsAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              },
            )
            AsyncStorage.setitem(NOTIFICATION_KEY, JSON.stringify(true))
          }
        })
      }
    })
}
