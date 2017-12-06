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
                    pages = {global.globalJson.pages}
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
                <TouchableOpacity style={styles.menu2Item} onPress={() => Actions.HBF({from: this.props.menu2, filtered: this.state.filteredPages})}>
                    <Text style={[styles.menu2Text, {color: this.props.isPressed ? 'blue' : 'black'}]}>{this.props.menu2.title}</Text>
                </TouchableOpacity>
                <View style={{ height: 270, flexWrap: 'wrap', borderRightColor: '#E0E0E0', borderRightWidth: 3, }}>
                    {this.renderTreciNivo()}
                </View>
            </View>
        );
    }

}
const styles = {
    menu2Item: {
        padding: 10,
        width: 200,
    },
    menu2Text: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        color: 'black',
        fontSize: 16,
    }
}



export default MenuList2;