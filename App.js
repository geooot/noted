import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold'}}>
        <Text style={{color: 'white'}}>
          Graded
        </Text>
      </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7305f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
