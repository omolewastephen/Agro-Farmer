import React, {Component} from 'react';
import {TextInput,
  ScrollView,StyleSheet,
  StatusBar,ActivityIndicator,
  Text, View,TouchableOpacity,Dimensions,
  ImageBackground,KeyboardAvoidingView} from 'react-native';
let {height, width} = Dimensions.get('window');
import { createStackNavigator, createAppContainer } from "react-navigation";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

  RegisterUser = () =>{
    if(this.state.userName === " " && this.state.userPhone === " " && this.state.userState === " " && this.state.userPassword === " " && this.state.userEmail === " "){
      alert("Fields cannot be empty. Enter your details");
    }else{
      this.setState({ ActivityLoader: true}, () => {
        return fetch("http://192.168.43.238:80/agro-api/user/register.php",{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.state.userEmail,
            password: this.state.userPassword,
            phone: this.state.userPhone,
            address: this.state.userState,
            name: this.state.userName,
          })
        }).then((response) => response.json()).then((responseJsonFromServer) =>{
          alert(responseJsonFromServer);
          this.setState({ActivityLoader: false});

          //this.props.navigation.navigate('TimelineScreen');
        }).catch((error) =>{
          alert(error);
          this.setState({ActivityLoader: false})
        });
      });
    }
  }
    render() {
      return (
        <KeyboardAvoidingView behavior={"height"}  style={{flexGrow:1,height:"100%"}}>
        <ScrollView>
          <ImageBackground style={{width: "100%",height: height}} source={require('./bg.jpg')}>
          <View styles={{flex:1}}>
              <View style={styles.title}>
                <Text style={styles.big}>Agro</Text>
                <Text style={styles.small}>Registration</Text>
                {
                  this.state.ActivityLoader ?(
                      <ActivityIndicator color='#FFF' size='large' style={styles.Activity} />
                    ): null
                }
               </View>

               <View style={styles.formContainer}>
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
               </View>

               <View>
                <TouchableOpacity style={styles.buttonContainer} onPress={ this.RegisterUser }>
                      <Text style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity>
               </View>
          </View>
          <View style={{flex:2}}>
              <View style={styles.bottomRow}>
                <Text style={styles.signupText}> Already have an account ?
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
      flex: 1
    },
    title: {
      height: "20%",
      alignItems: "center",
      justifyContent:"center"
    },
    big: {
      marginTop: 10,
      fontSize: 50,
      color: "white",
      alignItems:"center",
      fontWeight:"bold",
    },
    formContainer:{
      padding: 20,
      flex: 2
    },
    small: {
      marginTop: 4,
      fontSize: 20,
      color:"#FFF",
      fontWeight:"bold",
      opacity: .8
    },
    input: {
      height: 20,
      backgroundColor: "green",
      color: "#FFF",
      paddingHorizontal: 10,
      marginBottom: 10,
      borderRadius: 7,
      fontSize: 15,
    },
    buttonContainer: {
      backgroundColor: "#FFF",
      paddingVertical: 15,
      borderRadius: 3,
      padding:5,
    },
    buttonContainerClear: {
      backgroundColor: "red",
      paddingVertical: 15,
      borderRadius: 3,
      padding:5,
      flex: 1
    },
    buttonText: {
      textAlign: 'center',
      color:"green",
      fontWeight: '700',
      fontSize: 20
    },
    buttonTextClear: {
      textAlign: 'center',
      color:"white",
      fontWeight: '700',
      fontSize: 20
    },
    bottomRow: {
      padding: 20,
      flex:1
    },
    signupText: {
      fontSize: 21,
      color:"#FFF",
      fontWeight: "700",
      alignItems: "center"
    },
    reg: {
      color: "#FED81E",
      alignItems: "center",
      marginLeft: 5
    }
  });
