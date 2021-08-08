import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Alert } from 'react-native'
import BadgeStatus from './BadgeStatus'


const styles = StyleSheet.create({
    container: {
        height:150,
        justifyContent: 'space-around',
        alignSelf: 'flex-end',

        width: Dimensions.get('window').width * 0.5, //קטלני!!!


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
export default function Status(props) {
const changeStatus=(e)=>{
    console.log(e)
    ChangeHandler(e)
}
const ChangeHandler=(status)=>{
    Alert.alert("Hold on!", "Are you sure you want change the status to " +status+" ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => {
            props.UpdateStatus(status)
            props.close()} }
      ]);
      return true;
    
}
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>changeStatus("ACTIVE")}>
                <BadgeStatus status={"ACTIVE"} />
            </TouchableOpacity>

<TouchableOpacity onPress={()=>changeStatus("PENDING")}>

            <BadgeStatus status={"PENDING"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>changeStatus("COMPLETED")}>
                <BadgeStatus status={"COMPLETED"} />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>changeStatus("DELETED")}>
                <BadgeStatus status={"DELETED"} />
            </TouchableOpacity>


        </View>
    )
}
