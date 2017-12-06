import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';



class MenuList1 extends Component {

    render() {

        return (
            <View style={styles.pdt}>
                <TouchableOpacity onPress={this.props.onPress}
                    style={[styles.menu1Item, { backgroundColor: this.props.isPressed ? '#2980b9' : '#E0E0E0' }]}>
                    <Text numberOfLines={1} style={{ paddingBottom: 6, fontSize: 16, color: this.props.isPressed ? 'white' : '#424242' }}>{this.props.menu1.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = {
    menu1Item: {
        marginLeft: 1,
        marginRight: 1,
        height: 40,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    pdt: {
        paddingTop: 10
    }
}



export default MenuList1;