import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { Surfaces, Colors, Spacing } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default Buttons = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity onPress={props.onFlip} style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
                <Ionicons name="md-reverse-camera" size={32} color="#2ea99c" />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onShutter} style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{width: 64, height: 64, backgroundColor: "#fff", shadowColor: "#333", shadowOffset: {width: 0,height: 8},shadowOpacity: 0.46,shadowRadius: 11.14,elevation: 15, borderRadius: 64, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                    {props.customMiddleIcon ? props.customMiddleIcon: (
                        <Ionicons name="md-camera" size={32} color="#113b44" />
                    )}
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row'}} onPress={props.onSelectPress}>
                <View style={{backgroundColor: '#2ea99c', paddingLeft: Spacing.default, paddingRight: Spacing.default, paddingTop: Spacing.skinny, paddingBottom: Spacing.skinny, borderRadius: 8}}><Text style = {{color: '#fff', fontWeight: 'bold'}}>{props.title ? props.title: "Select Tag"}</Text></View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({

});