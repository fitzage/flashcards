import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getDeck, removeDeck } from '../utils/api'
import { Screen, Input, ListItem, Button } from '../styles'
import Reactotron from 'reactotron-react-native'

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

  componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () =>
      this.myDeck(this.props.navigation.state.params.deckkey),
    )
  }

  render() {
    const { deckkey, DeckList } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <Screen>
        {myDecks[deckkey] && (
          <View>
            <Text>{myDecks[deckkey].title}</Text>
            <Text>{myDecks[deckkey].questions.length} Cards</Text>
          </View>
        )}
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
        {myDecks[deckkey] &&
          myDecks[deckkey].questions.map((question, index) => {
            return (
              <View key={question.question}>
                <ListItem
                  onPress={() =>
                    this.props.navigation.navigate('Card', {
                      deckkey,
                      cardindex: index,
                    })
                  }
                >
                  <Text>
                    {question.question}: {question.answer}
                  </Text>
                </ListItem>
              </View>
            )
          })}
        <Button
          onPress={() => {
            this.props.navigation.navigate('AddCard', {
              deckkey,
            })
          }}
        >
          <Text>Add Card</Text>
        </Button>
      </Screen>
    )
  }
}

export default Deck
