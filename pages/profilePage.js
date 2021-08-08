import AppLoading from 'expo-app-loading'
import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

export default function profilePage({ route, navigation }) {
    const [username, setUser] = useState("")
    const [famID, setfamID] = useState("")
    const [userObj, setUserObj] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [rePass, setRePass] = useState("")
    const [age, setAge] = useState("")

    useEffect(() => {

        setUser(route.params.usernameUnique)
        setfamID(route.params.famIDUnique)
        fetchUsersInfo()
    }, [])

    const fetchUsersInfo = () => {

        fetch("http://ruppinmobile.tempdomain.co.il/site09/api/User/" + route.params.usernameUnique, {
            method: 'GET',
            headers: new Headers({
                'accept': 'application/json; charset=UTF-8',

                'Content-Type': 'application/json; charset=utf8',
            })

        }).then(
            res => {

                if (res.ok)
                    return res.json()
                // else
                //     return () => { throw 'Oops something went wrong with the fam notes you are trying to bring from db..' }
                //  func1(res)
            }
        ).then(
            async (result) => {
                // setFamNotes(result)

                await console.log(result);
                await setUserObj(result)
                setName(result.first_name)
                setEmail(result.email)
                setPass(result.password)
                setRePass(result.password)
                setAge(result.age)




            },
            (err) => {
                Alert.alert("", err + "errrorr")

            }
        )
    }
    const updateUser=()=>{
        let tempObj = userObj;
        tempObj.first_name = name;
        tempObj.email = email;
        tempObj.password = pass;
        
        tempObj.age = age
        tempObj.fam_ID = famID
        tempObj.username = username
        console.log(tempObj)
        fetch("http://ruppinmobile.tempdomain.co.il/site09/api/User/" + route.params.usernameUnique, {
            method: 'PUT',
            body:JSON.stringify(tempObj),
            headers: new Headers({
                'accept': 'application/json; charset=UTF-8',
                'Content-Type': 'application/json; charset=utf8',
            })

        }).then(
            res => {
               console.log(res.status)
                if (res.ok === true)
                    return res.json()
                // else
                //     return () => { throw 'Oops something went wrong with the fam notes you are trying to bring from db..' }
                //  func1(res)
            }
        ).then(
            async (result) => {
                // setFamNotes(result)

                 console.log(result +"success");
        
                 navigation.navigate("All")



            },
            (err) => {
                Alert.alert("", err + "errrorr")

            }
        )
    }
    const handleEdit =async () => {
      if(name!==userObj.first_name ||
        username !== userObj.username ||
        email !== userObj.email ||
        pass !== userObj.password ||
        age !== userObj.age
        ){
            alert("Changes have been made")
        }


        if (pass !== rePass) {
            alert("Passwords does not match")
            return null
        }
        updateUser()
       

    }
    if (username === undefined || famID === undefined) {
        return <AppLoading />
    }
    return (
        <View>

            <Text>Profile Page</Text>
            <TextInput onChangeText={(e) => setName(e)} value={name} placeholder="name" />
            <TextInput onChangeText={(e) => setUser(e)} value={username} placeholder="username" />
            <TextInput onChangeText={(e) => setEmail(e)} value={email} placeholder="email" />
            <TextInput onChangeText={(e) => setPass(e)} value={pass} placeholder="pass" />
            <TextInput onChangeText={(e) => setRePass(e)} value={rePass} placeholder="re-pass" />
            <TextInput onChangeText={(e) => setAge(e)} value={age.toString()} placeholder="age" />

            <View>
                <TouchableOpacity  onPress={()=>{
                    handleEdit()
                   
                    }}>
                    <Text>EDIT</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
