import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';


export default class FullImage extends Component {
  

  render() {
    
    return (
      <View style={styles.mainView}>

        <View style={styles.body}>

          <View style={styles.contentContainer}>

            <View style={styles.contentPic}>

              <Image resizeMethod = 'resize' resizeMode ='cover' style={{ flex: 1, width: '100%', height: '100%' }} source={{ uri: this.props.files[0] }} />

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