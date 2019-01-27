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

/**
 * Function to retrive the GCP Text Detection for an image
 * @param {String} imagePath File path for the image you want to classify
 * @return {String} Returns the text representation of the supplied image
 */
function getTextFromImage(imagePath) {
  return fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB2ryymZC_3vKF0vkQtZOH0aNiroY98ui8', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      "requests": [
        {
          "image": {
            "content": imagePath
          },
          "features": [
            {
              "type": "TEXT_DETECTION"
            }
          ]
        }
      ]
    }
  }).catch((error) => {
    console.error(error);
  })
}

/**
 * Function to only retrive the entire text dump from the entire GCP Response
 * @param {String} gcpResponse Response from the Google Cloud Platform for the image text
 * detection: Should be in a String format
 * @return Only the relevant text dump property from the JSON 
 */
function getKeywords(gcpResponse){
  let picObject = JSON.parse(gcpResponse);
  try {
    return picObject.textAnnotations.description;
  } catch(error) {
    console.error(error);
    return error;
  }
}

export default createAppContainer(sideDrawerNavigator);