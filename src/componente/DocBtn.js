import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class DB extends Component {
    blank () {
        Actions.vd();
    }
    
    render() {
     
        return (
            <View>
          
          <TouchableOpacity style={styles.ButtonContent} onPress={this.blank}>
          <Image
              style={styles.ButtonIconStyle}
              source={require('../ico/file.png')}
          />
          <Text style={styles.ButtonTextStyle}>DOCUMENT</Text>
      </TouchableOpacity >

           </View>
        );
    }
}

const styles = StyleSheet.create({

    ButtonTextStyle: {
        fontSize: 20,
        color: '#fff'

    },
    ButtonIconStyle2: {
        marginRight: 10,
        width: 32,
        height: 32
    },
    ButtonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 50,
        marginBottom: 50,
        width: '51%',
        
    },
    ButtonContent: {
        borderColor: '#fff',
        borderWidth: 3,
        borderRadius: 4,
        paddingHorizontal: 40,
        backgroundColor: '#0082B3',
        padding: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});