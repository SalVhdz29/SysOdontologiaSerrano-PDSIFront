import React,{Fragment, useState, useEffect} from 'react';

import{
    Row,
    Col,
    Card,
    CardBody,
    Label,
    Container,
    Spinner,
    ButtonGroup
} from 'reactstrap'

import{
    AvField,
    AvForm
} from 'availity-reactstrap-validation'
import request from 'superagent';
import Cookies from 'js-cookie';

import DataTable from '../DataTable/DataTable';

import { columnasTabla } from './Json/columnasTabla';

import{
    API_MONITOREO_CUENTAS
} from '../../api/apiTypes';
import swal from 'sweetalert';

import HistorialCuenta from './HistorialCuenta/HistorialCuenta';

const MonitoreoCuentas = props =>{
    const[listaCuentas, setListaCuentas] = useState(null);
    const[filas, setFilas] = useState([]);

    useEffect(()=>{
        _inicializar()
    },[])

    useEffect(()=>{
        if(listaCuentas != null)
        {   
            _formarFilas()
        }
    },[listaCuentas])

    const _inicializar=async()=>{
        try{
            let token = Cookies.get('token');

            let respuesta_lista_cuentas =await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_MONITOREO_CUENTAS)
                                                        .set('Accept', 'application/json')
                                                        .set("Authorization", "Bearer " + token);

            console.log("respuesta: ", respuesta_lista_cuentas.body);

            respuesta_lista_cuentas = respuesta_lista_cuentas.body;

            setListaCuentas(respuesta_lista_cuentas);
        }catch(e)
        {
            console.log("Error ==>",e)
            swal({
                title:"Error al cargar los servicios",
                icon:"error",
                text:"Ha ocurrido un error al cargar los servicios, informar al depto de informática"
            })
        }
    }

    const _formarFilas = () =>{
        let n_filas=[]

        for(let iterador of listaCuentas)
        {
            if(iterador != null)
            {
                let{
                    id_expediente,
                    nombre_paciente,
                    documento_identidad,
                    numero_de_contacto,
                    estado_cuenta,
                    saldo,
                    fecha_ultima_sesion
                } = iterador;

                    saldo = parseFloat(parseFloat(saldo).toFixed(2))
                    saldo = saldo *(-1);

                    let color ="green";
                    if(saldo<0)
                    {
                        color="red";
                    }


                    saldo = parseFloat(saldo).toFixed(2)
  

                let saldo_jsx =(
                    <Fragment>
                        <span style={{color:color}}><center>{saldo}</center></span>
                    </Fragment>
                )
                
                if(fecha_ultima_sesion != "Sin Registro")
                {
                    let fecha_js=new Date(fecha_ultima_sesion)

                    let day = fecha_js.getDate();

                    let moth = fecha_js.getMonth();

                    let year = fecha_js.getFullYear();

                    if(day<10)
                    {
                        day="0"+day;
                    }

                    if(moth<10)
                    {
                        moth="0"+moth
                    }

                    fecha_ultima_sesion = day +" - "+ moth+" - "+year
                }
                



                let operaciones=(
                    <Fragment>
                        <ButtonGroup>
                            <HistorialCuenta
                                idExpediente={id_expediente}
                                nombrePaciente={nombre_paciente}
                            />
                        </ButtonGroup>
                    </Fragment>
                )

                let n_fila=
                {
                    id_expediente,
                    nombre_paciente,
                    documento_identidad,
                    numero_de_contacto,
                    estado_cuenta,
                    saldo: saldo_jsx,
                    fecha_ultima_sesion,
                    operaciones
                }

                n_filas.push(n_fila)
            } 
        }

        setFilas(n_filas)
    }
    return(
        <Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Card>
                        <CardBody>
                            <h4>Monitoreo de Cuentas</h4>

                            <Row>
                                <Col></Col>
                            </Row>

                            <Row>
                                <Col>
                                    {listaCuentas != null?(
                                        <DataTable columnasTabla={columnasTabla} datosTabla={filas} />
                                    ):(
                                        <center>
                                               <Spinner color="primary" />
                                           </center>
                                    )}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </Fragment>
    )
}

export default MonitoreoCuentas;