import React, {Fragment, useState, useEffect } from 'react';
import{
    Row,
    Col,
    Container,
    Card, CardBody,
    Label,
    TabContent,
    TabPane,
    Spinner
} from 'reactstrap';

import DataTable from '../../DataTable/DataTable'
import PestaniasReporteria from './PestaniasReporteria';
import { columnasTablaCitas, columnasTablaServicios,columnasTablaInventario } from './Json/columnasTabla';
import ImprimirReporteCitas from '../ImprimirReportes/ReporteCitas/ImprimirReporteCitas';
import ImprimirReporteServicios from '../ImprimirReportes/ReporteServicios/ImprimirReporteServicios';
import ImprimirReporteInventarios from '../ImprimirReportes/ReporteInventario/ImprimirReporteInventario';

import swal from 'sweetalert';
import request from 'superagent'

import{
    API_REPORTERIA_CITAS,
    API_REPORTERIA_INVENTARIOS,
    API_REPORTERIA_SERVICIOS
} from '../../../api/apiTypes'

const ReporteriaCitas = props =>{
    

    const[pestaniaActiva, setPestaniaActiva] =useState("1");

    const[listaCitas, setListaCitas] = useState(null);
    const[listaServicios, setListaServicios] = useState(null);
    const[listaInventario, setListaInventario] = useState(null);

    const[filaCita, setFilaCita] = useState([])
    const[filaServicio, setFilaServicio] = useState([])
    const[filaInventario, setFilaInventario] = useState([]);
    const[datosCargados, setDatosCargados] = useState(false)




    useEffect(()=>{
        _inicializar()
    },[])

    useEffect(()=>{
        if(listaCitas != null)
        {
            _formarFilasCitas()
        }
    },[listaCitas])

    useEffect(()=>{
        if(listaServicios != null)
        {
            _formarFilasServicios()
        }
    },[listaServicios])

    useEffect(()=>{
        if(listaInventario != null)
        {
            _formarFilasInventarios()
        }
    },[listaInventario])
    
    const _togglePestania=(valor)=>{
        setPestaniaActiva(valor)
    }

    const _inicializar=async()=>{
        try{

            let respuesta_reporte_citas = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_REPORTERIA_CITAS);

            let respuesta_reporte_servicios = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_REPORTERIA_SERVICIOS);

            let respuesta_reporte_inventarios = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_REPORTERIA_INVENTARIOS);

            console.log("respuesta_citas: ", respuesta_reporte_citas.body)
            console.log("respuesta_servicios: ", respuesta_reporte_servicios.body)
            console.log("respuesta inventarios: ", respuesta_reporte_inventarios.body)

            setListaCitas(respuesta_reporte_citas.body.lista_citas_mes)
            setListaServicios(respuesta_reporte_servicios.body)
            setListaInventario(respuesta_reporte_inventarios.body)
            setDatosCargados(true)

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

    const _formarFilasCitas=()=>{
        let n_filas=[]

        for(let iterador of listaCitas){
            if(iterador != null)
            {
                let n_fila ={...iterador};
                n_filas.push(n_fila)
            }
        }
        setFilaCita(n_filas)
    }

    
    const _formarFilasServicios=()=>{
        let n_filas=[]

        for(let iterador of listaServicios){
            if(iterador != null)
            {
                let n_fila ={...iterador};
                n_filas.push(n_fila)
            }
        }
        setFilaServicio(n_filas)
    }

    const _formarFilasInventarios=()=>{
        let n_filas=[]

        for(let iterador of listaInventario){
            if(iterador != null)
            {
                let n_fila ={...iterador};
                n_filas.push(n_fila)
            }
        }
        setFilaInventario(n_filas)
    }

    return(
        <Fragment>
            <Card>
                <CardBody>
                    <h4>Reporteria</h4>

                    <PestaniasReporteria toggle={_togglePestania} pestaniaActiva={pestaniaActiva} />
                    <TabContent activeTab={pestaniaActiva}>
                        <TabPane tabId="1" className="p-3">
                            <Row>
                               <Col md={10}>
                                    <h5>Reporteria Citas</h5>
                               </Col>
                               <Col md={2}>
                               <ImprimirReporteCitas datos_cargados={datosCargados}/>
                               </Col>
                            </Row> 
                            &nbsp;
                            {listaCitas != null?(
                                <DataTable columnasTabla={columnasTablaCitas} datosTabla={filaCita}/>
                            ):(
                                <center><Spinner color="primary"></Spinner></center>
                            )}
                        </TabPane>
                        <TabPane tabId="2" className="p-3">
                            <Row>
                               <Col md={10}>
                                    <h5>Reporteria Servicios</h5>
                               </Col>
                               <Col md={2}>
                               <ImprimirReporteServicios datos_cargados={datosCargados}/>
                               </Col>
                            </Row> 
                            &nbsp;
                            {listaServicios != null?(
                                <DataTable columnasTabla={columnasTablaServicios} datosTabla={filaServicio}/>
                            ):(
                                <center><Spinner color="primary" /></center>
                            )}
                        </TabPane>

                        <TabPane tabId="3" className="p-3">
                            <Row>
                               <Col md={10}>
                                    <h5>Reporteria Inventarios</h5>
                               </Col>
                               <Col md={2}>
                               <ImprimirReporteInventarios datos_cargados={datosCargados}/>
                               </Col>
                            </Row>
                            &nbsp;
                            {listaInventario != null?(
                                <DataTable columnasTabla={columnasTablaInventario} datosTabla={filaInventario}/>
                            ):(
                                <center><Spinner color="primary" /></center>
                            )}
                        </TabPane>
                    </TabContent>
                    
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default ReporteriaCitas;