import React, {useState} from 'react';
import {View, Modal, StyleSheet, Text, Image, Button} from 'react-native';


export default function Resumen(props){
    const { mail, cantidad, interes, iva, mensual} = props;

    return(
        <View style={styles.view} >
           <Text>Email: {mail}</Text>
           <Text>Cantidad: {cantidad}</Text>
           <Text>Interes: {interes}</Text>
           <Text>IVA: {iva}</Text>
           <Text>Pago Mensual: {mensual}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems: 'center',
    },
    logo:{
        width: "80%",
        height: 240,
        marginTop:50,
        marginBottom:50
    }
})