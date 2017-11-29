// import librabries for components
import React, { Component } from 'react';
import { Text, View } from 'react-native';


//make component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset : {width: 0, height: 2},
        shadowOpacity: 0.9,
        elevation: 10,
        position: 'relative'
    },
    textStyle: {
        fontSize: 50
    }
};


//make component avaliable to other parts of the app

export default Header;