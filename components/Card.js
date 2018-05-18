import React from 'react'
import { Text, View, Easing, TouchableOpacity } from 'react-native'
import { getDeck, removeCard } from '../utils/api'
import { Input, PressableScreen, Button } from '../styles'
import FlipView from 'react-native-flip-view'
import { MaterialIcons } from '@expo/vector-icons'

class Card extends React.Component {
  state = {
    myDecks: {},
    isFlipped: false,
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

  deleteCard(deckkey, index) {
    removeCard(deckkey, index).then(deck => {
      this.setState({ myDecks: { [deckkey]: JSON.parse(deck) } })
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

  render() {
    const { deckkey, cardindex } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <FlipView
        style={{ flex: 1 }}
        front={this._renderFront()}
        back={this._renderBack()}
        isFlipped={this.state.isFlipped}
        flipAxis="y"
        flipEasing={Easing.out(Easing.ease)}
        flipDuration={500}
        perspective={1000}
      />
    )
  }
  _renderFront = () => {
    const { deckkey, cardindex } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <PressableScreen onPress={this._flip}>
        <Text>
          {myDecks[deckkey] && myDecks[deckkey].questions[cardindex].question}
        </Text>
        <TouchableOpacity
          onPress={() => {
            removeCard(deckkey, cardindex)
            this.props.navigation.goBack()
          }}
        >
          <MaterialIcons name="delete-forever" size={40} color="#CE2900" />
        </TouchableOpacity>
      </PressableScreen>
    )
  }
  _renderBack = () => {
    const { deckkey, cardindex } = this.props.navigation.state.params
    const { myDecks } = this.state
    return (
      <PressableScreen onPress={this._flip} color="#E4D7FF">
        <Text>
          {myDecks[deckkey] && myDecks[deckkey].questions[cardindex].answer}
        </Text>
      </PressableScreen>
    )
  }
  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }
}

export default Card
