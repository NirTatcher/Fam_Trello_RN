import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import profilePage from './profilePage';
import boardPage from './boardPage';
const Tab = createBottomTabNavigator();

export default function TabNavManager() {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            activeColor="#55ff00"
            inactiveColor='black'
            barStyle={{ backgroundColor: '#694fad' }}
        >
            <Tab.Screen
                name="Profle"
                component={profilePage}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="bell" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Board"
                component={boardPage}
                options={{
                    tabBarLabel: 'Board',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="skull" color={color} size={26} />
                    ),
                }}
            />



        </Tab.Navigator>
    )
}
