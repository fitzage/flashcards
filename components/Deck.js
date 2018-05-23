import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getDeck, removeDeck, removeCard } from '../utils/api'
import { Screen, ListItem, Button, Status } from '../styles'
import { MaterialIcons } from '@expo/vector-icons'

function deleteDeck(key) {
  removeDeck(key)
}

class Deck extends React.Component {
  state = {
    myDecks: {},
  }

  myDeck(key) {
    getDeck(key).then(deck => {
      this.props.navigation.setParams({ customTitle: JSON.parse(deck).title })
      this.setState({
        myDecks: {
          [key]: JSON.parse(deck),
          customTitle: JSON.parse(deck).title,
        },
      })
    })
  }

  deleteCard(deckkey, index) {
    removeCard(deckkey, index)
    myNewDecks = this.state.myDecks
    myNewDecks[deckkey].questions.splice(index, 1)
    this.setState({
      myDecks: myNewDecks,
    })
  }

  componentWillMount() {
    this.myDeck(this.props.navigation.state.params.deckkey)
  }

  componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () =>
      this.myDeck(this.props.navigation.state.params.deckkey),
    )
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    return {
      title: params.customTitle ? params.customTitle : 'Deck',
    }
  }

  render() {
    const { deckkey, DeckList } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <Screen>
        {myDecks[deckkey] && (
          <Status>
            <Text>{myDecks[deckkey].questions.length} Questions</Text>
          </Status>
        )}
        {myDecks[deckkey] &&
          myDecks[deckkey].questions.map((question, index) => {
            return (
              <View key={question.question}>
                <ListItem>
                  <Text>
                    {question.question}: {question.answer}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.deleteCard(deckkey, index)
                    }}
                  >
                    <MaterialIcons
                      name="delete-forever"
                      size={20}
                      color="#CE2900"
                    />
                  </TouchableOpacity>
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
        <Button
          onPress={() => {
            this.props.navigation.navigate('Quiz', {
              deckkey,
            })
          }}
        >
          <Text>Take Quiz</Text>
        </Button>
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
          <Text>Delete Deck</Text>
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default Deck
