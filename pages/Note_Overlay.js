import React from 'react'
import Styles from '../style'
import { View, Text,StyleSheet, Dimensions } from 'react-native'
import { Card,ListItem, Avatar } from 'react-native-elements'

const styles= StyleSheet.create({
    container:{
        height:'30%',
        width:Dimensions.get('window').width*0.8, //קטלני!!!
        
        
    },
    title:{
        fontWeight:"bold",
        color:"black",
        textDecorationLine:"underline",
        fontSize:20
    },
    title_area:{
       flexDirection:"column",
       alignItems:"center",
       marginBottom:10
    },
    text_area:{
        borderRadius:5,
        backgroundColor:"rgb(241, 242, 238)",
        height:100,
        borderWidth:2,
        borderColor:"rgb(191, 183, 182)"
        
    },
    date:{
        fontSize:10,
        
    }
    

})
export default function Note_Overlay(props) {
    return (
        <View style={styles.container}>
             
            <View style={styles.title_area}>
                <Text style={styles.title}>{props.note.title}</Text>
                <Text style={styles.date}>{new Date(props.note.created).toDateString()}</Text>
            </View>
            <View style={styles.text_area}>
                <Text>{props.note.text}</Text>
            </View>
            {/* <Text>Users Tagged: {props.note.users_tagged}</Text> */}

        </View>
    )
}
