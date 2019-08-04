import React, {Component} from 'react';
import {StyleSheet,
ScrollView,
Dimensions,
Text,ActivityIndicator,
TouchableOpacity,
TextInput,
View,
StatusBar,
ImageBackground,
KeyboardAvoidingView} from 'react-native';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { AsyncStorage } from 'react-native';
export default class Inbox extends Component {
  constructor(props){
    super(props)
    this.state = {
      notification: [],
      notificationLoaded: false
    }
  }
Notification = () => {
  return fetch( "http://texotrack.com/api/user/notification.php", {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'fetch'
    })
  }).then((response) => response.json()).then((responseJsonFromServer) => {
      console.log(responseJsonFromServer)
      this.setState({
        notification: responseJsonFromServer,
        notificationLoaded: true
      })
  })
}

componentDidMount(){
  this.Notification()
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


  render(){
    return(
      <View style={styles.container}>
        <StatusBar style={{height: 30}}
        backgroundColor="black"
        />
         <View elevation={5} style={styles.headers}>
            <Text style={{fontSize: 25,color:"white",textTransform: "uppercase",fontWeight:"bold"}}>Inbox</Text>
            <Text style={styles.topIcon} onPress={this.GoHome}>
                <Ionicons name="md-home" size={25} color="white" />
            </Text>
         </View>

         <View style={{flex:1,margin:5}}>
           <ScrollView alwaysBounceVertical={true} contentContainerStyle={{ flexGrow: 1}} enabled bounces={true}>
              
           </ScrollView>
         </View>
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
 },
 lineStyle:{
    borderWidth: 0.3,
    borderColor:'#c9c9c9',
    margin:10
  },
 headers: {
   height: 50,
   marginBottom: 10,
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
 notification: {
   display: 'flex',
   flexDirection:'column',
   padding:10,
   marginTop:7,
   marginBottom:7,
   backgroundColor: '#b2dc9f',
   width:'100%',
   marginRight:10,
   borderRadius:15
 }
});
