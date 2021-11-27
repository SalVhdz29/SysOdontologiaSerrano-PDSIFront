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
        <Text style={styles.paciente}>Insumo</Text>
        <Text style={styles.cantidades}>Existencias</Text>
        <Text style={styles.cantidades}>Cantidad{'\n'}Utilizada</Text> 
        <Text style={styles.paciente}>Fecha de Vencimiento{'\n'}más proxima (Lote)</Text> 
        <Text style={styles.cantidad}>Ganancia sobre{'\n'}Existencia</Text>
    </View>
  );

  export default TablaHeader
  