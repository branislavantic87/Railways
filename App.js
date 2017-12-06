import React, { Component } from 'react';
import reactNative, { ScrollView } from 'react-native';
import Importing from './src/componente/Importing';


class App extends Component {


  render() {
    console.log('asd');

    return (
      <ScrollView>
      <Importing />
      </ScrollView>
    )
  }
}

export default App;