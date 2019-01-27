import React, { Component } from 'react'
import { Text, View, Button, Image, TouchableOpacity } from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units';
import { Spacing } from '../styles/theme';


export class ImageDetail extends Component {
  static navigationOptions = {
    title: 'View Image'
  };

  constructor(props){
    super(props);
    this.state = {
      showKeywords: false
    }
  }

  componentDidMount = () => {
    
  }
  

  render() {
    const { navigation } = this.props;
    const image = navigation.getParam('image', null);
    if(!image)
      return <View></View>
    
    return (
      <View style={{backgroundColor: "#000", justifyContent: "center", alignItems: "center"}}>
        <Image
          resizeMode = "contain"
          style = {{ width: vw(100), height: vh(100) - 56}}
          source = {{ uri: image.path }}
        />
        <View style={{position: 'absolute', bottom: 0, height: vh(this.state.showKeywords ? 50 : 20), width: vw(100), justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={{padding: Spacing.skinny, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.4)"}} onPress={_ => this.setState({showKeywords: !this.state.showKeywords})}>
            <Text style={{color: "#fff"}}>{this.state.showKeywords ? image.keywords.replace(/[\n\r\t]/g, ' ') : new Date(image.dateCreated).toLocaleString()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default ImageDetail