import React from 'react';
import LoginForm from './src/Login/LoginForm';
import Register from './src/Register/Register';
import Timeline from './src/Timeline/Timeline';
import Post from './src/Product/Post';
import Profile from './src/Profile/Profile';
import ViewProduct from './src/Timeline/ViewProduct';
import Notification from './src/Notification/Notification';
import IconWithBadge from './src/Utility/IconWithBadge';
import Inbox from './src/Inbox/Inbox';

import {createBottomTabNavigator,createStackNavigator,createSwitchNavigator, createAppContainer } from "react-navigation";
import { Font } from 'expo';
import { Asset } from 'expo';
import { Ionicons } from '@expo/vector-icons';



const AuthStack = createStackNavigator(
  {
    LoginScreen: {screen:LoginForm,navigationOptions: { header: null }},
    RegisterScreen: {screen: Register,navigationOptions: { header: null }},
  },
  {
    initialRouteName: "LoginScreen",
  }
);
const UthStack = createStackNavigator(
  {
    ViewProduct: {screen:ViewProduct,navigationOptions: { header: null }},
    Timeline: {screen:Timeline},
  }
);
const AppStack = createBottomTabNavigator(
  {
    Timeline:Timeline,
    Product: Post,
    Notification: Notification,
    Profile: Profile,
    Inbox:Inbox
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName; let badgeCount;
        if (routeName === 'Timeline') {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          IconComponent = IconWithBadge;
        } else if (routeName === 'Product') {
          iconName = `ios-add-circle`;
        } else if(routeName === 'Profile'){
          iconName = `md-person`;
        }else if(routeName === 'Notification'){
          iconName = `ios-notifications`;
          badgeCount = 4;
        }else if(routeName === 'Inbox'){
          iconName = `md-chatboxes`;
          badgeCount = 3;
        }

        // You can return any component that you like here!
        return <IconComponent badgeCount={badgeCount} name={iconName} size={25} color={tintColor} screen={routeName} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
  }
)

const AppContainer = createAppContainer(
  createSwitchNavigator(
  {
    Auth: AuthStack,
    App: AppStack,
    Uth: UthStack
  }
));


export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'lato': require('./assets/fonts/Lato-Regular.ttf'),
      'lato-bold': require('./assets/fonts/Lato-Bold.ttf')
    }).then(() => {
      this.setState({fontLoaded:true})
    })

  }

  render() {
    return (
      <AppContainer/>
    );
  }
}
