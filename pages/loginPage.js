import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Button, TouchableOpacity, StyleSheet, Pressable, Alert } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Input } from 'react-native-elements';
import { ToastAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_300Light, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import { Dialog } from 'react-native-paper';


export default function loginPage({ navigation }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [fam_list, setFamList] = useState([]);
    const [btn_pressed, setBtnPressed] = useState(false);
    const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_300Light, Inter_200ExtraLight })
    const [loginError, setLoginError] = useState("");
    const [mounted, setMounted] = useState(false)


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
                //ToastAndroid.show("Welcome " + username, ToastAndroid.LONG)
                GetFamList();
                navigation.navigate("SelectFamily", { username: username, fam_list: fam_list });

            }
            else {
                setLoginError("Incorrect password")
            }
        }
        )

    }

    async function GetFamList() {
        let url_get_fam_list = "http://ruppinmobile.tempdomain.co.il/site09/api/User/families/" + username;
        let lst = [];

        await fetch(url_get_fam_list, {
            method: "GET"
        }).then(res => {
            if (res.status == 200)
                return Promise.resolve(res.json())
            else if (res.status == 204)
                return Promise.reject(res.status)
            else
                return Promise.reject(res.statusText)
        }).then(data => {
            lst = data;
            console.log(data);
        }).catch(ex => {
            console.log("ex =" + ex);
            // if (ex == 204) {
            //     Alert.alert("No Family was found", "would you like to create Or join exsiting family?", [
            //         {
            //             text: "cancel",
            //             onPress: () => { navigation.navigate("board", { "username": username, "fam_id": undefined }) }
            //         }, {
            //             text: "OK",
            //             onPress: () => { navigation.navigate("RegisterFamily", username) }
            //         }
            //     ])
            // }

        })

        if (lst != undefined && lst.length > 0) {
            setFamList(lst)
        }
    }

    if (!fontsLoaded)
        return <AppLoading />
    else
        return (
            <SafeAreaView >

                <View style={styles.wrapper}>
                    <View style={styles.inner_wrapper}>
                        <View style={styles.header}>
                            <Text style={styles.title}>FamTrello</Text>
                            <Text style={styles.sub_title}>welcome,please login</Text>

                        </View>
                        <Text>{loginError}</Text>
                        <Input
                            labelStyle={{ color: "black" }}
                            style={styles.input}
                            label="Username"
                            placeholder="enter username"
                            onChangeText={setUsername}
                        />
                        <Input
                            labelStyle={{ color: "black" }}
                            style={styles.input}
                            label="Password"
                            placeholder="enter password"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                    </View>

                    {/* <Pressable
                        style={[(btn_pressed ? { borderBottomWidth: 0, borderRightWidth: 0 } : { borderBottomWidth: 3, borderRightWidth: 2 }), styles.Btn]}

                        onTouchStart={() => setBtnPressed(!btn_pressed)}
                        onTouchEnd={() => { setBtnPressed(!btn_pressed); Login() }}
                    >
                        <Text style={styles.BtnText}>REGISTER</Text>
                    </Pressable> */}
                    <Pressable
                        style={styles.Btn}
                        onPress ={Login}
                    >
                        <Text style={styles.BtnText}>SIGN IN</Text>
                    </Pressable>
                    {/* <Button
                        title="sign in"
                        onPress={Login}
                    />
                    <Button
                    title = "selectfam"
                    onPress={()=>{navigation.navigate("SelectFamily",{username:"mock"})}}
                    /> */}
                    <Pressable
                        onPress={() => { navigation.navigate("Register") }}
                        style={styles.register_btn}>
                        <Text >new member?</Text>
                        <Text style={styles.register_btn_txt}>REGISTER</Text>
                    </Pressable>

                </View>

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
        fontFamily: "Inter_400Regular"
    },
    title: {
        fontSize: 40,
        fontFamily: "Inter_900Black",
        color: "#0a9396"
    },
    sub_title: {
        fontSize: 20,
        marginBottom: 30,
        fontFamily: "Inter_300Light"
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
    picker: {
        borderColor: "black",
        borderWidth: 2,
        margin: 10
    },
    Btn: {
        backgroundColor: "#eae4e9",
        marginTop: 20,
        borderStyle: "solid",
        borderWidth: 0.5,
        margin: 5,
        borderRadius: 7,
        borderTopRightRadius: 10,
        borderBottomWidth: 3,
        borderBottomColor: "#3D5467",
    },
    BtnText: {
        alignSelf: "center",
        padding: 7,
        fontSize: 20,
        fontFamily: "Inter_500Medium"

    }, register_btn: {
        marginTop: 100
    }, register_btn_txt: {
        fontSize: 20,
        color: "#005f73",
        fontFamily: "Inter_500Medium"
    }

})