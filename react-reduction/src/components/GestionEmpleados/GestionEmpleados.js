import React, {Fragment, useState, useEffect} from 'react';

import DataTable from '../DataTable/DataTable';

import{
    Row,Col,
    Card, CardBody,
    Container,
    Label,
    Spinner,
    ButtonGroup
} from 'reactstrap';

import{
    AvField,
    AvForm
} from 'availity-reactstrap-validation';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

import{
    API_OBTENER_EMPLEADOS
} from '../../api/apiTypes'

import { columnasTabla } from './Json/columnasTabla';
import request from 'superagent';
import Cookies from 'js-cookie';
import swal from 'sweetalert';

import SwitchEmpleadoEstado from './SwitchEmpleadoEstado/SwitchEmpleadoEstado';
import ModalEmpleado from './ModalEmpleado/ModalEmpleado';

const GestionEmpleados = props =>{

    const[filas, setFilas] = useState([]);
    const[listaEmpleados, setListaEmpleados] = useState(null);

    useEffect(()=>{
        _inicializar();
    },[])

    useEffect(()=>{
        if(listaEmpleados != null)
        {
            _formarFilas()
        }
    },[listaEmpleados])


    const _inicializar=async()=>{
        try{
            let token = Cookies.get('token');

            let respuesta_lista_empleados =await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EMPLEADOS)
                                                        .set('Accept', 'application/json')
                                                        .set("Authorization", "Bearer " + token);

            console.log("respuesta: ", respuesta_lista_empleados.body);

            respuesta_lista_empleados = respuesta_lista_empleados.body;

            setListaEmpleados(respuesta_lista_empleados);
        }catch(e)
        {
            console.log("Error: ",e);
            swal({
                title:"Error al cargar los servicios",
                icon:"error",
                text:"Ha ocurrido un error al cargar los servicios",
                button:"Aceptar"
            })
        }
    }

    const _formarFilas =()=>{
        let n_filas =[];

        for(let it of listaEmpleados)
        {
            let{
                id_empleado,
                nombre_empleado,
                fecha_ingreso,
                salario_empleado,
                usuario_nombre,
                usuario_roles,
                con_usuario,
                empleado_activo
            } = it;

            let estado_empleado =(
                <Fragment>
                    <SwitchEmpleadoEstado id_empleado={id_empleado} empleado_activo={empleado_activo} actualizarPadre={()=>{
                        setListaEmpleados(null)
                        _inicializar()
                    }} />
                </Fragment>
            )

            let fecha_js_ingreso = new Date(fecha_ingreso)

            let day = fecha_js_ingreso.getDate();
            let month = fecha_js_ingreso.getMonth();
            let year = fecha_js_ingreso.getFullYear();

            if(day < 10)
            {
                day = "0"+day
            }

            if(month < 10)
            {
                month = "0"+month
            }

            fecha_ingreso = day + " - "+ month + " - "+ year

            let usuario_roles_jsx=(
                <ul>
                    {usuario_roles.map(ite=>{
                        if(ite != null)
                        {
                            return(
                                <li>{ite.nombre_usuario}</li>
                            )
                        }
                    })}
                </ul>
            )

            if(con_usuario != true)
            {
                usuario_nombre ="Sin Usuario"

                usuario_roles_jsx="Sin Roles"
            }

            let operaciones =(
                <Fragment>
                   <ButtonGroup>
                        <ModalEmpleado classNames="btn btn-sm btn-success" mensajeBoton={<FaEye />} idEmpleado={id_empleado} datosEmpleado={it} deshabilitar={true}
                            editar={false}  recargarPadre={()=>{
                                setListaEmpleados(null)
                                _inicializar()
                            }}
                        />&nbsp;
                        <ModalEmpleado classNames="btn btn-sm btn-warning" mensajeBoton={<FaPencilAlt />} idEmpleado={id_empleado} datosEmpleado={it} deshabilitar={false}
                            recargarPadre={()=>{
                                setListaEmpleados(null)
                                _inicializar()
                            }}
                            editar={true} 
                        />
                    </ButtonGroup> 
                </Fragment>
            )

            let n_fila={
                id_empleado,
                nombre_empleado,
                fecha_ingreso,
                salario: parseFloat(salario_empleado).toFixed(2),
                estado_empleado,
                usuario_roles: usuario_roles_jsx,
                usuario_nombre,
                operaciones
            }

            n_filas.push(n_fila)
        }

        setFilas(n_filas)
    }


    return(
        <Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Card>
                        <CardBody>
                                <h4><i className="fa fa user"></i> &nbsp;&nbsp; Gestión de Empleados</h4>

                                <Row>
                                    <Col>
                                        <ButtonGroup>
                                            <ModalEmpleado 
                                             recargarPadre={()=>{
                                                setListaEmpleados(null)
                                                _inicializar()
                                            }}
                                            />
                                        </ButtonGroup>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                       {listaEmpleados != null?(
                                            <DataTable
                                            columnasTabla={columnasTabla}
                                            datosTabla={filas}
                                        />
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

export default GestionEmpleados;