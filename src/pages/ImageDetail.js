import React, { Component } from 'react'
import { Text, View, Button, Image } from 'react-native'


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

    console.warn(image['path'])

    return (
      <View style={{backgroundColor: "#333", justifyContent: "center", alignItems: "center"}}>
        <Image
          resizeMode = "contain"
          style = {{ flex: 1 }}
          source = {{ uri: image.path }}
        />
      </View>
    )
  }
}

export default ImageDetail