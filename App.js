import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View,CheckBox } from 'react-native';
import MyCheckBox from './CheckBox';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SafeAreaProvider from 'react-native-safe-area-context'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import FourthPage from './FourthPage';
import FifthPage from './FifthPage';
import RegisterPage from './pages/registerPage';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';
import BoardPage from './pages/boardPage';
import DrawerNavManager from './pages/DrawerNavManager';
import TabNavManager from './pages/TabNavManager';
const Stack = createStackNavigator();
export default function App() {
  const [noteTitle,setTitle] = useState("")
  const [noteDesc,setDesc] = useState("")
  const [noteUserTagged,setUserTagged] = useState([])

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
    <Stack.Navigator initialRouteName="Board">
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Board" component={BoardPage} />

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
