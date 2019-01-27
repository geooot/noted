import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { Surfaces, Colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default Buttons = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={props.onFlip} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Ionicons name="md-reverse-camera" size={32} color="#2ea99c" />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onShutter} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                <Ionicons name="md-camera" size={32} color="#113b44" />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}} onPress={() => {
                    console.log('You tapped the button!');
                }}>
                <View><Text style = {{color: '#2ea99c'}}>{props.title ? props.title: "Select Tag"}</Text></View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({

});