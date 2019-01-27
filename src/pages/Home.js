import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, CameraRoll } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import Container from '../components/Container';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Spacing } from '../styles/theme';
import { Camera, Permissions, FileSystem } from 'expo';
import Buttons from '../components/Buttons';
import { getTextFromImage } from '../lib/uploader';
import { saveToCameraRoll } from 'react-native/Libraries/CameraRoll/CameraRoll';
import { addNewPicture } from '../lib/session';
import { ID } from '../lib/utils';


// this example assumes you're using a header and a tab bar
const TAB_BAR_HEIGHT = 49;
const HEADER_HEIGHT = 60;
const DESIRED_RATIO = "16:9";

export default class App extends React.Component {
  static navigationOptions = {
    title: 'Home',
    header: null
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const {cameraRollStatus} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({hasCameraRollPermission: cameraRollStatus === 'granted'});
  }

  async _onPressButton() {
    if(this.camera) {
      let photo = await this.camera.takePictureAsync({base64: true});
      let savedPhoto = await saveToCameraRoll(photo.uri);
      let imageText = await getTextFromImage(photo.base64);
      addNewPicture({
        id: ID(),
        path: savedPhoto,
        keywords: imageText
      })
    } else {
      console.warn("no camera ref rip")
    }
  }
  


  render() {
    return (
      <View>
        {this.state.hasCameraPermission ? (
          <Camera ref={ref => {this.camera = ref;}} style={{ width: vw(100), height: vh(100) }} type={this.state.type} ratio={DESIRED_RATIO}>
          </Camera>
        ) : null}
        <BottomDrawer topPosOffset={125} endTopPos={vh(10)}
          renderPeekComponent={_ => (
            <Container style={{ paddingTop: Spacing.skinny }}>
              <View style={{ flex: 1, alignItems: 'center', marginBottom: Spacing.skinny }}>
                <View style={{ width: 50, height: 4, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.25)" }}></View>
              </View>
              <Buttons onShutter = {this._onPressButton} onFlip ={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>Testing</Buttons>
            </Container>
          )}
          cardStyle={{ borderTopLeftRadius: Spacing.default, borderTopRightRadius: Spacing.default }}
        >
          <View style={{ height: vh(75) }}>
            <Container>
              <Text>Double Oh!!!!</Text>
            </Container>
          </View>
        </BottomDrawer>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: "#ddd"
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 5
  }
});