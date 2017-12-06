import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, AsyncStorage } from 'react-native';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';
import RNFB from 'react-native-fetch-blob';


class Body extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         pages: this.props.pages
    //     }
    // }

    filterBody() {
         const pathToDirFiles = `file://${RNFB.fs.dirs.DocumentDir}/fajlovi/`;
        let a =[];
        a = this.props.pages.map(page => {
        //  console.log(RNFB.fs.dirs.DocumentDir)
            let title = page.title;
            let subtitle = page.subtitle;
            let text = page.text;
            let files = [];
            if (page.files) {
                 files = page.files.map(file => {
                    //  console.log(file)
                    return pathToDirFiles + file.fileId + '.' + file.ext
                        // fileCache: true
                      
                })
            }
            console.log(files)
            switch (page.templateId) {
                case '1':
                    return <FullImage key={page.pageId} files={files} />
                    break;

                case '2':
                    return <ImageButtons key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} />
                    break;

                case '3':
                    return <TextImage key={page.pageId} templateTitle={title} subtitle={subtitle} files={files} text={text} />
                    break;

                case '4':
                    return <FullText key={page.pageId} subtitle={subtitle} templateTitle={title} text={text} />
                    break;

                default:
                    console.log('WTF?!');
            }
        })
        return a;
    }

    render() {
        return (
            <View style={styles.bodyCont}>
        

               <Swiper>
                    {this.filterBody()}
                </Swiper>
        
            </View>
        );

    }
}

const styles = StyleSheet.create({
    bodyCont: {
    
        backgroundColor: 'white',
        width: '100%',
        height: '86%'
        
    }
});

export default Body;