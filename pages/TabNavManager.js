import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import profilePage from './profilePage';
import boardPage from './boardPage';
import ActiveNotes from './ActiveNotes';
import DoneNotes from './DoneNotes';
import PedningNotes from './PedningNotes';
import AllNotes from './AllNotes';
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
                <Tab.Screen
                name="All"
                component={AllNotes}
                options={{
                    tabBarLabel: 'All',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="skull" color={color} size={26} />
                    ),
                }}
            />
                <Tab.Screen
                name="Pending"
                component={PedningNotes}
                options={{
                    tabBarLabel: 'Pending',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="skull" color={color} size={26} />
                    ),
                }}
            />
                <Tab.Screen
                name="Done"
                component={DoneNotes}
                options={{
                    tabBarLabel: 'Done',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="skull" color={color} size={26} />
                    ),
                }}
            />
                <Tab.Screen
                name="Active"
                component={ActiveNotes}
                options={{
                    tabBarLabel: 'Active',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="skull" color={color} size={26} />
                    ),
                }}
            />
        {/* <Stack.Screen name="All" component={AllNotes} />
        <Stack.Screen name="Pending" component={PedningNotes} />
        <Stack.Screen name="Done" component={DoneNotes} />
        <Stack.Screen name="Active" component={ActiveNotes} /> */}


        </Tab.Navigator>
    )
}
