import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import { Header } from './styles'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { Foundation, Entypo } from '@expo/vector-icons'

const tabButtonColor = '#ffffff'

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tabButtonColor }) => (
          <Foundation name="list" size={30} color={tabButtonColor} />
        ),
      },
    },
    NewDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tabButtonColor }) => (
          <Entypo name="add-to-list" size={30} color={tabButtonColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#ffffff',
      style: {
        height: 56,
        backgroundColor: '#cccccc',
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  },
)

const Stacks = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
  },
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header>
          <StatusBar translucent />
        </Header>
        <Stacks />
      </View>
    )
  }
}
