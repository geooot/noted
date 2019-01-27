import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'
import { vw, vh } from 'react-native-expo-viewport-units';
import { Spacing } from '../styles/theme';


export class ImageDetail extends Component {
  static navigationOptions = {
    title: 'View Image'
  };

  constructor(props){
    super(props);
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
        <View style={{position: 'absolute', bottom: 0, height: vh(20), width: vw(100), justifyContent: 'center', alignItems: 'center'}}>
          <View style={{padding: Spacing.skinny, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.4)"}}>
            <Text style={{color: "#fff"}}>{new Date(image.dateCreated).toLocaleString()}</Text>
          </View>
        </View>
      </View>
    )
  }
}

export default ImageDetail