import React, {Component} from 'react';
import {StyleSheet,
ScrollView,
Dimensions,
Text,ActivityIndicator,
TouchableOpacity,
TouchableHighlight,
TextInput,
View,
Image,
Modal,
StatusBar,
ImageBackground,
KeyboardAvoidingView} from 'react-native';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { AsyncStorage } from 'react-native';


export default class Profile extends Component {
  state ={
    userId: '',
    photo: '',
    username: '',
    email: '',
    address: '',
    occupation: '',
    loadedPic: false
  }
  componentDidMount(){
    AsyncStorage.getItem("key").then((data) =>{
      const val = JSON.parse(data);
      console.log(val);
      this.setState({
        username: val.name,
        photo: val.photo,
        email: val.email,
        userId: val.id,
        address: val.address,
        occupation: val.occupation,
        loadedPic:true
      })
    });
  }
  update = () => {
    alert('Hello')
  }


  render(){
    const thumbnail = this.state.photo;
    let th;
    if(thumbnail !== " "){
      th = this.state.photo;
    }
    return(

      <View style={styles.container}>
        <StatusBar style={{height: 30}}
        backgroundColor="black"
        />
         <View elevation={5} style={styles.headers}>
            <Text style={{fontSize: 25,color:"white",fontWeight:"bold"}}>Profile</Text>
            <Text style={styles.topIcon} onPress={this.GoHome}>
                <Ionicons name="md-home" size={25} color="white" />
            </Text>
         </View>

         <View style={styles.container}>
         <View style={styles.body}>
           <View style={styles.bodyContent}>
           {
             this.state.loadedPic ? (
               <Image style={styles.avatar} source={{uri: th}} />
             ): <ActivityIndicator size='large' color='green'/>
           }
           </View>
           <View style={styles.body}>
              <Text style={styles.name}>{this.state.username}</Text>
              <View style={styles.row}>
                <Text style={styles.md1}>Occupation</Text>
                <Text style={styles.md2}>{this.state.occupation}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.md1}>Email</Text>
                <Text style={styles.md2}>{this.state.email}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.md1}>Location</Text>
                <Text style={styles.md2}>{this.state.address}</Text>
              </View>

              <TouchableOpacity style={styles.buttonContainer} onPress={this.update() }>
                  <Text style={styles.buttonText}>
                    <Ionicons name="md-open" size={20} color="white" /> Update
                  </Text>
              </TouchableOpacity>
           </View>
       </View>
     </View>



       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
 },
 headers: {
   height: 50,
   marginBottom: 0,
   display: "flex",
   flexDirection: "row",
   justifyContent: "space-between",
   textAlignVertical: "center",
   padding: 10,
   shadowColor: '#444',
    shadowOffset: {
      width: 0,
      height: 60
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    backgroundColor:"green"
 },
 topIcon:{
   marginTop: 3,
   fontWeight: "bold"
 },
 content:{
   margin: 10,
   flex: 1
 },
avatar: {
  width: 130,
  height: 130,
  borderRadius: 63,
  borderWidth: 4,
  borderColor: "green",
  alignSelf:'center',
  position: 'absolute',
  marginTop:0,
  marginBottom:20,
  top:0,
  bottom:10
},
name:{
  fontSize:22,
  color:"#FFFFFF",
  fontWeight:'600',
  marginTop:40,
  textAlign:'center',
  marginBottom:15
},
bodyContent: {
  padding:30,
  textAlign:'center'
},
body: {
  flex:1,
  marginTop:70,
  marginLeft:10,
  marginRight:10
},
body_:{
  margin:10
},
name:{
  fontSize:25,
  color: "#696969",
  fontWeight: "600",
  marginBottom:15,
  textAlign:'center',
  marginTop:20
},
info:{
  fontSize:18,
  color: "green",
  marginTop:10,
  fontWeight:'bold'
},
description:{
  fontSize:16,
  color: "#696969",
  marginTop:10,
  textAlign: 'center'
},
buttonContainer: {
  marginTop:10,
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:250,
  borderRadius:30,
  backgroundColor: "green",
  borderRadius:80,
  marginLeft:30
},
list:{
  display: 'flex',
  flexDirection: "row",
  justifyContent: "space-between",
  paddingVertical: 10,
  color: "#000",
  fontSize: 10,
  flex:1
},
lineStyle:{
   borderWidth: 0.3,
   borderColor:'red',
   marginTop:0,
   marginBottom:3
 },
 row:{
   display: 'flex',
   flexDirection:'row',
   justifyContent:'space-between',
   marginTop:5,
   marginBottom:10
 },
 md1:{
   fontSize:18,
   fontWeight:'bold'
 },
 md2:{
   fontSize:18,
 },
 buttonText:{
   fontSize:20,
   color:'white',
   textAlign:'center',
   fontWeight:'bold'
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
 }
});
