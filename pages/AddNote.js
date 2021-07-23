import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'

export default function AddNote({route,navigation}) {

    
    return (
        <View>
            <Text>addddd</Text>
            <Button title="press to add note" onPress={()=>route.params.addingNote(
                {created:new Date(),fam_ID:'cohen222',title:'222',text:'3333',username:'david22'}
            )}></Button>
        
        </View>
    )
}
