import React, { useState } from 'react'
import { View, Text,CheckBox } from 'react-native'

export default function MyCheckBox(props) {
    const [isSelected,setSelected] = useState(false)

    const func=()=>{
        setSelected(!isSelected)
        props.func(props.name,!isSelected)
    }
    return (
        <View>
            <Text>{props.name}</Text>
            <CheckBox value={isSelected} onValueChange={func}/> 
        </View>
    )
}
