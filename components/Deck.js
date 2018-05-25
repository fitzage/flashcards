import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getDeck, removeDeck, removeCard } from '../utils/api'
import { Screen, ListItem, Button, Status } from '../styles'
import { MaterialIcons } from '@expo/vector-icons'

/**
 * @description Remove entire deck from AsyncStorage
 * @param {string} key - Key indicating which deck to remove
 */
function deleteDeck(key) {
  removeDeck(key)
}

/**
 * @description Screen component for individual deck view
 * @constructor
 * @param {string} deckkey - key indicating which deck to display
 */
class Deck extends React.Component {
  state = {
    myDecks: {},
  }

  /**
   * @description Loads deck from API and then adds it to state, along with title to be used by navigation component
   * @param {string} key - key indicating which deck to load from API
   */
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

  /**
   * @description deletes individual card from deck
   * @param {string} deckkey - indicates which deck to delete card from
   * @param {number} index - indicates which card to delete from the deck
   */
  deleteCard(deckkey, index) {
    removeCard(deckkey, index)
    myNewDecks = this.state.myDecks
    myNewDecks[deckkey].questions.splice(index, 1)
    this.setState({
      myDecks: myNewDecks,
    })
  }

  /**
   * @description Load deck when screen mounts
   */
  componentWillMount() {
    this.myDeck(this.props.navigation.state.params.deckkey)
  }

  /**
   * @description Bind to navigation so that component will re-render when returning after adding a new card
   */
  componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () =>
      this.myDeck(this.props.navigation.state.params.deckkey),
    )
  }

  /**
   * @description Sets the navbar title
   */
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
