import React, { Component } from 'react';
import reactNative, { ScrollView, View, Text, AsyncStorage, Image, Alert, NetInfo, StyleSheet } from 'react-native';
import Header from './src/componente/Header';
import Body from './src/componente/Body';
import Footer from './src/componente/Footer';
import Router from './src/Router';
import axios from 'axios';
import RNFB from 'react-native-fetch-blob';
import md5 from 'md5';
import * as Progress from 'react-native-progress';



class App extends Component {

  state = {
    downloadedL: 0,
    downloaded: 0,
    hashing: 0,
    hashingL: 0,
    isLoading: true,
    visibleDownload: false,
    indeterminate: true
  }

  isLoading() {
    let dirs = RNFB.fs.dirs
    let fetchedProject = {};
    const projectJsonUrl = 'http://www.cduppy.com/salescms/?a=ajax&do=getProject&projectId=3&token=1234567890'
    const pathToProjectJson = dirs.DocumentDir + '/projectJson.json';
    const pathToDirFiles = dirs.DocumentDir + '/fajlovi/'
    const pathToFiles = `file://${RNFB.fs.dirs.DocumentDir}/fajlovi/`;
    const checkFile = dirs.DocumentDir + '/checkFile.txt';
    const pathToTemp = dirs.DocumentDir + '/tempJson.txt';


    let projectJsonURL = '';

    const contentJsonURLReqParametri = '?a=ajax&do=getContent&projectId=3&token=1234567890';
    const pathToContentJson = dirs.DocumentDir + '/contentJson.json';
    let contentJsonURL = '';

    // RNFB.fs.unlink(pathToDirFiles).then(res => console.log('Obrisan folder', res));



    checkServer = () => {
      let a = global.projectJson.project.servers.map(server =>
        axios.get(server)
      );
      // return Promise.resolve(a[0]);
      return Promise.race(a);
    }

    // asd = () => {
    //   return new (
    // }




    console.log(pathToContentJson);
    // if (NetInfo.isConnected) {
    //   imaNeta().then(() => console.log('ima neta!'))
    // } else {
    //   RNFB.fs.exists(pathToContentJson)
    //     .then((res) => !res == true ? this.setState({ isLoading: 'offline' }) : this.setState({ isLoading: false }))
    // }

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

    checkLastChanges = () => {
      
       return new Promise((resolve, reject) => {
         RNFB.fs.readFile(pathToProjectJson, 'utf8')
           .then(res => {
             const projectJsonObj = JSON.parse(res);
             if (global.projectJson.project.lastChanges != projectJsonObj.project.lastChanges) {
              
               return false;
             } else {
               
               return true;
             }
           })
       })
    
     }

    dlContentJson = async () => {
      await RNFB.config({
        path: pathToContentJson
      }).fetch('GET', contentJsonURL )
        .then(r => console.log('Finishes downloading to ', r.path()))
    }  

    readContentJson = async () => {
      await RNFB.fs.readFile(pathToContentJson, 'utf8')
      .then(r => global.globalJson = JSON.parse(r))
    }

     readProjectJson = async () => {
       return RNFB.fs.readFile(pathToProjectJson, 'utf8')
       .then(r => global.projectJson = JSON.parse(r))
     }

    putContentInFile = async () => {
      await RNFB.config({
        path: pathToProjectJson
      }).fetch('GET', projectJsonUrl)
        .then(r => console.log('Finishes downloading to ', r.path()))
        .then(() => {
          return RNFB.fs.readFile(pathToProjectJson, 'utf8')
            .then(res => global.projectJson = JSON.parse(res))
        })
        // console.log(global.globalJson)
        // .then(() => console.log(global.globalJson))
        .then(() => checkServer())
        .then(res => {server = res.config.url})
        .then(() => {contentJsonURL = server + contentJsonURLReqParametri})
        .then(() => {dlContentJson()})
        .then(() => readContentJson()
        .then(r => { console.log(r) })
    )        
        .then(() => calculateSize(global.globalJson.files))
        .then((mb) => alertForDownload(mb)
          .then((res) => res == 'Download' ? downloadAllFiles() : console.log('Pritisnut je NO!!'))
        )
        .then(() => this.setState({ isLoading: false }))
    }

    compareJsonAndDlNew = async () => {
      let tempJson = {};
      await  RNFB.fs.exists(pathToTemp)
        .then(res => {
          if (res != true) {
            tempDontExist()
              .then(async () => {
                await RNFB.fs.readFile(pathToTemp, 'utf8')
                  .then(r => tempJson = JSON.parse(r))
              })
          } else {
            RNFB.fs.readFile(pathToTemp, 'utf8')
              .then(r => tempJson = JSON.parse(r))
          }
        })
      console.log('compareJnloadNewContent() start');
      console.log('bbbbbb');
      let t0 = Date.now();
      await RNFB.fs.readFile(pathToProjectJson, 'utf8') // ocitaj
        .then(fileAsString => {
          // console.log(fileAsString)
          let t1 = Date.now();
          console.log("READED AS STRING IN:");
          console.log(Number(t1) - Number(t0));
          let t2 = Date.now();
          const projectJsonObj = JSON.parse(fileAsString); // parsiraj kao objekat
          let t3 = Date.now();
          console.log("PARSED IN:");
          console.log(Number(t3) - Number(t2));
          if (tempJson.hash != projectJsonObj.hash) { // ako su hash-evi isti
            global.globalJson = tempJson; // u this.state.data stavi {} iz fajla
            console.log("Content JSON hashevi nisu isti zamenjen je globalJson");
            calculateDifference();
            console.log('compareJsonsAndDownloadNewContent() end');
          } else {
            console.log('ADHSGLASD JABSd;')
            citanjeJsonaIsnimanjeUGlobal();
            // global.globalJson = contentJsonObj;
            // this.setState({isLoading: false})
          }
        });

    }


    calculateDifference = async () => {
      await RNFB.fs.readFile(pathToContentJson, 'utf8')
        .then(res => global.globalJson = JSON.parse(res))
      console.log('usao u calculateDIfference()');
      let sD = [];
      // console.log(global.globalJson)
      let size = 0;
      readProjectJson()
      .then(() => checkServer())
      .then(res => {server = res.config.url})
      let t0 = Date.now();
      console.log('calculateDiff pre a');
      const a = global.globalJson.files.map(file =>
        RNFB.fs.exists(pathToDirFiles + file.fileId + '.' + file.ext)
          .then(res => {
            if (res != true && res.hash != file.hash) {
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
                      .then(() => {
                        RNFB.fs.writeFile(checkFile, 'true', 'utf8').then(r => console.log('Fajl je snimljen u ', r))
                      })
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


    tempDontExist = async () => {
      await RNFB.config({
        path: pathToTemp
      }).fetch('GET', projectJsonUrl, {})
        .then((res) => {
          console.log('Fajl je snimljen u ', res.path())
        })
    }


    alertForSync = (res) => {
      let k = new Promise((resolve, reject) => {
        Alert.alert(
          'Alert',
          'Do you want sync of your files?',
          [
            { text: 'OK', onPress: () => resolve('Check') },
            { text: 'Cancel', onPress: () => { resolve('Don\'t check ') } },
          ],
        )
      })
      return k;
    }



    alertForDownload = (result) => {
      let p = new Promise((resolve, reject) => {
        Alert.alert(
          'About to download ' + result + ' MB.',
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
    calculateSize1 = (filesArr) => {
      return new Promise((resolve, reject) => {
        let result = 0;
        if (filesArr.length <= 0) {
         
          reject('Array is empty');
        } else {
          filesArr.forEach(element => {
            result += Number(element.size);
          });
          result = (result / 1024 / 1024).toFixed(2);
          this.setState({ visibleDownload: true });
          resolve(result);
        }
      })
    }


    snimanjeJsona = async () => {
      await RNFB.config({
        path: pathToProjectJson
      }).fetch('GET', projectJsonUrl)
        .then((res) => {
          console.log('Fajl je snimljen u ', res.path())
        })
    }

    downloadOne = (file) => {
      return RNFB.config({
        path: pathToDirFiles + file.fileId + '.' + file.ext,
        // fileCache: true
      })
        .fetch('GET', server + global.projectJson.project.contentDir + file.fileId )
        .then((r) => {
          this.setState(prevState => ({ downloaded: prevState.downloaded + 1 }));
          console.log('Fajl je snimljen u ', r.path())
        })
    }


    downloadAllFiles = async () => {
      console.log('usao u funkciju za skidanje fajlova!');
      const a = global.globalJson.files.map(file =>
        downloadOne(file)
      );
      try {
        await Promise.all(a);
      } catch (error) {
        console.log('Greska od download all ', error.message);
      }
      console.log('All download completed!!')
      RNFB.fs.writeFile(checkFile, 'true', 'utf8').then(r => console.log('Fajl je snimljen u ', r))
    }

    citanjeJsonaIsnimanjeUGlobal = async () => {
      await RNFB.fs.readFile(pathToContentJson, 'utf8')
        .then(r => { global.globalJson = JSON.parse(r) })
        // .then(() => console.log(global.globalJson))
        .then(() => this.setState({ isLoading: false }))
    }


    checkFiles = async () => {
      await RNFB.fs.exists(checkFile)
        .then((r) => {
          if (r == true) {
            putContentInFile()
          }
        })
    }

    readFilles = async () => {
      await RNFB.fs.readFile(checkFile, 'utf8')
        .then((r) => {
          if (r != 'true') {
            calculateDifference()
          }
        })
    }

    igniter = () => {
        // snimanjeJsona()
        // .then(res => { fetchedProject = res.data; return Promise.resolve() })
        checkFiles()
        .then(() => citanjeJsonaIsnimanjeUGlobal())
        .then(() => readFilles())
        // .then(sres => console.log(res))
        // .then(() => this.setState({isLoading: false}))
    }

    appStarter = () => {
      console.log('Usao u app starter')
      // return new Promise((resolve, reject) => {
      RNFB.fs.exists(checkFile)
        .then(res => {
          console.log(res)
          if (res == true) {

            RNFB.fs.readFile(checkFile, 'utf8')
              .then(res => {
                if (res === 'true') {
                  console.log('Usao u fajlovi postoje');
                  if (NetInfo.isConnected) {
                    console.log('Usao u if')
                    citanjeJsonaIsnimanjeUGlobal()
                      .catch((err) => { console.log('ERROR kod citanja JSONA', err.message) && this.setState({ isLoading: false }) })
                  } else {
                    console.log('Usao u else')
                    alertForSync()
                      .then(res => {
                        if (res == 'Check') {
                          compareJsonAndDlNew();
                        } else {
                          console.log('Korisnik nece da sinhronizuje');
                          citanjeJsonaIsnimanjeUGlobal()
                        }
                      })

                  }
                } else {
                  calculateDifference();
                }
              })
          } else {
            putContentInFile()
          }
        })
      // RNFB.fs.ls(pathToDirFiles).then((result) => {
      //         console.log('GOT RESULT', result);
      //         var t1 = Date.now();
      //         // console.log('Axios vreme: ', Number(t1) - Number(t0))
      //       })

    } //end of app starter
    
    prvoUpisivanje = () => {
      RNFB.fs.writeFile(checkFile, 'false', 'utf8').then(r => console.log('Fajl je snimljen u ', r))
    }
    // appStarter();
    appStarter();
    // prvoUpisivanje();
    

    // imaNeta = () => {
    // return new Promise((resolve, reject) => {
    //   var t0 = Date.now();

    // axios.get(uri)
    //   .then(response => this.setState({ data: response.data }))
    //   .then(() => RNFB.fs.exists(pathToDirFiles))
    //   .then(res => res != true ? RNFB.fs.mkdir(pathToDirFiles) && console.log('Folder nije postojao napravljen je novi') : null)
    //   .then(() => console.log('Prosao prvi res'))
    //   .then(() => RNFB.fs.exists(pathToContentJson))
    //   .then(data => data != true ? putContentInFile() : compareJsonAndDlNew())
    //   .then(() => console.log('napravio poredjenje da li data postoiji!'))
    //   .then(() => {
    //     RNFB.fs.ls(pathToDirFiles).then((result) => {
    //       console.log('GOT RESULT', result);
    //       var t1 = Date.now();
    //       console.log('Axios vreme: ', Number(t1) - Number(t0))
    //     })
    //   })
    //   .then(() => resolve())

    // })
    // }

  }



  componentWillMount() {
    this.isLoading();
  } // end of componentWillMount+

  calcProgress() {
    if (this.state.downloaded == 1) {
      this.state.indeterminate = false;
    }
    if (this.state.downloaded > 0) {
      return this.state.downloaded / this.state.downloadedL;
    }
  }


  render() {
    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Router />
        </View>
      );
    } else if (this.state.isLoading) {
      return (
        <View style={{ alignSelf: 'center', paddingTop: 120, width: "100%", height: "100%", backgroundColor: '#4169e1' }}>
          <View style={{ alignSelf: 'center', width: 800, height: 500, backgroundColor: '#4169e1', justifyContent: 'center', }}>
            <Text style={styles.loadTextF}>Loading, please wait...</Text>
            {this.state.visibleDownload && <Text style={styles.loadText}> Downloaded {this.state.downloaded} of {this.state.downloadedL} files.</Text>}
            <Progress.Bar
              style={{ alignSelf: 'center', margin: 10, opacity: this.state.showProgress }}
              indeterminate={this.state.indeterminate}
              progress={this.calcProgress()}
              color='#fff'
            />
          </View>
        </View>
      );
    }
    else if (this.state.isLoading == 'offline') {
      return (
        <View style={{ marginTop: 50, }}>
          <Text>You are starting app for first time and you are offline. We need to show some content, and for this we need to download it.</Text>
          <Text>Please connect to internet first.</Text>
        </View>
      );
    }
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    paddingTop: 80
  },
  loadTextF: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 30,
    paddingBottom: 30
  },
}
)

export default App;