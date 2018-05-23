import React from 'react'
import { submitDeck } from '../utils/api'
import { Screen, Input } from '../styles'

/* TODO: When deck is created, route to that deck view instead of decklist */

function addDeck(key, deck) {
  submitDeck(key, deck)
}

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
            this.props.navigation.navigate('Decks')
          }}
        />
      </Screen>
    )
  }
}

export default AddDeck
