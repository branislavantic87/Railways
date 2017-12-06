import React, { Component } from 'react';
import reactNative, { ScrollView, View, Text, AsyncStorage, Image, Alert, NetInfo } from 'react-native';
import axios from 'axios';
import Header from './Header';
import MenuList from './MenuList';
import md5 from 'md5';
import Video from 'react-native-video';
import RNFB from 'react-native-fetch-blob';


class Importing extends Component {
    state = {
        data: {},
        isLoading: true,
        temp: {},
        newData: {},
        hashing: 0,
        hashingL: 0,
        downloadedL: 0,
        downloaded: 0
    }

    componentWillMount() {
        let dirs = RNFB.fs.dirs
        const uri = 'http://www.cduppy.com/salescms/?a=ajax&do=getContent&projectId=3&token=1234567890'
        const pathToJson = dirs.DocumentDir + '/contentJson.json';
        const pathToDirFiles = dirs.DocumentDir + '/fajlovi/'
        const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/fajlovi/`;
        const pathToTemp = 'file://' + dirs.DocumentDir + '/tempJson.json';

        // RNFB.fs.unlink(pathToDirFiles).then(res => console.log('Obrisan folder', res));

        imaNeta = () => {
            return new Promise((resolve, reject) => {
                axios.get(uri)
                    .then(response => this.setState({ data: response.data }))
                    .then(() => RNFB.fs.exists(pathToDirFiles))
                    .then(res =>  res!=true ? RNFB.fs.mkdir(pathToDirFiles) && console.log('Folder nije postojao napravljen je novi') : null)
                    .then(() => console.log('Prosao prvi res'))
                    .then(() => RNFB.fs.exists(pathToJson))
                    .then(data => data != true ? putContentInFile() : compareJsonAndDlNew())
                    .then(() => console.log('napravio poredjenje da li data postoiji!'))
                    .then(() => {
                        RNFB.fs.ls(pathToDirFiles).then((result) => {
                            console.log('GOT RESULT', result);
                        })
                    })
                    .then(() => resolve())

            })
        }

        console.log(pathToJson);
        if (NetInfo.isConnected) {
            imaNeta().then(() => console.log('ima neta!'))
        } else {
            RNFB.fs.exists(pathToJson)
                .then((res) => !res == true ? this.setState({ isLoading: 'offline' }) : this.setState({ isLoading: false }))
        }

        compareHash = (res) => {
            return new Promise((resolve, reject) => {
                RNFS.fs.exists(pathToTemp)
                    .then(res => {
                        const jsonAsObj = res;
                        if (md5(this.state.data) == md5(jsonAsObj)) {
                            this.setState({ temp: jsonAsObj })
                                .then(() => resolve())
                        } else {
                            tempDontExist()
                                .then(() => console.log('Smestio prvi temp'))
                        }
                    })
            })
        }

        putContentInFile = async () => {
                await RNFB.config({
                    path: pathToJson
                }).fetch('GET', uri, {})
                .then(r => console.log('contentJson snimljen', r.path()))
                .then((dataFromDL) => RNFB.fs.readStream(pathToJson))
                .then((dataFromRead) => dataFromRead)
                .then((jsonObj) => this.setState({ data: jsonObj }))
                .then(() => calculateSize(this.state.data.files))
                .then((mb) => alertForDownload(mb)
                    .then((res) => res == 'Download' ? downloadAllFiles() : console.log('Pritisnut je NO!!'))
                )
                .then(() => this.setState({ isLoading: false }))
        }

        compareJsonAndDlNew = async () => {
            console.log('compareJnloadNewContent() start');
            console.log('bbbbbb');
            let t0 = Date.now();
            await RNFB.fs.readStream(pathToJson) // ocitaj
                .then(fileAsString => {

                    let t1 = Date.now();
                    console.log("READED AS STRING IN:");
                    console.log(Number(t1) - Number(t0));
                    let t2 = Date.now();
                    const contentJsonObj = fileAsString; // parsiraj kao objekat
                    let t3 = Date.now();
                    console.log("PARSED IN:");
                    console.log(Number(t3) - Number(t2));
                    if (md5(this.state.data) == md5(contentJsonObj)) { // ako su hash-evi isti
                        this.setState({ newData: contentJsonObj }); // u this.state.data stavi {} iz fajla
                        console.log("Content JSON hashevi su isti, poredim fajlove!");
                        calculateDifference();
                        console.log('compareJsonsAndDownloadNewContent() end');
                    } else { // ako hash-evi nisu isti
                        console.log("Hash nije isti, POCNI");
                        const oldJson = fileAsString; // smesti trenutni fajl u ovu varijablu
                        const newJson = this.state.data;
                        RNFB.fs.writeFile(pathToJson, newJson); // overwrite file
                        // provera fajlova
                    }
                });

        }
        calculateDifference = () => {
            console.log('usao u calculateDIfference()');
            let sD = [];
            let size = 0;
            let t0 = Date.now();
            console.log('calculateDiff pre a');
            const a = this.state.data.files.map(file =>
                RNFB.fs.exists(pathToDirFiles + file.fileId + '.' + file.ext)
                    .then(res => {
                        if(res != true && res.hash != file.hash) {
                            sD.push(file)
                        }
                    })
                    .then(() => this.setState(prevState => ({ hashing: prevState.hashing + 1 })))
            );
            console.log('calculateDiff posle a');
            this.setState({ hashingL: a.length });
            try {
                 Promise.all(a)
                    .then(() => {
                        this.setState({ downloadedL: sD.length });
                        if (sD.length > 0)
                            calculateSize(sD)
                                .then((mb) => alertForDownload(mb))
                                .then((res) => {
                                    if (res == 'Download') {
                                        const m = sD.map(file => downloadOne(file))
                                        Promise.all(m)
                                            .then(() => this.setState({ isLoading: false }))
                                    } else {
                                        console.log('Pritisnut je NO u calculateDifference()');
                                    }
                                })

                        else {
                            console.log('Fajlovi su isti, nema potrebe za novim download-om');
                            this.setState({ isLoading: false });
                        }
                        let t1 = Date.now();
                        console.log(Number(t1) - Number(t0));
                    })
            } catch (error) {
                console.log(sD);
                console.log(calculateSize(sD));
                console.log('Catch od Promise.all(a)' + error.message);
            }
        }


        tempDontExist = () => {
            RNFB.config({
                path: pathToTemp
            }).fetch('GET', uri, {})
                .then((res) => {
                    console.log('Fajl je snimljen u ', res.path())
                })
        }



        alertForDownload = (result) => {
            let p = new Promise((resolve, reject) => {
                Alert.alert(
                    'About to download' + result + ' MB.',
                    'Do you wish to continue?',
                    [{ text: 'Yes', onPress: () => { resolve('Download'); } },
                    { text: 'No', onPress: () => { resolve('Don\'t download'); } }
                    ]
                )
            });
            return p;
        }
        calculateSize = (filesArr) => {
            return new Promise((resolve, reject) => {
                let result = 0;
                filesArr.forEach(ele => {
                    result += Number(ele.size);
                });
                result = (result / 1024 / 1024).toFixed(2);
                resolve(result);
            })
        }


        snimanjeJsona = () => {
            RNFB.config({
                path: pathToJson
            }).fetch('GET', uri, {})
                .then((res) => {
                    console.log('Fajl je snimljen u ', res.path())
                })
        }

        downloadOne = (file) => {
            return RNFB.config({
                path: pathToDirFiles + file.fileId + '.' + file.ext,
                fileCache: true
            })
                .fetch('GET', 'http://www.cduppy.com/salescms/files/3/' + file.fileId, {})
                .then((r) => {
                    this.setState(prevState => ({ downloaded: prevState.downloaded + 1 }));
                    console.log('Fajl je snimljen u ', r.path())
                })
        }

        downloadAllFiles = async () => {
            console.log('usao u funkciju za skidanje fajlova!');
            const a = this.state.data.files.map(file =>
                downloadOne(file)
            );
            try {
                await Promise.all(a);
            } catch (error) {
                console.log('Greska od download all ', error.message);
            }
            console.log('All download completed!!')
        }




    } // END of compWillMount



    render() {
        //if (!this.state.isDownloading) {
        //console.log(this.state.isDownloading)
        if (!this.state.isLoading) {
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
            return (
                <View>
                    {/* <View>
                        <Image style={styles.imageStyle} await source={{ uri: `file://${RNFB.fs.dirs.DocumentDir}/fajlovi/1209.jpg` }} />
                        <Text>{''}</Text>
                    </View>
                    <View>
                        <Video await source={{ uri: `file://${RNFB.fs.dirs.DocumentDir}/fajlovi/1303.mp4` }}   // Can be a URL or a local file.
                            // Store reference
                            rate={1.0}                              // 0 is paused, 1 is normal.
                            volume={1.0}                            // 0 is muted, 1 is normal.
                            muted={false}                           // Mutes the audio entirely.
                            paused={false}                          // Pauses playback entirely.
                            resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                            repeat={true}                           // Repeat forever.
                            playInBackground={false}                // Audio continues to play when app entering background.
                            playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
                            ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                            progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                            onLoadStart={this.loadStart}            // Callback when video starts to load
                            onLoad={this.setDuration}               // Callback when video loads
                            onProgress={this.setTime}               // Callback every ~250ms with currentTime
                            onEnd={this.onEnd}                      // Callback when playback finishes
                            onError={this.videoError}               // Callback when video cannot be loaded
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                            style={{ width: 300, height: 300 }} />
                    </View> */}
                    <ScrollView>
                        <MenuList data={this.state.data} />
                    </ScrollView>
                </View>

            )
        } else if (this.state.isLoading) {
            return (
              <View style={{ marginTop: 50 }}>
                <Text>Loading, please wait.</Text>
                <Text>Hashing {this.state.hashing} of {this.state.hashingL} files.</Text>
                <Text>Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>
              </View>
            );
          }
          else if (this.state.isLoading == 'offline') {
            return (
              <View style={{ marginTop: 50 }}>
                <Text>You are starting app for first time and you are offline. We need to show some content, and for this we need to download it.</Text>
                <Text>Please connect to internet first.</Text>
              </View>
            );
          }
    }
}

const styles = {
    imageStyle: {
        width: 200,
        height: 200,
    }
}


export default Importing;