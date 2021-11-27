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
        height:20,
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
        width: '12.6%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',

    },
    cantidad: {
        width: '12.6%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',

    },
  });

  const TablaHeader = () => (
    <View style={styles.container}>
        <Text style={styles.cantidades}>ID Cita</Text>
        <Text style={styles.cantidades}>Fecha Cita</Text> 
        <Text style={styles.paciente}>Paciente</Text>
        <Text style={styles.cantidades}>Costo{'\n'}Cita</Text> 
        <Text style={styles.cantidades}>Deducible{'\n'}Aplicado</Text> 
        <Text style={styles.cantidades}>Total{'\n'}Pagado</Text> 
        <Text style={styles.cantidad}>Margen{'\n'}Ganancia</Text>
    </View>
  );

  export default TablaHeader
  