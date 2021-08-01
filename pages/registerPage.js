import React, { useState, useEffect } from 'react'
import { ToastAndroid, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Touchable, Keyboard, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { linear } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-elements';
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntIcon from 'react-native-vector-icons/Entypo';
import { Input } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
  } from 'react-native-safe-area-context';


const classes = StyleSheet.create(
    {
        Wrapper: {
            height: '100%',
            fontFamily:'Inter_400Regular',
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
            alignSelf:"center",
            width: Dimensions.get("window").width,
            backgroundColor:"#b7b7a4"
        }
        , inner_warpper: {
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.9,
            alignSelf: 'center',
//            backgroundColor:"red",
            borderRadius:10,
           
        },
        container: {
            borderRadius: 10
        },
        title: {
            alignSelf: "center",
            fontSize: 40,
            margin: 20,
            fontFamily: 'Inter_900Black',
            marginTop:20
        },
        // input: {
        //     backgroundColor: 'transparent',
        //     color: 'black', // <-- The magic
        //     textAlign: 'auto', // <-- The magic
        //     width: Dimensions.get("window").width * 0.35,
        //     margin: 2,
        //     padding:4,
        //     alignSelf: "center"
        // },
        inputWrapper: {
            flexDirection: "column",
            textAlign: 'center', // <-- The magic
            width: Dimensions.get("window").width * 0.7,
            flexWrap: "nowrap",
            borderRadius: 10,
            alignSelf:'center'
        },
        Btn: {
            margin: 5,
            backgroundColor: '#b5d6d6',
            borderRadius: 7,
            borderRightColor: "#3D5467",
            borderRightWidth: 2,
            borderTopRightRadius: 10,
            borderBottomWidth: 3,
            borderBottomColor: "#3D5467"
        },
        BtbText: {
            padding: 7,
            fontSize: 20,
            fontFamily: 'Inter_500Medium'
        }


    }
)


export default function registerPage({ navigation }) {
    const [username, setUsername] = useState("david22");
    const [password, setPass] = useState("");
    const [re_pass, setRePass] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setfirst_name] = useState('')
    const [age, setAge] = useState("")
    const [fam_ID, setFamID] = useState('');
    const [has_family, setHasFamily] = useState(false)
    const [errors, setErrors] = useState({ username: "", password: "", re_pass: "", email: "", age: "" })

    const [user, SetUser] = useState('');
    const [family, setFamily] = useState('');
    const [fontsLoaded] = useFonts({ Inter_900Black,Inter_500Medium,Inter_400Regular })

    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    async function SendForm() {



        let user = {
            username,
            password,
            first_name,
            age,
            email,
            age
        };
        for (let [key, value] of Object.entries(errors)) {
            if (value != "") {
                console.log(key + " : " + value);
                ToastAndroid.show(value, ToastAndroid.LONG)
                return;
            }
        }
        for (let [key, value] of Object.entries(user)) {
            if (value == "") {
                Alert.alert("Please fill " + key.toString());
                return;
            }
        }

        let url_get_user = "http://ruppinmobile.tempdomain.co.il/site09/api/User/";

        await fetch(url_get_user, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            })
            , body: JSON.stringify(user)

        }).then(
            res => {

                console.log(res.status)//true
                if (res.status !== 201) {
                    Alert.alert("we might have a problem.." + res.status);
                    return;
                }
                else {
                    Alert.alert("Registartion Completed.")
                    navigation.navigate("Login");
                }
                return res.json();
            }
        )

    }

    const ErrHandler = (field) => {
        let err = errors;
        switch (field) {
            case 'username':
                if (username.length < 4) {
                    err.username = "Username must contain at least 4 letters.";
                }
                else if (username.match(/\d+/g) === null) {
                    err.username = "Username must containe at least 1 digit.";
                }
                else
                    err.username = "";
                break;
            case 'password':
                if (password.length < 5) {
                    err.password = "Password must containe at least 6 digits.";
                }
                else
                    err.password = "";
                break;
            case 're_pass':
                if (re_pass != password) {
                    err.re_pass = "passwords dont match"
                    setRePass("");
                }
                else
                    err.re_pass = "";
            case 'email':
                let e = email.split('@');
                if (e.count < 2) {
                    err.email = "Invalid Email.";
                }
                else err.email = "";
                break;
            case 'age':
                if (age < 0 || age > 110) {
                    console.log("err age " + age);
                    err.age = "invalid age";
                }
                else err.age = ""
                break;
        }
        setErrors(err);
    }

    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {


        return (
            <SafeAreaView style={{fontFamily:'Inter_400Regular'}}>
                <View style={classes.Wrapper}>
                    {/* <LinearGradient
                        end={{ x: 0.7, y: 1 }}
                        locations={[0.8, 1]}
                        colors={['rgb(131, 197, 190)', 'rgb(248, 249, 250)']} // Background Linear Gradient
                    > */}
                        <ScrollView onPress={Keyboard.dismiss} accessible={false} >
                            <Text style={classes.title}>Welcome</Text>
                            <View style={classes.inner_warpper}>
                                <View style={classes.inputWrapper}>

                                    <Input
                                        containerStyle={{ borderColor: "black", shadowColor: "black" }}
                                        inputStyle={{ color: "black", textShadowColor: "black" }}
                                        leftIcon={
                                            <EntIcon
                                                name='user'
                                                size={20}
                                                color='black'
                                            />
                                        }
                                        label="Username"
                                        labelStyle={{ color: "black" }}
                                        errorStyle={{ color: "red" }}
                                        errorMessage={errors.username}
                                        placeholder='Username'
                                        onChangeText={setUsername}
                                        onBlur={(e) => ErrHandler('username')}
                                    />
                                    <Input
                                        leftIcon={
                                            <EntIcon
                                                name='info'
                                                size={20}
                                                color='black'
                                            />
                                        }
                                        label="Name"
                                        labelStyle={{ color: "black" }}
                                        errorStyle={{ color: "red" }}
                                        errorMessage={errors.name}
                                        placeholder='Name'
                                        onChangeText={setfirst_name}
                                        onBlur={(e) => ErrHandler('first_name')}
                                    />
                                    <Input
                                        leftIcon={
                                            <EntIcon
                                                name='lock'
                                                size={20}
                                                color='black'
                                            />
                                        }
                                        label="Password"
                                        labelStyle={{ color: "black" }}
                                        errorStyle={{ color: "red" }}
                                        errorMessage={errors.password}
                                        placeholder='Password'
                                        secureTextEntry={true}
                                        onChangeText={setPass}
                                        onBlur={(e) => ErrHandler('password')}
                                    />
                                    <Input
                                        leftIcon={
                                            <EntIcon
                                                name='lock-open'
                                                size={20}
                                                color='black'
                                            />
                                        }
                                        label="Re-Password"
                                        labelStyle={{ color: "black" }}
                                        errorStyle={{ color: "red" }}
                                        errorMessage={errors.re_pass}
                                        placeholder='re-Password'
                                        secureTextEntry={true}
                                        onChangeText={setRePass}
                                        onBlur={(e) => ErrHandler('re_pass')}
                                    />
                                    <Input
                                        leftIcon={
                                            <EntIcon
                                                name='email'
                                                size={20}
                                                color='black'
                                            />
                                        }
                                        label="Email"
                                        labelStyle={{ color: "black" }}
                                        errorStyle={{ color: "red" }}
                                        errorMessage={errors.email}
                                        placeholder='Email'
                                        onChangeText={setEmail}
                                        onBlur={(e) => ErrHandler('email')}
                                    />
                                    <View
                                        style={{ width: Dimensions.get("window").width * 0.8, justifyContent: "flex-start", alignItems: "center", flexDirection: "row" }}>
                                        <Text style={{ marginRight: 10, fontSize: 20 }}>Enter Age:</Text>
                                        <TextInput

                                            keyboardType='numeric'
                                            onChangeText={setAge}
                                            onBlur={(e) => ErrHandler('age')}
                                        />
                                    </View>
                                    <Pressable
                                        style={classes.Btn}
                                        onPress={SendForm}
                                    >
                                        <Text style={classes.BtbText}>REGISTER</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </ScrollView>
                    {/* </LinearGradient> */}
                </View>
            </SafeAreaView>
    )
    }
}
