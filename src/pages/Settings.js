import React, { Component } from 'react'
import { Text, View, Button, AsyncStorage } from 'react-native'

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
        <Button title="Reset Pics" onPress={_ => {AsyncStorage.removeItem("pictures").then(_ => console.warn("done"))}}></Button>
        <Button title="Reset Tags" onPress={_ => AsyncStorage.removeItem("tags").then(_ => console.warn("done"))}></Button>

      </View>
    )
  }
}

export default Settings