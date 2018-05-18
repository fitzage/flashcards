import { AsyncStorage } from 'react-native'
import Reactotron from 'reactotron-react-native'

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
