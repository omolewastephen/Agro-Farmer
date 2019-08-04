import React, {Component} from 'react';
import {TextInput,StyleSheet,RefreshControl ,ScrollView,Dimensions,Image,StatusBar,ActivityIndicator,Text, View,TouchableOpacity,KeyboardAvoidingView} from 'react-native';
import { createStackNavigator, createAppContainer,Navi } from "react-navigation";
let {height, width} = Dimensions.get('window');
import { Ionicons } from '@expo/vector-icons';
import { Font } from 'expo';
import { AsyncStorage } from 'react-native';
export default class ViewProduct extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      photo: '',
      email: '',
      userId: '',
      address: '',
      timeline: [],
      refreshing: false
    }
    const { goBack } = this.props.navigation;
    console.log(this.props.navigation.state.params);
  }

  render() {
      return (
        <View style={styles.container}>
            <View elevation={5} style={styles.mainheader}>
               <Text style={styles.iconTop} onPress={() => alert('Go back button')}>
                  <Ionicons name="md-arrow-back" size={32} color="black" />
               </Text>
               <Text style={styles.headerTitle}>View Product</Text>
               <Text style={styles.iconTop} onPress={() => this.Home()}>
                  <Ionicons name="md-home" size={32} color="black" />
               </Text>
            </View>

            <View style={styles.content}>
               <View style={{padding: 10}}>
                 <Text style={styles.headerText}>Product details: {this.props.navigation.state.params.product_name}</Text>
               </View>
               <View style={{flex:1}}>
                 <ScrollView alwaysBounceVertical={true} contentContainerStyle={{ flexGrow: 1}} enabled bounces={true}>
                 <View elevation={5} key={this.props.navigation.state.params.product_id} style={styles.card}>
                   <View style={styles.cardbody}>
                     <Image style={styles.cardbody_image} source={{uri: this.props.navigation.state.params.product_image}}/>
                    <Text style={styles.p_name}>{this.props.navigation.state.params.product_name}</Text>
                    <Text style={styles.p_desc}>{this.props.navigation.state.params.product_description}</Text>
                   </View>
                   <View style={styles.cardheader}>
                     <View style={styles.miniheader}>
                       <Image style={styles.thumbnail} source={{uri: this.props.navigation.state.params.thumbnail}} />
                       <Text style={styles.thumb_name}>{this.props.navigation.state.params.farmer_name}</Text>
                     </View>
                     <Text style={styles.timestamp}>{this.props.navigation.state.params.uploaded_time}</Text>
                   </View>
                 </View>
                 </ScrollView>
               </View>
            </View>
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
      fontSize: 20,
      fontWeight:"bold"
    },
    headerTitle:{
      color: "green",
      fontSize: 26,
      fontWeight:"bold"
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
        backgroundColor: "#eee",
        zIndex: 999,
    },
    iconTop:{
      marginTop: 5
    },
    card:{
      height: Dimensions.height * 0.8,
      borderRadius: 5,
      backgroundColor: "#fff",
      marginBottom: 10,
      padding: 20,
      marginTop: 10,
      marginBottom: 20
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
   },
   cardbody_image:{
     height: 150,
     width: "100%",
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
     width: 60,
     marginTop: 5
   },
   buttonText: {
     textAlign: 'center',
     color:"#FFF",
     fontWeight: '700',
     fontSize: 15
   }
  });
