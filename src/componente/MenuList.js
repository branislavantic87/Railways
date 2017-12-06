import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Menu1 from './MenuList1';
import Menu2 from './MenuList2';

class MenuList extends Component {

    state = {   menus: this.props.data.menuTrees[1].menuTree, 
                selected: 0, 
                pages: this.props.data.pages
    };

    componentDidUpdate() {
        // this.refs._scrollView2.scrollTo({ y: 0, x: 0, animated: true });
    }

    renderMenu1() {
        return this.state.menus.map((menu, i) => 
            <Menu1  onPress={() => this.state.selected == i ? this.setState({selected: 0}) : this.setState({selected: i})}
                isPressed={this.state.selected == i ? true : false} 
                key={menu.menuId} 
                menu1={menu} />
        
        );
    }
    renderMenu2() {
        if (this.state.menus[this.state.selected]) {
            if (this.state.menus[this.state.selected].children) {
                return this.state.menus[this.state.selected].children.map(child =>
                    <Menu2 key={child.menuId}
                    menu2={child} 
                    pages = {global.globalJson.pages}
                    isPressed={this.props.from == child.menuId ? true : false}
                    />
                );
            }
        }
    }

    render() {
        return (
            <View style={styles.mainCont}>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
                    {this.renderMenu1()}
                </ScrollView>
                <ScrollView horizontal={true} style={{ flexDirection: 'row' }} showsHorizontalScrollIndicator={false}>
                    {this.renderMenu2()}
                </ScrollView>
            </View>
        )
    }
}
const styles = {
    menu1Container: {
        flexDirection: 'row',
        
    },
    mainCont: {
        backgroundColor: 'white',
        paddingBottom: 0,
        position: 'absolute', 
        bottom: 70
        
    }
}

export default MenuList;