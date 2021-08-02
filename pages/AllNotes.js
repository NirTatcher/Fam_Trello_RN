import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ListItem, Avatar } from 'react-native-elements';
import { Button, Overlay, Icon } from 'react-native-elements';
import Note_Overlay from './Note_Overlay';
import AppLoading from 'expo-app-loading';


export default function AllNotes({ props, route, navigation }) {

    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fam_notes, setFamNotes] = useState(undefined)
    const [curret_user_notes, setCurrentUserNotes] = useState([])

    useEffect(() => {
        // {  console.log(route.params.fam_notes)}
        setFamNotes(route.params.fam)
        // setFamNotes(route.params.curret_user_notes)
        console.log(route.params.user);
      setCurrentUserNotes(route.params.user)
        // return () => {
        //     cleanup
        // }
    }, [])

    // useEffect(() => {
    //     // {  console.log(route.params.fam_notes)}
    //     setFamNotes(route.params.fam)
    //     // setFamNotes(route.params.curret_user_notes)
    //     console.log(route.params.user);
    //   setCurrentUserNotes(route.params.user)
    //     // return () => {
    //     //     cleanup
    //     // }
    // }, [fam_notes,curret_user_notes])
    

    const toggleOverlay = (e) => {
        if (visible === false)
            setCurrent(e)
        else
            setCurrent(null)
        setVisible(!visible);
    }





    if (fam_notes === undefined || curret_user_notes===undefined) {
        return <AppLoading />
    }
    else
        return (
            <ScrollView>
                <View>
                    <Text>All Notes</Text>
                    {/* {console.log(route.params.fam_notes)}
                
                {/* <Text>{route.params}</Text> */}
                  
                    {
                        fam_notes?.map((l, i) =>
                            // notes.map((l, i) =>0
                            curret_user_notes?.find(n => n.title === l.title) !== undefined ?
                                (<View key={i}>

                                    <TouchableOpacity key={i} onPress={() => toggleOverlay(i)}>
                                        <ListItem
                                            key={i} bottomDivider>
                                            <ListItem.Content>
                                                <ListItem.Title>{l.title}
                                                    <Icon
                                                        name="edit"
                                                        color="black"
                                                        onPress={() => navigation.navigate("EditNote", { note: l })}
                                                    />
                                                    <Icon
                                                        onPress={async() => 
                                                            
                                                             
                                                        {    
                                                            // setFamNotes(fam_notes.filter(n => n.id !== id))
                                                           route.params.delete(l.id)}
                                                         
                                                        
                                                        }
                                                        name="delete"
                                                        color="black"
                                                    />
                                                </ListItem.Title>
                                                <ListItem.Subtitle>{l.text}</ListItem.Subtitle>
                                                <ListItem.Subtitle>{l.users_tagged}</ListItem.Subtitle>

                                            </ListItem.Content>
                                            <ListItem.Chevron />
                                        </ListItem>
                                    </TouchableOpacity >

                                </View>)
                                :
                                (<View key={i}>
                                    <TouchableOpacity key={i} onPress={() => toggleOverlay(i)}>
                                        <ListItem key={i} bottomDivider>
                                            {/* <Avatar source={{ uri: l.avatar_url }} /> */}
                                            <ListItem.Content>

                                                <ListItem.Title><Text>{l.title}</Text></ListItem.Title>
                                                <ListItem.Subtitle><Text>{l.text}</Text></ListItem.Subtitle>
                                                <ListItem.Subtitle><Text>{l.users_tagged}</Text></ListItem.Subtitle>

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



                </View>
            </ScrollView>
        )
}
