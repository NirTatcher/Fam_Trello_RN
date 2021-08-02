import React, { useState, useEffect } from 'react'
import { View, Text,BackHandler,Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function EditNote({ route, navigation }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [users_tagged, setUser] = useState("")
    const [isLeaving, setLeaving] = useState('none')
    useEffect(() => {

        let note = route.params.note
        setTitle(note.title)
        setText(note.text)
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
              {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
              },
              { text: "YES", onPress: () => navigation.goBack() }
            ]);
            return true;
          };
          const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
          );

        return () => {
            backHandler.remove();
        }
    }, [])
    return (
        <View>

            <TextInput value={title} onChangeText={(e) => setTitle(e)} />
            <TextInput value={text} onChangeText={(e) => setText(e)} />

        </View>
    )
}
