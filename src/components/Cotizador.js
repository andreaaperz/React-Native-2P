import React, {useState, useEffect} from 'react';
import {LogBox, View,StyleSheet, Text,  TextInput} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Resumen from './Resumen';


LogBox.ignoreAllLogs();

export default function Cotizador(){

    const [cantidad, setCantidad] = useState(0);
    const [sueldo, setSueldo] = useState(0);
    const [meses, setMeses] = useState(0);
    const [interes, setInteres] = useState('');
    const [mensual, setMensual] = useState(0);
    const [iva, setIVA] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState([ {label: '3 meses', value: 3}]);

    const [isCaluclated,setIsCaluclated] = useState(true);

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
          setIsCaluclated(true);
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
  
    return(
        <View>
        <View style={styles.background}>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Cantidad"
                    keyboardType="numeric"
                    placeholderTextColor="#1687a7"
                    style={styles.marginText}
                    onChange={(e) => setCantidad(e.nativeEvent.text)}/>
            </View>
            <View style={styles.margin}>
                <TextInput 
                    placeholder="Sueldo"
                    keyboardType="numeric"
                    placeholderTextColor="#1687a7"
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
            <View style={styles.boton}>
                <Text 
                onPress={() => calculate()} 
                style={styles.textboton}>
                    Ingresar
                </Text>
            </View>
        </View>
    </View>
    );
}


const styles = StyleSheet.create({
    background: {
        backgroundColor:"#FFF",
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
        borderColor:"#d3e0ea",
        borderRadius: 14,
        paddingVertical:2
    },
    marginText: {
        paddingHorizontal: 7
    },
    boton: {
        marginHorizontal:110,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        backgroundColor:"#f25287",
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
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
        marginLeft: -5,
        marginRight: -5,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        backgroundColor: '#fff',
    },
});
 

