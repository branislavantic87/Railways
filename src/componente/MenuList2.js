import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Menu3 from './MenuList3';


class MenuList2 extends Component {

    renderTreciNivo() {
        if (this.props.menu2.children) {
            return this.props.menu2.children.map(ch =>
                <Menu3 key={ch.menuId} dzo={ch} />
            )
        }
    }
    render() {
        return (
            <View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{this.props.menu2.title}</Text>
                </View>
                <View>
                    {this.renderTreciNivo()}
                </View>
            </View>
        );
    }

}
const styles = {
    viewStyle: {
        backgroundColor: '#F24C27',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        elevation: 10,
        position: 'relative',
        borderWidth: 2,
        marginLeft: 15
    },
    textStyle: {
        fontSize: 15
    }
};


export default MenuList2;