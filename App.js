import React from 'react'
import { Text, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
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
      navigationOptions: {
        title: 'Deck',
      },
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: 'New Card',
      },
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: 'Quiz',
      },
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

class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Stacks />
      </View>
    )
  }
}

export default App
