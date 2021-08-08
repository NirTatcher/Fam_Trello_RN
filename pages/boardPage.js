import { useFocusEffect } from '@react-navigation/core'
import React, { createRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Alert, Dimensions, Share, Modal } from 'react-native'
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
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight } from '@expo-google-fonts/inter';

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
import { Pressable } from 'react-native';
// import $, { error } from 'jquery';
const mock_user = {
    username: "Eldad22",
    fam_ID: "cohen222",
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
    const [modalVisible, setModalVisible] = useState(false);
    const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight })



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
                let notes=[]
                if(route.params.type!=="All"){
                for (let index = 0; index < result.length; index++) {
                    const element = result[index];
                    if(element.status === new String(route.params.type).toUpperCase()){
                       notes.push(element)
                        
                    }
                    
                }
                if(notes!==[]){
                    setFamNotes(notes)
                }
            }
                else
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

                return res.json()

            }
        ).then(
            (result) => {


                setCurrentUserNotes(result)

            },
            (err) => {
                Alert.alert("", err)

            }
        )
    }

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

const setFamNotesAgain=async()=>{
    console.log(new String(route.params.type).toUpperCase())
    let famTemp=fam_notes
    let user_notes=curret_user_notes
    if(famTemp.length!==[] && curret_user_notes!==[])
   {
       famTemp.map(t=>t.status === new String(route.params.type).toUpperCase() === false ? famTemp.pop():"")
       user_notes.map(t=>t.status === new String(route.params.type).toUpperCase() === false ? famTemp.pop():"")
    // console.log(famTemp.filter(r=>r.status==new String(route.params.type).toUpperCase()))
    //  famTemp = await famTemp.filter(r=>new String(r.status).toUpperCase()!==new String(route.params.type).toUpperCase())
   await setFamNotes(famTemp)
   await setCurrentUserNotes(user_notes)
   }
   
}
    const addingNote = (note, users) => {


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
    const updateNote = (note) => {

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

    const AreYouSure = async (numOfFiles) => {
        let text = ""
        console.log(numOfFiles)
        if (numOfFiles > 1)
            text = "Are you sure you want to delete " + numOfFiles + " items?"
        else
            text = "Are you sure you want to delete " + numOfFiles + " item?"
        Alert.alert("Hold on!", text, [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "YES", onPress: () =>
                    deleteNotes(isSelected)
            }
        ]);
    }


    const onShare = async (note) => {
        try {
            const result = await Share.share({
               title:'A message from Fam_Trello!',
                message:
                    "A Note From Fam_Trello |"+ note.title+':  '+ note.text,
                
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    if ((fam_notes === undefined || curret_user_notes === undefined)||!fontsLoaded) {
        return <AppLoading />
    } else
        return (
            <SafeAreaView>
                <ScrollView
                >

                    <View style={styles.Wrapper}>

                            <View>
                                {/* <Button title="register" onPress={() => navigation.navigate('Register')}></Button>
                                <Button title="login" onPress={() => navigation.navigate('Login')}></Button> */}
                                <Text style={styles.title}>fam_name,Board,</Text>
                                {/* <Badge status="success" value="ACTIVE" />
                                <Badge status="error" value="DELETED" />
                                <Badge status="primary" value="COMPLETED" />
                                <Badge status="warning" value="PENDING" /> */}


                                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly', display: isSelected.length === 0 ? 'none' : 'flex' }}><Text>{isSelected.length === 0 ? "" : isSelected.length + " - Selected"}</Text>
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
                                                    <View style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                                                        <Badge status={statusKinds[myStatusKinds.findIndex(k => k === l.status)]} />
                                                    </View>
                                                    {isSelected.find(r => r === i) === undefined ? isSelected.length > 0 ? <CheckBox onValueChange={() => updateSelected(i)} /> : null :
                                                        <CheckBox value={true} onValueChange={() => updateSelected(i)} name={i} />

                                                    }
                                                    <Text>{new Date(l.created).toDateString()}</Text>
                                                    <Text>{l.title}</Text>

                                                    {/* {curret_user_notes?.find?.(n => n.title === l.title) !== undefined ?
                                                        <View style={{ flexDirection: 'row' }}>

                                                            <Icon
                                                                name="edit"
                                                                color="black"
                                                                onPress={() => navigation.navigate("EditNote", { note: l, update: (note) => updateNote(note) })}
                                                            />

                                                            <Icon
                                                                onPress={() => deleteNote(l.note_id)}
                                                                name="delete"
                                                                color="black"
                                                            />
                                                        </View> : null
                                                    } */}




                                                    <ListItem.Subtitle>{l.text}</ListItem.Subtitle>
                                                    <ListItem.Subtitle>{l.users_tagged}</ListItem.Subtitle>
                                                    <View style={{ alignSelf: 'center', justifyContent: 'center' }}>
                                                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                            <Icon

                                                                name="more-horiz"
                                                                color="black"
                                                            />

                                                        </TouchableOpacity>
                                                        <Modal
                                                            animationType="slide"
                                                            transparent={true}
                                                            visible={modalVisible}
                                                            onRequestClose={() => {
                                                                // Alert.alert("Modal has been closed.");
                                                                setModalVisible(!modalVisible);
                                                            }}
                                                        >
                                                            <View style={styles.centeredView}>

                                                                <View style={styles.modalView}>
                                                                    <View style={{ alignSelf: 'flex-end', marginRight: 10 }}>
                                                                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                                                            <Icon
                                                                                name="close"
                                                                                color="black"
                                                                            />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                    {curret_user_notes?.find?.(n => n.title === l.title) !== undefined ?
                                                                        <View style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-around', marginTop: '25%', width: '100%' }}>
                                                                            <TouchableOpacity>
                                                                                <Icon
                                                                                    name="share"
                                                                                    color="black"
                                                                                    onPress={() => {
                                                                                        onShare(l)
                                                                                        setModalVisible(!modalVisible)
                                                                                    }}
                                                                                />
                                                                            </TouchableOpacity>


                                                                            <TouchableOpacity>
                                                                                <Icon
                                                                                    name="delete"
                                                                                    color="black"
                                                                                    onPress={() => {
                                                                                        deleteNote(l.note_id)
                                                                                        setModalVisible(!modalVisible)
                                                                                    }}
                                                                                />
                                                                            </TouchableOpacity>

                                                                            <TouchableOpacity>
                                                                                <Icon
                                                                                    name="edit"
                                                                                    color="black"

                                                                                    onPress={() => {

                                                                                        navigation.navigate("EditNote", { note: l, update: (note) => updateNote(note) })
                                                                                        setModalVisible(!modalVisible)
                                                                                    }}

                                                                                />
                                                                            </TouchableOpacity>


                                                                        </View> : <TouchableOpacity>
                                                                            <Icon
                                                                                name="share"
                                                                                color="black"
                                                                                onPress={() => {
                                                                                    onShare()
                                                                                    setModalVisible(!modalVisible)
                                                                                }}
                                                                            />
                                                                        </TouchableOpacity>}
                                                                    {/* <Pressable onPress={() => setModalVisible(!modalVisible)}><Text>Share</Text></Pressable>
                                                                    <Pressable onPress={() => setModalVisible(!modalVisible)}><Text>Print</Text></Pressable>
                                                                    <Pressable onPress={() => setModalVisible(!modalVisible)}><Text>Edit</Text></Pressable> */}

                                                                </View>
                                                            </View>

                                                        </Modal>
                                                    </View>
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
                            </View>

                            <Pressable> style={styles.add_btn} onPress={() => navigation.navigate('AddNote', { addNote: (note, users) => addingNote(note, users) })}>
                            <Icon
                                name="add"
                                color="white"
                            />
                        </Pressable>

                    </View>

                </ScrollView>
            </SafeAreaView >
        )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        width: 150,
        height: "100%",
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
        marginTop: 30,
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
        height: '65%'


    },
    Wrapper: {
        height: Dimensions.get('window').height,
        // overflow:'scroll'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        // margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: '40%',
        height: '20%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        // marginBottom: 15,
        textAlign: "center"
    },
    add_btn:{
        backgroundColor:'orange',
        width:'15%',
        height:'8%',
        alignSelf:'center',
        borderRadius:25,
        justifyContent:'center'
    },
    title:{
        fontSize:30,
        fontFamily:"Inter_900Black"
    }
});
