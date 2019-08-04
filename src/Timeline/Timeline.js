import React, {Component} from 'react';
import {TextInput,Modal,Alert,TouchableHighlight,StyleSheet,RefreshControl ,ScrollView,Dimensions,Image,StatusBar,ActivityIndicator,Text, View,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { createBottomTabNavigator,createStackNavigator,createSwitchNavigator, createAppContainer} from "react-navigation";
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { AsyncStorage } from 'react-native';
const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 18 / 32);
const imageWidth = dimensions.width;
export default class Timeline extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      photo: '',
      email: '',
      userId: '',
      address: '',
      timeline: [],
      selectedData: [],
      modalVisible: false,
      refreshing: false,
      beforeLoad: false
    }
  }
  _selectedItem = (data) => {
    this.setState({selectedData: data});
    this.setModalVisible(true);
  }
 setModalVisible(visible) {
   this.setState({modalVisible: visible});
 }
  Home = () => {
     this.setState({beforeLoad:false});
     this.PostTimeline();
  }
  PostTimeline = () => {
    return fetch( "http://texotrack.com/api/user/timeline.php", {
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'fetch'
      })
    }).then((response) => response.json()).then((responseJsonFromServer) => {
        this.setState({
          timeline: responseJsonFromServer,
          beforeLoad: true
        });
    })
  }

  componentDidMount(){
    this.PostTimeline();
    AsyncStorage.getItem("key").then((data) =>{
      const val = JSON.parse(data);
      this.setState({
        username: data.name,
        photo: data.photo,
        email: data.email,
        userId: data.id,
        address: data.address
      })
    })
  }

  render() {
        const data = this.state.selectedData
        const timeLineList = this.state.timeline.map((data) => {
        const thumbnail = data.profile_img;
        const product_image = data.product_image;
        const sold = data.sold;
        let sd;
        if(sold == 1){
          sd = <Text style={{color: 'red',fontWeight:'bold'}}>Sold</Text>
        }else{
          sd = <Text style={{color: 'green',fontWeight:'bold'}}>Available</Text>
        }
        const sub = data.product_description;
        const sb = sub.substring(0,100);
        return (
          <View elevation={5} key={data.id} style={styles.card}>
            <View style={styles.cardheader}>
              <View style={styles.miniheader}>
                <Image style={styles.thumbnail} source={{uri: thumbnail}} />
                <Text style={styles.thumb_name}>{data.farmer_name}</Text>
              </View>
              <Text style={styles.timestamp}>{data.uploaded_time}</Text>
            </View>
            <View style={styles.cardbody}>
              <Image style={{height: imageHeight,width:'100%',resizeMode:'cover'}} source={{uri: product_image}}/>
             <Text style={styles.p_name}>{data.product_name}</Text>
             <Text style={styles.p_desc}>{sb}</Text>
             <View style={{display: "flex",flexDirection: "row",justifyContent: "space-between"}}>
                <Text style={styles.buttonText} onPress={() => {
                  this._selectedItem(data);
                }}><Ionicons name="ios-eye" size={15} color="black" /> VIEW PRODUCT</Text>
               
                 <Text style={styles.buttonText} onPress={() => {
                  this._selectedItem(data);
                }}><Ionicons name="md-chatboxes" size={15} color="black" /> MESSAGE</Text>
                <Text style={styles.buttonText}>{sd}</Text>
             </View>
            </View>
          </View>
        )
      });

      return (
        <View style={styles.container}>
        <StatusBar style={{height: 30}}
        backgroundColor="green"
        />
            <View elevation={5} style={styles.mainheader}>
               <Text style={styles.iconTop} onPress={() => this.PostTimeline()}>
                  <Ionicons name="md-refresh" size={20} color="white" />
               </Text>
               <Text style={styles.headerTitle}>Home</Text>
               <Text style={styles.iconTop} onPress={() => this.Home()}>
                  <Ionicons name="md-home" size={20} color="white" />
               </Text>
            </View>

            <View style={styles.content}>
               <View style={{padding: 10}}>
                 <Text style={styles.headerText}><Ionicons name="md-cart"  size={23} color="black" /> Marketplace</Text>
               </View>
               <View style={{flex:1}}>
               {
                 this.state.beforeLoad ? (
                    <ScrollView alwaysBounceVertical={true} contentContainerStyle={{ flexGrow: 1}} enabled bounces={true}>
                      {timeLineList}
                    </ScrollView>
                 ): <View style={styles.before}><ActivityIndicator color='green' size='large' style={styles.Activity} /></View>
               }
                 
               </View>
            </View>
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                key={data.id}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={{margin: 10}}>
                <Text style={styles.headerText}>Product details: {data.product_name}</Text>
                <View style={styles.cardheader}>
                    <View style={styles.miniheader}>
                    <Text style={styles.thumb_name}>{data.farmer_name}</Text>
                    </View>
                    <Text style={styles.timestamp}>{data.uploaded_time}</Text>
                </View>
                <View style={styles.cardbody}>
                    <Image style={{height: imageHeight,width:'100%',resizeMode:'cover'}} source={{uri: data.product_image}}/>
                    <Text style={styles.p_name}>{data.product_name}</Text>
                    <Text style={styles.p_desc}>{data.product_description}</Text>
                <View>
                </View>
                </View>

                    <TouchableHighlight style={styles.modalbtn}
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={styles.btn}>Close</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.modalVisible}
                key={data.id}
                onRequestClose={() => {
                    alert('Modal has been closed.');
                }}>
                <View style={{margin: 10}}>
                <Text style={styles.headerText}>Product details: {data.product_name}</Text>
                <View style={styles.cardheader}>
                    <View style={styles.miniheader}>
                    <Text style={styles.thumb_name}>{data.farmer_name}</Text>
                    </View>
                    <Text style={styles.timestamp}>{data.uploaded_time}</Text>
                </View>
                <View style={styles.cardbody}>
                    <Image style={{height: imageHeight,width:'100%',resizeMode:'cover'}} source={{uri: data.product_image}}/>
                    <Text style={styles.p_name}>{data.product_name}</Text>
                    <Text style={styles.p_desc}>{data.product_description}</Text>
                <View>
                </View>
                </View>

                    <TouchableHighlight style={styles.modalbtn}
                    onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={styles.btn}>Close</Text>
                    </TouchableHighlight>
                </View>
            </Modal>
        </View>
      );
    }

  }

  const styles = StyleSheet.create({
    container: {
      flex:1
    },
    content: {
      flex: 1
    },
    headerText:{
      color: "#000",
      fontSize: 23,
      fontWeight:"bold"
    },
    headerTitle:{
      color: "#FFF",
      fontSize: 20,
      fontWeight:"bold",
      marginTop:1

    },
    mainheader:{
        height: 50,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 30
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        marginBottom: 7,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: "green",
        zIndex: 999,
    },
    iconTop:{
      marginTop: 5
    },
    card:{
      height: Dimensions.height * 0.8,
      borderRadius: 5,
      backgroundColor: "#fff",
      width: "100%",
      shadowColor: '#444',
      shadowOffset: {
        width: 0,
        height: 20
      },
      shadowRadius: 3,
      shadowOpacity: 0.5,
      marginBottom: 10,
      paddingLeft: 10,
      paddingRight:12,
      paddingTop:10,
      paddingBottom:10,
      marginTop: 10,
      marginBottom: 20,
      marginLeft:0
    },
    cardheader:{
      height: 40,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    thumbnail:{
      height: 30,
      width: 30,
      borderRadius: 5
    },
    miniheader:{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    thumb_name:{
      fontSize: 16,
      color: "green",
      marginLeft: 4,
      fontWeight: "bold"
    },
   timestamp:{
     fontSize: 10,
     color: "#444",
     marginTop: 4
   },
   cardbody:{
     marginTop: 5,
     height:Dimensions.width * 0.8,
     width:'100%'
   },
   cardbody_image:{
     resizeMode: "cover",
     borderRadius:2
   },
   p_name:{
     fontSize: 23,
     color: "green",
     marginTop: 5 ,
     marginBottom: 5,
     fontWeight: "bold"
   },
   p_desc:{
     fontSize: 17,
     color: "black",
     marginTop: 5,
   },
   buttonContainer: {
     backgroundColor: "green",
     padding: 6,
     borderRadius: 3,
     marginBottom:4,
     width: 80,
     marginTop: 5
   },
   buttonText: {
     textAlign: 'left',
     color:"#444",
     fontWeight: 'bold',
     fontSize: 15,
     marginTop:20
   },
   modalbtn:{
     backgroundColor: 'green',
     padding:3,
     borderRadius:3,
     marginTop:20,
     width:60
   },
   btn:{
     textAlign:'center',
     color:'white',
     fontSize:15,
     fontWeight:'bold'
   },
   before:{
    justifyContent:'center',
    alignItems: 'center',
    flex:1
   }
  });
