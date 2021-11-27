import React, {useState, useEffect} from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerName: {
        fontSize: 11,
        color: '#000000',
        textAlign: 'left',
        fontWeight: "bold ",
        paddingLeft:5,
        fontFamily: 'Helvetica-Bold',  
    },
    headerSecond: {
        color: '#000000',
        fontSize: 10,
        textAlign: 'left',
        paddingLeft:5,
        
    },
    container: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        flexWrap: 'wrap',
    },

});



// Create Document Component
const InventariosHeader = (props) => {
    const fechaComoCadena = new Date()
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ]
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ]
  const numeroDia = fechaComoCadena.getDay()
  const diaMes = fechaComoCadena.getDate()
  const numeroMes = fechaComoCadena.getMonth()
  const numeroAño = fechaComoCadena.getFullYear()
  const nombreDia = dias[numeroDia]
  const nombreMes = meses[numeroMes]

  const hora = fechaComoCadena.getHours()
  const minutos = fechaComoCadena.getMinutes()
  const segundos = fechaComoCadena.getSeconds()

    return(
        <View  fixed
            render={({ pageNumber, totalPages }) => {
                    return (
                        <View style={styles.container}>
                            <View style={{
                            flexDirection: 'row'}}>
                                <View style={{
                                        flexDirection: 'row'}}>
                                    
                                    <View style={{
                                        flexDirection: 'col', 
                                        paddingTop:5}}>
                                   <Text>Reporte de Inventarios. Fecha: {diaMes}-{numeroMes+1}-{numeroAño}, Hora {hora>=0&&hora<=9?("0"+hora):(hora)}:{minutos>=0&&minutos<=9?("0"+minutos):(minutos)}:{segundos>=0&&segundos<=9?("0"+segundos):(segundos)} {hora>=0&&hora<=9?("AM"):("PM")}</Text>
                                  <Text></Text> 
                                    </View>
                                </View> 
                            </View>
                        </View>  
                    )
                
            }}
            />

    )
    

};

export default InventariosHeader;