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


export default class LoginForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      userEmail: '',
      password: '',
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
                           <View style={styles.title}>
                            {
                              this.state.fontLoaded ? (
                                <Text style={styles.big}>Agro</Text>
                              ): <Text style={styles.big}>Agro</Text>
                            }

                               <Text style={styles.small}>An agro based app for farmers</Text>
                               {
                                  this.state.ActivityLoader ? <ActivityIndicator color='#FFF' size='large' style={styles.Activity} />: null
                                }
                            </View>
                   <View style={{flex:2,padding: 20,marginTop:80}}>
                          <View style={{alignItems:"center",marginBottom:20}}>
                           <Text style={{color:"white",fontSize:20,fontWeight:"bold"}}>
                              <Ionicons name="md-lock" size={20} color="white" /> Farmer's Login
                           </Text>
                           </View>
                           <TextInput
                           style={styles.input}
                           placeholder="Email Address"
                           returnKeyType="next"
                           keyboardType="email-address"
                           autoCapitalize="none"
                           autoCorrect={false}
                           onSubmitEditing = {() => this.passwordInput.focus()}
                           placeholderTextColor="rgba(255,255,255,.7)"
                           name="email"
                           onChangeText={(TextInput) => this.setState({userEmail: TextInput})}

                           />
                           <TextInput
                           style={styles.input}
                           placeholder="Password"
                           returnKeyType="go"
                           secureTextEntry
                           ref={(input) => this.passwordInput = input}
                           placeholderTextColor="rgba(255,255,255,.7)"
                           name="password"
                           onChangeText={(TextInput) => this.setState({password: TextInput})}
                           />

                           <TouchableOpacity style={styles.buttonContainer} onPress={ this.LoginUser }>
                               <Text style={styles.buttonText}>LOG IN</Text>
                           </TouchableOpacity>
                   </View>

                           <View style={styles.bottomRow}>
                           <Text style={styles.signupText}> Don't have account ?
                           <Text style={styles.reg} onPress={() => this.props.navigation.navigate('RegisterScreen')}>REGISTER HERE</Text>
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
height: 50,
backgroundColor: "green",
color: "#FFF",
paddingHorizontal: 10,
marginBottom: 15,
borderRadius: 7,
fontSize: 17,
paddingVertical: 10
},
buttonContainer: {
backgroundColor: "#FFF",
paddingVertical: 15,
borderRadius: 8,
marginBottom: 20
},
buttonText: {
textAlign: 'center',
color:"green",
fontWeight: '700',
fontSize: 23
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
});
