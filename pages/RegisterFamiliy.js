import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ToastAndroid, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, Touchable, Keyboard, Pressable, Platform } from 'react-native'
import { Checkbox, TextInput } from 'react-native-paper'
import { Switch } from 'react-native-elements';
import { I18nManager } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome } from '@expo/vector-icons';
import { Input } from 'react-native-elements';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { log } from 'react-native-reanimated';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function RegisterFamily({ route, navigation }) {
    // const [perm_final_status, setPermFinalStatus]
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight })
    const [fam_ID, setFamID] = useState("");
    const [family_name, setFamilyName] = useState("");

    const [create_family, setCreatetFamily] = useState(false);
    const [errors, setErrors] = useState({ err_fam_ID: "", err_name: "" })


    useEffect(() => {

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
        console.log(expoPushToken);

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }


    const ErrHandler = useCallback(() => {
        let temp_err = errors;

        console.log(fam_ID.split(/\d+/g));
        if (fam_ID == "") {
            temp_err.err_fam_ID = "ID cannot be empty."
            setErrors(temp_err);
            return false;
        }
        else if (fam_ID.length < 2) {
            temp_err.err_fam_ID = "ID to short.";
            return false;
        }
        else if (fam_ID.match(/\d+/g) === null) {
            temp_err.err_fam_ID = "ID must containe at least 1 digit.";
            return false;
        }
        else {
            temp_err.err_fam_ID = ""

        }

        if (create_family) {

            if (family_name == "") {
                temp_err.err_name = "Family name cannot be empty."
                setErrors(temp_err);
                return false;
            }
            else {
                temp_err.err_name = "";
            }
        }
        setErrors(temp_err)
        return true;

    })

    async function SendForm() {
        if (!ErrHandler()) {
            ToastAndroid.show("Pleass fix errors", ToastAndroid.SHORT)
            return;
        }

        let url_add_fam = "http://ruppinmobile.tempdomain.co.il/site09/api/Family/";
        let url_add_fam_local = "http://localhost:53832/api/Family/"
        let url_add_member = "http://ruppinmobile.tempdomain.co.il/site09/api/Family/member";

        let isAdmin = 0;
        let isApproved = 0;
        let create_success = true;

        //let user = route.params.user;
        let name = family_name;
        let fam = {
            "fam_ID": fam_ID,
            "name": name
        }

        if (create_family) {
            isAdmin = 1;
            isApproved = 1;

            await fetch(url_add_fam, {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json; charset=utf8',
                    'Content-Type': 'application/json; charset=utf8',
                }),
                body: JSON.stringify(fam)
            }).then(res => {
                if (res.status < 202)
                    return Promise.resolve(res.json())
                else {
                    ToastAndroid.show("CREATE FAM SomeThing went wrong.." + r, ToastAndroid.LONG)
                    return Promise.reject(new Error(res.statusText))
                }
            }).then(body => {
                console.log(body);
            }).catch(ex => {
                console.log("CATCH FAM MEM - " + ex);
                create_success = false;
            })

        }
        if (!create_success) {
            ToastAndroid.show("Family name not avilable", ToastAndroid.LONG)
            return;
        }
        let username = "Test445";

        let member = {
            "fam_ID": fam_ID,
            "username": username,
            "role": "",
            "isAdmin": isAdmin,
            "isApproved": isApproved,
            "push_token": expoPushToken
        }

        console.log(member);

        await fetch(url_add_member, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            }),
            body: JSON.stringify(member)
        }).then(res => {
            if (res.status < 202) {
                return Promise.resolve(res.json())
            }
            else {
                ToastAndroid.show("SomeThing went wrong..ADD MEMBER" + res.statusText, ToastAndroid.LONG)
                return Promise.reject(new Error(res.statusText))
            }

        }).then(body => {
            console.log("Success  - " + body);
            RequestAdminPermmision()
            //navigation.navigate('Board', member)
        }).catch(ex => {
            console.log("Catch " + ex);
        })

    }

    async function RequestAdminPermmision() {

        let mock_id = "cohen222"
        let url_get_fam_members = "http://ruppinmobile.tempdomain.co.il/site09/api/Family/GetAdminsTokens/" + mock_id;
        let mem_arr = undefined;

        await fetch(url_get_fam_members, {
            method: 'GET'
        }).then((res) => {
            console.log(res.status);

            if (res.status < 204)
                return Promise.resolve(res.json())
            else
                return Promise.reject(new Error(res.statusText))
        }
        ).then(res => {
            console.log("res " + res);

            mem_arr = res;
        }).catch(ex => {
            console.log("catch" + ex);
        })


        if (mem_arr != undefined) {
            for (let index = 0; index < mem_arr.length; index++) {
                const t = mem_arr[index];
                if (t.length > 4) {

                }

            }
        }

    }

    async function PushNotification() {
        let push_url = "https://exp.host/--/api/v2/push/send"
        await fetch(push_url, {
            method: 'POST',
            headers:{}
            
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
                                style={{ padding: 0 }}
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
                            errorMessage={errors.err_fam_ID}
                            onChangeText={setFamID}
                            labelStyle={{ color: "black" }}
                        />
                        <View style={styles.chk_box}>
                            <Checkbox
                                status={create_family ? "checked" : "unchecked"}
                                onPress={() => { setCreatetFamily(!create_family) }}
                            />
                            <Text style={styles.chk_box_text}>CREATE A FAMILY</Text>
                        </View>
                        <Input
                            disabled={!create_family}
                            label="Enter Family name"
                            placeholder="Family name"
                            placeholderTextColor="grey"
                            errorMessage={errors.err_name}
                            labelStyle={!create_family ? { color: "grey" } : { color: "black" }}
                            onChangeText={setFamilyName}
                        />
                        <Text
                            style={styles.txt_err_server}
                        >error</Text>
                        <FontAwesome.Button
                            style={styles.join_btn}
                            backgroundColor="#2a9d8f"
                            onPress={SendForm}
                        >
                            JOIN
                        </FontAwesome.Button>
                    </View>

                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                    }}>
                    <Text>Your expo push token: {expoPushToken}</Text>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Title: {notification && notification.request.content.title} </Text>
                        <Text>Body: {notification && notification.request.content.body}</Text>
                        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                    </View>
                    <Button
                        title="Press to schedule a notification"
                        onPress={async () => {
                            await schedulePushNotification();
                        }}
                    />
                </View>
                <Button
                    onPress={RequestAdminPermmision}
                    title="RequestAdminPermmision"
                ></Button>
            </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    main: { fontFamily: 'Inter_400Regular' },
    header: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", alignItems: "stretch", marginTop: 15 },
    title: { fontFamily: 'Inter_900Black', fontSize: 40 },
    sub_title: { fontFamily: 'Inter_400Regular', fontSize: 14, color: "#264653", padding: 5 },
    skip_btn_cont: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    skip_btn_txt: { color: "#264653", fontSize: 15 },
    chk_box: { flexDirection: "row", alignItems: "center" },
    input_wrapper: { width: Dimensions.get("window").width * 0.9, alignSelf: "center", marginTop: 25 },
    join_btn: { color: "#1a759f", alignSelf: "center" },
})