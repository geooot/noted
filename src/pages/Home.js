import React from 'react';
import { View, Text, StyleSheet, Button, AsyncStorage, CameraRoll, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import Container from '../components/Container';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Spacing } from '../styles/theme';
import { Camera, Permissions, FileSystem } from 'expo';
import Buttons from '../components/Buttons';
import { getTextFromImage } from '../lib/uploader';
import { saveToCameraRoll } from 'react-native/Libraries/CameraRoll/CameraRoll';
import PhotoGrid from 'react-native-image-grid';
import { addNewPicture, addNewTag, getAllTags, getAllPictures } from '../lib/session';
import ActionSheet from 'react-native-actionsheet'

import { ID } from '../lib/utils';
import { ViewPagerAndroid } from 'react-native-gesture-handler';


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
    disableTakePic: false,
    pics: [],
    tags: null,
    selectedTag: null
  };

  constructor(props) {
    super(props);
    this._onPressButton = this._onPressButton.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    const {cameraRollStatus} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({hasCameraRollPermission: cameraRollStatus === 'granted'});

    // Build an array of 60 photos
    // let items = Array.apply(null, Array(60)).map((v, i) => {
    //   return { id: i, src: 'http://placehold.it/200x200?text='+(i+1) }
    // });
    // this.setState({ items });
    // await addNewTag({
    //   title: "CSCE 121",
    //   startTime: new Date().getTime(),
    //   endTime: new Date().getTime(),
    //   id: ID()
    // })
    // await addNewTag({
    //   title: "ENGR 216",
    //   startTime: new Date().getTime(),
    //   endTime: new Date().getTime(),
    //   id: ID()
    // })
    // await addNewTag({
    //   title: "PHYS 206",
    //   startTime: new Date().getTime(),
    //   endTime: new Date().getTime(),
    //   id: ID()
    // })
    // console.warn('done')
    getAllTags().then(t => {
      this.setState({
        tags: t,
        selectedTag: 0
      })
    }).catch(e => console.error(e))

    getAllPictures().then(p => {
      this.setState({
        pics: p
      })
    }).catch(e => console.error(e))

  }

  async _onPressButton() {
    if(this.camera && !this.state.disableTakePic) {
      this.setState({disableTakePic: true});
      let photo = await this.camera.takePictureAsync({base64: true});
      this.camera.pausePreview();
      let savedPhoto = await saveToCameraRoll(photo.uri);
      let imageText = await getTextFromImage(photo.base64);
      let newPic = {
        id: ID(),
        path: savedPhoto,
        keywords: imageText.replace(/[\n\r\t]/g,),
        tagId: this.state.tags[this.state.selectedTag],
        dateCreated: new Date().getTime() 
      }
      addNewPicture(newPic)
      let pics_ = this.state.pics ? this.state.pics : [];
      pics_.push(newPic)
      this.setState({disableTakePic: false, pics: pics_});
      this.camera.resumePreview();
    } else {
      console.warn("no camera ref rip")
    }
  }
  
  renderItem(item, itemSize, itemPaddingHorizontal) {
    return(
      <TouchableOpacity
        key = { item.id }
        style = {{ width: itemSize, height: itemSize, paddingHorizontal: itemPaddingHorizontal }}
        onPress = { () => {
          this.props.navigation.push('ImageDetail', {
            image: item,
          })
        }}>
        <Image
          resizeMode = "cover"
          style = {{ flex: 1 }}
          source = {{ uri: item.path }}
          
        />
      </TouchableOpacity>
    )
  }

  render() {
    var tagNames = ["Cancel"]
    if(this.state.tags){
      tagNames = this.state.tags.map(i => i["title"])
      tagNames.push("Cancel")
    }
    var filteredImages = [];
    if(this.state.pics && this.state.tags){
      filteredImages = this.state.pics.filter(i => i["tagId"]['id'] == this.state.tags[this.state.selectedTag]['id'])
    }

    return (
      <View>
        {this.state.tags ? (
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Select a tag'}
            options={tagNames}
            cancelButtonIndex={tagNames.length - 1}
            destructiveButtonIndex={tagNames.length - 1}
            onPress={(index) => {if(index != tagNames.length - 1) this.setState({selectedTag: index});}}
          />
        ): null}

        {this.state.hasCameraPermission ? (
          <Camera ref={ref => {this.camera = ref;}} style={{ width: vw(100), height: vh(100), opacity: this.state.disableTakePic ? 0.5 : 1 }} type={this.state.type} ratio={DESIRED_RATIO}>
          </Camera>
        ) : null}
        <BottomDrawer topPosOffset={125} endTopPos={vh(10)}
          renderPeekComponent={_ => (
            <Container style={{ paddingTop: Spacing.skinny }}>
              <View style={{ flex: 1, alignItems: 'center', marginBottom: Spacing.skinny }}>
                <View style={{ width: 50, height: 4, borderRadius: 12, backgroundColor: "rgba(0,0,0,0.25)" }}></View>
              </View>
              <Buttons onShutter = {this._onPressButton} title={this.state.tags ? this.state.tags[this.state.selectedTag]["title"] : null} onFlip ={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }} onSelectPress={_ => {
                  if(this.ActionSheet)
                    this.ActionSheet.show();
                }} customMiddleIcon={this.state.disableTakePic ? <ActivityIndicator size="small" color="#2ea99c" /> : null} onP>Testing</Buttons>
            </Container>
          )}
          cardStyle={{ borderTopLeftRadius: Spacing.default, borderTopRightRadius: Spacing.default }}
        >
          <View style={{ height: vh(75) }}>
          {filteredImages && filteredImages.length > 0 ? (
            <PhotoGrid
              data = { filteredImages }
              itemsPerRow = { 3 }
              itemMargin = { 1 }
              itemPaddingHorizontal={1}
              renderItem = { this.renderItem }
            />
          ) : (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Nothing to see here... Try changing the tab</Text>
            </View>
          )}

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