import React,{useState,useEffect} from 'react'
import { View, Text } from 'react-native'
import boardPage from './boardPage'
import profilePage from './profilePage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavManager from './TabNavManager';
import AllNotes from './AllNotes';
import ActiveNotes from './ActiveNotes';
import PedningNotes from './PedningNotes';
import DoneNotes from './DoneNotes';
import AppLoading from 'expo-app-loading';
const Drawer = createDrawerNavigator();
export default function DrawerNavManager({route,navigation}) {
    const [fam_notes, setFamNotes] = useState(undefined)
    const [curret_user_notes, setCurrentUserNotes] = useState(undefined)
    const [username, setUser] = useState("david22")
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fam_ID, setFamID] = useState("cohen222");

    useEffect(async() => {
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/fam_member/" + fam_ID + "/" + username;



        fetchFamNotes(urlFamNotes)

       await fetchUsersNotes(urlCurrentNotes)
        // return () => {
        // }
    }, [])


    useEffect(() => {
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/fam_member/" + fam_ID + "/" + username;
        fetchUsersNotes(urlCurrentNotes)

    }, [curret_user_notes])



    useEffect(() => {
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
        fetchFamNotes(urlFamNotes)

    }, [fam_notes])

    const deleteNote = (id) => {
         console.log(id)
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
           async (result) => {
                alert("Success")
                let fam_notes_temp = fam_notes
                await fam_notes_temp.filter(n => n.id !== id)
                setFamNotes(fam_notes_temp)
                
            },
            (error) =>
                alert(error)

        )
    }


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
    if(fam_notes===undefined||curret_user_notes===undefined){
         return <AppLoading/>
    }
    else
    return (
    
    <Drawer.Navigator initialRouteName="All">
        <Drawer.Screen
            name="All"
            component={AllNotes}
            
            initialParams={{ hello:{id:'5',value:8},fam:fam_notes,user:curret_user_notes,delete:(i)=>{deleteNote(i)}}}
            options={{ drawerLabel: 'All', }}
        />
  
  <Drawer.Screen
            name="Board"
            component={boardPage}
            options={{ drawerLabel: 'BoardDrawer' }}
        />

<Drawer.Screen
            name="Active"
            component={ActiveNotes}
            options={{ drawerLabel: 'Active' }}
        />
          <Drawer.Screen
            name="Pending"
            component={PedningNotes}
            options={{ drawerLabel: 'Pending' }}
        />
          <Drawer.Screen
            name="Done"
            component={DoneNotes}
            options={{ drawerLabel: 'Done' }}
        />
        

    </Drawer.Navigator>


    )
}
