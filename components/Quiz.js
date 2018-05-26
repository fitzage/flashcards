import React from 'react'
import { Text, View, Easing, Modal } from 'react-native'
import {
  getDeck,
  clearLocalNotifications,
  setLocalNotification,
} from '../utils/api'
import { Button, PressableScreen, Header, ModalInner } from '../styles'
import FlipView from 'react-native-flip-view'

/*
  TODO: Notification for daily quiz
 */

/**
 * @description Component for displaying and scoring quiz
 * @constructor
 * @param {string} deckkey - Determines which deck to run a quiz for
 */
class Quiz extends React.Component {
  state = {
    myDecks: {},
    isFlipped: false,
    index: 0,
    correct: 0,
    modalVisible: false,
  }

  /**
   * @description Sets state with whether or not quiz results modal should be visible
   * @param {boolean} visible - Visibility status for modal
   */
  setModalVisible(visible) {
    this.setState({ modalVisible: visible })
  }

  /**
   * @description Loads deck from AsyncStorage via API
   * @param {string} key - Which deck to load
   */
  myDeck(key) {
    getDeck(key).then(deck =>
      this.setState({
        myDecks: {
          [key]: JSON.parse(deck),
        },
      }),
    )
  }

  /**
   * @description Loads deck on mount
   */
  componentWillMount() {
    this.myDeck(this.props.navigation.state.params.deckkey)
  }

  /**
   * @description Binds to nav so deck will load when returning to screen
   */
  componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () =>
      this.myDeck(this.props.navigation.state.params.deckkey),
    )
  }

  render() {
    const { deckkey, DeckList } = this.props.navigation.state.params
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
    const { myDecks, index } = this.state
    return (
      <PressableScreen>
        {myDecks[deckkey] && (
          <View>
            <Text>{myDecks[deckkey].title} Quiz</Text>
            <Text>
              Question {index + 1}/{myDecks[deckkey].questions.length}
            </Text>
            <Text>{myDecks[deckkey].questions[index].question}</Text>
          </View>
        )}
        <Button onPress={this._flip}>
          <Text>View Answer</Text>
        </Button>
      </PressableScreen>
    )
  }
  _renderBack = () => {
    const { deckkey, cardindex } = this.props.navigation.state.params
    const { myDecks, index, correct } = this.state
    return (
      <PressableScreen color="#E4D7FF">
        {myDecks[deckkey] && (
          <View>
            <Text>{myDecks[deckkey].title} Quiz</Text>
            <Text>
              Question {index + 1}/{myDecks[deckkey].questions.length}
            </Text>
            <Text>{myDecks[deckkey].questions[index].answer}</Text>
            {index < myDecks[deckkey].questions.length - 1 ? (
              <View>
                <Button
                  onPress={() =>
                    this.setState({
                      index: index + 1,
                      isFlipped: false,
                      correct: correct + 1,
                    })
                  }
                >
                  <Text>Correct</Text>
                </Button>
                <Button
                  onPress={() =>
                    this.setState({ index: index + 1, isFlipped: false })
                  }
                >
                  <Text>Incorrect</Text>
                </Button>
              </View>
            ) : (
              <View>
                <Button
                  onPress={() => {
                    this.setState({
                      isFlipped: false,
                      correct: correct + 1,
                    })
                    this.setModalVisible(!this.state.modalVisible)
                    clearLocalNotifications().then(setLocalNotification())
                  }}
                >
                  <Text>Correct</Text>
                </Button>
                <Button
                  onPress={() => {
                    this.setState({ isFlipped: false })
                    this.setModalVisible(!this.state.modalVisible)
                    clearLocalNotifications().then(setLocalNotification())
                  }}
                >
                  <Text>Incorrect</Text>
                </Button>
              </View>
            )}
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.')
          }}
        >
          <Header />
          <ModalInner>
            <Text>Score</Text>
            {myDecks[deckkey] && (
              <View>
                <Text>
                  {correct}/{myDecks[deckkey].questions.length}
                </Text>
                <Text>
                  {correct === myDecks[deckkey].questions.length
                    ? 'Good work!'
                    : 'Keep studying!'}
                </Text>
              </View>
            )}
            <Button
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
                this.setState({ index: 0, correct: 0 })
              }}
            >
              <Text>Restart Quiz</Text>
            </Button>
            <Button
              onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
                this.props.navigation.goBack()
              }}
            >
              <Text>Back to Deck</Text>
            </Button>
          </ModalInner>
        </Modal>
      </PressableScreen>
    )
  }
  /**
   * @description set state with determination of whether card should be flipped or not
   */
  _flip = () => {
    this.setState({ isFlipped: !this.state.isFlipped })
  }
}

export default Quiz
