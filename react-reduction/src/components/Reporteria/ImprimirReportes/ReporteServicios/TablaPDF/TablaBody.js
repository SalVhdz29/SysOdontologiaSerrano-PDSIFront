import React, {Fragment, useState, useEffect} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 12,
        fontStyle: 'bold',
        fontSize: 10,
        flexGrow: 1,
        width: '30%',
        alignContent:"right",
        marginLeft: 590,

    },
    col_datos: {
        flexDirection: 'col',
        height: 25,
        fontStyle: 'bold',
        fontSize: 10,
        flexGrow: 1,
        textAlign:"right",

    },
    totales: {
        width: '30%',
        textAlign:"left",
        fontFamily: 'Helvetica',
        
    },
    valores_totales: {
        width: '30%',
        textAlign:"right",
        fontFamily: 'Helvetica-Bold',

        
    },
  });


const TablaBody = props => {
    return (
        
    <Fragment>
        {/* {rows} */}
        {props.etiquetas!=null?
        (props.etiquetas.map(iterator=>{
            return(
                <View> 
                    {iterator}
                </View>
            )
        }))
        :
        (
            <View>
                <Text>No hay datos</Text>
            </View>
        )}
    </Fragment> )
};
  
export default TablaBody