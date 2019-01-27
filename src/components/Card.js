import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Surfaces, Colors } from '../styles/theme';

export default Card = (props) => (
  <View style={[styles.card,(props.highlighted ? styles.highlightedCard : {}), props.style]} {...props}>
    {props.children}
  </View>
)

export const FullWidthCard = (props) => (
  <View style={[styles.card, {borderRadius: 0}, (props.highlighted ? styles.highlightedCard : {}), props.style]}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  card: {
    backgroundColor: Surfaces.backgroundColor,
    flexDirection: "column",
    shadowColor: "#000",
    shadowOpacity: Surfaces.shadowOpacity,
    shadowOffset: { width: 0, height: 0.30 },
    elevation: Surfaces.elevation,
    borderColor: Surfaces.borderColor,
    borderWidth: Surfaces.borderWidth,
    borderRadius: Surfaces.borderRadius
  },
  highlightedCard: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary
  }
});
