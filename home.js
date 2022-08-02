import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, Button, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity, FlatList, RefreshControl, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

//import { data, thisUser } from './login';
import {thisUser} from './login';

const contacts = []

//const data = {daily: [], acute:[], chronic :[]};



function Home({navigation, route}) {

    const { width, height } = Dimensions.get('window');

    const goals = 
            [
                {key: 'Improve tendon strength/elasticity'},
                {key: 'Relaxed upper body and arm swing'},
                {key: 'Increase stride length'},
            ]   
    
    
    const tableHead = ['Day/Workout', 'Monday', 'Wednesday', 'Friday']
    const tableData = [
              ['Warm Up', 'Cleans', 'Snatch', 'Clean + Jerk'],
              ['Superset 1', 'Squat\nRDL', 'Bench\nPullup', 'Deadlift\nNordic Curls'],
              ['Superset 2', 'Calf Bounds', 'Rows\nLateral Raises', 'Back Extension\nReverse Nordic'],
              ['Cool Down', 'Tibialis Raises', 'Rotator Cuff', 'Calf Raises']
            ]

    /*const pastMonths = () => {
        const week = data.daily.pop()
        console.log(week.length)
        const values = []
        for (let i = 0; i < week.length; i++) {
            values.push(week[i].value)
        }
        return values
    }*/

    return (
        <SafeAreaView style={[styles.container, {flexDirection: "column"}]}>
            <View style={{ flex: 1, justifyContent:'center'}}>
                {/*<Text style = {[styles.text, {color:'orange'}]}>
                    Current Health Status / Workload or reports / goals
                </Text>*/}
                <View style={{ flexDirection:'row', justifyContent:'space-evenly'}}>
                    <View>
                        <TouchableOpacity
                            style={[styles.roundButton1,{borderColor:'limegreen'}]}
                        >
                            <Text>
                                {
                                    //Math.round(data.acwr[data.acwr.length - 1] * 100) / 100
                                    Math.round(global.data.acwr[global.data.acwr.length - 1] * 100) / 100
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text>Goals</Text>
                        <FlatList
                            data={goals}
                            renderItem={({item}) => <Text>{'\u2B24' + ' '}{item.key}</Text>}
                        />
                    </View>
                </View>
            </View>
            <View style={{ 
                flex: 3, 
                padding: 10,
                justifyContent:'center'
                //backgroundColor: "darkorange"
                }}>
                    <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                        <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
                        <Rows data={tableData} textStyle={styles.text}/>
                    </Table>
            </View>
            <View style={{ flex: 3, justifyContent: 'center', alignSelf:'center'}}>
                    <LineChart
                        data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                            /*data: [
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100,
                                Math.random() * 100
                            ]*/
                            data: global.data.acwr.slice(0,6)
                            //data: pastMonths()
                            }
                        ]
                        }}
                        width={Dimensions.get("window").width - 10} // from react-native
                        height={225}
                        //yAxisLabel="$"
                        //yAxisSuffix="k"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                        }}
                        bezier
                        style={{
                        marginVertical: 8,
                        borderRadius: 10
                        }}
                />   
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
    },
    roundButton1: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        borderWidth: 5,
        margin:10
    },
    head: {
        height: 30,
        backgroundColor: '#f1f8ff'
     },
    text: { 
        margin: 5 
    }
});

export {contacts};
export default Home;
