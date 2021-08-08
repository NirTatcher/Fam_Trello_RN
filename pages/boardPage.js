import { useFocusEffect } from '@react-navigation/core'
import React, { createRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import profilePage from './profilePage'
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Avatar } from 'react-native-elements'
import { List } from 'react-native-paper';
import { useState } from 'react';
import { Button, Overlay, Icon } from 'react-native-elements';
import Note_Overlay from './Note_Overlay';
import { Input } from 'react-native-elements/dist/input/Input';
import { log } from 'react-native-reanimated';
import { CheckBox, I18nManager } from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import { Badge, withBadge } from 'react-native-elements'
import { TabRouter } from '@react-navigation/native';
import BadgeStatus from './BadgeStatus';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppLoading from 'expo-app-loading';
// import $, { error } from 'jquery';
const mock_user = {
    username: "Eldad22",
    fam_ID: "cohen222",
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 150,
        height: 150,
        marginTop: 50


    },
    containerNote: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 150,
        height: 150,
        borderRadius: 15,
        marginTop: 30
    },
    noteRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'

    },
    notesWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',

        justifyContent: 'space-evenly',


    },
    Wrapper: {
        height: '100%',
        backgroundColor: '#491c0b',
        // overflow:'scroll'
    }
});

const notes = [
    {
        date: '19/07/2021',
        title: 'Amy Farha',
        text: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        users_tagged: 'Vice President',
    },
    {
        created: '19/07/2021',
        title: 'Chris Jackson',
        text: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        users_tagged: 'Vice Chairman',
    },

]


const func1 = (res) => {
    if (res.ok)
        return res.json()
    // else
    //     throw 'Oops something went wrong with the current user notes you are trying to bring from db..'
}


export default function boardPage({ route, navigation }) {
    const [fam_notes, setFamNotes] = useState([]);
    const [curret_user_notes, setCurrentUserNotes] = useState([])
    const [username, setUser] = useState("david22")
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fam_ID, setFamID] = useState("cohen222");
    const myStatusKinds = ["ACTIVE", "PENDING", "COMPLETED", "DELETED"]
    const statusKinds = ["success", "warning", "primary", "error"]
    const [isSelected, setSelected] = useState([])
    const [isTabVisible, setTabVisible] = useState(false);

    //Pending,Active,Done,All   

    const fetchFamNotes = (urlFamNotes) => {
        fetch(urlFamNotes, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8',
            })

        }).then(
            res => {

                if (res.ok)
                    return res.json()
                // else
                //     return () => { throw 'Oops something went wrong with the fam notes you are trying to bring from db..' }
                //  func1(res)
            }
        ).then(
            (result) => {
                // setFamNotes(result)

                setFamNotes(result)

            },
            (err) => {
                Alert.alert("", err)

            }
        )
    }
    const fetchUsersNotes = (urlCurrentNotes) => {
        fetch(urlCurrentNotes, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json; charset=utf8',
            })

        }).then(
            res => {
                // console.log(res.ok)
                // if(res.ok)
                // return res.json()
                // else
                // throw 'Oops something went wrong with the current user notes you are trying to bring from db..'
                return res.json()

            }
        ).then(
            (result) => {
                // setFamNotes(result)

                setCurrentUserNotes(result)

            },
            (err) => {
                Alert.alert("", err)

            }
        )
    }
    // useEffect(() => {
    //     let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
    //     let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/user/" + username;


    //     // console.log(route.params.type);
    //     fetchFamNotes(urlFamNotes)

    //     fetchUsersNotes(urlCurrentNotes)

    // }, [fam_notes,curret_user_notes])
    useEffect(() => {
        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/user/" + username;


        // console.log(route.params.type);
        fetchFamNotes(urlFamNotes)

        fetchUsersNotes(urlCurrentNotes)

        return () => {
            console.log("clean up");
        }


    }, [])
    const SeeNoteDetails = (note) => {
        alert("You CLicked See Details")
    }


    const addingNote = (note,users) => {


        fetch('http://ruppinmobile.tempdomain.co.il/site09/api/Note/',
            {
                method: 'POST',
                body: JSON.stringify(note),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8'
                })

            }

        ).then(
            res => {

                return res.json()
            }
        ).then(
            (result) => {
                console.log(result);
            },
            (error) =>
                console.log("errrorr")

        )
        
        fetch('http://ruppinmobile.tempdomain.co.il/site09/api/Note/tagged/',
            {
                method: 'POST',
                body: JSON.stringify(users),
                headers: new Headers({
                    'Content-type': 'application/json; charset=UTF-8'
                })

            }

        ).then(
            res => {

                return res.json()
            }
        ).then(
            (result) => {
                console.log(result);
            },
            (error) =>
                console.log("errrorr")

        )
        let notesCurrent = curret_user_notes
        let notesFam = fam_notes
        notesCurrent.push(note)
        notesFam.push(note)
        setCurrentUserNotes(notesCurrent)
        setFamNotes(notesFam)



    }
    useEffect(() => {
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/user/" + username;
        fetchUsersNotes(urlCurrentNotes)

    }, [curret_user_notes])


    useEffect(() => {
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
        fetchFamNotes(urlFamNotes)
    }, [fam_notes])


    const deleteNote = (id) => {
        let url = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/" + id;

        fetch(url,
            {
                method: 'DELETE',
                headers: new Headers({
                    'accept': 'application/json; charset=UTF-8'
                })

            }

        ).then(
            res => {
                return res.json()
            }
        ).then(
            (result) => {
                let fam_notes_temp = fam_notes
                fam_notes_temp = fam_notes_temp.filter(n => n.id !== id)
                setFamNotes(fam_notes_temp)
            },
            (error) =>
                alert(error)

        )
    }
    const toggleOverlay = (e) => {
        console.log(fam_notes[0])
        if (visible === false)
            setCurrent(e)
        else
            setCurrent(0)
        setVisible(!visible);
    }

    const UpdateStatus = (status) => {
        console.log(fam_notes[current].note_id);
        let url = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/status/" + fam_notes[current].note_id + "/" + status

        fetch(url,
            {
                method: 'PUT',
                headers: new Headers({
                    'accept': 'application/json; charset=UTF-8'
                })
                , body: JSON.stringify(status)

            }

        ).then(
            res => {
                return res.json()
            }
        ).then(
            (result) => {
                console.log(result)
                fam_notes[current].status = status
            },
            (error) =>
                alert(error)

        )

    }
    const updateNote=(note)=>{
      
        let url = "http://ruppinmobile.tempdomain.co.il/site09/api/Note"

        fetch(url,
            {
                method: 'PUT',
                headers: new Headers({
                    'accept': 'application/json; charset=UTF-8'
                })
                , body: JSON.stringify(note)

            }

        ).then(
            res => {
                return res.json()
            }
        ).then(
            (result) => {
                console.log(result)
                fam_notes[current] = note
            },
            (error) =>
                alert(error)

        )
    }
    const updateSelected = (i) => {

        if (isSelected.find(r => r === i) !== undefined) {
            let selected = isSelected;
            selected = selected.filter(r => r !== i)


            setSelected(selected)
            if (selected.length === 0)
                setTabVisible(false)

        }
        else
            setSelected([...isSelected, i])

        //   if(isSelected===[])
        //   route.params.setInVisible()
    }

    const deleteNotes = (notes) => {
        for (let index = 0; index < notes.length; index++) {
            const noteNum = notes[index];
            deleteNote(fam_notes[noteNum].note_id);
        }
        setSelected([]);
    }

    const AreYouSure = async(numOfFiles) => {
        let text = ""
        console.log(numOfFiles)
        if (numOfFiles > 1)
            text = "Are you sure you want to delete " + numOfFiles + " items?"
        else
            text="Are you sure you want to delete " + numOfFiles + " item?"
        Alert.alert("Hold on!", text, [
            {
                text: "Cancel",
                onPress: () =>  null,
                style: "cancel"
            },
            {
                text: "YES", onPress: () =>
                      deleteNotes(isSelected)
            }
        ]);
    }
    if(fam_notes===undefined||curret_user_notes===undefined){
        return <AppLoading/>
    }else
    return (
        <SafeAreaView>
            <ScrollView
            >

                <View style={styles.Wrapper}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}>
                        <View>
                            <Button title="register" onPress={() => navigation.navigate('Register')}></Button>
                            <Button title="login" onPress={() => navigation.navigate('Login')}></Button>
                            <Text>All Tasks</Text>
                            <Badge status="success" value="ACTIVE" />
                            <Badge status="error" value="DELETED" />
                            <Badge status="primary" value="COMPLETED" />
                            <Badge status="warning" value="PENDING" />


                            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly',display:isSelected.length===0?'none':'flex' }}><Text>{isSelected.length === 0 ? "" : isSelected.length + " - Selected"}</Text>
                                <Icon
                                    onPress={() => {
                                  AreYouSure(isSelected.length)
                                    }}
                                    name="delete"
                                    color="black" />
                            </View>
                            <View style={styles.notesWrapper}>
                                {
                                    fam_notes?.map((l, i) =>

                                        <TouchableOpacity key={i} onPress={() => toggleOverlay(i)} onLongPress={() => {

                                            setSelected([...isSelected, i])
                                        }}>


                                            <View style={styles.containerNote} >
                                                {isSelected.find(r => r === i) === undefined ? isSelected.length > 0 ? <CheckBox onValueChange={() => updateSelected(i)} /> : null :
                                                    <CheckBox value={true} onValueChange={() => updateSelected(i)} name={i} />

                                                }
                                                <Text>{l.title}</Text>
                                                {curret_user_notes?.find?.(n => n.title === l.title) !== undefined ?
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <Icon
                                                            name="edit"
                                                            color="black"
                                                            onPress={() => navigation.navigate("EditNote", { note: l,update:(note)=>updateNote(note) })}
                                                        />
                                                        <Icon
                                                            onPress={() => deleteNote(l.note_id)}
                                                            name="delete"
                                                            color="black"
                                                        />
                                                    </View> : null
                                                }


                                                <Badge status={statusKinds[myStatusKinds.findIndex(k => k === l.status)]} />

                                                <ListItem.Subtitle>{l.text}</ListItem.Subtitle>
                                                <ListItem.Subtitle>{l.users_tagged}</ListItem.Subtitle>
                                            </View></TouchableOpacity>

                                    )
                                }
                            </View>


                            <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(current)}>

                                <TouchableOpacity key={current} style={{ alignSelf: 'flex-end' }} onPress={() => toggleOverlay(current)}>
                                    <ListItem.Chevron />
                                </TouchableOpacity>
                                <Note_Overlay updateNote={updateNote} toggleOverLayParent={toggleOverlay} navigation={navigation} UpdateStatus={UpdateStatus} note={fam_notes[current]} />

                            </Overlay>

                            {/* <View>
                        <TouchableOpacity onPress={toggleOverlay}>
                            <ListItem bottomDivider>
                                <Avatar source={{ uri: l.avatar_url }} />
                                <ListItem.Content>

                                    <ListItem.Title>Title</ListItem.Title>
                                    <ListItem.Subtitle>Text</ListItem.Subtitle>
                                    <ListItem.Subtitle>Users</ListItem.Subtitle>

                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity >
                        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={toggleOverlay}>
                                <ListItem.Chevron />
                            </TouchableOpacity>
                            <Note_Overlay note={{ title: 'title', text: 'text' }} />

                        </Overlay>
                    </View> */}


                        </View>
                        <Text>BOARD PAGE</Text>
                        {/* <View style={styles.notesWrapper}>
                    <View style={styles.noteRow}>
                        <TouchableOpacity>
                            <View style={styles.container} ><Text >123</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.container} ><Text >123</Text></View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.noteRow}>
                        <TouchableOpacity>
                            <View style={styles.container} ><Text >123</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.container} ><Text >123</Text></View>
                        </TouchableOpacity>

                    </View>
                </View> */}
                        <TouchableOpacity>
                            <View style={{ backgroundColor: 'yellow' }}>
                                <Text onPress={() => navigation.navigate('Profile')}>Press me to go to profile</Text>
                            </View>
                        </TouchableOpacity>
                    </LinearGradient>

                    <Text>TOTOTTOTOTOTOT</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('AddNote', { addNote: (note,users) => addingNote(note,users) })}>
                        <Icon
                            name="add"
                            color="white"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('AddingNote', { add: (note) => addingNote(note) })}>
                       <Text>2</Text>
                    </TouchableOpacity>




                </View>

            </ScrollView>
        </SafeAreaView >
    )

}
