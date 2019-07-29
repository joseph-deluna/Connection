'use strict';
import React, { StyleSheet, Dimensions, } from 'react-native';
let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  logInContainer: {
    flex: 1,
    backgroundColor: '#d6f5f5',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  gradient: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 20
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 30
  }
});
export default styles;