// import librabries for components
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
        let data= JSON.stringify(this.state.filteredPages);
        const { textStyle, viewStyle } = styles;
        return (
            <View style={viewStyle}>
                <TouchableOpacity onPress={() => Actions.HBF({from: this.props.dzo, filtered: this.state.filteredPages})}>
                    <Text numberOfLines={1} style={styles.menu3Text}>{this.props.dzo.title}</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles = {
    viewStyle: {
        backgroundColor: '#3b3F42',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        elevation: 10,
        position: 'relative',
        marginLeft: 20
    },
    textStyle: {
        fontSize: 50
    }
};


//make component avaliable to other parts of the app

export default MenuList3;