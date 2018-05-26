import React from 'react'
import { View } from 'react-native'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation'
import { Foundation, Entypo } from '@expo/vector-icons'
import { setLocalNotification } from './utils/api'

const tabButtonColor = '#ffffff'

/**
 * @description Constructs bottom tab nav
 */
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

/**
 * @description Constructs stack navigation for decks and cards, with tab navigation embedded
 */
const Stacks = createStackNavigator(
  {
    Home: {
      screen: Tabs,
      navigationOptions: {
        title: 'Flashcards',
      },
    },
    Deck: {
      screen: Deck,
    },
    AddCard: {
      screen: AddCard,
    },
    Quiz: {
      screen: Quiz,
    },
  },
  {
    navigationOptions: {
      initialRouteName: 'Home',
      headerTintColor: '#ffffff',
      headerStyle: {
        backgroundColor: '#8171ff',
      },
    },
  },
)

/**
 * @description Main app component, displays StackNavigator with embedded TabNavigator
 * @constructor
 */
class App extends React.Component {
  /**
   * @description Sets up notification, requesting permission if required
   */
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Stacks />
      </View>
    )
  }
}

export default App
