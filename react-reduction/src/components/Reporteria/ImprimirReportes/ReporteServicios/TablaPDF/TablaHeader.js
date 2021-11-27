import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#000000',
        borderRightWidth: 1,
        borderLeftWidth:1, 
        borderTopWidth:1,
        borderBottomWidth: 1,
        height:32,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize: 8,
        /* flexWrap: 'wrap', */
    },
    numero: {
        width: '4%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',


    },
    paciente: {
        width: '27%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        borderRightColor: borderColor,
        borderRightWidth: 1,

    },
    comentario: {
        width: '21%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',

    },
    cantidades: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',

    },
    cantidad: {
        width: '15%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',

    },
  });

  const TablaHeader = () => (
    <View style={styles.container}>
        <Text style={styles.paciente}>Servicio</Text>
        <Text style={styles.cantidades}>Costo por{'\n'}Servicio</Text>
        <Text style={styles.cantidades}>Precio{'\n'}Servicio</Text> 
        <Text style={styles.cantidades}>Realizado{'\n'}por{'\n'}mes</Text> 
        <Text style={styles.cantidades}>Total{'\n'}Deducible{'\n'}Aplicado</Text> 
        <Text style={styles.cantidad}>Margen de{'\n'}Ganancia {'\n'}Acumulado</Text>
    </View>
  );

  export default TablaHeader
  