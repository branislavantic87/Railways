import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Menu2 from './MenuList2';



class MenuList1 extends Component {

    render() {

        return (
            <View style={styles.viewStyle}>
                <TouchableOpacity onPress={this.props.onPress}
                    style={[styles.viewStyle, {backgroundColor: this.props.isPressed? 'green' : '#56B9D0'}]}>
                    <Text numberOfLines={1}>{this.props.menu1.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = {
    viewStyle: {
        width: 150,
        backgroundColor: '#56B9D0',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        elevation: 10,
        position: 'relative'
    },
    textStyle: {
        fontSize: 15,
        paddingBottom:20
    }
};


export default MenuList1;