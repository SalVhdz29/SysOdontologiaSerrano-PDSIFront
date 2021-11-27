import React, { Fragment, useEffect, useState } from 'react';
//Librerias
import request from 'superagent';

import{
    FormGroup,
    Button,
    Modal, 
    Container,
    Label,
    Row,
    Col,
    Input,
    ButtonToggle,
    Spinner
} from 'reactstrap';


import{
    AvForm,
    AvField
} from 'availity-reactstrap-validation'

import Select from 'react-select';

import Cookies from 'js-cookie';

import { DateTime } from 'luxon';
import { FaEye } from 'react-icons/fa';

import DataTable from '../../DataTable/DataTable';

import { columnasTabla } from './Json/columnasTabla';

import{
    API_HISTORIAL_CUENTA
} from '../../../api/apiTypes';
import swal from 'sweetalert';

const HistorialCuenta = props=>{

    
    const [modalOpen, setModalOpen ]= useState(false);

    const [listaHistorial, setListaHistorial] = useState(null);

    const[filas, setFilas] = useState([]);

    useEffect(()=>{
       if(modalOpen == true)
       {
        _inicializar()
       }else
       {
           _reestablecerCampos()
       }
    },[modalOpen])

    useEffect(()=>{
        if(listaHistorial != null)
        {
            _formarFilas();
        }
    },[listaHistorial])

    const _inicializar=async()=>{
        try{

            let token = Cookies.get('token');

            let datos={id_expediente: props.idExpediente}

            console.log("datos: ", datos)

            let respuesta_historial =await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_HISTORIAL_CUENTA)
                                                        .send(datos)
                                                        .set('Accept', 'application/json')
                                                        .set("Authorization", "Bearer " + token);

            console.log("respuesta: ", respuesta_historial.body);

            respuesta_historial = respuesta_historial.body;

            setListaHistorial(respuesta_historial);

        }catch(e)
        {
            console.log("Error: ",e)
            swal({
                title:"Error al cargar el servicio",
                icon:"error",
                text:"Ha ocurrido un error al cargar el servicio",
                button:"Aceptar"
            })
        }
    }

    const _reestablecerCampos=()=>{
        setListaHistorial(null);
    }

    const _formarFilas=()=>{
        let n_filas=[]

        for(let iterador of listaHistorial)
        {
            if(iterador != null)
            {
                let{
                    id_sesion,
                    nombre_servicio,
                    fecha_sesion,
                    cantidad_pagada,
                    total_factura
                   } = iterador;


                   let diferencia = parseFloat(total_factura) - parseFloat(cantidad_pagada)


                   diferencia = parseFloat(diferencia).toFixed(2)

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

                   fecha_sesion = day+ " - "+month+" - "+year

                   let color="green"

                   if(diferencia > 0)
                   {
                    color="red"
                   }

                   diferencia =(
                       <span style={{backgroundColor:color}}>{diferencia}</span>
                   )

                   let n_fila={
                       id_sesion,
                       nombre_servicio,
                       fecha_sesion,
                       cantidad_pagada,
                       total_factura,
                       diferencia
                   }

                   n_filas.push(n_fila)
            }
        }

        setFilas(n_filas)
        
    }



    return(

        <Fragment>
            <ButtonToggle
            color="success"
            onClick={()=>{setModalOpen(true)}}
            >
                <FaEye />
            </ButtonToggle>

            <Modal
                size="lg"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">
                    <h4 className="modal-title mt-0">Historial de Cuenta</h4>
                    <button
                        type="button"
                        onClick={() => {
                            setModalOpen()
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                
                <div className="modal-body">
                    <Container fluid={true}>
                        <h5>Historial de Cuenta para Paciente:<b> {props.nombrePaciente != null?(props.nombrePaciente):("")}</b> </h5>

                        <Row>
                            <Col>
                                {listaHistorial != null?(
                                    <DataTable columnasTabla={columnasTabla} datosTabla={filas} />
                                ):(
                                    <center>
                                        <Spinner color="primary" />
                                    </center>
                                )}
                            </Col>
                        </Row>

                    </Container>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col >

                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalOpen(false)}}>Cerrar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>

        </Fragment>
    )
}

export default HistorialCuenta;