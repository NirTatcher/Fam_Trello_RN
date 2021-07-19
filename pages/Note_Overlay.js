import React from 'react'
import { View, Text,StyleSheet, Dimensions } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

const styles= StyleSheet.create({
    container:{
        height:'30%',
        width:Dimensions.get('window').width*0.8 //קטלני!!!
    }
})
export default function Note_Overlay(props) {
    return (
        <View style={styles.container}>
             
            <Text>Created: {props.note.created}</Text>
            <Text>Title: {props.note.title}</Text>
            <Text>Description: {props.note.text}</Text>
            {/* <Text>Users Tagged: {props.note.users_tagged}</Text> */}

        </View>
    )
}
