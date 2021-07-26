import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Touchable, Keyboard, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { linear } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-elements';
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntIcon from 'react-native-vector-icons/Entypo';
import { Input } from 'react-native-elements';
import { error } from 'jquery';
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
            height: Dimensions.get("window").height*0.9,
            alignSelf: 'center',

        },
        container: {
            borderRadius: 10
        },
        title: {
            alignSelf:"center",
            fontSize: 25,
            margin: 30,
            fontFamily:"sans-serif-condensed"
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
            margin:5,
            backgroundColor:'#b5d6d6',
            borderRadius:7,
            borderRightColor:"#3D5467",
            borderRightWidth:2,
            borderTopRightRadius:10,
            borderBottomWidth:3,
            borderBottomColor:"#3D5467"
        },
        BtbText:{
            padding:7,
            fontSize:20,
            fontFamily:'notoserif'
        }


    }
)


export default function registerPage({ navigation }) {
    const [username, setUsername] = useState("david22");
    const [password, setPass] = useState("");
    const [rePassword, setRePass] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState('')
    const [age, setAge] = useState(2)
    const [fam_ID, setFamID] = useState('');
    const [has_family, setHasFamily] = useState(false)
    const [errors, setErrors] = useState({ username: "", password: "", re_pass: "" })

    const [user, SetUser] = useState('');
    const [family, setFamily] = useState('');

    I18nManager.allowRTL(false);
    I18nManager.forceRTL(false);

    useEffect(() => {
        console.log(username);
    }, [username])
    async function SendForm() {

        // if()

        let user = {
            username,
            password,
            name,
            age,
            fam_ID,
        };

        let url_get_user = "http://ruppinmobile.tempdomain.co.il/site09/api/User/" + user.username;

        await fetch(url_get_user, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8',
            })

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
        console.log(field);
        switch (field) {
            case 'username':
                if (username.length < 4) {
                    setErrors({ username: "Username must be at least 4 letter." })
                    return;
                }
                else if (username.match(/\d+/g) === null) {
                    setErrors({ username: "Username must contain at least 1 digit." })
                    return;
                }
                else
                    setErrors({ username: "" })
                break;
            case 'password':
                console.log(errors.password);
                if (password.length < 6)
                    setErrors({ password: "Password must containe at least 6 digits." })
                else
                    setErrors({ password: "" })
                return;


            // username.length < 4?setErrors({username:"Username must be aleast 4 letter."}):setErrors({username:""})   
            // username.match(/\d+/g) === null?setErrors({username:"Username must contain at least 1 digit."}):setErrors({username:""})


        }
    }

    return (
        <View>
            <View style={classes.Wrapper}>
                <LinearGradient
                    end={{ x: 0.0, y: 0.7 }}
                    locations={[0.1, 0.8]}
                    colors={['rgb(131, 197, 190)', 'rgb(248, 249, 250)']} // Background Linear Gradient
                >
                    <ScrollView onPress={Keyboard.dismiss} accessible={false} >
                        <Text style={classes.title}>Welcome,</Text>
                        <View style={classes.inner_warpper}>
                            <View style={classes.inputWrapper}>

                                <Input
                                    containerStyle={{borderColor:"black",shadowColor:"black"}}
                                    inputStyle={{color:"black",textShadowColor:"black"}}
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
                                    onChangeText={setName}
                                    onBlur={(e) => ErrHandler('name')}
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
                                style={{width:Dimensions.get("window").width*0.8,justifyContent:"flex-start",alignItems:"center",flexDirection:"row"}}>
                                    <Text style={{marginRight:10,fontSize:20}}>Enter Age:</Text>
                                    <TextInput
                                    
                                    keyboardType = 'numeric'
                                    onChangeText={setAge}
                                />
                                </View>
                                <Pressable
                                style={classes.Btn}
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
{/* <View style={classes.inputWrapper}>
                            <TextInput theme={{ colors: { primary: 'green', text: 'white', } }} placeholderTextColor='white' onChangeText={setUsername} style={classes.input} placeholder="Username"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setName} style={classes.input} placeholder="Name"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'black', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setPass} style={classes.input} placeholder="Password"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setRePass} style={classes.input} placeholder="Re-Password"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setAge} style={classes.input} placeholder="Age"></TextInput>
                        </View> */}
{/* <View style={{flexDirection: "row", justifyContent: "flex-end" }}>
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
                        </View> */}
{/* <TouchableOpacity
                            onPress ={()=>console.log(ValidateUser())}
                            style={classes.Btn}>

                            <Text style={classes.BtnText}>123</Text>
                        </TouchableOpacity> */}