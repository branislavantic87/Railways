import React, { Component } from 'react';
import { View } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import MenuList from './MenuList';
import Body from './Body';
import SettingsComponent from '../../Settings';
import Languages from './Languages';
import Search from './Search';



class HBF extends Component {

    state = {
        visibleMenu: false,
        visibleSearch: false,
        visiblelanguage: false
    }

    render() {
        if (this.props.from == 'ab') {
            return (
                <View>
                    <Header onPressLang={() => { this.state.visiblelanguage ? this.setState({ visiblelanguage: false }) : this.setState({ visiblelanguage: true }) }} onPress={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false }) : this.setState({ visibleSearch: true }) }}/>

                    {this.state.visiblelanguage &&
                        <Languages />
                    }
                    {this.state.visibleSearch &&
                        <Search />
                    }
                    <SettingsComponent />

                    {this.state.visibleMenu &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }

                    <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />
                </View>
            );
        } else {
            return (
                <View>
                    <Header title={this.props.from.title} onPressLang={() => { this.state.visiblelanguage ? this.setState({ visiblelanguage: false }) : this.setState({ visiblelanguage: true }) }} onPress={() => { this.state.visibleSearch ? this.setState({ visibleSearch: false }) : this.setState({ visibleSearch: true }) }} />


                    {this.state.visiblelanguage &&
                        <Languages />
                    }
                    {this.state.visibleSearch &&
                        <Search />
                    }

                   

                    <Body pages={this.props.filtered} />

                    {this.state.visibleMenu &&
                        <MenuList data={global.globalJson} from={this.props.from.menuId} />
                    }

                    <Footer onPress={() => { this.state.visibleMenu ? this.setState({ visibleMenu: false }) : this.setState({ visibleMenu: true }); }} />

                </View>
            );
        }
    }

}



export default HBF;
