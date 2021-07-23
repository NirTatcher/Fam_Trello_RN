import React, { useState,useEffect } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'
import { linear } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-elements';
import { I18nManager } from 'react-native';


const classes = StyleSheet.create(
    {
        Wrapper: {
            height: '100%',
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
        }
        , container: {
            width: Dimensions.get("window").width * 0.8,
            height: Dimensions.get("window").height,
            alignSelf: 'center',
        },
        title:{
            fontSize:25,
            marginBottom:40
        },
        input: {
            backgroundColor: 'transparent',
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
            width:Dimensions.get("window").width * 0.35,
            margin:2
        },
        inputWrapper: {
            flexDirection:"row",
            backgroundColor: 'transparent',
            textAlign: 'center', // <-- The magic
            width:Dimensions.get("window").width * 0.8,
            flexWrap:"wrap",
            justifyContent:"space-evenly",
        },
        Btn: {
            backgroundColor: 'red',
        },
        BtnText: {
            color: 'blue',
            textAlign: 'center'
        }
        
    }
)


export default function registerPage({ navigation }) {
    const [username, setUsername] = useState("david22");
    const [password, setPass] = useState("");
    const [rePassword, setRePass] = useState("");
    const [first_name, setFisrtName] = useState('')
    const [age, setAge] = useState(2)
    const [fam_ID, setFamID] = useState('');
    const [has_family, setHasFamily] = useState(false)

    const [user, SetUser] = useState('');
    const [family, setFamily] = useState('');

    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);
    

    async function ValidateUser(){
        
        // if()

        let user = {
            username,
            password,
            first_name,
            age,
            fam_ID,
        };

        let url_get_user = "http://ruppinmobile.tempdomain.co.il/site09/api/Users/hen";
        
        await fetch(url_get_user, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8',
            })

        }).then(
            res => {
                console.log(res.ok)//true
                if(res.status !== 200 ){
                    console.log("we might have a problem.."+res.status);
                    return;
                }
                return res.json();
            }
        )

        return user;
        
    }
    
    function CheckUserAvilable(user){

    }

    return (
        <View>
            <View style={classes.Wrapper}>
                <LinearGradient
                    end={{ x: 0.1, y: 0.9 }}
                    locations={[0.5, 1]}
                    colors={['rgb(226, 149, 120)', 'rgb(71, 49, 68)']} // Background Linear Gradient
                >
                    <View style={classes.container}>
                    <Text style={classes.title}>REGISTER</Text>
                        <View style={classes.inputWrapper}>
                            <TextInput theme={{ colors: { primary: 'green', text: 'white', } }} placeholderTextColor='white' onChangeText={setUsername} style={classes.input} placeholder="Username"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setFisrtName} style={classes.input} placeholder="Name"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'black', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setPass} style={classes.input} placeholder="Password"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setRePass} style={classes.input} placeholder="Re-Password"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setAge} style={classes.input} placeholder="Age"></TextInput>
                        </View>
                        <View style={{flexDirection: "row", justifyContent: "flex-end" }}>
                            <Text>Join to A family?</Text>
                            <Switch
                                // style={{alignSelf:"center"}}
                                onValueChange={() => setHasFamily(!has_family)}
                                value={has_family} />
                        </View>
                        <View style={classes.family_container}>
                            <View style={has_family == true?{display:"flex"}:{display:"none"}} >
                                <TextInput placeholder ="insert family ID"></TextInput>
                            </View>
                            <View></View>
                        </View>
                        <TouchableOpacity
                            onPress ={()=>console.log(ValidateUser())}
                            style={classes.Btn}>

                            <Text style={classes.BtnText}>123</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        </View>
    )
}
