import React, { useState,useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Touchable, TouchableOpacity } from 'react-native'
import { Card, ListItem, Avatar } from 'react-native-elements'
import BadgeStatus from './BadgeStatus'
import Status from './Status'
import { Button, Overlay, Icon } from 'react-native-elements';
const styles = StyleSheet.create({
    container: {
        height: '30%',
        width: Dimensions.get('window').width * 0.8, //קטלני!!!


    },
    title: {
        fontWeight: "bold",
        color: "black",
        textDecorationLine: "underline",
        fontSize: 20
    },
    title_area: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 10
    },
    text_area: {
        borderRadius: 5,
        backgroundColor: "rgb(241, 242, 238)",
        height: 100,
        borderWidth: 2,
        borderColor: "rgb(191, 183, 182)"

    },
    date: {
        fontSize: 10,

    }


})
export default function Note_Overlay(props) {
    const [visible, setVisible] = useState(false)
    const [status,setStatus]=useState(undefined);

    useEffect(() => {
       setStatus(props.note?.status)
       
    }, [])
    const toggleOverlay = () => {

        setVisible(!visible);
    }
    return (
        <View style={styles.container}>
            {/* {console.log(props.note)} */}
            <View style={styles.title_area}>
                <Text style={styles.title}>{props.note?.title}</Text>
                
                <Text style={styles.date}>{new Date(props.note?.created).toDateString()}</Text>
                <TouchableOpacity style={{ alignSelf: 'center',width:'80%' }} onPress={() => toggleOverlay()}>
                    <BadgeStatus status={status===undefined?props.note?.status:status} />
                </TouchableOpacity>
           
                <Overlay style={{ position: 'relative' }} isVisible={visible} onBackdropPress={() => toggleOverlay()}>


                    <Status close={toggleOverlay} UpdateStatus={(e)=>{
                        setStatus(e)
                        props.UpdateStatus(e)}}/>

                </Overlay>

            </View>
            <TouchableOpacity onPress={() =>{
                props.toggleOverLayParent()
                props.navigation.navigate("EditNote",{note:props.note,update:(note)=>props.updateNote(note)})}} >
            <View   style={styles.text_area}>
                <Text >{props.note?.text}</Text>
            </View>
            </TouchableOpacity>
            {/* <Text>Users Tagged: {props.note.users_tagged}</Text> */}
        </View>
    )
}
