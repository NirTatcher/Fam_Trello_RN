import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Touchable, Keyboard } from 'react-native'
import { TextInput } from 'react-native-paper'
import { linear } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-elements';
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { error } from 'jquery';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


const classes = StyleSheet.create(
    {
        Wrapper: {
            height: '100%',
            color: 'white', // <-- The magic
            textAlign: 'center', // <-- The magic
        }
        , inner_warpper: {
            width: Dimensions.get("window").width * 0.8,
            height: Dimensions.get("window").height,
            alignSelf: 'center',


        },
        container: {
            backgroundColor: "grey",
            borderRadius: 10
        },
        title: {
            fontSize: 25,
            marginBottom: 40
        },
        input: {
            backgroundColor: 'transparent',
            color: 'black', // <-- The magic
            textAlign: 'auto', // <-- The magic
            width: Dimensions.get("window").width * 0.35,
            margin: 2,
            alignSelf: "center"
        },
        inputWrapper: {
            flexDirection: "row",
            backgroundColor: 'rgba(181, 214, 214,0.3)',
            textAlign: 'center', // <-- The magic
            width: Dimensions.get("window").width * 0.8,
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            borderRadius: 10
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
    const [errors,setErrors]=useState({usernmae:true,password:true,re_padd:true})

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
            first_name,
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

    const handleErrors = (err)=> {
       switch(err.id){}
    }

    return (
        <View>
            <View style={classes.Wrapper}>
                <LinearGradient
                    end={{ x: 0.4, y: 0.9 }}
                    locations={[0.1, 0.97]}
                    colors={['rgb(240, 101, 67)', 'rgb(238, 148, 128)']} // Background Linear Gradient
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
                    <Text style={classes.title}>Welcome,</Text>
                    <View style={classes.inner_warpper}>
                        <View style={classes.inputWrapper}>
                            <Input
                                col
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={20}
                                        color='black'
                                    />
                                }
                                label="Username"
                                labelStyle={{color:"black"}}
                                errorStyle={{ color: 'red' }}
                                errorMessage={(!errors.password?"INVALID PASSWORD":"")}
                                placeholder='Username'
                                onChangeText={setUsername}
                                onBlur={()=>console.log("blur")}
                            />
                            {/* <Text style={classes.input}>enter username</Text>
                            <TextInput style={classes.input} onChangeText={setUsername}></TextInput>
                            <Text style={classes.input}>enter password</Text>
                            <TextInput style={classes.input} ></TextInput> */}
                            <Button
                                style={classes.input}
                                color="rgb(131, 128, 182)"
                                title="register"
                                onPress={()=>console.log("b")} />
                        </View>



                    </View>
                    </TouchableWithoutFeedback>
                </LinearGradient>
            </View>
        </View>
    )
}
{/* <View style={classes.inputWrapper}>
                            <TextInput theme={{ colors: { primary: 'green', text: 'white', } }} placeholderTextColor='white' onChangeText={setUsername} style={classes.input} placeholder="Username"></TextInput>
                            <TextInput secureTextEntry={true} placeholderTextColor='white' theme={{ colors: { primary: 'green', underline: 'none', underlineColor: 'transparent', text: 'white' } }} onChangeText={setFisrtName} style={classes.input} placeholder="Name"></TextInput>
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