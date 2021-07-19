import React from 'react'
import { Button,View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SecondPage from './SecondPage'
import ThirdPage from './ThirdPage'
import FourthPage from './FourthPage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FifthPage from './FifthPage';
// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
export default function FirstPage({navigation}) {
    return (
        // <View>
        //     <Text>First Page</Text>
        //     <Button title="GO TO SECOND PAGE" onPress={()=>navigation.navigate("SecondPage")}/>

        // </View>
        <Tab.Navigator
        initialRouteName="SecondPage"
        activeColor="#55ff00"
        inactiveColor='black'
        barStyle={{ backgroundColor: '#694fad' }}
        >
        <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
        tabBarLabel: 'SecondPage',
        tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
        }}
        />
        <Tab.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
        tabBarLabel: 'ThirdPage-Drawers',
        tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
        }}
        />
           <Tab.Screen
        name="FourthPage"
        component={FourthPage}
        options={{
        tabBarLabel: 'FourthPage',
        tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
        }}
        />
               <Tab.Screen
        name="FifthPage"
        component={FifthPage}
        options={{
        tabBarLabel: 'FifthPage',
        tabBarIcon: ({ color }) => (
        <MaterialCommunityIcons name="bell" color={color} size={26} />
        ),
        }}
        />
        
        </Tab.Navigator>
    )
}
