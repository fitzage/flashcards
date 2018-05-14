import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import { Constants } from 'expo'
import DeckList from './components/DeckList'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <View style={{ height: Constants.statusBarHeight }}>
          <StatusBar translucent />
        </View>
        <DeckList />
      </View>
    )
  }
}
