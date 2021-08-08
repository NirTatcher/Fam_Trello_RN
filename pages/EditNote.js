import React, { useState, useEffect } from 'react'
import { View, Text, BackHandler, Alert, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Icon } from 'react-native-elements'

import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight } from '@expo-google-fonts/inter';
import { Input } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',


  },
  headline: {
    fontFamily: "Inter_500Medium",
    flexGrow: 1,
    marginTop: 50,
    fontSize: 30

  },
  btnWrapper: {
    alignSelf: "center",
    flexDirection: 'row',
    justifyContent: 'center',
    flexGrow: 1,
    width: '60%',
    justifyContent: 'space-around',
    margin: 25

  },
  inputs: {
    borderRadius: 10,
    flexGrow: 4,
    backgroundColor: '#d9e6f2',
    marginTop: 20,
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
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#d2e3f2",
    height: '15%',
  },
  input_desc_cont: {
    alignSelf: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "grey",
    width: Dimensions.get("window").width * 0.75

  }

})

export default function EditNote({ route, navigation }) {
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [prevTitle, setPrevTitle] = useState("")
  const [prevText, setPrevText] = useState("")
  const [users_tagged, setUser] = useState("")
  const [isLeaving, setLeaving] = useState('none')
  const [famMembers, setFamMembers] = useState([])
  const [famMembersSelected, setSelectMembers] = useState([]);
  const [visible, setVisible] = useState(false)

  const [fontsLoaded] = useFonts({ Inter_900Black, Inter_500Medium, Inter_400Regular, Inter_200ExtraLight })



  useEffect(() => {

    let note = route.params.note
    setTitle(note.title)
    setText(note.text)
    setPrevTitle(note.title)
    setPrevText(note.text)
    fetchNoteUsers()





    return () => {

    }
  }, [])
  const backAction = () => {
    if (prevText !== text || prevTitle !== title)
      Alert.alert("Changes Been Done!", "Some changes have been made..are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => navigation.goBack() }
      ]);
    else
      navigation.goBack()
    return true;
  };

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

  const fetchNoteUsers = () => {
    console.log(route.params.note.note_id)
    fetch("http://ruppinmobile.tempdomain.co.il/site09api/Note/tagged/" + route.params.note.note_id, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf8',
      })

    }).then(
      res => {

        if (res.ok)
          return res.json()
        // else
        //     return () => { throw 'Oops something went wrong with the fam members you are trying to bring from db..' }
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

  if (!fontsLoaded)
    return <AppLoading />
  else
    return (


      <View style={styles.container}>
        <Text style={styles.headline}>Edit a Note</Text>
        <View style={styles.inputs}>
          <Input
            label="Title"
            style={styles.input}
            id="title" value={title} onChangeText={(e) => setTitle(e)}
            placeholder="Title" />
          <Input
            label="Description"
            containerStyle={styles.input_desc_cont}
            inputContainerStyle={{ height: 100 }}
            multiline={true}
            id="text" value={text}
            onChangeText={(e) => setText(e)}
          />

          {console.log(route)}
          <View style={styles.btnWrapper}>
            <TouchableOpacity style={styles.btnDone} onPress={() => {
              let users = []
              famMembersSelected.map((member, i) => {
                if (member)
                  users.push(famMembers[i].first_name)
              })

              route.params.update(
                { created: route.params.note.created, fam_ID: 'cohen222', title: title, text: text, username: 'david22' }
              )
              navigation.navigate("Drawer")
            }}>
              <Icon
                name="done"
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancel} onPress={() => {
              backAction()
            }}>
              <Icon
                name="cancel"
                color="white"

              />
            </TouchableOpacity>
          </View>
        </View>
        {/* <Button title="press to add note" onPress={() => {
                route.params.add(
                    { created: new Date(), fam_ID: 'cohen222', title: title, text: text, username: 'david22' }
                )
                navigation.navigate("Drawer")
            }}></Button> */}


      </View>




    )
}


// import React, { useState, useEffect } from 'react'
// import { View, Text, StyleSheet, TouchableOpacity, CheckBox, Dimensions } from 'react-native'
// import { Button } from 'react-native-elements/dist/buttons/Button'
// import { ListItem } from 'react-native-elements/dist/list/ListItem'
// import { ScrollView, TextInput } from 'react-native-gesture-handler'
// import { Icon } from 'react-native-elements'


// const styles = StyleSheet.create({
//     container: {
//         height: Dimensions.get('window').height,
//         width: '80%',
//         alignItems: 'center',
//         alignSelf: 'center',
//         justifyContent: 'space-around',
//         flexDirection: 'column'

//     },
//     headline: {
//         flexGrow: 1,
//         marginTop: 50
//     },
//     btnWrapper: {

//         borderRadius: 5,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         flexGrow: 1,
//         width: '60%'
//         , justifyContent: 'space-around',
//         marginTop: 15

//     },
//     inputs: {
//         flexGrow: 4,
//         backgroundColor: '#d9e6f2',
//         marginTop: 20,
//         justifyContent: 'space-around',
//         width: '100%'
//     },
//     btnDone: {
//         backgroundColor: 'green',
//         width: 30,
//         height: 30,
//         justifyContent: 'center',
//         borderRadius: 5
//     },
//     btnCancel: {
//         backgroundColor: 'red',
//         width: 30,
//         height: 30,
//         justifyContent: 'center',
//         borderRadius: 5,
//     },
//     input: {
//         height: '15%',

//         borderWidth: 1
//     },
//     largeText: {
//         height: '30%',

//         borderWidth: 1
//     }

// })

// export default function AddNote({ route, navigation }) {
//     const [title, setTitle] = useState("")
//     const [text, setText] = useState("")
//     const [famMembers, setFamMembers] = useState([])
//     const [famMembersSelected, setSelectMembers] = useState([]);
//     const [visible, setVisible] = useState(false)

//     useEffect(() => {
//         fetchFamUsers()
//         let selected = []
//         for (let index = 0; index < famMembers.length; index++) {
//             const member = famMembers[index];
//             selected.push(false);

//         }
//         setSelectMembers(selected)
//     }, [])
//     const fetchFamUsers = () => {
//         fetch("http://ruppinmobile.tempdomain.co.il/site09/api/Family/members/cohen222", {
//             method: 'GET',
//             headers: new Headers({
//                 'Content-Type': 'application/json; charset=utf8',
//             })

//         }).then(
//             res => {

//                 if (res.ok)
//                     return res.json()
//                 else
//                     return () => { throw 'Oops something went wrong with the fam members you are trying to bring from db..' }
//                 //  func1(res)
//             }
//         ).then(
//             (result) => {
//                 // setFamNotes(result)
//                 console.log(result)
//                 setFamMembers(result)

//             },
//             (err) => {
//                 Alert.alert("", err)

//             }
//         )
//     }
//     const changeSelected = async (index) => {
//         console.log(index)
//         let selected = famMembersSelected;
//         selected[index] = !famMembersSelected[index]
//         console.log(selected[index])
//         await setSelectMembers([...selected])
//     }
//     return (
//         <ScrollView>
//             <View style={styles.container}>
//                 <Text style={styles.headline}>Create A New Note</Text>
//                 <View style={styles.inputs}>
//                     <TextInput style={styles.input} id="title" value={title} onChangeText={(e) => setTitle(e)} placeholder="Title" />
//                     <TextInput style={styles.largeText} id="text" value={text} onChangeText={(e) => setText(e)} placeholder="Description" />
//                     <View>
//                         {console.log(famMembersSelected)}
//                         <Text>Tag A User</Text>
//                         <TouchableOpacity onPress={()=>setVisible(!visible)}><Text>+</Text></TouchableOpacity>
//                         {visible&&famMembers.map((member, index) =>
//                             <View key={member.username} style={{ flexDirection: 'row', alignItems: 'center' }} >
//                                 {console.log(famMembersSelected[index])}
//                                 <CheckBox value={famMembersSelected[index]} onValueChange={() => changeSelected(index)} />
//                                 <Text>{member.first_name}</Text>
//                             </View>
//                         )}
//                     </View>
//                 </View>
//                 {/* <Button title="press to add note" onPress={() => {
//                 route.params.add(
//                     { created: new Date(), fam_ID: 'cohen222', title: title, text: text, username: 'david22' }
//                 )
//                 navigation.navigate("Drawer")
//             }}></Button> */}
//                 <View style={styles.btnWrapper}>
//                     <TouchableOpacity style={styles.btnDone} onPress={() => {
//                         let users = []
//                         famMembersSelected.map((member, i) => {
//                             if (member)
//                                 users.push(famMembers[i].first_name)
//                         })
//                         route.params.addNote(
//                             { created: new Date(), fam_ID: 'cohen222', title: title, text: text, username: 'david22' }, users
//                         )
//                         navigation.navigate("Drawer")
//                     }}>
//                         <Icon
//                             name="done"
//                             color="white"
//                         />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.btnCancel} onPress={() => {

//                         navigation.navigate("Drawer")
//                     }}>
//                         <Icon
//                             name="cancel"
//                             color="white"
//                         />
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </ScrollView>
//     )
// }