import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
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
import { I18nManager } from 'react-native';
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
    container: {
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
        justifyContent: 'space-around'

    },
    notesWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',


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
    else
        throw 'Oops something went wrong with the current user notes you are trying to bring from db..'
}


export default function boardPage({ route, navigation }) {
    const [fam_notes, setFamNotes] = useState([])
    const [curret_user_notes, setCurrentUserNotes] = useState([])
    const [username, setUser] = useState("david22")
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fam_ID, setFamID] = useState("cohen222");
    const [statusKinds] = ["ACTIVE", "PENDING", "COMPLETED", "DELETED"]


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
                else
                    return () => { throw 'Oops something went wrong with the fam notes you are trying to bring from db..' }
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
    useEffect(() => {

        I18nManager.allowRTL(false);
        I18nManager.forceRTL(false);
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/fam_member/" + fam_ID + "/" + username;


        console.log(route.params.type);
        fetchFamNotes(urlFamNotes)

        fetchUsersNotes(urlCurrentNotes)
        return () => {
            console.log("clean up");
        }


    }, [])
    const SeeNoteDetails = (note) => {
        alert("You CLicked See Details")
    }


    const addingNote = async (note) => {


        await fetch('http://ruppinmobile.tempdomain.co.il/site09/api/Note/',
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
            async (result) => {

            },
            (error) =>
                console.log("")

        )
        let notesCurrent = curret_user_notes
        let notesFam = fam_notes
        notesCurrent.push(note)
        notesFam.push(note)
        await setCurrentUserNotes(notesCurrent)
        await setFamNotes(notesFam)



    }
    useEffect(() => {
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/fam_member/" + fam_ID + "/" + username;
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
                fam_notes_temp.filter(n => n.id !== id)
                setFamNotes(fam_notes_temp)
            },
            (error) =>
                alert(error)

        )
    }
    const toggleOverlay = (e) => {
        if (visible === false)
            setCurrent(e)
        else
            setCurrent(null)
        setVisible(!visible);
    }





    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.Wrapper}>
                    <LinearGradient
                        // Background Linear Gradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                    // style={classes.Wrapper}
                    >
                        {/* <View>
      <Button title="Open Overlay" onPress={toggleOverlay} />

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
       <Note_Overlay note={}/>
      </Overlay>
    </View> */}

                        <View>
                            <Button title="register" onPress={() => navigation.navigate('Register')}></Button>
                            <Button title="login" onPress={() => navigation.navigate('Login')}></Button>
                            <Text>All Tasks</Text>
                            <Badge status="success" value="ACTIVE" />
                            <Badge status="error" value="DELETED" />
                            <Badge status="primary" value="DONE"/>
                            <Badge status="warning" value="PENDING" />
                            {/* <Avatar
                                rounded
                                source={{
                                    uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                                }}
                                size="large"
                            /> */}
                            {/* <Badge
                                status="success"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            /> */}


                            {
                                fam_notes?.map((l, i) =>
                                // notes.map((l, i) =>0
                                (<View key={i}>
                                    <TouchableOpacity key={i} onPress={() => toggleOverlay(i)}>
                                        <ListItem key={i} bottomDivider>
                                            {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                                            <ListItem.Content>

                                                <ListItem.Title>{l.title}
                                                    {curret_user_notes?.find(n => n.title === l.title) !== undefined ?
                                                        <View style={{flexDirection:'row'}}>
                                                            <Icon
                                                                name="edit"
                                                                color="black"
                                                                onPress={() => navigation.navigate("EditNote", { note: l })}
                                                            />
                                                            <Icon
                                                                onPress={() => deleteNote(l.id)}
                                                                name="delete"
                                                                color="black"
                                                            />
                                                        </View> : null
                                                    }
                                                    <BadgeStatus status={l.status}/>
                                                </ListItem.Title>
                                                <ListItem.Subtitle>{l.text}</ListItem.Subtitle>
                                                <ListItem.Subtitle>{l.users_tagged}</ListItem.Subtitle>

                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    </TouchableOpacity >

                                </View>)
                                )
                            }
                            <Overlay isVisible={visible} onBackdropPress={() => toggleOverlay(current)}>

                                <TouchableOpacity key={current} style={{ alignSelf: 'flex-end' }} onPress={() => toggleOverlay(current)}>
                                    <ListItem.Chevron />
                                </TouchableOpacity>
                                <Note_Overlay note={current ? fam_notes[current] : null} />

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

                    <TouchableOpacity onPress={() => navigation.navigate('AddNote', { addingNote })}>
                        <Icon
                            name="add"
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )

}
