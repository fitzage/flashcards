import { AsyncStorage } from 'react-native'
const STORAGE_KEY = 'Flashcards:decks'

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
