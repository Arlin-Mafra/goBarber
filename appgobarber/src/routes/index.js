import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import Signin from '../page/Signin'
import SignUp from '../page/SignUp'

const Auth = createStackNavigator()

const AuthRoutes = () => (

  <Auth.Navigator
  screenOptions={{headerShown:false,
   cardStyle: {backgroundColor:"#312e38"}}}
  
   >
    <Auth.Screen component={Signin} name="Signin" />
    <Auth.Screen component={SignUp} name="SignUp" />
  </Auth.Navigator>
)

export default AuthRoutes
