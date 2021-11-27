import React, {Fragment, useState, useEffect} from 'react';
import{
    Row,Col,
    Card,CardBody,
    Container,
    Label, FormGroup,
    Spinner,
    ButtonGroup,
    ButtonToggle
} from 'reactstrap';
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import request from 'superagent';
import { DateTime } from 'luxon';

import DataTable from '../DataTable/DataTable';
import CitaModal from '../CitasPorAtender/CitaModal/CitaModal';
import { FaEye, FaPencilAlt, FaCalendarAlt , FaPlay, FaTrashAlt} from 'react-icons/fa';

import { columnasTabla } from './Json/columnasTabla';
import{
    API_OBTENER_CITAS_AGENDADAS,
    API_CANCELAR_CITAS
} from '../../api/apiTypes';


const CitasAgendadas = props =>{
    const[listaCitas, setListaCitas] = useState(null);
    const[filas, setFilas] = useState([]);

    useEffect(()=>{
        _inicializar()
    },[])

    useEffect(()=>{
        if(listaCitas != null)
        {
            _formarFilas()
        }
    },[listaCitas])

    const _inicializar = async()=>{

        try{
            let token= Cookies.get('token');
            let respuesta_citas = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_CITAS_AGENDADAS)
                                                    .set('Accept', 'application/json')
                                                    .set("Authorization", "Bearer " + token) 
            

            respuesta_citas = respuesta_citas.body;

            console.log("respuesta: ", respuesta_citas)

            setListaCitas(respuesta_citas);


        }catch(e)
        {
            console.log("Error: ",e)
            swal({
                title:"Error al cargar los servicios",
                icon:"error",
                text:"Ha ocurrido un error al cargar los servicios",
                button:"Aceptar"
            })
        }
    }

    const _formarFilas=()=>{
        let n_filas=[]

        for(let iterador of listaCitas){
            if(iterador != null){
                let{
                    id_cita,
                    id_servicio,
                    hora_entrada,
                    nombre_persona,
                    nombre_servicio,
                    id_expediente,
                    precio_servicio,
                    precio_serviciox5,
                    detalles_sesion,
                    numero_de_contacto,
                    saldo,hora_salida,
                    fecha_sesion
                } = iterador;
                saldo = saldo*(-1);
                let color="green";

                if(saldo < 0)
                {
                    color="red"
                }

                saldo = parseFloat(saldo).toFixed(2)

                saldo = <span style={{color:color}}><center>{saldo}</center></span>

                hora_entrada= DateTime.fromISO(hora_entrada);

                let hora_entrada_f=hora_entrada.hour+":"

                if(hora_entrada.minute < 10)
                {
                    hora_entrada_f+="0"+hora_entrada.minute
                }
                else{
                    hora_entrada_f+=hora_entrada.minute
                }

                if(hora_entrada.hour > 12)
                {
                    hora_entrada_f+="PM"
                }
                else{
                    hora_entrada_f+="AM"
                }

                hora_salida= DateTime.fromISO(hora_salida);

                let hora_salida_f=hora_salida.hour+":"

                if(hora_entrada.minute < 10)
                {
                    hora_salida_f+="0"+hora_salida.minute
                }
                else{
                    hora_salida_f+=hora_salida.minute
                }

                if(hora_salida.hour > 12)
                {
                    hora_salida_f+="PM"
                }
                else{
                    hora_salida_f+="AM"
                }

                let fecha_js = new Date(fecha_sesion)

                let day = fecha_js.getDate();
                let month = fecha_js.getMonth();
                let year = fecha_js.getFullYear();
    
                if(day < 10)
                {
                    day = "0"+day
                }
    
                if(month < 10)
                {
                    month = "0"+month
                }
    
                fecha_sesion = day + " - "+ month + " - "+ year

                if(detalles_sesion === "" || detalles_sesion === " " || detalles_sesion == null)
                {
                    detalles_sesion="N/A"
                }

                let operaciones =(
                    <Fragment>
                        <ButtonGroup>
                            <FormGroup>
                            <CitaModal
                                citaReprogramar={iterador}
                                deshabilitar={false}
                                textoBoton={<FaCalendarAlt />}
                                color="warning"
                                recargarServicios={()=>{
                                    setListaCitas(null)
                                    _inicializar()
                                }}
                            />
                            </FormGroup>
                           &nbsp;
                             <FormGroup>
                             <ButtonToggle
                                    color="danger"
                                    size="xs"
                                    onClick={()=>{
                                        swal({
                                            title:"Cancelar Cita",
                                            icon:"warning",
                                            text:"¿Desea cancelar la cita?",
                                            buttons:["Cancelar","Aceptar"]
                                        }).then(async respuesta=>{
                                            if(respuesta)
                                            {
                                                _cancelarCita(id_cita)
                                            }
                                        })
                                    }}
                                >
                                    <FaTrashAlt />
                                </ButtonToggle>
                             </FormGroup>
                        </ButtonGroup>
                    </Fragment>
                )


                let n_fila={
                    id_cita,
                    id_servicio,
                    hora_entrada,
                    nombre_persona,
                    nombre_servicio,
                    detalles_sesion,
                    numero_de_contacto,
                    hora_entrada: hora_entrada_f,
                    hora_salida: hora_salida_f,
                    precio_servicio,
                    saldo,
                    fecha_sesion,
                    operaciones
                    
                }
                n_filas.push(n_fila)
            }
        }

        setFilas(n_filas);
    }

    const _cancelarCita=async(id_sesion)=>{
        try{

            let datos={id_sesion}

            let token= Cookies.get('token');
            let respuesta_cancelar = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CANCELAR_CITAS)
                                                    .send(datos)
                                                    .set('Accept', 'application/json')
                                                    .set("Authorization", "Bearer " + token) 
            

            respuesta_cancelar = respuesta_cancelar.body;

            console.log("respuesta: ", respuesta_cancelar)

            if(respuesta_cancelar.message == "OK")
            {
                swal({
                    title:"Cita Cancelada",
                    icon:"success",
                    text:"Cita cancelada correctamente",
                    button:"Aceptar"
                })

                setListaCitas(null)
                _inicializar()
            }


        }catch(e)
        {
            console.log("Error: ",e)
            swal({
                title:"Error al cancelar la cita",
                icon:"error",
                text:"Ha ocurrido un error al cancelar la cita",
                button:"Aceptar"
            })
        }
    }

    return(
        <Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Card>
                        <CardBody>
                            <h4>Citas Agendadas</h4>

                            {listaCitas != null?(
                                <DataTable columnasTabla={columnasTabla} datosTabla={filas} />
                            ):(
                                <center>
                                    <Spinner color="primary" />
                                </center>
                            )}

                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default CitasAgendadas;