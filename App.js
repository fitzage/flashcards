import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import Card from './components/Card'
import AddCard from './components/AddCard'
import { Header } from './styles'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { Foundation, Entypo } from '@expo/vector-icons'
import './utils/ReactotronConfig'
import Reactotron from 'reactotron-react-native'

const tabButtonColor = '#ffffff'

const Tabs = createBottomTabNavigator(
  {
    Decks: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tabButtonColor }) => (
          <Foundation name="list" size={30} color="#ffffff" />
        ),
      },
    },
    NewDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tabButtonColor }) => (
          <Entypo name="add-to-list" size={30} color="#ffffff" />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#ffffff',
      style: {
        height: 56,
        backgroundColor: '#8171ff',
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

class App extends React.Component {
  static navigationOptions = {
    title: 'Home',
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Stacks />
      </View>
    )
  }
}

const Stacks = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    Deck: {
      screen: Deck,
    },
    Card: {
      screen: Card,
    },
    AddCard: {
      screen: AddCard,
    },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#8171ff',
      },
    },
  },
)

export default App
