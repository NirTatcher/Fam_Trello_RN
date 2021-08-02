import React, { useState, useEffect } from 'react'
import { ToastAndroid, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Touchable, Keyboard, Pressable, } from 'react-native'
import { Checkbox, TextInput } from 'react-native-paper'
import { linear } from 'react-native/Libraries/Animated/src/Easing'
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-elements';
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';

export default function RegisterFamily({ route, navigation }) {
    const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight })
    const [fam_member_data, setFamMemberData] = useState({ fam_ID: "", name: "" });
    const [fam_ID, setFamID] = useState("");
    const [family_name, setFamilyName] = useState("");

    const [got_family, setGotFamily] = useState(false);
    const [errros, setErrors] = useState({ err_ID: "", err_name: "" })

    async function JoinFamily() {
        let err = errros;
        if (fam_ID == "") {
            err.err_ID = "ID cannot be empty."
            setErrors(err);
            return;
        }
        else {
            err.err_ID = ""
            setErrors(err)
        }

        let url_get_fam = "http://ruppinmobile.tempdomain.co.il/site09/api/Family/";
        let user = route.params.user;
        setFamMemberData({
            fam_ID,
            username: user.username,
            role:0
        })


        await fetch(url_get_fam, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            }),
            body: JSON.stringify(fam_member_data)
        }).then(res => {
            if (res.status > 202)
                return res.json()
            else {
                console.log(res.toString);
                return;
            }
        }).then(body => {
            console.log(body);
            setFamData(body)
        }).catch(ex=>{console.log(ex);})
    }

    
    async function Addfamily() {
        let err = errros;
        if (fam_ID == "") {
            err.err_ID = "ID cannot be empty."
            setErrors(err);
            return;
        }
        else {
            err.err_ID = ""
            setErrors(err)
        }

        if(family_name == "")
        {
            err.err_name = "Family name cannot be empty."
            setErrors(err);
            return;
        }
        else{
            err.err_name ="";
            setErrors(err)
        }
        let url_get_fam = "http://ruppinmobile.tempdomain.co.il/site09/api/Family/";
        let fam = {
            fam_ID,
            family_name
        }

        
        await fetch(url_get_fam, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            }),
            body: JSON.stringify(fam)
        }).then(res => {
            if (res.status > 202)
                return res.json()
            else {
                console.log(res.toString);
                return;
            }
        }).then(body => {
            console.log(body);
        })
    }

    if (!fontsLoaded)
        return <AppLoading />
    else
        return (
            <SafeAreaView style={styles.main}>
                <View style={styles.wrapper}>
                    <View style={styles.header}>
                            <Text style={styles.title}>Join A Family</Text>
                        <Pressable 
                        onPress={() => { navigation.navigate("Board") }}
                        style={styles.skip_btn_cont}>
                            <Text style={styles.skip_btn_txt}>SKIP</Text>
                            <FontAwesome.Button
                                style={{padding:0}}
                                backgroundColor="transparent"
                                color="#264653"
                                name="chevron-right"
                                size={30}
                                
                            />
                        </Pressable>
                        <Text style={styles.sub_title}>Choose to Create a Family OR join Existing one</Text>
                    </View>

                    <View style={styles.input_wrapper}>

                        <Input
                            label="Enter Family ID"
                            placeholder="Family ID"
                            errorMessage={errros.err_ID}
                            onChangeText={setFamID}
                            labelStyle={{ color: "black" }}
                        />
                        <View style={styles.chk_box}>
                            <Checkbox
                                status={got_family ? "unchecked" : "checked"}
                                onPress={() => { setGotFamily(!got_family) }}
                            />
                            <Text style={styles.chk_box_text}>CREATE A FAMILY</Text>
                        </View>
                        <Input
                            disabled={got_family}
                            label="Enter Family name"
                            placeholder="Family name"
                            placeholderTextColor="grey"
                            errorMessage={errros.err_name}
                            labelStyle={got_family ? { color: "grey" } : { color: "black" }}
                            onChangeText={setFamilyName}
                        />
                        <FontAwesome.Button
                            style={styles.join_btn}
                            backgroundColor="#2a9d8f"
                            onPress={got_family ? JoinFamily : Addfamily}
                        >
                            JOIN
                        </FontAwesome.Button>
                    </View>

                </View>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    main: { fontFamily: 'Inter_400Regular' },
    header: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", alignItems: "stretch", marginTop: 15 },
    title: { fontFamily: 'Inter_900Black', fontSize: 40 },
    sub_title: { fontFamily: 'Inter_400Regular', fontSize: 14, color: "#264653", padding: 5 },
    skip_btn_cont: { flexDirection: "row", alignItems: "center" ,justifyContent:"center"},
    skip_btn_txt: { color: "#264653", fontSize: 15 },
    chk_box: { flexDirection: "row", alignItems: "center" },
    input_wrapper: { width: Dimensions.get("window").width * 0.9, alignSelf: "center", marginTop: 25 },
    join_btn: { color: "#1a759f", alignSelf: "center" },
})