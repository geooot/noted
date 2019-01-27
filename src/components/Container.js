import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacing } from '../styles/theme';

export default Container = (props) => (
  <View style={[styles.container, props.style]}>
    {props.children}
  </View>
)

export const Row = (props) => (
  <View style={[styles.container, styles.row, props.style]}>
    {props.children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    padding: Spacing.default,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});
