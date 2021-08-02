import React from 'react'
import { View, Text } from 'react-native'

export default function AllNotes({props,route,navigation}) {
    return (
        <View>
            <Text>All Notes</Text>
            {console.log(route.params.note)}
            {/* <Text>{route.params}</Text> */}
        </View>
    )
}
