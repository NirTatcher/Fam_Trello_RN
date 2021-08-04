import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Badge, withBadge } from 'react-native-elements'
export default function BadgeStatus(props) {
    const [statusKinds]=useState([ "ACTIVE" ,"PENDING", "COMPLETED", "DELETED"])
    if(props.status === 0)
    return (
        <View>
            
            <Badge status="success" value="succes"/>
        </View>
    )
    else return(
        <View>
            
        <Badge status="warning" value="succes"/>
    </View>

    )
}
