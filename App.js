import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Button, Text, Modal, View, Pressable, TextInput, Keyboard,TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import Home from "./screens/home"
import homeNav from './screens/homeNav';
import login from './screens/login';
import Register from './screens/RegisterScreen.js';

const Stack = createNativeStackNavigator();


export default function App() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Apple', value: 'apple'},
    {label: 'Banana', value: 'banana'}
  ]);


  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
          name="Login" 
          component={login} 
      />
      <Stack.Screen 
          name="LiNK" 
          component={homeNav} 
          options={{ 
            headerTitle: 'ACWR',
            headerStyle: {
              //backgroundColor: '#f4511e',
            },
            headerRight: () => (
              <TouchableOpacity onPress={() => alert('This is a button!')}>
                  <MaterialIcons name='settings' size={30} color="black">
                  </MaterialIcons>
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <View 
                //style={[{flex:1, justifyContent: 'center'}]}
              >
                {/*<DropDownPicker
                  style={[{width:200}]}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
            />*/}
              </View>
            ),
            }}
          //options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
        />
    {/*<View style={styles.container}>
      <Home></Home>
      <StatusBar style="auto" />
  </View>*/}
  </Stack.Navigator>
   </NavigationContainer>
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
