import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { submitCard } from '../utils/api'
import { Screen, Input, Button } from '../styles'

/**
 * @description Add new card to deck
 * @constructor
 * @param {string} deckkey - Which deck to add the card to
 */

// TODO: Style submit button

class AddCard extends React.Component {
  state = {
    newQuestion: '',
    newAnswer: '',
  }
  /**
   * @description Calls API for adding new card to AsyncStorage
   * @param {string} deckkey - Key for which deck to add the card to
   * @param {object} card - Contents of new card
   */
  newCard(deckkey, card) {
    submitCard(deckkey, card)
  }
  render() {
    const { newQuestion, newAnswer } = this.state
    return (
      <Screen>
        <Input
          placeholder="Question"
          onChangeText={text => this.setState({ newQuestion: text })}
          value={this.state.newQuestion}
        />
        <Input
          placeholder="Answer"
          onChangeText={text => this.setState({ newAnswer: text })}
          value={this.state.newAnswer}
        />
        <Button
          onPress={() => {
            deckkey = this.props.navigation.state.params.deckkey
            this.newCard(deckkey, {
              question: newQuestion,
              answer: newAnswer,
            })
            this.setState({ newQuestion: '', newAnswer: '' })
            this.props.navigation.goBack()
          }}
        >
          <Text>Submit</Text>
        </Button>
      </Screen>
    )
  }
}

export default AddCard
