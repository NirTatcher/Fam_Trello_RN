import React from 'react'
import { View, Text, Button,TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function loginPage({navigation}) {
    return (
        <View style={{height:'100%',backgroundColor:'#491c0b'}}>
                                <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        // style={classes.Wrapper}
      >
            <Text>LOGIN</Text>
            <TouchableOpacity style={{backgroundColor:'red'}} onPress={()=>navigation.navigate("Board")}>
                <Text>MOVE TO BOARD</Text>
            </TouchableOpacity>
      {/* <Text style={{margin:35}}>      <Button  title="MOVE TO BOARD W DRAWERS" onPress={()=>navigation.navigate("BoardDrawer")}/></Text> */}
      </LinearGradient>
        </View>
    )
}
