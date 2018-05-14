import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import { Header } from './styles'

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Header>
          <StatusBar translucent />
        </Header>
        <DeckList />
      </View>
    )
  }
}
