import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { submitCard } from '../utils/api'
import { Screen, Input } from '../styles'

class AddCard extends React.Component {
  state = {
    newQuestion: '',
    newAnswer: '',
  }
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
        <TouchableOpacity
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
        </TouchableOpacity>
      </Screen>
    )
  }
}

export default AddCard
