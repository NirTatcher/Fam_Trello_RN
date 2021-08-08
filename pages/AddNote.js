import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, CheckBox, Dimensions } from 'react-native'
import { Button } from 'react-native-elements/dist/buttons/Button'
import { ListItem } from 'react-native-elements/dist/list/ListItem'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'


const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'

    },
    headline: {
        flexGrow: 1,
        marginTop: 50
    },
    btnWrapper: {

        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        flexGrow: 1,
        width: '60%'
        , justifyContent: 'space-around',
        marginTop: 15

    },
    inputs: {
        flexGrow: 4,
        backgroundColor: '#d9e6f2',
        marginTop: 20,
        justifyContent: 'space-around',
        width: '100%'
    },
    btnDone: {
        backgroundColor: 'green',
        width: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: 5
    },
    btnCancel: {
        backgroundColor: 'red',
        width: 30,
        height: 30,
        justifyContent: 'center',
        borderRadius: 5,
    },
    input: {
        height: '15%',

        borderWidth: 1
    },
    largeText: {
        height: '30%',

        borderWidth: 1
    }

})

export default function AddNote({ route, navigation }) {
    const [title, setTitle] = useState("")
    const [text, setText] = useState("")
    const [famMembers, setFamMembers] = useState([])
    const [famMembersSelected, setSelectMembers] = useState([]);
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        fetchFamUsers()
        let selected = []
        for (let index = 0; index < famMembers.length; index++) {
            const member = famMembers[index];
            selected.push(false);

        }
        setSelectMembers(selected)
    }, [])
    const fetchFamUsers = () => {
        fetch("http://ruppinmobile.tempdomain.co.il/site09/api/Family/members/cohen222", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8',
            })

        }).then(
            res => {

                if (res.ok)
                    return res.json()
                else
                    return () => { throw 'Oops something went wrong with the fam members you are trying to bring from db..' }
                //  func1(res)
            }
        ).then(
            (result) => {
                // setFamNotes(result)
                console.log(result)
                setFamMembers(result)

            },
            (err) => {
                Alert.alert("", err)

            }
        )
    }
    const changeSelected = async (index) => {
        console.log(index)
        let selected = famMembersSelected;
        selected[index] = !famMembersSelected[index]
        console.log(selected[index])
        await setSelectMembers([...selected])
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.headline}>Create A New Note</Text>
                <View style={styles.inputs}>
                    <TextInput style={styles.input} id="title" value={title} onChangeText={(e) => setTitle(e)} placeholder="Title" />
                    <TextInput style={styles.largeText} id="text" value={text} onChangeText={(e) => setText(e)} placeholder="Description" />
                    <View>
                        {console.log(famMembersSelected)}
                        <Text>Tag A User</Text>
                        <TouchableOpacity onPress={()=>setVisible(!visible)}><Text>+</Text></TouchableOpacity>
                        {visible&&famMembers.map((member, index) =>
                            <View key={member.username} style={{ flexDirection: 'row', alignItems: 'center' }} >
                                {console.log(famMembersSelected[index])}
                                <CheckBox value={famMembersSelected[index]} onValueChange={() => changeSelected(index)} />
                                <Text>{member.first_name}</Text>
                            </View>
                        )}
                    </View>
                </View>
                {/* <Button title="press to add note" onPress={() => {
                route.params.add(
                    { created: new Date(), fam_ID: 'cohen222', title: title, text: text, username: 'david22' }
                )
                navigation.navigate("Drawer")
            }}></Button> */}
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.btnDone} onPress={() => {
                        let users = []
                        famMembersSelected.map((member, i) => {
                            if (member)
                                users.push({id:632,user:famMembers[i].username})
                        })
                        route.params.addNote(
                            { created: new Date(), fam_ID: 'cohen222', title: title, text: text, username: 'david22' }, users
                        )
                        navigation.navigate("Drawer")
                    }}>
                        <Icon
                            name="done"
                            color="white"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnCancel} onPress={() => {
                        navigation.navigate("Drawer")
                    }}>
                        <Icon
                            name="cancel"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
//api/Note/tagged/" send tagged users - arr from body ex.[{note_ID:503,username:"Eldad22"},{note_ID:503,username:"david22"}]