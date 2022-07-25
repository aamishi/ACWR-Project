import React, { useLayoutEffect, useState, useRef} from 'react';
import { StyleSheet, Pressable, Text, View, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Dimensions} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHeaderHeight } from "@react-navigation/elements";
//import { Header } from 'react-navigation-stack';
//import { Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import CircleSlider from "react-native-circle-slider";
//import CircleSlider from "react-native-circle-slider";
//import { getAuth, signOut } from "firebase/auth";
//import { auth } from './Firebase';
import {db} from "./Firebase";
import {collection, addDoc, query, where, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore"; 
//import { addMetaSchema } from 'eslint/lib/util/ajv';


function report({navigation}) {
    
    const [properties, setProperty] = useState([
        { name: 'Name', id: '1'},
        { name: 'Email', id: '2'},
        { name: 'Notifications', id: '3'},
    ]);

    //const [username, onChangeUsername] = React.useState(auth.currentUser.displayName);
    //const [email, onChangeEmail] = React.useState(auth.currentUser.email);
    const [desc, onChangeDesc] = React.useState('What did I do today...');
    const [comm, onChangeComm] = React.useState('What did I notice...');
    const [goal, onChangeGoal] = React.useState("I hope to...");
    const [slide, onSlide] = React.useState(0.5);
    const [time, onChangeTime] = React.useState(0);

    const data = {daily: [], acute:[], chronic :[]};
    
    
    const [modalVisible, setModalVisible] = useState(false);
    const [mAlert, showmAlert] = useState(false);
    const icon = 'star-border'
    const col = 'red'

    useLayoutEffect(() => {
       navigation.setOptions({
           headerRight:()=> (
               <AntDesign name = "logout" size = {24}
                color = 'black'/>
           )
       })
    })
    const signOut = () =>{
        auth.signOut().then(() => {
            navigation.replace('Login')
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }


    const submit = () =>{
        //setDoc(doc(db, "cities", "new-city-id"), data);
        //db.collection('users').a
        setDoc(doc(db, "users", 'joe'), {
            name: "Tokyo",
            country: "Japan"
        });
      //console.log("Document written with ID: ", docRef.id);
        /*db.collection("users").doc("LA").set({
            name: "Los Angeles",
            //state: "CA",
            //country: "USA"
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });*/
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            jsonValue != null ? JSON.parse(jsonValue) : null;
            //console.log(JSON.parse(jsonValue).acute)
            data.acute = JSON.parse(jsonValue).acute
            data.chronic = JSON.parse(jsonValue).chronic
            data.daily = JSON.parse(jsonValue).daily
            //return jsonValue
            updateDaily()
            
            //data.daily.push(slide)
            storeData(data)
            //storeData({daily: [], acute:[], chronic :[]})
        } catch(e) {
          // error reading value
        }
    }

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@storage_Key', jsonValue)
          console.log(jsonValue)
        } catch (e) {
          // saving error
        }
    }

    const updateDaily = () => {
        const len = data.daily.length
        if (len == 0 ) {
            data.daily.push([slide])
        }
        else{
            const week = data.daily[len-1]
            //console.log(week)
            if (week.length < 7) {
                data.daily[len-1].push(slide)
            }
            else{
                updateAcute(data.daily[len-1])
                data.daily.push([slide])
            }
        }
    }

    const updateAcute = (array) => {
        //const sum = array.reduce((partialSum, a) => partialSum + a, 0);
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        data.acute.push(sum/7)
    }

    const alert = (s) => {
        if (s) {
          return <MaterialIcons name='circle' size={50} color="slateblue"></MaterialIcons>;
        } else {
          return <MaterialIcons name='circle' size={50} color="black"></MaterialIcons>;
        }
    }
    return (
        <SafeAreaView style={[styles.container, {flexDirection: "column"}]}>
            <KeyboardAvoidingView
            keyboardVerticalOffset = {100}
            behavior='position'
            //behavior={Platform.OS === "ios" ? "padding" : "height"}
            //style={styles.container}
            style={{flexDirection: "column", alignItems: 'center'}}
            >
                <TouchableWithoutFeedback
                   onPress={Keyboard.dismiss}
                >
                    <View  style={{flex: 1}}>
                        <View style={{ flex: 3}}>
                            <View style={[{flex: 1, flexDirection: "row", justifyContent: "space-around"}]}>
                                <Text style = {[styles.text]}>
                                    Current Status: 0.9
                                </Text>
                                <Text style = {[styles.text]}>
                                    Weekly Target: 1.2
                                </Text>
                            </View>
                            <View style={{flex: 8, alignItems: 'center'}}>
                                {/*<Text style = {[styles.text]}>
                                    Up Next?: Competiton Tuesday 
                                </Text>*/}
                                <Text style = {[styles.text]}>
                                    {Math.round((slide+Number.EPSILON)*100)/100} 
                                </Text>
                                <Slider
                                    style={{width: 200}}
                                    minimumValue={0}
                                    maximumValue={1}
                                    step = {0.1}
                                    value = {0.5}
                                    minimumTrackTintColor="red"
                                    maximumTrackTintColor="limegreen"
                                    onValueChange={onSlide}
                                    tapToSeek
                                    //thumbTintColor = 'dodgerblue'
                                />
                                <CircleSlider
                                    dialRadius={60}
                                    btnRadius={20}
                                    textSize={15}
                                    strokeWidth={5}
                                    meterColor={'dodgerblue'}
                                    strokeColor={'#e1e1e1'}
                                    max={360} />
                            </View>
                        </View>
                        <View style={{flex: 5, flexDirection: "column",
                                            justifyContent:'space-evenly',
                                            paddingHorizontal: 10}}>
                                    <Text style = {[styles.boxtitle]}>
                                        Description 
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        //multiline = {true}
                                        //numberOfLines={3}
                                        onChangeText={onChangeDesc}
                                        value={desc}
                                        //maxLength={5}
                                        //clearButtonMode={true}
                                        //placeholderTextColor='red'
                                    />       
                                    <Text>
                                        Comments
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeComm}
                                        value={comm}
                                        clearButtonMode={true}
                                    />       
                                    <Text>
                                        Goals
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={onChangeGoal}
                                        value={goal}
                                        clearButtonMode={true}
                                        //keyboardType='numeric'
                                    />     
                            </View>
                        <View style={{ flex: 0.5, justifyContent:"flex-end"}}>
                            <TouchableOpacity
                                style={[{ opacity: 1 }, {backgroundColor: 'dodgerblue', height:40, marginHorizontal:10}]}
                                    //onPress={() => {
                                    //    setModalVisible(true)     
                                    //    }}
                                //onPress = {submit}
                                onPress = {() => getData()}
                                //onPress = {() => storeData({acute:[slide], chronic: []})}

                            >
                                {/*<MaterialIcons name='access-time' size={50} color='orange'></MaterialIcons>*/}
                                <Text style = {[styles.buttonText]}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 10,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    buttonText:{
        color:'white',
        fontSize: 25,
        textAlign: 'center',
        margin:5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    text:{
        margin:5,
        //padding:5,
        //paddingLeft:5,
        fontSize: 15,
        fontFamily:'Helvetica',
        textAlign: 'center'
        //color:'white'
    },
    input:{
        paddingTop:5,
        paddingLeft:5,
        marginBottom: 20,
        fontSize: 15,
        borderWidth:1,
        fontFamily:'Helvetica',
        height:50
        //color:'white'
    },
    boxtitle:{
        marginTop: 10
    },    
    button: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "deeppink",
        margin: 5,
        padding:5,
        alignSelf: 'stretch'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    item: {
        flex: 1,
        marginHorizontal: 10,
        //marginTop: 5,
        padding: 15,
        //backgroundColor: 'slateblue',
        //fontSize: 50,
        borderBottomColor:"grey",
        borderBottomWidth:0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    profileIcon: {
        marginRight: 25,
        marginLeft: 25,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: 'white',
        //borderRadius:10,
        //borderWidth: 1,
        //borderColor: '#fff'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        //flexDirection: 'row'
    },
    docIcon: {
        //marginRight:5,
        //marginLeft: 5,
        marginTop: 24,
        //marginBottom:5,
        paddingTop: 15,
        //paddingBottom:5,
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        //borderRadius:10,
        //borderWidth: 1,
        //borderColor: '#fff'
    },
    titleText: {
        fontSize: 14,
        lineHeight: 24,
        fontWeight: "bold"
      },
    box: {
        height: 150,
        width: 150,
        backgroundColor: "blue",
        borderRadius: 5
    }
});

export default report;