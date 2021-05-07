import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validation';
import firebase from "../utils/firebase";

export default function RegisterForm(props) {

    const { changeForm } = props;
    const [formData, setFormData] = useState(defaultValue);
    const [formError, setFormError] = useState({});

    const register = () => {
        console.log("registrando...")
        let error = {};

        if (!formData.email || !formData.password || !formData.confirmPass) {
            if (!formData.email) error.email = true;
            if (!formData.password) error.password = true;
            if (!formData.confirmPass) error.confirmPass = true;
        }
        else if (!validateEmail(formData.email)) {
            error.email = true;
        }
        else if (formData.password !== formData.confirmPass) {
            error.password = true;
            error.confirmPass = true;
        }
        else if (formData.password.length < 6) {
            error.password = true;
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(formData.email, formData.password)
                .then(() => {
                    console.log("cuenta creada")
                }).catch(() => {
                    setFormError({
                        email: true,
                        password: true,
                        confirmPass: true
                    });
                });
        }
        setFormError(error);
    }


    return (
        <>
            <View style={styles.container}>
                <TextInput
                    style={[styles.input, formError.email && styles.errorInput]}
                    placeholder="Correo electrónico"
                    placeholderTextColor="#000"
                    onChange={(e) => setFormData({ ...formData, email: e.nativeEvent.text })}
                />
                <TextInput
                    style={[styles.input, formError.password && styles.errorInput]}
                    placeholder="Contraseña"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    onChange={(e) => setFormData({ ...formData, password: e.nativeEvent.text })}

                />
                <TextInput
                    style={[styles.input, formError.confirmPass && styles.errorInput]}
                    placeholder="Repetir contraseña"
                    placeholderTextColor="#000"
                    secureTextEntry={true}
                    onChange={(e) => setFormData({ ...formData, confirmPass: e.nativeEvent.text })}
                />
                <TouchableOpacity>
                    <Text style={styles.btnText} onPress={register}>Registrate</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={changeForm}>
                        <Text style={styles.btnText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                
            </View>

        </>
    )
}

function defaultValue() {
    return {
        email: {},
        password: {},
        confirmPass: {}
    }

}

const styles = StyleSheet.create({
    btnText: {
        color: "#CB6500",
        fontSize: 20,
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
        borderColor: "#F4CCA4"
    },
    login: {
        flex: 1,
        justifyContent: "space-between",

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

})