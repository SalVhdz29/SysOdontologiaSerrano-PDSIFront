import React, {Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DataTable from '../DataTable/DataTable';
import{
    Button,
    Container,
    Card,
    CardBody,
    Row, Col,
    FormGroup,
    ButtonToggle,
} from 'reactstrap';
import Cookies from 'js-cookie';
import request from 'superagent';
import { useHistory, useLocation } from 'react-router-dom';
import {DateTime} from 'luxon'
import { FaEye, FaPencilAlt, FaCalendarAlt , FaPlay, FaTrashAlt} from 'react-icons/fa';
//Componente
import CitaModal from './CitaModal/CitaModal';
import EstimarServicios from './EstimarServicios/EstimarServicios';
//actions
import{
    insertarListaCitasHoy,
    insertarListaPacientesActivos,
    insertarListaServiciosActivos,
} from '../../store/actions'
//api
import{
    API_OBTENER_SERVICIOS_ACTIVOS,
    API_GUARDAR_CITA_PACIENTE,
    API_OBTENER_CITAS_DIA,
    API_OBTENER_PACIENTES_ACTIVOS,
    API_OBTENER_EXPEDIENTE,
    API_OBTENER_SERVICIOS,
} from '../../api/apiTypes'
//Json
import { columnasTabla } from './Json/columnasTabla';
import { servicios_json } from '../../constants/servicios';
import swal from 'sweetalert';

const CitasPorAtender = props =>{

    const [ filasCitas, setFilasCitas ] = useState([]);
    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        _obtenerServicios()
    },[])

    useEffect(()=>{
        if(props.citas_atender_state.listaCitas != null)
        {
            _armarFilas()
        }
    },[props.citas_atender_state.listaCitas])

    const _obtenerServicios =async()=>{
        try
        { let token= Cookies.get('token');
            let respuesta_servicios = await request.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_SERVICIOS_ACTIVOS)
                                                    .set('Accept', 'application/json')
                                                    .set("Authorization", "Bearer " + token) 

            let respuesta_citas_del_dia = await request.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_CITAS_DIA)
                                                    .set('Accept', 'application/json')
                                                    .set("Authorization", "Bearer " + token) 
            
            let respuesta_pacientes_activos = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EXPEDIENTE)
                                                    .set('Accept', 'application/json')
                                                    .set("Authorization", "Bearer " + token);

            console.log("entre al obtener servicios: ", respuesta_servicios.body, "; ",respuesta_citas_del_dia.body, ", ", respuesta_pacientes_activos.body);

            props.insertarListaServiciosActivos(respuesta_servicios.body);
            props.insertarListaPacientesActivos(respuesta_pacientes_activos.body);
            props.insertarListaCitasHoy(respuesta_citas_del_dia.body);
        }
        catch(e)
        {
            console.log("error: ",e);
            swal({
                title:"Error al traer los servicios",
                icon:"error",
                text:"Ha ocurrido un error al obtener los servicios",
                button:"Aceptar"
            })
        }
    }

    const _armarFilas = () =>{
        let n_filas =[]

        for(let it of props.citas_atender_state.listaCitas)
        {
            if(it != null)
            {

                let { 
                    id_cita,
                    id_servicio,
                    hora_entrada,
                    nombre_persona,
                    nombre_servicio,
                    id_expediente,
                    precio_servicio,
                    precio_serviciox5
                } = it;
                
                hora_entrada= DateTime.fromISO(hora_entrada);
                let operaciones =(
                    <div className="btn-group">
                        <FormGroup>
                            <CitaModal
                                citaReprogramar={it}
                                deshabilitar={true}
                                textoBoton={<FaEye />}
                            />{' '}
                            </FormGroup>

                            <FormGroup>
                                <ButtonToggle
                                    color="primary"
                                    onClick={()=>{_atenderCita(it)}}
                                >
                                    <FaPlay />
                                </ButtonToggle>
                            </FormGroup>

                            <FormGroup>
                            <CitaModal
                                citaReprogramar={it}
                                deshabilitar={false}
                                textoBoton={<FaCalendarAlt />}
                                color="warning"
                                recargarServicios={_obtenerServicios}
                            />
                        </FormGroup>

                        <FormGroup>
                                <ButtonToggle
                                    color="danger"
                                    onClick={()=>{_cancelarCita(it)}}
                                >
                                    <FaTrashAlt />
                                </ButtonToggle>
                            </FormGroup>

                    </div>
                    );

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

                let n_fila={
                    id_cita,
                    nombre_persona,
                    nombre_servicio,
                    precio_servicio,
                    hora_entrada: hora_entrada_f,
                    operaciones
                    

                }
                n_filas.push(n_fila)
            }
        }

        setFilasCitas(n_filas)
    }

    const _atenderCita = (datos)=>{
        console.log("datos: ", datos);
        let {id_cita, id_expediente, nombre_persona, id_servicio, nombre_servicio} = datos

        swal({
            title:"Atender Cita",
            icon:"warning",
            text:"¿Desea atender esta cita?",
            button:"Aceptar"
        }).then(async respuesta =>{

            if(respuesta == true)
            {
                history.push({
                    pathname: "/Diagnostico",
                    state:{
                       id_cita,
                       id_expediente,
                       nombre_persona,
                       id_servicio,
                       nombre_servicio
                    }
                });
            }
        })
     
    }

    const _cancelarCita =(id_cita)=>{

    }

    return(
        <Fragment>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Citas Por Atender </h4><br/>

                  <Row>
                    <Col md={4} xs={12}>
                        <CitaModal textoBoton="Agendar Cita" recargarServicios={_obtenerServicios} />
                    </Col>
           
                  </Row>
                  <Row>
                      <Col md={12} xs={12}>
                             <DataTable datosTabla={filasCitas} columnasTabla={columnasTabla}
                                /> 
                      </Col>
                  </Row>
                </CardBody>
        </Card>
        </Fragment>
    )
}
const mapStateToProps = reducers =>{
    return{
        citas_atender_state: reducers.CitasPorAtenderReducer,
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        insertarListaCitasHoy: (lCitas)=>dispatch(insertarListaCitasHoy(lCitas)),
        insertarListaPacientesActivos: (lPacientes)=>dispatch(insertarListaPacientesActivos(lPacientes)),
        insertarListaServiciosActivos: (lServicios)=>dispatch(insertarListaServiciosActivos(lServicios)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CitasPorAtender);