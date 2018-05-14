import React from 'react'
import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import { submitDeck, getDeck, listDecks, removeDeck } from '../utils/api'
import { AsyncStorage } from 'react-native'
import { Screen, Input } from '../styles'

function addDeck(key, deck) {
  submitDeck(key, deck)
}

function deleteDeck(key) {
  removeDeck(key)
}

class DeckList extends React.Component {
  state = {
    newDeckName: '',
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
    this.getDecks()
  }
  render() {
    const { newDeckName, myDecks } = this.state
    return (
      <Screen>
        <Input
          placeholder="New Deck Name"
          onChangeText={text => this.setState({ newDeckName: text })}
          value={this.state.newDeckName}
          onSubmitEditing={() => {
            key = newDeckName.replace(/\s+/g, '').toLowerCase()
            submitDeck(key, { title: newDeckName })
            this.setState({ newDeckName: '' })
            this.getDecks()
          }}
        />
        {Object.keys(myDecks).map(key => {
          return (
            <View key={key}>
              <Text>
                {key}: {myDecks[key].title}
              </Text>
              <TouchableOpacity
                onPress={async () => {
                  await deleteDeck(key)
                  myNewDecks = myDecks
                  delete myNewDecks[key]
                  this.setState({
                    myDecks: myNewDecks,
                  })
                }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </Screen>
    )
  }
}

export default DeckList
