import React, {Component} from 'react';
import {StyleSheet,
ScrollView,
Dimensions,
Text,ActivityIndicator,
TouchableOpacity,
TouchableHighlight,
TextInput,
View,
Button,
Image,
StatusBar,
ImageBackground,
KeyboardAvoidingView} from 'react-native';
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { Font,ImagePicker,Permissions,Constants } from 'expo';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import { AsyncStorage } from 'react-native';


export default class Post extends Component {
  state={
    image: null,
    product_name: '',
    product_description: '',
    userId: '',
    photo: '',
    username: '',
    email: '',
    address: '',
    sent:true
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
        address: val.address
      })
    });
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if(Constants.platform.ios){
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status !== 'granted'){
        alert("Camera Roll permission will make this work");
      }
    }
  }
  AddProduct = () => {
    this.setState({sent:false});
    const formdata = new FormData();
    formdata.append('product_name', this.state.product_name);
    formdata.append('product_description', this.state.product_description);
    formdata.append('userId', this.state.userId);
    formdata.append('image', {
      uri: this.state.image,
      type: 'image/jpg',
      name: 'image'
    });
    console.log(formdata);
    return fetch("https://texotrack.com/api/user/addproduct.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,

    }).then((response) => response.json())
      .then((responseJson) => {
      console.log(responseJson);
      if(responseJson == 1){
        this.setState({
          product_name: '',
          product_description: '',
          image: null
        });
        this.nameInput.clear();
        this.descInput.clear();
        this.setState({sent:true});
        alert("Product Added Successfully");

      }else{
        this.setState({
          product_name: '',
          product_description: '',
          image: null
        });
        this.nameInput.clear();
        this.descInput.clear();
        alert("Error Adding Product, Try again");
      }
    }).catch((error) => {
      console.log(error.message);
    })
  }
  _pickImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4,3],
    });
    console.log(result);
    if(!result.cancelled){
      this.setState({ image: result.uri })
    }
  }
  render(){
    const image = this.state.image;
    return(
      <View style={styles.container}>
        <StatusBar style={{height: 30}}
        backgroundColor="green"
        />
         <View elevation={5} style={styles.headers}>
            <Text style={{fontSize: 25,color:"white",textTransform: "uppercase",fontWeight:"bold"}}>Add Products</Text>
            <Text style={styles.topIcon} onPress={this.GoHome}>
                <Ionicons name="md-home" size={25} color="white" />
            </Text>
         </View>

         <View style={styles.content}>
            <View style={{padding: 5}}>
              <Text style={styles.headerText}><Ionicons name="ios-add-circle"  size={26} color="black" /> Add New Product</Text>
            </View>
            <View style={{flex:1}}>
              <ScrollView alwaysBounceVertical={true} contentContainerStyle={{ flexGrow: 1}} enabled bounces={true}>
                <View style={styles.formContainer}>
                <Text style={styles.label}>Product Name</Text>
                <TextInput style={styles.input}
                style={styles.input}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                ref={input => { this.nameInput = input }}
                onChangeText={(TextInput) => this.setState({product_name: TextInput})}

                />
                <Text style={styles.label}>Product Description</Text>
                <TextInput style={styles.input}
                highlightColor = {'#00BCD4'}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="words"
                autoCorrect={false}
                multiline={true}
                ref={input => { this.descInput = input }}
                onChangeText={(TextInput) => this.setState({product_description: TextInput})}
                />

                <TouchableOpacity style={styles.btn} onPress={this._pickImage}>
                  <Text style={styles.uploadbtn}><Ionicons name="ios-camera"  size={18} color="yellow" /> Click to Add Product Image</Text>
                </TouchableOpacity>

                {
                  image && <Image source={{uri:this.state.image}} style={{width:width,height:height,marginTop:10,marginBottom:10}} />
                }

                <TouchableOpacity style={styles.buttonContainer} onPress={ this.AddProduct }>
                {
                  this.state.sent?(
                         <Text style={styles.buttonText}><Ionicons name="ios-add-circle"  size={30} color="white" /> Add</Text>
                    ): <ActivityIndicator color='white' size='large' style={styles.Activity} />
                }
                     
                </TouchableOpacity>
                </View>
              </ScrollView>
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
 content: {
   flex: 1
 },
 formContainer:{
   padding: 10,
   flex: 1
 },
 label:{
    color: "green",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold"
 },
 input: {
   height: 40,
   backgroundColor: "#FFF",
   color: "#000",
   paddingHorizontal: 10,
   marginBottom: 13,
   borderRadius: 7,
   fontSize: 20,
   borderWidth: 1
 },
 buttonContainer: {
   backgroundColor: "green",
   paddingVertical: 15,
   borderRadius: 3,
   padding:5,
 },
 buttonText: {
   textAlign: 'center',
   color:"#FFF",
   fontWeight: '700',
   fontSize: 30
 },
 btn: {
   backgroundColor: "green",
   paddingVertical: 15,
   borderRadius: 3,
   padding:2,
   marginBottom: 20
 },
 uploadbtn: {
   textAlign: 'center',
   color:"#FFF",
   fontWeight: '700',
   fontSize: 18
 },
 headerText:{
   color: "#000",
   fontSize: 26,
   fontWeight:"bold"
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
    backgroundColor: "green",
 },
 topIcon:{
   marginTop: 3,
   fontWeight: "bold"
 },
 content:{
   margin: 10,
   flex: 1
 }
});
