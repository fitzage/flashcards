import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <DeckList />
      </View>
    )
  }
}
