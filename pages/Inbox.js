import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions ,Alert } from 'react-native'
import { EvilIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dialog } from 'react-native-paper';


const styles = StyleSheet.create({
    msg_cont: {
        width: Dimensions.get("window").width * 0.9,
        height: 50,
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "center",
        padding: 5,
        backgroundColor: "#eae4e9",
        margin: 5,
        borderRadius: 5

    },
    title: {
        fontSize: 40
    },
    icon_con: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
    , icon: {
        margin: 5,
        padding: 7,
    }
})

export default function Inbox() {
    const server = "http://ruppinmobile.tempdomain.co.il/site09/"
    const [users2Approve, setUsers2Approve] = useState(["user1", "user2", "user3"]);
    const [show_dialog,setShowDialog] = useState(false)
    useEffect(() => {
        GetUnApprovedMembers();
    }, [])

    async function GetUnApprovedMembers() {
        let ID = "cohen222"
        let url_get_unapproved = "http://ruppinmobile.tempdomain.co.il/site09/api/Family/GetUnApproved/" + ID;
        let usr_lst = [];

        await fetch(url_get_unapproved, {
            method: "GET"
        }).then(res => {
            if (res.status == 200)
                return Promise.resolve(res.json())
            else if (res.status == 204)
                return Promise.reject("No users to Approve")
            else
                return Promise.reject(res.statusText)
        }).then(data => {
            usr_lst = data;
            console.log(data);
        }).catch(ex => {
            console.log("ex =" + ex);
        })

        if (usr_lst != undefined && usr_lst.length > 0) {
            setUsers2Approve(usr_lst)
        }
    }

    async function MemberApproval(username) {
        let member = {
            "fam_ID": "cohen222",
            "username": "Test445"
        }

        let url_set_approval = server + "api/Family/approve"


        await fetch(url_set_approval, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            }),
            body: JSON.stringify(member)
        }).then(res => {
            if (res.status < 202)
                return Promise.resolve(res.json())
            else 
                return Promise.reject(new Error(res.statusText))
        }).then(body => {
            console.log("Success  - " + body);
        }).catch(ex => {
            console.log("Catch " + ex);
        })


    }

    async function MemberRemoval(username) {
        let member = {
            "fam_ID": "cohen222",
            "username": "Test445"
        }
        let url_delete_member = server + "api/Family/" + member.fam_ID + "/" + member.username;

        await fetch(url_set_approval, {
            method: 'DELETE',
            headers: new Headers({
                'Accept': 'application/json; charset=utf8',
                'Content-Type': 'application/json; charset=utf8',
            }),
            body: JSON.stringify(member)
        }).then(res => {
            if (res.status < 202)
                return Promise.resolve(res.json())
            else 
                return Promise.reject(new Error(res.statusText))
        }).then(body => {
            console.log("Success  - " + body);
        }).catch(ex => {
            console.log("Catch " + ex);
        })

    }


    return (
        <SafeAreaView>
            <Text style={styles.title}>Inbox</Text>
            {users2Approve.map(usr => (
                <View style={styles.msg_cont}>
                    <Text>Approve {usr}?</Text>
                    <View style={styles.icon_con}>
                        <Icon
                            name="plus"
                            size={20}
                            color="green"
                            style={styles.icon}
                            onPress={()=>{MemberApproval(usr)}}
                        />
                        <Icon
                            name="times"
                            size={20}
                            color="black"
                            style={styles.icon}
                            onPress={()=>{Alert.alert("Remove member","are you sure?",[
                                {text:"Cancel",
                                onPress:()=>console.log("cancel"),
                                style:"cancel"
                            },{
                                text:"OK",
                                onPress:()=>MemberRemoval(usr)
                            }
                            ])}}
                        />

                    </View>

                </View>

            ))}
        </SafeAreaView>
    )
}