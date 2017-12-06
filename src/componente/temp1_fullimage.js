import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class FullImage extends Component {
  shouldComponentUpdate

  render() {

    return (
      <View style={styles.mainView}>

        <View style={styles.body}>

          <View style={styles.contentContainer}>

            <View style={styles.contentPic}>

              <Image style={{ flex: 1, width: '100%', height: '100%' }} source={{ uri: this.props.img[0] }} />

            </View>

          </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
  },
  contentContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 5,
  },
  contentPic: {
    flex: 3,
    height: '100%',
    backgroundColor: '#e5e5e5',
  },
});