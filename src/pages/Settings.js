import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class Settings extends Component {
  static navigationOptions = {
    title: 'Settings'
  };

  componentDidMount = () => {
    
  }
  

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

export default Settings