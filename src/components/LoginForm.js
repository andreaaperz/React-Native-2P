import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import {validateEmail} from "../utils/validation";
import firebase from '../utils/firebase';

export default function LoginForm(props) {

    const { changeForm } = props;

    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});

    const login = ()=>{
        let error ={};
        if(!formData.email || !formData.password){
            console.log("Error 1");
            if(!formData.email) error.email = true;
            if(!formData.password) error.password = true;
        }else if(!validateEmail(formData.email)){
            console.log("Error 2");
            error.email=true;
        }else{
            firebase.auth().signInWithEmailAndPassword(formData.email,formData.password)
            .then(()=>{
                console.log("ok");
            })
            .catch(()=>{
                setFormError({
                    email:true,
                    password:true
                });
            });
        }
        setFormError(error);
    };

    const onChange=(e,type)=>{
        setFormData({...formData,[type]:e.nativeEvent.text});
    };

    return (
        <>
        <View style={styles.container}>
        <TextInput
                style={[styles.input, formError.email && styles.errorInput]}
                placeholder="Correo electrónico"
                placeholderTextColor="#000"
                onChange={(e)=>onChange(e,"email")}
            />
            <TextInput
                style={[styles.input,formError.password && styles.errorInput]}
                placeholder="Contraseña"
                secureTextEntry={true}
                placeholderTextColor="#000"
                onChange={(e)=>onChange(e,"password")}
            />

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnT}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnT}>Registrate</Text>
            </TouchableOpacity>
            
        </View>
            
        </>
    );
}

function defaultValue() {
    return {
        email: "",
        password: ""
    }

}

const styles = StyleSheet.create({
    btnT: {
        color: "#CB6500",
        fontSize: 20
    },
    input: {
        height: 40,
        color: "#000",
        marginBottom: 25,
        width: "80%",
        backgroundColor: "#F4CCA4",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#F4CCA4",
    },
    login: {
        flex: 1,
        justifyContent: "space-between",
        marginBottom: 10
    },
    errorInput: {
        borderColor: "#940c0c"
    },
    container: {
    flex: 3,
    flexDirection: "column",
    justifyContent: 'center', //Centered vertically
    alignItems: 'center',
    }
});