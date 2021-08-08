import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View,CheckBox } from 'react-native';
import MyCheckBox from './CheckBox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SafeAreaProvider from 'react-native-safe-area-context'
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import BoardPage from './pages/boardPage';
import DrawerNavManager from './pages/DrawerNavManager';
import TabNavManager from './pages/TabNavManager';
import { I18nManager } from 'react-native';
import AddNote from './pages/AddNote';
import EditNote from './pages/EditNote';
import AllNotes from './pages/AllNotes';
import DoneNotes from './pages/DoneNotes';
import PedningNotes from './pages/PedningNotes'
import ActiveNotes from './pages/ActiveNotes';
import RegisterFamily from './pages/RegisterFamiliy';
import Inbox from './pages/Inbox';
import SelectFamily from './pages/SelectFamily';

import AddingNote from './pages/AddingNote'


const Stack = createStackNavigator();
export default function App() {
  const [noteTitle,setTitle] = useState("")
  const [noteDesc,setDesc] = useState("")
  const [noteUserTagged,setUserTagged] = useState([])
  I18nManager.allowRTL(false);


  const func=async(name,value)=>{
    console.log(name," --- ",value)
    let userTaggedTemp = noteUserTagged
     if(userTaggedTemp.includes(name) === false && value == true){
      userTaggedTemp.push(name)
    }
    else
       userTaggedTemp= userTaggedTemp.filter(u=>u!==name)
    setUserTagged(userTaggedTemp)
  }

  return (
    // <View style={styles.container}>
    //   <Text>Family Trello</Text>
    //   <Text>Title</Text>
    //   <TextInput placeholder="title" onChangeText={setTitle}/>
    //   <Text>Description</Text>
    //   <TextInput onChangeText={setDesc} placeholder="Desc"/>

    //   <View style={{display:'flex',flexDirection:'row'}}>
    //     <MyCheckBox name="Avi" func={func} />
    //     <MyCheckBox name="Nir" func={func} />
    //     <MyCheckBox name="Ilai" func={func}/>
        
    //   </View>
     
    //   <Button title="PRESS ME" onPress={()=>alert(noteUserTagged)}/>
    //   <StatusBar style="auto" />

    // </View>
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{headerShown:false}}
     initialRouteName="Login">
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="RegisterFamily" component={RegisterFamily} />
        <Stack.Screen name="SelectFamily" component={SelectFamily} />
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Board" component={BoardPage} />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
        <Stack.Screen name="TabNav" component={TabNavManager} />
        <Stack.Screen name="All" component={AllNotes} />
        <Stack.Screen name="Pending" component={PedningNotes} />
        <Stack.Screen name="Done" component={DoneNotes} />
        <Stack.Screen name="Active" component={ActiveNotes} />
        <Stack.Screen name="Drawer" component={DrawerNavManager} />
        <Stack.Screen name="AddingNote" component={AddingNote} />
        </Stack.Navigator>   
         </NavigationContainer>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});
