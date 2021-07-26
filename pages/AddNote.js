import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { ListItem } from 'react-native-elements/dist/list/ListItem'
import { TextInput } from 'react-native-gesture-handler'

export default function AddNote({ route, navigation }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")


  
    return (
        <View>
            <Text>Create A New Note</Text>
            <TextInput id="title" value={title} onChangeText={(e) => setTitle(e)} placeholder="Title" />
            <TextInput id="text" value={text}  onChangeText={(e) => setText(e)}  placeholder="Description" />


            <Button title="press to add note" onPress={() => {route.params.addingNote(
                { created: new Date(), fam_ID: 'cohen222', title: title, text: text, username: 'david22' }
            )
            navigation.navigate("Board")
            }}></Button>

        </View>
    )
}
