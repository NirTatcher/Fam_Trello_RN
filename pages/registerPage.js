import React, { useState } from 'react'
import { View, Text, Button,StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import { linear } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';

const classes = StyleSheet.create(
    {
        Wrapper:{
            backgroundColor: '#491c0b',
             height:'100%',
             color: 'white', // <-- The magic
             textAlign: 'center', // <-- The magic
            // height:100
            // backgroundColor: linear('128deg, #491c0b 0%, #b02b26 62%, #d13d1c 100%')
        },
        input:{
            backgroundColor:'transparent',
            // borderColor:'blue'
        
            // color:'green'
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
        },
inputWrapper:{
    backgroundColor:'transparent',
    textAlign: 'center', // <-- The magic
},
Btn:{
  backgroundColor:'red',
  

},
BtnText:{
    color:'blue',
    textAlign:'center'
}


    }
)


export default function registerPage({navigation}) {
    const [username,setUser] = useState("");
    const [password,setPass] = useState("");
    const [rePassword,setRePass] = useState("");

    return (
        <View  style={classes.Wrapper}>
               <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        // style={classes.Wrapper}
      >
            <Text>REGISTER</Text>
           <View style={classes.inputWrapper}>
           <TextInput theme={{colors: {primary: 'green',text:'white', }}} placeholderTextColor='white' onChangeText={setUser} style={classes.input} placeholder="Username"></TextInput>
           </View>
            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{colors: {primary: 'green', underline:'none',underlineColor: 'transparent',text:'white'}}}  onChangeText={setPass} style={classes.input} placeholder="Password"></TextInput>
            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{colors: {primary: 'green', underline:'none',underlineColor: 'transparent',text:'white'}}}  onChangeText={setRePass} style={classes.input} placeholder="Re-Password"></TextInput>
        
            <TouchableOpacity
         style={classes.Btn}
            
            onPress={()=>{
               if(password!==rePassword)
                 {
                    alert("Passwords must match")
                    return
                 }
                 else{
                     alert("Hello "+username + " !")
                    navigation.navigate("Login")

                 }
            }}><Text style={classes.BtnText}>123</Text></TouchableOpacity>
            </LinearGradient>
        </View>
    )
}
