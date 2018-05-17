import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { submitCard } from '../utils/api'
import { Screen, Input, ListItem } from '../styles'

class AddCard extends React.Component {
  state = {
    newQuestion: '',
    newAnswer: '',
  }
  newCard(deckkey, key, card) {
    submitCard(deckkey, key, card).then(this.myDeck(key))
  }
  render() {
    return <Text>This is a test</Text>
  }
}

export default AddCard
