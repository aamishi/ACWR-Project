import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Button, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, Navigator, Animated, PanResponder, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { PanGestureHandler, State } from 'react-native-gesture-handler';
//import getNodes from './getNodes';
//import useLayout from './useLayout';
//import { vh, vw } from 'react-native-css-vh-vw';
//import Move from "./screens/Move"
//import { auth, db } from './Firebase';
//import { doc, getDoc} from "firebase/firestore";

const contacts = []
const data = {acute:[], chronic :[]};


function Home() {

    const { width, height } = Dimensions.get('window');

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(JSON.parse(jsonValue).acute)
            data.acute = JSON.parse(jsonValue).acute
            data.chronic = JSON.parse(jsonValue).chronic
            return jsonValue
        } catch(e) {
          // error reading value
        }
    }

    const updateData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
            console.log('done')
          } catch (e) {
            // saving error
          }
    }

    const addData = () => {
        try {
            data.chronic.push(100)
            console.log(data.acute)
            console.log(data.chronic)
          } catch (e) {
            // saving error
          }
    }

    return (
        <SafeAreaView style={[styles.container, {flexDirection: "column"}]}>
            <View style={{ flex: 1, backgroundColor: "red" }}>
                <Text style = {[styles.text]}>
                    Current Health Status / Workload or past reports
                </Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "darkorange" }}>
                <Text style = {[styles.text]}>
                    Workout
                </Text>
            </View>
            <View style={{ flex: 3, backgroundColor: "green" }}>
                <Text style = {[styles.text]}>
                    Calendar
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    roundButton1: {
        width: 100,
        height: 100,
        //justifyContent: 'center',
        //alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: 'orange',
    },
    profileIcon: {
        marginRight: 25,
        marginLeft: 25,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        //backgroundColor: 'white',
        //borderRadius:10,
        //borderWidth: 1,
        //borderColor: '#fff'
    },
    fileIcon: {
        marginRight: 25,
        marginLeft: 25,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        //backgroundColor: 'white',
        //borderRadius:10,
        //borderWidth: 1,
        //borderColor: '#fff'
    },
    loginScreenButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#1E6738',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    }
});

export {contacts};
export default Home;
