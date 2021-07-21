import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import profilePage from './profilePage'
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Avatar } from 'react-native-elements'
import { List } from 'react-native-paper';
import { useState } from 'react';
import { Button, Overlay, Icon } from 'react-native-elements';
import Note_Overlay from './Note_Overlay';
import { Input } from 'react-native-elements/dist/input/Input';
import $, { error } from 'jquery';
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



export default function boardPage({ navigation }) {
    const [fam_notes, setFamNotes] = useState([])
    const [curret_user_notes, setCurrentUserNotes] = useState([])
    const [username, setUser] = useState("david22")
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fam_ID, setFamID] = useState("cohen222");


    useEffect(() => {
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222" ;
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/fam_member/" + fam_ID + "/" + username;

        // $.ajax({
        //     type:'POST',
        //     url:urlFamNotes,
        //     dataType:'json',
        //     data:"{}",
        //     contentType:'application/x-www-form-urlencoded; charset=utf8',
        //     success:(result)=>{ 
        //         console.log(result.d)
        //     },
        //     error:(jqXHR,exeption)=>{

        //         console.log('getting fam notes failed' +jqXHR + " " + exeption)
        //     }
        // })

        // $.ajax({
        //     type:'GET',
        //     url:urlCurrentNotes,
        //     // dataType:'json',
        //     contentType:'application/x-www-form-urlencoded; charset=utf8',
        //     success:function(result){ setCurrentUserNotes(result)
        //     }

        // })

        fetch(urlFamNotes,{
            method:'GET',
            headers:new Headers({
                'Content-Type':'application/json; charset=utf8',
            })

        }).then(
            res => {
                console.log(res.status)
                return res.json()}
            ).then(
                (result) => {
                    // setFamNotes(result)
                    try{
                        setFamNotes(result)

                    }
                    catch(error){
                        console.log("WTF");
                    }
                }
              
            ).catch(
                (error)=>{console.log("ERROR")}
            )
        // fetch(urlCurrentNotes).then(
        //     res => res.json()).then(
        //         result => {
        //             setCurrentUserNotes(result)
        //         },
        //         error=>console.log("error in current notes " + error)
        //     )


    }, [])
    const SeeNoteDetails = (note) => {
        alert("You CLicked See Details")
    }



    const toggleOverlay = (e) => {
        console.log(e)
        if (visible === false)
            setCurrent(e)
        else
            setCurrent(null)
        setVisible(!visible);
    }
    return (
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

                        <Text>All Tasks</Text>

                        {
                           fam_notes.map((l, i) =>
                                // notes.map((l, i) =>0
                                curret_user_notes.find(n => n.title === l.title) !== undefined ?
                                    (<View key={i}>

                                        <TouchableOpacity key={i} onPress={() => toggleOverlay(i)}>
                                            <ListItem key={i} bottomDivider>
                                                <ListItem.Content>

                                                    <ListItem.Title>{l.title} <Icon
                                                        name="edit"
                                                        color="black"
                                                    /></ListItem.Title>
                                                    <ListItem.Subtitle>{l.text}</ListItem.Subtitle>
                                                    <ListItem.Subtitle>{l.users_tagged}</ListItem.Subtitle>

                                                </ListItem.Content>
                                                <ListItem.Chevron />
                                            </ListItem>
                                        </TouchableOpacity >

                                    </View>)
                                    :
                                    (<View key={i}>
                                        {console.log(l.created)}
                                        <TouchableOpacity key={i} onPress={() => toggleOverlay(i)}>
                                            <ListItem key={i} bottomDivider>
                                                {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                                                <ListItem.Content>

                                                    <ListItem.Title>{l.title}</ListItem.Title>
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
                            <Note_Overlay note={fam_notes[current]} />

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
                <Button onPress={() => navigation.navigate('Register')}></Button>
                <Icon
                    name="add"
                    color="white"
                />
            </View>
        </ScrollView>
    )
}
