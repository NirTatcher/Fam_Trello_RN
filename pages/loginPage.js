import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { ToastAndroid } from 'react-native';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
  } from 'react-native-safe-area-context';


export default function loginPage({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [btn_pressed,setBtnPressed] = useState(false);

    

    const [loginError, setLoginError] = useState("");


    async function Login() {
        let url_get_user = "http://ruppinmobile.tempdomain.co.il/site09/api/User/" + username;
        setLoginError("")

        await fetch(url_get_user, {
            method: "GET",
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            })
        }).then(res => {
            if (res.status == 200)
                return res.json();
            else
                setLoginError("Invalid User OR password")
            return;
        }).then(res => {
            console.log(res);
            if (res.password == password) {
                ToastAndroid.show("Welcome " + username, ToastAndroid.LONG)
                navigation.navigate("Board",res);
            }
            else {
                setLoginError("Incorrect password")
            }
        }
        )

    }
    return (
        <SafeAreaView >
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
            >
                <View style={styles.wrapper}>
                    <View style={styles.inner_wrapper}>
                        <Text style={styles.header}>LOGIN</Text>
                        <Text>{loginError}</Text>
                        <Input
                            style={styles.input}
                            label="Username"
                            placeholder="enter username"
                            onChangeText={setUsername}
                        />
                        <Input
                            style={styles.input}
                            label="Password"
                            placeholder="enter password"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                    </View>
                    <Pressable
                        style={[(btn_pressed?{borderBottomWidth: 0,borderRightWidth: 0}:{borderBottomWidth: 3,borderRightWidth: 2}),styles.Btn]}
                        
                        onTouchStart={()=>setBtnPressed(!btn_pressed)}
                        onTouchEnd={()=>{setBtnPressed(!btn_pressed);Login()}}
                    >
                        <Text style={styles.BtnText}>REGISTER</Text>
                    </Pressable>

                </View>


            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 4,
        alignSelf: "center",
        height: Dimensions.get("window").height * 0.9,
        width: Dimensions.get("window").width * 0.9,
        color: 'white',
        textAlign: 'center',
        borderRadius: 5,
        borderColor: "#6b705c",
        borderWidth: 2
    },
    header: {
        fontSize: 40,
        marginBottom: 30
    },
    inner_wrapper: {
        justifyContent: "center"
    }
    ,
    input: {
        alignSelf: "center",
        width: 200,
        margin: 5
    },
    Btn: {
        margin: 5,
        backgroundColor: '#b5d6d6',
        borderRadius: 7,
        borderRightColor: "#3D5467",
        borderTopRightRadius: 10,
        borderBottomColor: "#3D5467"
    },
    BtnText: {
        textAlign:'center',
        padding: 7,
        fontSize: 20,
        fontFamily: 'notoserif'
    }

})