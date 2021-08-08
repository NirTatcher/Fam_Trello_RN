import React, { useState } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { Badge, withBadge } from 'react-native-elements'


const styles = StyleSheet.create({
    badge: {
        width: '90%',
      height:30

    },


})

export default function BadgeStatus(props) {
    const [statusKinds]=useState([ "ACTIVE" ,"PENDING", "COMPLETED", "DELETED"])

    // <Badge status="success" value="ACTIVE" />
    // <Badge status="error" value="DELETED" />
    // <Badge status="primary" value="DONE" />
    // <Badge status="warning" value="PENDING" />
    if(props.status === "ACTIVE")
    return (
        <View>
            
            <Badge badgeStyle={styles.badge} status="success" value="ACTIVE" />
        </View>
    )
    else if(props.status === "PENDING")
    return(
        <Badge badgeStyle={styles.badge} status="warning" value="PENDING" />
    )
    else if(props.status === "COMPLETED")
    return(
           <Badge badgeStyle={styles.badge} status="primary" value="COMPLETED" />
    )
    else
     (props.status === "DELETED")
    return(
        <Badge badgeStyle={styles.badge} status="error" value="DELETED" />
    )
}
