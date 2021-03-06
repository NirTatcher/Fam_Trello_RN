import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ToastAndroid, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Touchable, Keyboard, Pressable,Platform } from 'react-native'
import { TextInput, Dialog } from 'react-native-paper'
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntIcon from 'react-native-vector-icons/Entypo';
import { Input } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';
import {SafeAreaView} from 'react-native-safe-area-context';



const classes = StyleSheet.create(
    {
        Wrapper: {
            height: '100%',
            fontFamily: 'Inter_400Regular',
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
            alignSelf: "center",
            width: Dimensions.get("window").width,
            // backgroundColor:"#b7b7a4"
        }
        , inner_warpper: {
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.9,
            alignSelf: 'center',
            //            backgroundColor:"red",
            borderRadius: 10,

        },
        container: {
            borderRadius: 10
        },
        // title: {
        //     alignSelf: "center",
        //     fontSize: 40,
        //     margin: 20,
        //     fontFamily: 'Inter_900Black',
        //     marginTop: 20,

        // },
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
            alignSelf: 'center'
        },
        Btn: {
            backgroundColor:"#eae4e9",
            marginTop:20,
            borderStyle:"solid",
            borderWidth:0.5,
            margin: 5,
            borderRadius: 7,
            borderTopRightRadius: 10,
            borderBottomWidth: 3,
            borderBottomColor: "#3D5467",
        },
        BtbText: {
            alignSelf:"center",
            padding: 7,
            fontSize: 20,
            fontFamily: 'Inter_500Medium'
        },
        back_btn_cont: { flexDirection: "row", alignItems: "center" ,justifyContent:"center"},
        back_btn_txt: { color: "#264653", fontSize: 15 },
        header: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", alignItems: "stretch", marginTop: 15,marginBottom:20 },
        title: { fontFamily: 'Inter_900Black', fontSize: 40,color:"#0a9396"},


    }
)


export default function registerPage({ navigation }) {
    const [username, setUsername] = useState("david22");
    const [password, setPass] = useState("");
    const [re_pass, setRePass] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setfirst_name] = useState('')
    const [age, setAge] = useState("")
    const [reg_succ,setRegSucc] = useState(true);
    const [errors, setErrors] = useState({ username: "", password: "", re_pass: "", email: "", age: "" })


    const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular })

    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);



    function ValidateFields(){
        let user = {
            username:username,
            password:password,
            first_name:first_name,
            age:age,
            email:email,
            age:age,
        };
        for (let [key, value] of Object.entries(errors)) {
            if (value != "") {
                console.log(key + " : " + value);
                ToastAndroid.show(value, ToastAndroid.LONG)
                return false;
            }
        }
        for (let [key, value] of Object.entries(user)) {
            if (value == "") {
                Alert.alert("Please fill " + key.toString());
                return false;
            }
        }

        return user;
    }
    async function SendForm() {


        let user = ValidateFields();
        if(user == false){ return;}
           

        let url_post_user = "http://ruppinmobile.tempdomain.co.il/site09/api/User/";

        await fetch(url_post_user, {
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
                    return Promise.reject(new Error(res.statusText));
                }
                else {
                    return Promise.resolve(res.json())
                }
            }
        ).then((res)=>{
            Alert.alert("Registartion Completed.")
            setRegSucc(true)
        }).catch((er)=>{
            setRegSucc(false)
            console.log(er);  
        })


        if(reg_succ){

            navigation.navigate('RegisterFamily',{user:user});
        }else{
            ToastAndroid.show("username taken OR invalid details")
        }


    }

    const ErrHandler = useCallback((field) => {
        let err = errors;        
        switch (field) {
            case 'username':
                if (username.length < 4) {
                    console.log("username length");
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
                    {
                        if(err.re_pass == err.password){
                            err.re_pass=""
                        }
                        err.password = "";}
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
                console.log(e.length);
                
                if (e.length < 2) {
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
    )


    if (!fontsLoaded) {
        return <AppLoading />
    }
    else {


        return (
            <SafeAreaView style={{ fontFamily: 'Inter_400Regular' }}>
                <View style={classes.Wrapper}>
                    <Button
                        title="RegisterFam page"
                        onPress={() => { navigation.navigate("RegisterFamily",{user:{
                            username:"ellll5"
                        }}) }}/>
                    <ScrollView onPress={Keyboard.dismiss} accessible={false} >
                        <View style={classes.header}>
                            <Text style={classes.title}>Join FamTrello</Text>
                            <Pressable
                                onPress={() => { navigation.navigate("Board") }}
                                style={classes.back_btn_cont}>
                                <Text style={classes.back_btn_txt}></Text>
                                <FontAwesome.Button
                                    style={{ padding: 0 }}
                                    backgroundColor="transparent"
                                    color="#264653"
                                    name="chevron-right"
                                    size={30}

                                />
                            </Pressable>
                        </View>

                        <View style={classes.inner_warpper}>
                            <View style={classes.inputWrapper}>

                                <Input
                                    containerStyle={{ borderColor: "black", shadowColor: "black" }}
                                    inputStyle={{ color: "black", textShadowColor: "black" }}
                                    label="Enter Username"
                                    labelStyle={{ color: "black" }}
                                    errorStyle={{ color: "red" }}
                                    errorMessage={errors.username}
                                    placeholder='Username'
                                    onChangeText={setUsername}
                                    onEndEditing={(e) => ErrHandler('username')}
                                />
                                <Input
                                    label="Enter Name"
                                    labelStyle={{ color: "black" }}
                                    errorStyle={{ color: "red" }}
                                    errorMessage={errors.name}
                                    placeholder='Name'
                                    onChangeText={setfirst_name}
                                    onEndEditing={(e) => ErrHandler('first_name')}
                                />
                                <Input
                                    label="Enter Password"
                                    labelStyle={{ color: "black" }}
                                    errorStyle={{ color: "red" }}
                                    errorMessage={errors.password}
                                    placeholder='Password'
                                    secureTextEntry={true}
                                    onChangeText={setPass}
                                    onEndEditing={(e) => ErrHandler('password')}
                                />
                                <Input

                                    label="Re-Enter Password"
                                    labelStyle={{ color: "black" }}
                                    errorStyle={{ color: "red" }}
                                    errorMessage={errors.re_pass}
                                    placeholder='re-Password'
                                    secureTextEntry={true}
                                    onChangeText={setRePass}
                                    onEndEditing={(e) => ErrHandler('re_pass')}
                                />
                                <Input
                                    label="Enter Email"
                                    labelStyle={{ color: "black" }}
                                    errorStyle={{ color: "red" }}
                                    errorMessage={errors.email}
                                    placeholder='Email'
                                    onChangeText={setEmail}
                                    onEndEditing={(e) => ErrHandler('email')}
                                />
                                <View
                                >
                                    <Text style={{ marginRight: 10, fontSize: 20 }}>Enter Age:</Text>
                                    <TextInput
                                        placeholder="AGE"
                                        style={{ backgroundColor: "transparent" }}
                                        keyboardType='numeric'
                                        onChangeText={setAge}
                                        onEndEditing={(e) => ErrHandler('age')}
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
                </View>
            </SafeAreaView>
        )
    }
}
