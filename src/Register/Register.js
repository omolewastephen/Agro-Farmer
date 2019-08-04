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
import { AsyncStorage } from 'react-native';


export default class Register extends Component {
constructor(props){
    super(props)
    this.state = {
      userName: '',
      userPhone: '',
      userState: '',
      userPassword: '',
      userEmail: '',
      ActivityLoader: false,
      userDataAfter: ''
    }
  }

  LoginUser = () => {
    if(this.state.userEmail !== ""){
      if(this.state.password !== ""){
        this.setState({ ActivityLoader: true}, () => {
          return fetch("http://texotrack.com/api/user/login.php",{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: this.state.userEmail,
              password: this.state.password
            })
          }).then((response) => response.json()).then((responseJsonFromServer) =>{
            this.setState({ActivityLoader: false});
            if(responseJsonFromServer){
                  AsyncStorage.setItem("key", JSON.stringify(responseJsonFromServer));
                  this.props.navigation.navigate('App');
            }else{
              alert("Invalid login credential");
            }
          }).catch((error) =>{
            alert("Error connecting to the network. Kindly contact your internet provider if persist");
            this.setState({ActivityLoader: false})
          });
        });
      }else{
        alert("Enter Password")
      }
    }else{
      alert("Enter your Email");
    }
  }

  render() {
       return (
         <KeyboardAvoidingView behavior={"height"}  style={{flexGrow:1,height:"100%"}}>
               <ScrollView bounces={false} >
                   <StatusBar
                   backgroundColor="black"
                   />
                   <ImageBackground style={{width: "100%",height: height}} source={require('./bg.jpg')} blurRadius={1}>
                   <View style={{flex:1}}>

                   <View style={{padding: 20,marginTop:30}}>
                          <View style={{alignItems:"center",marginBottom:20}}>
                           <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>
                              <Ionicons name="md-lock" size={20} color="white" /> Registration
                           </Text>
                           <View style={styles.image_placeholder}></View>
                           </View>
                <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                           <TextInput style={styles.input}
                  style={styles.input}
                  placeholder="Name"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholderTextColor="rgba(255,255,255,.7)"
                  name="name"
                  onChangeText={(TextInput) => this.setState({userName: TextInput})}

                  />
                  <TextInput style={styles.input}
                  style={styles.input}
                  placeholder="Email Address"
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="words"
                  autoCorrect={false}
                  onChangeText={(TextInput) => this.setState({userEmail: TextInput})}
                  placeholderTextColor="rgba(255,255,255,.7)"
                  name="email"

                  />
              </View>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                  <TextInput style={styles.input}
                  style={styles.input}
                  placeholder="State"
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(TextInput) => this.setState({userState: TextInput})}
                  placeholderTextColor="rgba(255,255,255,.7)"
                  name="state"

                  />
                  <TextInput style={styles.input}
                  style={styles.input}
                  placeholder="Phone Number"
                  returnKeyType="next"
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(TextInput) => this.setState({userPhone: TextInput})}
                  placeholderTextColor="rgba(255,255,255,.7)"
                  name="email"

                  />
                </View>
                  <TextInput style={styles.input}
                  style={styles.input}
                  placeholder="Password"
                  returnKeyType="next"
                  keyboardType="default"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  onChangeText={(TextInput) => this.setState({userPassword: TextInput})}
                  placeholderTextColor="rgba(255,255,255,.7)"
                  name="email"

                  />

                           <TouchableOpacity style={styles.buttonContainer} onPress={ this.LoginUser }>
                               <Text style={styles.buttonText}>LOG IN</Text>
                           </TouchableOpacity>
                   </View>

                           <View style={styles.bottomRow}>
                           <Text style={styles.signupText}> Already have account ?
                           <Text style={styles.reg} onPress={() => this.props.navigation.navigate('LoginScreen')}>LOGIN HERE</Text>
                           </Text>
                           </View>
                       </View>
                   </ImageBackground>
          </ScrollView>
         </KeyboardAvoidingView>
       );
   }
}

const styles = StyleSheet.create({
container: {
flex: 1,
},
title: {
marginTop: 20,
alignItems: "center",
justifyContent:"center",
flex:1,
},
big: {
marginTop: 20,
fontSize: 40,
color: "white",
alignItems:"center",
fontFamily: 'normal'
},
small: {
marginTop: 4,
fontSize: 16,
color:"#FFF",
fontWeight:"bold",
opacity: .8
},
bottomRow: {
padding: 20,
justifyContent: "center",
alignItems: "center",
flex: 3
},
signupText: {
fontSize: 17,
color:"#FFF",
fontWeight: "700",
alignItems: "center"
},
reg: {
color: "#FED81E",
alignItems: "center"
},
input: {
height: 32,
backgroundColor: "green",
color: "#FFF",
paddingHorizontal: 10,
marginBottom: 15,
borderRadius: 7,
fontSize: 15,
paddingVertical: 10,
width:'50%'
},
buttonContainer: {
backgroundColor: "#FFF",
paddingVertical: 10,
borderRadius: 16,
marginBottom: 20
},
buttonText: {
textAlign: 'center',
color:"green",
fontWeight: '700',
fontSize: 18
},
Activity:{
position: 'absolute',
left: 0,
right: 0,
top: 150,
bottom: 0,
alignItems: 'center',
justifyContent: 'center',
zIndex: 999
},
image_placeholder:{
  height:120,
  width:120,
  borderRadius:60,
  borderWidth: 4,
  borderColor:"#FFF"
}
});
