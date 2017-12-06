import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


//make component
class MenuList3 extends Component {

    state = { filteredPages: [] }

    componentWillMount() {
        this.filterPages();
    }

    filterPages() {
        var a = this.props.pages.filter(elem => { return elem.title == this.props.dzo.title });
        this.setState({ filteredPages: a })
    }


    render() {
        let data = JSON.stringify(this.state.filteredPages);
        const { textStyle, viewStyle } = styles;
        return (
            <View style={styles.menu3Item}>
                <TouchableOpacity onPress={() => Actions.HBF({from: this.props.dzo, filtered: this.state.filteredPages})}>
                    <Text numberOfLines={1} style={[styles.menu3Text, {color: this.props.isPressed ? 'blue' : 'black'}]}>{this.props.dzo.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = {
    menu3Item: {
        padding: 10,
        width: 200,
    },
    menu3Text: {
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#E0E0E0'
    }
};


//make component avaliable to other parts of the app

export default MenuList3;