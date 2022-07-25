import React, { useLayoutEffect, useState, useRef } from 'react';
import { StyleSheet, Pressable, Text, View, SafeAreaView, TextInput, TouchableOpacity, Modal,Animated, PanResponder} from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
//import { getAuth, signOut } from "firebase/auth";
//import { auth } from './Firebase';


function settings({navigation}) {
    const [properties, setProperty] = useState([
        { name: 'Name', id: '1'},
        { name: 'Email', id: '2'},
        { name: 'Notifications', id: '3'},
    ]);

    //const [username, onChangeUsername] = React.useState(auth.currentUser.displayName);
    //const [email, onChangeEmail] = React.useState(auth.currentUser.email);
    const [username, onChangeUsername] = React.useState('joe');
    const [email, onChangeEmail] = React.useState('auth.currentUser.email');
    const [text, onChangeText] = React.useState("123-456-789");
    
    
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

    const alert = (s) => {
        if (s) {
          return <MaterialIcons name='circle' size={50} color="slateblue"></MaterialIcons>;
        } else {
          return <MaterialIcons name='circle' size={50} color="black"></MaterialIcons>;
        }
    }

    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = useRef(
        PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([
            null,
            { dx: pan.x, dy: pan.y }
        ]),
        onPanResponderRelease: () => {
            Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        }
        })
    ).current;


    return (
        <SafeAreaView style={styles.container}>
            <View style={{flex:2}}>
                    <View style={styles.item}>
                            <Animated.View
                                style={{
                                transform: [{ translateX: pan.x }, { translateY: pan.y }]
                                }}
                                {...panResponder.panHandlers}
                            >
                            <TouchableOpacity
                                    style={[{alignSelf: 'stretch'}]}
                            //onPress={signOut}
                            onPress={() => {
                                setModalVisible(true)     
                            }}
                            >
                                    <MaterialIcons name='circle' size={150} color="slateblue"></MaterialIcons>
                            </TouchableOpacity>
                            </Animated.View>
                            <View>
                                <TouchableOpacity
                                        style={[{alignSelf: 'stretch'}]}
                                //onPress={signOut}
                                onPress={() => {
                                    setModalVisible(true)     
                                }}
                                >
                                        <MaterialIcons name='circle' size={150} color="slateblue"></MaterialIcons>
                                </TouchableOpacity>
                            </View>
                            
                    </View>
                    {/*<View style={[styles.item]}>
                        <TouchableOpacity
                            style={[{justifyContent: "center" }, {alignItems: "center" }]}
                            //onPress={signOut}
                            onPress={() => {
                                setModalVisible(true)     
                            }}
                            >
                            <MaterialIcons name='circle' size={150} color="slateblue"></MaterialIcons>
                        </TouchableOpacity>
                    </View>*/}
            </View>
            <View style={[{ flexDirection: "column" }, {flex:6}]}>
                <View style={[ {padding:15}]}>
                    <Text>
                        Username
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUsername}
                        value={username}
                        clearButtonMode={true}
                        //placeholderTextColor='red'
                    />       
                </View>
                <View style={[{padding:15}]}>
                    <Text>
                        Email
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        value={email}
                        clearButtonMode={true}
                    />       
                </View>
                <View style={[{padding:15}]}>
                    <Text>
                        Phone Number
                    </Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={text}
                        clearButtonMode={true}
                        keyboardType='numeric'
                    />       
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                        >
                            <Text style={styles.textStyle}>Change Picture</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={signOut}
                        >
                            <Text style={styles.textStyle}>Sign Out</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    /*container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight:0
      //alignItems: 'center',
      //justifyContent: 'center',
    },*/
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    text:{
        paddingTop:5,
        paddingLeft:5,
        fontSize: 20,
        fontFamily:'Helvetica',
        //color:'white'
    },
    input:{
        paddingTop:5,
        paddingLeft:5,
        fontSize: 25,
        borderWidth:1,
        fontFamily:'Helvetica',
        //color:'white'
    },
    buttonOpen: {
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
    loginText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
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

export default settings;