import React from 'react'
import { Text, View, TextInput } from 'react-native'
import { getDeck, listDecks, removeDeck } from '../utils/api'
import { Screen, Input, ListItemPress } from '../styles'

/**
 * @description Calls API to remove entire deck from AsyncStorage
 * @param {string} key - Key for deck to be deleted
 */
function deleteDeck(key) {
  removeDeck(key)
}

/**
 * @description Lists all available decks
 * @constructor
 */
class DeckList extends React.Component {
  state = {
    myDecks: {},
  }
  /**
   * @description Calls API to pull decks from AsyncStorage and then adds them to state
   */
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

  /**
   * @description Binds to nav for loading decks on mount or on navigating back to this tab.
   */
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
              <ListItemPress
                onPress={() =>
                  this.props.navigation.navigate('Deck', {
                    deckkey: key,
                    DeckList: this,
                  })
                }
              >
                <Text>{myDecks[key].title}</Text>
                <Text>{myDecks[key].questions.length} Questions</Text>
              </ListItemPress>
            </View>
          )
        })}
      </Screen>
    )
  }
}

export default DeckList
