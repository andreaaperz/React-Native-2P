import React, {useState} from 'react';
import {View,StyleSheet, Text, Image, Button} from 'react-native';


export default function Resumen(){
    //const { mail, cantidad, interes, iva, mensual} = props;

    return(
        <View style={styles.view}>
           <Text>Email: </Text>
           <Text>Cantidad:</Text>
           <Text>Interes:</Text>
           <Text>IVA:</Text>
           <Text>PagoMensual:</Text>
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