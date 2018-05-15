import React from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { submitDeck, getDeck, listDecks, removeDeck } from '../utils/api'
import { Screen, Input, ListItem } from '../styles'

function deleteDeck(key) {
  removeDeck(key)
}

class DeckList extends React.Component {
  state = {
    myDecks: {},
  }
  getDecks() {
    listDecks().then(decks => {
      decks.map(key =>
        getDeck(key).then(deck =>
          this.setState({
            myDecks: {
              ...this.state.myDecks,
              [key]: JSON.parse(deck),
            },
          }),
        ),
      )
    })
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () =>
      this.getDecks(),
    )
  }

  render() {
    const { myDecks } = this.state
    return (
      <Screen>
        {Object.keys(myDecks).map(key => {
          return (
            <View key={key}>
              <ListItem
                onPress={() =>
                  this.props.navigation.navigate('Deck', {
                    deckkey: key,
                    DeckList: this,
                  })
                }
              >
                <Text>{myDecks[key].title}</Text>
              </ListItem>
            </View>
          )
        })}
      </Screen>
    )
  }
}

export default DeckList
