import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Home from "./home"
import report from './report';
import share from './share'
//import Schedule from "./schedule"


//import login from './login/login';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import settings from './settings';

const Stack = createMaterialBottomTabNavigator();

function homeNav() {
    

    return (
        <Stack.Navigator
          /*</NavigationContainer>screenOptions={{
            //title: 'LiNK',
            headerStyle: {
              //backgroundColor: '#f4511e',
            },
            headerTintColor: 'slateblue',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontFamily: 'Cochin',
            },
          }}*/
          activeColor="white"
          //barStyle={{ backgroundColor: 'slateblue' }}
          initialRouteName="LiNK"
          shifting={true}
        >
          
          <Stack.Screen 
            name="Schedule" 
            component={Home} 
            options={{
              tabBarColor:'royalblue',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name='format-list-bulleted' size={24} color={color}></MaterialIcons>
              ),
            }}
          />
          <Stack.Screen 
            name="Report" 
            component={report} 
            options={{
              tabBarColor:'limegreen',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name='accessibility' size={24} color={color}></MaterialIcons>
              ),
            }}
          />
          <Stack.Screen 
            name="Share" 
            component={share} 
            options={{
              tabBarLabel: 'Share',
              tabBarColor:'orange',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name='people' size={24} color={color}></MaterialIcons>
              ),
            }}
          />
          {/*<Stack.Screen 
            name="Settings" 
            component={settings} 
            options={{
              tabBarLabel: 'SETTINGS',
              tabBarColor:'orange',
              tabBarIcon: ({ color }) => (
                <MaterialIcons name='apps' size={24} color={color}></MaterialIcons>
              ),
            }}
          />*/}
        </Stack.Navigator>
   
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default homeNav