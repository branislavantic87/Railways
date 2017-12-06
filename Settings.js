import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Alert, NetInfo, TouchableHighlight } from 'react-native';
import axios from 'axios';
import MenuList from './src/componente/MenuList';
import md5 from 'md5';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {

  state = {
    fetchedData: {},
    data: {},
    isLoading: true,
    visible: false,
    allow: false,
    downloadedL: 0,
    downloaded: 0,
    hashing: 0,
    hashingL: 0,
  };

  openLanguage = () => {
    Alert.alert('Otvorili ste Language.')
  };
  openFavorites = () => {
    Alert.alert('Otvorili ste Favorites.')
  };
  openMenu = () => {
    Alert.alert('Otvorili ste Menu.')
  };
  openSearch = () => {
    Alert.alert('Otvorili ste Search.')
  };
  openFolder = () => {
    Alert.alert('Otvorili ste Folder.')
  };
  openSettings = () => {
    Actions.pop()
  };
  openPanel = () => {
    Alert.alert('Otvorili ste Panel (MAIN MENU).')
  };
  openVideos = () => {
    Alert.alert('Otvorili ste meni za izbor video snimaka.')
  };
  openHome = () => {
    Actions.home({isLoading: false}) 
  };


  

  render() {

      return (
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" hidden={true} />
         
          <View style={styles.navbar}>
          
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', alignItems: 'center', width:'20%' }}>
              <TouchableWithoutFeedback onPress={this.openLanguage}><Image style={styles.ico} source={require('./src/ico/32/earth.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openHome}><Image style={styles.ico} source={require('./src/ico/32/home.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openFavorites}><Image style={styles.ico} source={require('./src/ico/32/star.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openMenu}><Image style={styles.ico} source={require('./src/ico/32/menu.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openSearch}><Image style={styles.ico} source={require('./src/ico/32/search.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openFolder}><Image style={styles.ico} source={require('./src/ico/32/folder.png')} /></TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.openSettings}><Image style={styles.ico} source={require('./src/ico/32/settings.png')} /></TouchableWithoutFeedback>
            </View>

          </View>
       
          <View style={styles.content}>
          <View style={{backgroundColor: 'white', width:'40%', height: "100%", justifyContent: 'center'}}>
              <TouchableOpacity style={styles.btn_settings} onPress={this.openLanguage}><Text style={styles.btn_text}>Imprint</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn_settings} onPress={this.openHome}><Text style={styles.btn_text}>Terms</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn_settings} onPress={this.openFavorites}><Text style={styles.btn_text}>Copyrights/License</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn_settings} onPress={this.openMenu}><Text style={styles.btn_text}>Version 1.0.1 (Build 28)</Text></TouchableOpacity>
          </View>
          <View style={{backgroundColor: '#E0E0E0', width:'60%', height: "100%", borderWidth: 5, borderColor: 'white'}}>
            <Text style={styles.btn_text}> Ucitaj iz JSON-a </Text>
          </View>

            <SlidingUpPanel
              ref={c => this._panel = c}
              visible={this.state.visible}
              allowDragging={this.state.allow}
              onRequestClose={() => this.setState({ visible: false })}>
              <View style={styles.main_panel}>
                <MenuList data={this.state.data} />
              </View>
            </SlidingUpPanel>

          </View>
          <View style={styles.footbar}>
            <TouchableOpacity onPress={() => { this.setState({ visible: true }); this._panel.transitionTo(0); }}  >
              <Image style={styles.ico} source={require('./src/ico/main_menu_2.png')} />
            </TouchableOpacity>

          </View>
        </View>
      );
    }
   
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  navbar: {
    height: '7%',
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  content: {
    backgroundColor: 'transparent',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    height: '86%'
   
  },
  footbar: {
    height: '7%',
    width: '100%',
    backgroundColor: 'white',
    borderColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 10
  },
  menuButton: {
    width: 200,
    alignItems: 'center',
    height: 50,
  },
  subMenuButton: {
    width: 200,
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  main_panel: {
    height: '50%',
    marginTop: '22%',
    backgroundColor: 'white',
  },
  scroll: {
    flexDirection: 'row',
    backgroundColor: 'red',
    height: 50,
  },
  ico: {
    height: 24,
    width: 24,
    marginRight: 15,
  },
  headerIcons: {
    flex: 1,
    backgroundColor: "white",
    height: 40,
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20
  },
  content2: {
    position: 'absolute',
    justifyContent: 'flex-start',
    marginLeft: '15%'

  },
  content3: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '15%'
  },
  videotour: {
    backgroundColor: '#4169e1',
    width: 270,
    height: 39,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 90,
    paddingTop: 50
  },
  ico2: {
    width: 24,
    marginRight: 20,
    height: 24,
    marginTop: 10
  },
  btn_settings: {
    backgroundColor: '#E0E0E0',
    height:"17%",
    width: "100%",
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center'
    
    
  },
  btn_text: {
    fontSize: 30,
    paddingLeft: 30,
    paddingTop: 7
  } 



});
console.disableYellowBox = true;
