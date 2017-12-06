import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import RNFB from 'react-native-fetch-blob';
import FullImage from './temp1_fullimage';
import ImageButtons from './temp2_imagebuttons';
import TextImage from './temp3_textimage';
import FullText from './temp4_fulltext';
import Swiper from 'react-native-swiper';


class Body extends Component {

    componentWillMount() {

    }

    filterBody() {
        console.log('AAAAAAAAAAAAAAAaa', this.props.pages)
        const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/fajlovi/`;
        return this.props.pages.map(page => {
            let document = false;
            let video = false;
            let img = [];

            // if (page.files) {
                 img = page.files.map(file => {

                     return img = pathToFiles + file.fileId + '.' + file.ext;

                })
            // }



            switch (page.templateId) {
                case '1':
                    return <FullImage key={page.pageId} img={img} />

                    break;
                case '2':
                    return <ImageButtons key={page.pageId} templateTitle={page.title} subtitle={page.subtitle} img={img} video={video} document={document} />
                    break;

                case '3':
                    return <TextImage key={page.pageId} templateTitle={page.title} subtitle={page.subtitle} img={img} text={page.text} />
                    break;

                case '4':
                    return <FullText key={page.pageId} subtitle={page.subtitle} templateTitle={page.title} text={page.text} />

                    break;

                default:
                    console.log('WTF?!');
            }
        })
    }


    render() {
        return (
            <View style={styles.bodyCont}>
                <Swiper showsButtons={false} width={'100%'}>
                    {this.filterBody()}
                </Swiper>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    bodyCont: {
        width: '100%',
        height: '86%'
    }
});

export default Body;