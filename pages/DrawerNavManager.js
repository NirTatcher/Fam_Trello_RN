import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet } from 'react-native'
import boardPage from './boardPage'
import profilePage from './profilePage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavManager from './TabNavManager';
import AllNotes from './AllNotes';
import ActiveNotes from './ActiveNotes';
import PedningNotes from './PedningNotes';
import DoneNotes from './DoneNotes';
import AppLoading from 'expo-app-loading';
import { Icon } from 'react-native-elements';
import { Badge, withBadge } from 'react-native-elements'
import BadgeStatus from './BadgeStatus';

const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });

const Drawer = createDrawerNavigator();



export default function DrawerNavManager({route,navigation}) {
    const [fam_notes, setFamNotes] = useState(undefined)


    return (
    
    <Drawer.Navigator initialRouteName="All">
         {console.log(route.params.fam_ID)}
       <Drawer.Screen
            name="Profile"
            component={profilePage}
            initialParams={{usernameUnique:route.params.username,famIDUnique:route.params.fam_ID}}
            options={{ drawerLabel: 'Profile',drawerIcon: ({ tintColor }) => (
                <Icon name="person" color="black"/>
              ) }}
        />
  <Drawer.Screen
 
            name="All"
            component={boardPage}
            initialParams={{type:'All',usernameUnique:new String(route.params.username).toString(),famIDUnique:new String(route.params.fam_ID).toString()}}
            options={{ drawerLabel: 'All',drawerIcon: ({ tintColor }) => (
                <Icon name="subject" color="black"/>
              )  }}
        />

<Drawer.Screen
            name="Active"
            component={boardPage}
            initialParams={{type:'Active',usernameUnique:new String(route.params.username).toString(),famIDUnique:new String(route.params.fam_ID).toString()}}
            options={{ drawerLabel: 'Active',  drawerIcon: ({ tintColor }) => (
                <Badge status="success"/>
              ) }}
        />
          <Drawer.Screen
            name="Pending"
            component={boardPage}
            initialParams={{type:'Pending',usernameUnique:new String(route.params.username).toString(),famIDUnique:new String(route.params.fam_ID).toString()}}
            options={{ drawerLabel: 'Pending',drawerIcon: ({ tintColor }) => (
                <Badge status="warning"/>
              ) }}
        />
          <Drawer.Screen
            name="Completed"
            component={boardPage}
            initialParams={{type:'Completed',usernameUnique:new String(route.params.username).toString(),famIDUnique:new String(route.params.fam_ID).toString()}}
            options={{ drawerLabel: 'Completed',drawerIcon: ({ tintColor }) => (
                <Badge status="primary"/>
              ) }}
        />
         <Drawer.Screen
            name="Deleted"
            component={boardPage}
            initialParams={{type:'Deleted',usernameUnique:new String(route.params.username).toString(),famIDUnique:new String(route.params.fam_ID).toString()}}
            options={{ drawerLabel: 'Deleted',drawerIcon: ({ tintColor }) => (
                <Badge status="error"/>
              ) }}
        />
      
    </Drawer.Navigator>


    )
}
