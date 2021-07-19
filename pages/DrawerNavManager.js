import React from 'react'
import { View, Text } from 'react-native'
import boardPage from './boardPage'
import profilePage from './profilePage'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavManager from './TabNavManager';
const Drawer = createDrawerNavigator();
export default function DrawerNavManager() {
    return (
    <Drawer.Navigator initialRouteName="Board">
        
        <Drawer.Screen
            name="Profile"
            component={profilePage}
            options={{ drawerLabel: 'Profile' }}
        />
  
  <Drawer.Screen
            name="Board"
            component={boardPage}
            options={{ drawerLabel: 'BoardDrawer' }}
        />
          <Drawer.Screen
            name="ProfilewTabs"
            component={TabNavManager}
            options={{ drawerLabel: 'Profile w Tabs' }}
        />

    </Drawer.Navigator>


    )
}
