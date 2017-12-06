import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Menu3 from './MenuList3';
import { Actions } from 'react-native-router-flux';


class MenuList2 extends Component {

    state = { filteredPages: [] }

    componentWillMount() {
        this.filterPages();
    }

    renderTreciNivo() {
        if (this.props.menu2.children) {
            return this.props.menu2.children.map(ch =>
                <Menu3 key={ch.menuId}
                    dzo={ch}
                    pages = {this.props.pages}
                    isPressed={this.props.from == ch.menuId ? true : false}
                />
            )
        }
    }
    filterPages() {
        var a = this.props.pages.filter(elem => { return elem.menuId == this.props.menu2.menuId })
        this.setState({filteredPages: a})
    }
    render() {
        return (
            <View>
                <View style={styles.viewStyle} onPress={() => Actions.HBF({from: this.props.ch, filtered: this.state.filteredPages})}>
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