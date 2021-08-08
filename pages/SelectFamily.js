import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions, Alert, Pressable, TouchableNativeFeedback, Button } from 'react-native'
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_300Light, Inter_200ExtraLight } from '@expo-google-fonts/inter';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Dialog } from 'react-native-paper';
import AppLoading from 'expo-app-loading';


const styles = StyleSheet.create({
    msg_cont: {
        width: Dimensions.get("window").width * 0.9,
        height: 50,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        padding: 5,
        backgroundColor: "grey",
        margin: 5,
        borderRadius: 5

    },
    title: {
        fontSize: 40
    },
    btn: {
        borderLeftWidth: 10,
        width: Dimensions.get("window").width * 0.8,
        borderBottomWidth: 10,
        marginBottom: 5,
        backgroundColor: "grey",
        alignSelf: "center",

    },
    btn_txt: {
        padding: 10,
        fontFamily: "Inter_500Medium",
        fontSize: 50,
        color: "pink"
    }

})

export default function SelectFamily({ route, navigation }) {
    const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_300Light, Inter_200ExtraLight })

    const server = "http://ruppinmobile.tempdomain.co.il/site09/"
    const [fam_lst, setFamList] = useState();
    const [username, setUsername] = useState();

    useEffect(() => {
        // (async () => {
        //     setUsername(route.params.username)

        //     GetFamilies()
        // })
        setUsername(route.params.username)
        setFamList(route.params.fam_list)
        console.log(route.params.fam_list)

    }, [])

    async function GetFamilies() {
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
            console.log(ex);


        })

        if (lst != undefined && lst.length > 0) {
            setFamList(lst)
        }
    }
    if (!fontsLoaded)
        return <AppLoading />
    else if (fam_lst == undefined)
        return (
        <Pressable
        onPress={()=>{navigation.navigate("RegisterFamily",{user:{
            username:username
        }})}}
        style={styles.btn}>
                <Text style={styles.btn_txt}>Create Or Join</Text>
        </Pressable>
        )
    else
        return (
            <SafeAreaView>
                <Text style={styles.title}></Text>
                {fam_lst.map(fam => (
                    <Pressable
                        key={fam}
                        onPress={() => { navigation.navigate('Board', { "username": username, "fam_ID": fam }) }}
                        style={styles.btn}>
                        <Text style={styles.btn_txt}>{fam}</Text>
                    </Pressable >

                ))}
            </SafeAreaView>
        )
}