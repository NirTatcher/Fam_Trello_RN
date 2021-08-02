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
    const [curret_user_notes, setCurrentUserNotes] = useState([])
    const [username, setUser] = useState("david22")
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [fam_ID, setFamID] = useState("cohen222");

    useEffect(async() => {
        let urlFamNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/family/cohen222";
        let urlCurrentNotes = "http://ruppinmobile.tempdomain.co.il/site09/api/Note/fam_member/" + fam_ID + "/" + username;



       await fetchFamNotes(urlFamNotes)

        // fetchUsersNotes(urlCurrentNotes)
        // return () => {
        // }
    }, [])

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
                console.log("IM HERE");
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
    if(fam_notes===undefined){
         return <AppLoading/>
    }
    else
    return (
    
    <Drawer.Navigator initialRouteName="All">
        {/* {console.log(fam_notes)} */}
        <Drawer.Screen
            name="All"
            component={AllNotes}
            
            initialParams={{ hello:{id:'5',value:8},note:fam_notes}}
            options={{ drawerLabel: 'All' }}
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
