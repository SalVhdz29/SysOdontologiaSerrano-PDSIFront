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
    Input
} from 'reactstrap';


import{
    AvForm,
    AvField
} from 'availity-reactstrap-validation'

import Select from 'react-select';

import Cookies from 'js-cookie';

import { DateTime } from 'luxon';

import DateSelector from '../../DateSelector/DateSelector';
import swal from 'sweetalert';

import
{
    API_GUARDAR_EMPLEADO,
    API_ACTUALIZAR_EMPLEADO
} from '../../../api/apiTypes'


const ModalEmpleado = props =>{

    const [modalOpen, setModalOpen ]= useState(false);
    const [deshabilitar, setDeshabilitar] = useState(false);
    const [banderaEditar, setBanderaEditar] = useState(false);

    const [nombresEmpleado, setNombresEmpleado] = useState("");
    const [apellidosEmpleado, setApellidosEmpleado] = useState("");
    const [salario, setSalario] = useState("");
    const[dui, setDui] =useState("");
    const[telefonoContacto, setTelefonoContacto] = useState("");
    const [direccion, setDireccion] = useState("");
    const[fechaNacimiento, setFechaNacimiento] = useState(DateTime.now().minus({years:18}))
    const [fechaIngreso, setFechaIngreso] = useState(DateTime.now());

    useEffect(()=>{
        if(props.editar != null)
        {
            setBanderaEditar(props.editar)
        }
    },[props.editar])

    useEffect(()=>{
        if(props.deshabilitar != null)
        {
            setDeshabilitar(props.deshabilitar)
        }
    },[props.deshabilitar])


    useEffect(()=>{
        if(props.datosEmpleado != null)
        {
            _precargarDatos()
        }
    },[banderaEditar, props.datosEmpleado])

    const _precargarDatos =()=>{
        let{
            nombres_empleado,
            apellidos_empleado,
            fecha_ingreso,
            fecha_nacimiento,
            telefono_contacto,
            dui_empleado,direccion_empleado,
            salario_empleado
        } = props.datosEmpleado;

        let fecha_ingreso_js = new Date(fecha_ingreso)

        fecha_ingreso = DateTime.fromJSDate(fecha_ingreso_js)

        let fecha_nacimiento_js = new Date(fecha_nacimiento)

        fecha_nacimiento = DateTime.fromJSDate(fecha_nacimiento_js)

        setNombresEmpleado(nombres_empleado)
        setApellidosEmpleado(apellidos_empleado)
        setFechaIngreso(fecha_ingreso)
        setFechaNacimiento(fecha_nacimiento)
        setTelefonoContacto(telefono_contacto)
        setDui(dui_empleado)
        setDireccion(direccion_empleado)
        setSalario(salario_empleado)
    }

    const _guardarDatosEmpleado =async()=>{
        try{

            let nombres_empleado = nombresEmpleado;

            let apellidos_empleado = apellidosEmpleado;

            let salario_empleado = salario;
            let dui_empleado = dui;

            let telefono_contacto = telefonoContacto;

            let direccion_empleado = direccion;

            let fecha_nacimiento = new Date(fechaNacimiento);

            let fecha_ingreso = new Date(fechaIngreso);

            if(banderaEditar != true)
            {
                let datos={
                    nombres_empleado,
                    apellidos_empleado,
                    salario_empleado,
                    dui_empleado,
                    telefono_contacto,
                    direccion_empleado,
                    fecha_nacimiento,
                    fecha_ingreso
                }

                console.log("datos: ",datos)

                let token = Cookies.get('token');

                let respuesta_lista_empleados =await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_GUARDAR_EMPLEADO)
                                                            .send(datos)
                                                            .set('Accept', 'application/json')
                                                            .set("Authorization", "Bearer " + token);
    
                console.log("respuesta: ", respuesta_lista_empleados.body);
    
                respuesta_lista_empleados = respuesta_lista_empleados.body;

                if(respuesta_lista_empleados.message == "OK")
                {
                    swal({
                        title:"Empleado Guardado",
                        icon:"success",
                        text:"Empleado guardado con exito",
                        button:"Aceptar"
                    })
                    setModalOpen(false)
                    props.recargarPadre();
                }
            }
            else
            {
                let id_empleado = props.idEmpleado;

                let datos={
                    id_empleado,
                    nombres_empleado,
                    apellidos_empleado,
                    salario_empleado,
                    dui_empleado,
                    telefono_contacto,
                    direccion_empleado,
                    fecha_nacimiento,
                    fecha_ingreso
                }

                console.log("datos: ",datos)

                let token = Cookies.get('token');

                let respuesta_lista_empleados =await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_ACTUALIZAR_EMPLEADO)
                                                            .send(datos)
                                                            .set('Accept', 'application/json')
                                                            .set("Authorization", "Bearer " + token);
    
                console.log("respuesta: ", respuesta_lista_empleados.body);
    
                respuesta_lista_empleados = respuesta_lista_empleados.body;

                if(respuesta_lista_empleados.message == "OK")
                {
                    swal({
                        title:"Empleado Guardado",
                        icon:"success",
                        text:"Empleado guardado con exito",
                        button:"Aceptar"
                    })
                    setModalOpen(false)
                    props.recargarPadre();
                }
            }

        }catch(e)
        {
            console.log("ERROR: ",e)
            swal({
                title:"Error al guardar datos",
                icon:"error",
                text:" Ha ocurrido un error al guardar los datos del usuario",
                button:"Aceptar"
            })
        }
    }

    return(
        <Fragment>
                 <Button 
                    className={props.classNames?(props.classNames):("btn btn-success ")}
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Empleado"
                        )
                    }
                   
                </Button>

                <Modal
                size="lg"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">
                    <h4 className="modal-title mt-0">{deshabilitar != true && banderaEditar != true?("Crear Nuevo Empleado"):(deshabilitar == true?("Ver Empleado"):(banderaEditar == true?("Editar Empleado"):("")))}</h4>
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
                
                <AvForm
                    onValidSubmit={()=>{
                        swal({
                            title:"Guardar Datos de Empleado",
                            icon:"warning",
                            text:"¿Desea guardar los datos del empleado?",
                            buttons:["Cancelar","Aceptar"]
                        }).then(async respuesta =>{

                            if(respuesta)
                            {
                                _guardarDatosEmpleado()
                            }
                        })
                    }}
                >
                <div className="modal-body">

                    <Container fluid={true}>
                    <h5 style={{textDecoration:"underline"}}> Datos del Empleado </h5>

                    <br />

                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label md={4}>Nombres: </Label>
                                <Col>
                                    <AvField
                                        id="nombresIpx"
                                        name="nombresIpx"
                                        value={nombresEmpleado}
                                        disabled={deshabilitar}
                                        type="text"
                                        onChange={e=>{
                                            setNombresEmpleado(e.target.value)
                                        }}
                                        validate={{
                                            required:{value:true, errorMessage:"Obligatorio"}
                                        }}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup row>
                                <Label md={4}>Apellidos: </Label>
                                <Col>
                                    <AvField
                                        id="apellidosIpx"
                                        name="apellidosIpx"
                                        value={apellidosEmpleado}
                                        disabled={deshabilitar}
                                        type="text"
                                        onChange={e=>{
                                            setApellidosEmpleado(e.target.value)
                                        }}
                                        validate={{
                                            required:{value:true, errorMessage:"Obligatorio"}
                                        }}
                                    />
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <FormGroup row>
                                <Label md={4}>Fecha Nacimiento: </Label>

                                <Col>
                                <DateSelector
                                deshabilitar ={deshabilitar == true || banderaEditar == true?(true):(false)}
                                fechaSeleccionada ={fechaNacimiento}
                                cambioFecha={({id, fecha})=>{
                                    let fecha_js = fecha;

                                    let fecha_luxon = DateTime.fromJSDate(fecha_js);

                                    setFechaNacimiento(fecha_luxon)
                                }}
                                />
                                </Col>
                            </FormGroup>
                        </Col>

                        <Col>
                                <FormGroup row>
                                    <Label md={4}>Documento de Identidad: </Label>
                                    <Col>
                                        <AvField
                                            id="duiIpx"
                                            name="duiIpx"
                                            value={dui}
                                            disabled={deshabilitar}
                                            onChange={(e)=>{setDui(e.target.value)}}
                                            validate={{
                                                required:{value:true, errorMessage:"Obligatorio"},
                                                pattern:{value:/(^\d{8})-(\d$)/, errorMessage:"Incorrecto"}
                                            }}
                                        />
                                    </Col>
                                </FormGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <FormGroup row>
                                <Label md={4}> Número de Contacto: </Label>
                                <Col>
                                        <AvField
                                            id="numeroContactoIpx"
                                            name="numeroContactoIpx"
                                            value={telefonoContacto}
                                            disabled={deshabilitar}
                                            onChange={(e)=>{setTelefonoContacto(e.target.value)}}
                                            validate={{
                                                required:{value:true, errorMessage:"Obligatorio"},
                                                pattern:{value:/(^\d{4})-(\d{4})/, errorMessage:"Incorrecto"}
                                            }}
                                        />
                                    </Col>
                            </FormGroup>
                        </Col>
                        <Col>
                                <FormGroup row>
                                    <Label md={4}>Dirección: </Label>
                                    <Col>
                                        <AvField
                                            id="direccionIpx"
                                            name="direccionIpx"
                                            value={direccion}
                                            type="textarea"
                                            disabled={deshabilitar}
                                            onChange={(e)=>{setDireccion(e.target.value)}}
                                            validate={{
                                                required:{value:true, errorMessage:"Obligatorio"},
                                               
                                            }}
                                        />
                                    </Col>
                                </FormGroup>
                        </Col>
                    </Row>

                    <h5 style={{textDecoration:"underline"}}> Datos de Contratación </h5>

                    <br />

                    <Row>
                        <Col md={6}>
                            <FormGroup row>
                                <Label>Fecha Contratación: </Label>

                               <Col>
                               <DateSelector
                                deshabilitar ={deshabilitar}
                                fechaSeleccionada ={fechaIngreso}
                                cambioFecha={({id, fecha})=>{
                                    let fecha_js = fecha;

                                    let fecha_luxon = DateTime.fromJSDate(fecha_js);

                                    setFechaIngreso(fecha_luxon)
                                }}
                                />
                               </Col>
                            </FormGroup>
                        </Col>

                        <Col>
                                <FormGroup row>
                                    <Label>Salario Asignado: </Label>

                                    <Col>
                                        <AvField
                                            id="salarioIpx"
                                            name="salarioIpx"
                                            value={salario}
                                            type="text"
                                            disabled={deshabilitar}
                                            onChange={(e)=>setSalario(e.target.value)}
                                            validate={{
                                                pattern:{value:/^[0-9]+([.][0-9][0-9])$/, errorMessage:"Incorrecto"},
                                                required:{value:true, errorMessage:"Obligatorio"}
                                            }} 
                                        />
                                    </Col>
                                </FormGroup>
                        </Col>
                    </Row>

                    </Container>
                </div>

                <div className="modal-footer">
                    <Row>
                        <Col >
                        {props.deshabilitar?(undefined):(
                        <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              type="submit"
                            >
                             Guardar
                            </Button>
                          </div>
                          )} 
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalOpen(false)}}>Cerrar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                </AvForm>
            </Modal>
        

        </Fragment>
    )
}

export default ModalEmpleado