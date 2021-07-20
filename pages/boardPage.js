import { useFocusEffect } from '@react-navigation/core'
import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler';
import profilePage from './profilePage'
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem, Avatar } from 'react-native-elements'
import { List } from 'react-native-paper';
import { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import Note_Overlay from './Note_Overlay';
import { Input } from 'react-native-elements/dist/input/Input';

const mock_user={
    username:"Eldad22",
    fam_ID:"cohen222",
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
    }
});

const notes = [
    {
        date: '19/07/2021',
        title: 'Amy Farha',
        description: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        users_tagged: 'Vice President',
    },
    {
        date: '19/07/2021',
        title: 'Chris Jackson',
        description: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        users_tagged: 'Vice Chairman',
    },

]



 export default function boardPage({ navigation }) {
    const [fam_notes, setNotes] = useState([])
    const [username, setUser] = useState("david22")
    const [visible, setVisible] = useState(false);


    useEffect(() => {
        let url = 'http://ruppinmobile.tempdomain.co.il/site09/api/Note/user/' + username;
        fetch(url).then(
            res => res.json()).then(
                result => {
                    setNotes(result)
                }
            )
    }, [])
    const SeeNoteDetails = (note) => {
        alert("You CLicked See Details")
    }



    const toggleOverlay = () => {
        setVisible(!visible);
    }
    return (
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
                    {
                        fam_notes.map((l, i) =>

                        (<View>
                            <TouchableOpacity onPress={toggleOverlay}>
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
                            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>

                                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={toggleOverlay}>
                                    <ListItem.Chevron />
                                </TouchableOpacity>
                                <Note_Overlay note={l} />

                            </Overlay>
                        </View>)
                        )
                    }
                    {/* 
                    <TouchableOpacity>
                        <ListItem key={fam_notes.title} bottomDivider>
                            <ListItem.Content>

                                <ListItem.Title>{fam_notes.title} {fam_notes.created}</ListItem.Title>
                                <ListItem.Subtitle>{fam_notes.text}</ListItem.Subtitle>
             

                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity> */}
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
            <TextInput style={{backgroundColor:"white",color:"black",width:100,alignSelf:"center"}} onBlur={text=>console.log(text)} ></TextInput>
        </View>
    )
}
