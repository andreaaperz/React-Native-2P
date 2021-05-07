import React, {useState, useEffect} from 'react';
import {LogBox, View,StyleSheet, Text, Button,  TextInput, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import firebase from '../utils/firebase';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Resumen from './Resumen';


LogBox.ignoreAllLogs();

export default function Cotizador(props){

    const {mail } = props;
    const [cantidad, setCantidad] = useState(0);
    const [sueldo, setSueldo] = useState(0);
    const [meses, setMeses] = useState(0);
    const [interes, setInteres] = useState('');
    const [mensual, setMensual] = useState(0);
    const [iva, setIVA] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([ {label: '3 meses', value: 3}]);

    const [isCaluclated,setIsCaluclated] = useState('#fff');

    useEffect(()=>{}, 
    
    [cantidad, sueldo, meses]);
  
    const calculate = () => {
      if (!cantidad){
        setErrorMessage('No has ingresado ninguna cantidad');
      } else if(!sueldo){
        setErrorMessage('añade los intereses');
      }else if(!meses){
        setErrorMessage('añade los meses');
      }else {
          if(sueldo > 0 && sueldo <= 10000){
            const i = 2 / 100;
            const pmensual = (cantidad * (1 + i)) / meses;
            const civa = pmensual * i;
            setInteres('2%');
            setMensual(pmensual);
            setIVA(civa);
          }else if (sueldo > 10000 && sueldo <= 20000){
            const i = 4 / 100;
            const pmensual = (cantidad * (1 + i)) / meses;
            const civa = pmensual * i;
            setInteres('4%');
            setMensual(pmensual);
            setIVA(civa);
          }else if(sueldo > 20000){
            const i = 6 / 100;
            const pmensual = (cantidad * (1 + i)) / meses;
            const civa = pmensual * i;
            setInteres('6%');
            setMensual(pmensual);
            setIVA(civa);
          }
          setIsCaluclated("#000");
      }
    };

    const calcSueldo = (sueldoo) => {
        setSueldo(sueldoo);
        if(sueldo > 20000){
            setData([ {label: '3 meses', value: 3}, {label: '6 meses', value: 6}, {label: '9 meses', value: 9}, {label: '12 meses', value: 12}, {label: '24 meses', value: 24}])
            console.log("entró 3")
          }
         else if (sueldo > 10000 && sueldo <= 20000){
            setData([ {label: '3 meses', value: 3}, {label: '6 meses', value: 6}, {label: '9 meses', value: 9}])
            console.log("entró 2")
          }
          else if(sueldo > 0 && sueldo <= 10000){
            console.log("entró")
            setData([ {label: '3 meses', value: 3}, {label: '6 meses', value: 6}])
          }
    }

    const logout = ()=>{
        firebase.auth().signOut();
      }
  
    return(
        <View style={styles.background}>
            <Text style={{fontSize: 30, alignSelf: 'center', marginTop: 28, marginBottom: 20,fontWeight: 'bold'}}>Cotización</Text>
            <View style={styles.viewForm}>
            <View style={styles.margin}>
                
                <TextInput 
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    placeholderTextColor="#fff"
                    style={styles.marginText}
                    onChange={(e) => setCantidad(e.nativeEvent.text)}/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Sueldo"
                    keyboardType="numeric"
                    placeholderTextColor="#fff"
                    style={styles.marginText}
                    onChange={(e) => calcSueldo(e.nativeEvent.text)}/>
            </View>
            <RNPickerSelect
                style={picketSelectStyles}
                onValueChange={(value) => setMeses(value)}
                placeholder={{
                    label: 'Seleccióna los plazos...',
                    value: null,
                }}
                items={data}
            />
            </View>
            
            <View style={styles.boton}>
                <Text 
                onPress={() => calculate()} 
                style={styles.textboton}>
                    CALCULAR
                </Text>
            </View>
            
            <Resumen mail = {mail} cantidad = {cantidad} interes={interes} iva={iva} mensual ={mensual} isCaluclated = {isCaluclated}></Resumen>
            <View style={styles.viewFooter}>
                <TouchableOpacity style={styles.button} onPress={logout}>
                    <Text style={styles.text}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    viewFooter: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#D98B03',
        height: 100,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button: {
        backgroundColor: '#E2B464',
        padding: 16,
        borderRadius: 20,
        width: '75%',
      },
      text: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
      },
    viewForm: {
        bottom: 0,
        width: '85%',
        paddingHorizontal: 40,
        backgroundColor: '#D98B03',
        borderRadius: 30,
        marginLeft: 30,
        justifyContent: 'center',
      },
    cerrar: {
        backgroundColor: "#7f2f52"
    },
    background: {
        backgroundColor:"#ffe5d8",
        height:"100%",
    },
    image:{
        width:"100%",
        height:"54%"
    },
    title: {
        fontSize:30,
        fontFamily:"SemiBold",
        alignSelf:"center",
    },
    subtitle: {
        fontFamily:"SemiBold",
        marginHorizontal:55,
        textAlign:'center',
        fontSize: 14,
        marginTop:3,
        opacity:0.5
    },
    margin:{
        flexDirection:"row",
        alignItems:"center",
        marginHorizontal:55,
        borderWidth:2,
        marginTop:17,
        paddingHorizontal:6,
        borderColor:"#fff",
        borderRadius: 14,
        paddingVertical:2
    },
    marginText: {
        paddingHorizontal: 7,
        color: "#fff"
    },
    boton: {
        marginHorizontal:110,
        marginBottom: 50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#E2B464",
        paddingVertical:10,
        borderRadius: 7
    },
    textboton: {
        color:"white",
        fontFamily:"SemiBold"
    },
    registrateBoton: {
        alignSelf:"center",
        color:"#1687a7",
        fontFamily:"SemiBold",
        paddingVertical:5
    }
})

const picketSelectStyles = StyleSheet.create({
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 9,
        borderWidth: 0.5,
        borderColor: 'pink',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
});
 

