import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
import Home from './src/pages/Home';
import Settings from './src/pages/Settings';
import { AntDesign } from '@expo/vector-icons';

// Router for any home based sub pages
const homeStackNavigation = createStackNavigator({
  Root: Home
},
{
  initialRouteName: 'Root'
});

// Home stack drawer navigation options
homeStackNavigation.navigationOptions = {
  title: 'Home',
  drawerIcon: ({ focused }) => (
    <AntDesign name="home" size={24} color={focused ? 'blue' : 'black'} />
  )
};

// Router for any home based sub pages
const settingsStackNavigation = createStackNavigator({
  Root: Settings
},
{
  initialRouteName: 'Root'
});

// Settings stack drawer navigation options
settingsStackNavigation.navigationOptions = {
  title: 'Settings',
  drawerIcon: ({ focused }) => (
    <AntDesign name="setting" size={24} color={focused ? 'blue' : 'black'} />
  )
};

// Router for Home and Settings Pages
const sideDrawerNavigator = createDrawerNavigator({
  Home: homeStackNavigation,
  Settings: settingsStackNavigation
},
{
  drawerType: "front",
  drawerPosition: "left"
})



export default createAppContainer(sideDrawerNavigator);