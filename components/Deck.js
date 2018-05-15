import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getDeck, removeDeck } from '../utils/api'
import { Screen, Input } from '../styles'

function deleteDeck(key) {
  removeDeck(key)
}

class Deck extends React.Component {
  state = {
    myDecks: {},
  }
  myDeck(key) {
    getDeck(key).then(deck =>
      this.setState({
        myDecks: {
          [key]: JSON.parse(deck),
        },
      }),
    )
  }

  componentWillMount() {
    this.myDeck(this.props.navigation.state.params.deckkey)
  }

  render() {
    const { deckkey, DeckList } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <Screen>
        <Text>{myDecks[deckkey] && myDecks[deckkey].title}</Text>
        <TouchableOpacity
          onPress={() => {
            deleteDeck(deckkey)
            myNewDecks = DeckList.state.myDecks
            delete myNewDecks[deckkey]
            DeckList.setState({
              myDecks: myNewDecks,
            })
            this.props.navigation.goBack()
          }}
        >
          <Text>Delete</Text>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default Deck
