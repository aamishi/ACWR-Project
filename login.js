import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
//import { getAuth, onAuthStateChanged, signInWithEmailAndPassword  } from "firebase/auth";
//import { auth } from './Firebase';
import { auth } from "./Firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const login = ({navigation}) =>{
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });

  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      navigation.replace('LiNK');
    } else {
        navigation.canGoBack() && navigation.popToTop()
    }
    });
    return unsubscribe
  })
  return (
    <View style={styles.container}>
      <Input
      placeholder = 'Enter Email'
      label = 'Email'
      leftIcon = {{type: 'material', name:'email'}}
      value = {email}
      onChangeText = {text => setEmail(text)}
      />
      <Input
      placeholder = 'Enter Password'
      label = 'Password'
      leftIcon = {{type: 'material', name:'lock'}}
      value = {password}
      onChangeText = {text => setPassword(text)}
      secureTextEntry
      />
      <Button title = 'Sign In' style = {styles.button} onPress={signIn}/>
      {/*<Button title = 'Sign In' style = {styles.button} onPress={()=>navigation.navigate('LiNK')}/>*/}
      <Button title = 'Register' style = {styles.button} onPress={()=>navigation.navigate('Register')}/>
    </View>
  )
}

const offset = 24;

const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  nameInput: {
    height: offset * 2,

    margin: offset,
    paddingHorizontal: offset,
    borderColor: '#111111',
    borderWidth: 1,
  },
  buttonText: {
    marginLeft: offset,
    fontSize: offset,
  },
  button:{
    width:200,
    marginTop: 10,
  },
  container:{
    flex:1,
    alignItems: 'center',
    padding:10,
  }
});

export default login;
