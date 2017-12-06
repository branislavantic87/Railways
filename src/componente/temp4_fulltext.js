import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Dimensions, WebView } from 'react-native';
import HTML from 'react-native-render-html';


export default class FullText extends Component {
    render() {
        return (
            <View style={mainView}>
              

                <View style={body}>
                    <View>
                        <Text style={[headingText, headingMain]}>{this.props.templateTitle}</Text>
                        <Text style={headingText}>{this.props.subtitle}</Text>
                    </View>

                    <View style={contentContainer}>

                        <View style={contentText}>
                            <ScrollView>
                            <HTML html={this.props.text} />
                            </ScrollView>
                        </View>

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
    pdf: {
        flex:1
    }
});

const { mainView, body, headingText, headingMain, contentContainer, contentText} = styles;