import React, { Fragment, useEffect, useState } from "react"
import { Button } from "reactstrap"

import{
    API_REPORTERIA_INVENTARIOS,
} from '../../../../api/apiTypes'
import { renderToString } from "react-dom/server"
import swal from 'sweetalert'
import { connect } from "react-redux"
//pdf

import { PDFViewer, BlobProvider, pdf, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import InventariosContainer from './InventariosContainer'
import InventariosHeader from './InventariosHeader'
import TablaContainer from './TablaPDF/TablaContainer'
import request from 'superagent'
import superagent from "superagent"
import Cookies from "js-cookie"

const borderColor = '#000000'
const styles = StyleSheet.create({
  row: {
      flexDirection: 'row',
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth:1, 
      borderColor: '#000000',
      height: 20,
      fontStyle: 'bold',
      fontSize: 8,
      flexGrow: 1,
  },
  page: {
        width: "100%",
        height: '100%',
        paddingHorizontal: 35,
        paddingVertical:35,
        paddingBottom:130,  
    },
  primeraFila:{
      marginTop: 15,
      borderTopWidth:1,
      flexDirection: 'row',
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      borderRightWidth: 1,
      borderLeftWidth:1, 
      borderColor: '#000000',
      height: 20,
      fontStyle: 'bold',
      fontSize: 8,
      flexGrow: 1,
  },
  numero: {
      width: '4%',
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: 'center',
  },
  paciente: {
      width: '27%',
      textAlign: 'left',
      paddingLeft: 8,
      paddingRight: 8,
      borderRightColor: borderColor,
      borderRightWidth: 1,
      overflow:"auto"
  },
  comentario: {
      width: '21%',
      textAlign: 'center',
  },
  cantidades: {
      width: '15%',
      borderRightColor: borderColor,
        borderRightWidth: 1,
      textAlign:"center"
      
  },
  cantidad: {
    width: '15%',
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',

},
});

const ImprimirReporteInventarios = props => {
  const [listaInventarios, setListaInventarios] = useState(null)
  const [arregloInventarios, setArregloInventarios] = useState([])
  const [datosCargados, setDatosCargados] = useState(false)
  const [fechaActual, setFechaActual] = useState(null)
  const [horaActual, setHoraActual] = useState(null)
  const [minutosActuales, setMinutosActuales] = useState(null)
  const [segundosActuales, setSegundosActuales] = useState(null)
  const [horaCompleta, setHoraCompleta] = useState(null)
  const [meridiano, setMeridiano] = useState(null)

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
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
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
  
  useEffect(()=>{
      if(props.datos_cargados==true)
      {
          _InicializarServicios()
      }
    
  },[props.datos_cargados])

  useEffect(()=>{
    if(arregloInventarios.length>0)
    {
        console.log("arreglo: ", arregloInventarios)
    }
  },[arregloInventarios])

  useEffect(()=>{
    if(listaInventarios!=null)
    {
        _armarFilasTabla()
    }
  },[listaInventarios])

  useEffect(()=>{
    if(props.datos_cargados==true&&horaCompleta!=null&&fechaActual!=null)
    {
        setDatosCargados(true)
    }
  },[props.datos_cargados, horaCompleta, fechaActual])

const _generarFechaHora=()=>{
    let dia_mes
    let mes_numero = numeroMes+1
    if(diaMes<=9&&diaMes>=1)
    {
        dia_mes="0"+diaMes
    }
    else{
        dia_mes=diaMes
    }
    if(mes_numero>=1&&mes_numero<=9)
    {
        mes_numero="0"+mes_numero
    }

    setFechaActual(dia_mes+"-"+mes_numero+"-"+numeroAño)

    if(minutos<=9&&minutos>=0)
    {
        setMinutosActuales("0"+parseInt(minutos))
    }
    else{
        setMinutosActuales(minutos)
    }
    if(hora<=9&&hora>=0)
    {
        setHoraActual("0"+parseInt(hora))
    }
    else{
        setHoraActual(hora)
    }
    if(segundos<=9&&segundos>=0)
    {
        setSegundosActuales("0"+parseInt(segundos))
    }
    else{
        setSegundosActuales(segundos)
    }
    if(hora<12)
        {
            setMeridiano("AM")
        }
        else{
            setMeridiano("PM")
        }
    setHoraCompleta(horaActual+":"+minutosActuales+":"+segundosActuales+" "+meridiano)
}

const _InicializarServicios=async()=>{
    try{

        let respuesta_reporte_inventarios = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_REPORTERIA_INVENTARIOS);

        console.log("respuesta_wdasdeqwcitas: ", respuesta_reporte_inventarios.body)

        setListaInventarios(respuesta_reporte_inventarios.body)

    }catch(e)
    {
        console.log("Error: e",e)
        swal({
            title:"Error al cargar los servicios",
            icon:"error",
            text:"Ha ocurrido un error al cargar los servicios",
            button:"Aceptar"
        })
    }
}

const _numeracion =(ascendente, prop)=>{

    return function (a, b) {
  
      // items iguales se retornan ordenan igual.
      if (a[prop] === b[prop]) {
          return 0;
      }
      // nulls se ordenan todos de ultimo.
      else if (a[prop] === null) {
          return 1;
      }
      else if (b[prop] === null) {
          return -1;
      }
      // si es ascentende los de menor valor se ordenan primero.
      else if (ascendente) {
          return a[prop] < b[prop] ? -1 : 1;
      }
      // si es descendente los de mayor valor se ordenan primero.
      else { 
          return a[prop] < b[prop] ? 1 : -1;
      }
  
    };
  
  }



const _armarFilasTabla =()=>{  
    _generarFechaHora()
    let etiquetas_armadas = []
    let contador = 0
    let contador_filas = 0
    let componentes = []
    let contador_vacios=0
    let componente = ""
    let bandera_primera_pagina=false
    
   if(listaInventarios.length>0)
    {
        for(let i of listaInventarios)
        {
        contador_filas = 0
        let{insumo, existencias, fecha_vencimiento_proxima, ganancia_lotes, cantidad_utilizada}=i   
        let etiqueta = ""

        contador++
        contador_filas++
            if((contador!=13&&bandera_primera_pagina==false)||(contador<15&&bandera_primera_pagina==true))
            {
                etiqueta = 
                    <View style={styles.row}>
                        <Text style={styles.paciente}>{insumo}</Text>
                        <Text style={styles.cantidades}>{existencias}</Text>
                        <Text style={styles.cantidades}>{cantidad_utilizada}</Text> 
                        <Text style={styles.paciente}>{fecha_vencimiento_proxima}</Text> 
                        <Text style={styles.cantidad}>$ {ganancia_lotes}</Text>
                    </View>
                etiquetas_armadas.push(
                    etiqueta
                )
            }
            else{
            contador = 
            bandera_primera_pagina=true
            etiqueta = 
                    <View style={styles.primeraFila} break>
                        <Text style={styles.paciente}>{insumo}</Text>
                        <Text style={styles.cantidades}>{existencias}</Text>
                        <Text style={styles.cantidades}>{cantidad_utilizada}</Text> 
                        <Text style={styles.paciente}>{fecha_vencimiento_proxima}</Text> 
                        <Text style={styles.cantidad}>$ {ganancia_lotes}</Text>
                    </View>
                etiquetas_armadas.push(
                    etiqueta
                )
            }
        
        } 
        componente = 
        <Page size="LETTER"  style={styles.page} wrap>
                <InventariosHeader
                />
                <TablaContainer
                    etiquetas={etiquetas_armadas}
                />       
        </Page> 

        componentes.push(
            componente
        )
        setArregloInventarios(componentes)
          
    }
    else if(contador_vacios==1)
    {
        let componente = 

        <Page size="LETTER"  style={styles.page} wrap>
                <InventariosHeader
                />
                <Text style={{fontFamily: 'Helvetica-Bold', fontSize:10, marginTop:25}}>  
                No se han encontrado Servicios para hoy: {nombreDia}, {diaMes} de {nombreMes} de {numeroAño}                              
                </Text>       
        </Page> 
        componentes.push(
            componente
        )
        setArregloInventarios(componentes)
    }
    
}

  const _generatePDF = async () => {
      
    const blob = await pdf(<InventariosContainer
                              componentes_armados={arregloInventarios}
                            />
                            ).toBlob();
    const fileURL = URL.createObjectURL(blob);

    window.open(fileURL, "_blank")

  }
 

  return (

    <Fragment>
      
        <Button
          className="btn w-md btn-md btn-warning float-center botonesAccion"
          onClick={() => {
            _generatePDF()
          }}
        >
          <i class="far fa-file-pdf"></i>
          {"   "}
          Imprimir Inventarios
        </Button>
    </Fragment>
  )
}



export default (ImprimirReporteInventarios)
