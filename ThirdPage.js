import React from 'react'
import { View, Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import FirstPage from './FirstPage'
import FourthPage from './FourthPage'
import SecondPage from './SecondPage';
import FifthPage from './FifthPage';
const Drawer = createDrawerNavigator();
export default function ThirdPage() {
    return (
        <Drawer.Navigator initialRouteName="FourthPage">
        
            <Drawer.Screen
                name="FourthPage"
                component={FourthPage}
                options={{ drawerLabel: 'Fourth Page with drawers' }}
            />
            <Drawer.Screen
                name="FifthPage"
                component={FifthPage}
                options={{ drawerLabel: 'FifthPage' }}
            />
            <Drawer.Screen
             name="SecondPage" 
             component={SecondPage}
             options={{drawerLabel:'Second Page'}} />

        </Drawer.Navigator>
    )
}
