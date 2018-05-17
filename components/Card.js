import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getDeck, removeDeck, submitCard } from '../utils/api'
import { Screen, Input, ListItem } from '../styles'

class Card extends React.Component {
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
    const { deckkey, cardindex } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <Text>
        {myDecks[deckkey] && myDecks[deckkey].questions[cardindex].question}
        {myDecks[deckkey] && myDecks[deckkey].questions[cardindex].answer}
      </Text>
    )
  }
}

export default Card
