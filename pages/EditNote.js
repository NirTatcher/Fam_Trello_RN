import React, { useState,useEffect } from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

export default function EditNote({route,navigation}) {
    const [title,setTitle] = useState("")
    const [text, setText] = useState("")
    const [users_tagged, setUser] = useState("")
useEffect(() => {
    
    let note = route.params.note
    setTitle(note.title)
    setText(note.text)


    // return () => {
        
    // }
}, [])
    return (
        <View>
           
                <TextInput value={title} onChangeText={(e)=>setTitle(e)}/>
                <TextInput value={text} onChangeText={(e)=>setText(e)}/>
            
        </View>
    )
}
