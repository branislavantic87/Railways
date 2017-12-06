import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native';
import RNFB from 'react-native-fetch-blob';
import Swiper from 'react-native-swiper';
import ImageZoom from 'react-native-image-pan-zoom';

export default class TextImage extends Component {

  renderPics() {
    console.log('ajsad');
    return this.props.img.map((file, i) => {
      console.log(file, i)
      return 
      <View  key={i}>
        <Image style={swiperPic} resizeMethod= 'scale'>{file}</Image>
      </View>;
      
    })
  }

  render() {
    return (

      <View style={mainView}>

        <View style={body}>

          <View>
            <Text style={[headingText, headingMain]}>{this.props.title}</Text>
            <Text style={headingText}>{this.props.subtitle}</Text>
          </View>

          <View style={contentContainer}>

            {/* <View> */}
            <ScrollView>
                <Text style={{ fontSize: 15 }}>{this.props.text}</Text>
              </ScrollView>
          <Swiper>
            
            {/* </View> */}

            {/* <View> */}
              <ScrollView showsButtons={false} style={swiperPic}>
                {this.renderPics()}
              </ScrollView>
            {/* <Image resizeMethod= 'scale'  source={{uri: pathToFiles + '1128.jpg'}} /> */}
            {/* </View> */}
          </Swiper>

          </View>

        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    position: 'relative',
    height: '100%'
  },
  body: {
    height: '100%',
    paddingLeft: 40,
    paddingRight: 40,
  },
  headingText: {
    color: '#1496ba',
    fontSize: 15,
    paddingBottom: 35
  },
  headingMain: {
    paddingTop: 40,
    paddingBottom: 4,
    fontSize: 25
  },
  contentContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: '100%',
    marginBottom: 25,
  },
  contentText: {
    flex: 2.5,
    backgroundColor: '#ebeced',
    height: '100%',
    padding: 20,
    paddingTop: 30
  },
  contentPic: {
    flex: 4.5,
    height: '100%',
    marginLeft: 30,
    backgroundColor: '#ebeced'
  },
  swiperPic: {
    width: '100%',
    height: '100%',
  }
});

const { mainView, body, headingText, headingMain, contentContainer, contentText, contentPic, swiperPic } = styles;