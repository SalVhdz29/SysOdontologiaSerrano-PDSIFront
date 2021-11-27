import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderColor: '#000000',
        borderRightWidth: 1,
        borderLeftWidth:1, 
        borderBottomWidth: 1,
        height: 20,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        fontSize: 8,
    },
    total: {
        width: '44%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
        fontFamily: 'Helvetica-Bold',
    },
    cantidades: {
        width: '12.6%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
    },
    comentario: {
        width: '26%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
    },
    total: {
        width: '52.2%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    cantidad: {
        width: '12.6%',
        textAlign: 'center',
        fontFamily: 'Helvetica-Bold',
    },
  });


const TablaFooter = props => {
    return(    
        <View style={styles.row}>
            <Text style={styles.total}>Totales</Text>
            <Text style={styles.cantidades}>$ {props.costo_cita}</Text>
            <Text style={styles.cantidades}>$ {props.deducible_cita}</Text>
            <Text style={styles.cantidades}>$ {props.pago_cita}</Text>
            <Text style={styles.cantidad}>$ {props.margen_cita}</Text>
        </View>
    )
};
  
  export default TablaFooter