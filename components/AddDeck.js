import React from 'react'
import { submitDeck } from '../utils/api'
import { Screen, Input } from '../styles'

/**
 * @description Calls API to add new deck to AsyncStorage
 * @param {string} key - Key for new deck
 * @param {object} deck - Contents of new deck
 */
function addDeck(key, deck) {
  submitDeck(key, deck)
}

/**
 * @description Screen component for creating a new deck
 * @constructor
 */
class AddDeck extends React.Component {
  state = {
    newDeckName: '',
  }
  render() {
    const { newDeckName } = this.state
    return (
      <Screen>
        <Input
          placeholder="New Deck Name"
          onChangeText={text => this.setState({ newDeckName: text })}
          value={this.state.newDeckName}
          onSubmitEditing={() => {
            key = newDeckName.replace(/\s+/g, '').toLowerCase()
            submitDeck(key, { title: newDeckName, questions: [] })
            this.setState({ newDeckName: '' })
            this.props.navigation.navigate('Deck', {
              deckkey: key,
            })
          }}
        />
      </Screen>
    )
  }
}

export default AddDeck
