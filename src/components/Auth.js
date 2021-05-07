import React, {useState} from 'react';
import {View,StyleSheet, ImageBackground,Text, Image, Button} from 'react-native';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function Auth(){
    const [isLogin,setIsLogin] = useState(true);

    const changeForm = ()=>{
        setIsLogin(!isLogin);
    }

    return(
        <View style={styles.view}>
            <ImageBackground source={require('../assets/5329122.jpg')} style={styles.image}>
            {isLogin ?(
                <LoginForm changeForm={changeForm}/>
            ):(
                <RegisterForm changeForm={changeForm}/>
            )}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
})