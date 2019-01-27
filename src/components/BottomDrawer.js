import React, { Component } from 'react'
import { Text, Animated, Dimensions, View, Easing } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { FullWidthCard } from './Card';
import { vw, vh } from 'react-native-expo-viewport-units';
import { Colors, Spacing } from '../styles/theme';

export class BottomDrawer extends Component {
  constructor(props){
    super(props);
    this._startTopPos = Dimensions.get('window').height - props.topPosOffset;
    this.topPos = new Animated.Value(Dimensions.get('window').height - props.topPosOffset)
    this.state = {
      open: false
    };
    this.onHandlerStateChange = this.onHandlerStateChange.bind(this);
    this.animateBasedOn = this.animateBasedOn.bind(this);
  }

  onHandlerStateChange(event){
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let bias = this.state.open ? 500: -500;
      this.animateBasedOn(Math.abs(event.nativeEvent.absoluteY - this._startTopPos) < (this.props.endTopPos / 2) + bias);
    }
  };

  animateBasedOn(bool){
    if(bool){
      this.setState({open: false})
      Animated.timing(
        this.topPos,
        {
          toValue: this._startTopPos,
          duration: 125,
          easing: Easing.linear(),
          useNativeDriver: true,
        }
      ).start(); 
    } else {
      this.setState({open: true})
      Animated.timing(
        this.topPos,
        {
          toValue: this.props.endTopPos,
          duration: 125,
          easing: Easing.linear(),
          useNativeDriver: true,
        }
      ).start();
    }
  }

  onPanEvent(e){
    console.warn(e.nativeEvent.y)
  }

  render() { 
    // Limit the range of the gesture
    this.topPosFinal = this.topPos.interpolate({
      inputRange: [this.props.endTopPos, this._startTopPos],
      outputRange: [this.props.endTopPos, this._startTopPos],
      extrapolate: 'clamp'
    })

    return (
      <View style={{width: vw(100), height: vh(100), position: 'absolute', top: 0, zIndex: 0}} pointerEvents={'box-none'}>
        <PanGestureHandler 
          maxPointers={1}
          onGestureEvent={Animated.event([{nativeEvent: {absoluteY: this.topPos}}], {useNativeDriver: true})}
          onHandlerStateChange={this.onHandlerStateChange}
        >
          <Animated.View style={{position: "absolute", transform: [{translateY: this.topPosFinal, }], width: '100%'}}>
            <FullWidthCard style={[{paddingBottom: (Spacing.skinny * 2) + 1, height: this.props.topPosOffset}, this.props.cardStyle]}>
              {this.props.renderPeekComponent()}
            </FullWidthCard>
          </Animated.View>
        </PanGestureHandler>
        <Animated.View style={{position: "absolute", transform: [{translateY: Animated.add(this.props.topPosOffset, this.topPosFinal)}], marginTop: -1, width: '100%'}}>
          <View style={{flexDirection: 'column', backgroundColor: Colors.surface_color}}>
            {this.props.children}
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default BottomDrawer