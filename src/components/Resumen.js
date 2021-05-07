import React, {useState} from 'react';
import {View, Modal, StyleSheet, Text, Image, Button} from 'react-native';


export default function Resumen(props){
    const { mail, cantidad, interes, iva, mensual, isCaluclated} = props;

    return(
        <View style={styles.content}>
        <View style={styles.boxResult}>
          <Text style={styles.title}>Detalle Préstamo</Text>
          <View style={styles.dataResult}>
            <Text>Email: {mail}</Text>
            <Text>Cantidad: {cantidad}</Text>
            <Text>Interes: {interes}</Text>
            <Text>IVA: {iva}</Text>
            <Text>Pago Mensual: {mensual}</Text>
          </View>
        </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 40
  },
  boxResult: {
    padding: 25
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    color: '#0E4F12',
    fontSize: 15
  },
  error: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
    color: "#D98B03",
  },
  dataResult: {
    backgroundColor: '#E2B464',
    padding: 30,
    borderRadius: 25,
  },
  labels: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  datar: {
    flexDirection: 'row',
    justifyContent: 'center'

  }
});