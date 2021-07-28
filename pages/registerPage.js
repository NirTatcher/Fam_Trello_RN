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


const classes = StyleSheet.create(
    {
        Wrapper: {
            height: '100%',
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
        }
        , inner_warpper: {
            width: Dimensions.get("window").width * 0.9,
            height: Dimensions.get("window").height * 0.9,
            alignSelf: 'center',

        },
        container: {
            borderRadius: 10
        },
        title: {
            alignSelf: "center",
            fontSize: 25,
            margin: 30,
            fontFamily: "sans-serif-condensed"
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
            flexDirection: "row",
            textAlign: 'center', // <-- The magic
            width: Dimensions.get("window").width * 0.9,
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            borderRadius: 10
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
            fontFamily: 'notoserif'
        }


    }
)


export default function registerPage({ navigation }) {
    const [username, setUsername] = useState("david22");
    const [password, setPass] = useState("");
    const [re_pass, setRePass] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setfirst_name] = useState('')
    const [age, setAge] = useState(2)
    const [fam_ID, setFamID] = useState('');
    const [has_family, setHasFamily] = useState(false)
    const [errors, setErrors] = useState({ username: "", password: "", re_pass: "", email: "", age: ""})

    const [user, SetUser] = useState('');
    const [family, setFamily] = useState('');

    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    async function SendForm() {
        

        for (let [key, value] of Object.entries(errors)) {
            if(value != ""){
                console.log(key+" : " +value);
                ToastAndroid.show(value,ToastAndroid.LONG)
                return;
            }
        }
        
        let user = {
            username,
            password,
            first_name,
            age,
            email
        };

        let url_get_user = "http://ruppinmobile.tempdomain.co.il/site09/api/User/";

        await fetch(url_get_user, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            })
            , body: JSON.stringify()

        }).then(
            res => {
                console.log(res.status)//true
                if (res.status !== 200) {
                    console.log("we might have a problem.." + res.status);
                    return;
                }
                return res.json();
            }
        )

        return user;

    }

    const ErrHandler = (field) => {
        let err = errors;
        switch (field) {
            case 'username':
                if (username.length < 5) {
                    err.username = "Username must be at least 4 letter.";
                }
                else if (username.match(/\d+/g) === null) {
                    err.username = "Username must contain at least 1 digit.";
                }
                else
                    err.username = "";
                break;
            case 'password':
                if (password.length < 6) {
                    err.password = "Password must containe at least 6 digits.";
                }
                else
                    err.password = "";
                break;
            case 're_pass':
                if (re_pass != password) {
                    err.re_pass = "passwords dont match"
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
                if (!(age > 0 && age > 110)) {
                    err.age = "invalid age";
                }
                else err.age = ""
                break;
        }
        setErrors(err);
    }

    return (
        <View>
            <View style={classes.Wrapper}>
                <LinearGradient
                    end={{ x: 0.7, y: 1 }}
                    locations={[0.8, 1]}
                    colors={['rgb(131, 197, 190)', 'rgb(248, 249, 250)']} // Background Linear Gradient
                >
                    <ScrollView onPress={Keyboard.dismiss} accessible={false} >
                        <Text style={classes.title}>Welcome,</Text>
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
                                    secureTextEntry={true}
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
                </LinearGradient>
            </View>
        </View>
    )
}
// const ErrHandler = (field) => {
//     console.log(field);
//     setErrors({isOK:true})
//     switch (field) {
//         case 'username':
//             if (username.length < 4) {
//                 setErrors(prev=>{ username: "Username must be at least 4 letter.",isOK:false })
//             }
//             else if (username.match(/\d+/g) === null) {
//                 setErrors(errors,{ username: "Username must contain at least 1 digit.",isOK:false })  
//             }
//             else
//                 setErrors(errors,{ username: ""})
//             break;
//         case 'password':
//             password.length < 6?setErrors(errors,{ password: "Password must containe at least 6 digits.",isOK:false }):setErrors(errors,{ password: "" })
//             break;
//         case 're_pass':
//             re_pass != password?setErrors(errors,{re_pass:"passwords dont match",isOK:false}):setErrors(errors,{re_pass:""})
//         case 'email':
//             e = email.split('@');
//             e.count < 2 ? setErrors(errors,{email:"Invalid Email.",isOK:false}):setErrors(errors,{email:""})
//             break;
//         case 'age':
//             !(age > 0 && age > 110)?setErrors(errors,{age:"invalid age",isOK:false}):setErrors(errors,{age:""})
//             break;
//     }
// }