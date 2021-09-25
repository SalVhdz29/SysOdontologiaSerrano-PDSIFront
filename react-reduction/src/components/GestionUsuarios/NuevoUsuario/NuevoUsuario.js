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

import superagent from 'superagent';

import{
    API_CREAR_USUARIO,
    API_ACTUALIZAR_USUARIO
} from '../../../api/apiTypes';

//Jsons
import { columnasTabla } from './Json/columnasTabla';


//Componentes
import DataTable from '../../DataTable/DataTable';
import EscogerRoles from '../EscogerRoles/EscogerRoles';
import swal from 'sweetalert';

//Componente
const NuevoUsuario = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    const [ rolesAsignados, setRolesAsignados ] = useState([]);

    const [ usuarioActivo, setUsuarioActivo ] = useState(false);

    const [optionsEmpleados, setOptionsEmpleados ] = useState([]);

    const [ empleadoAsignado, setEmpleadoAsignado ]= useState({label:"Seleccione un empleado", value:0});

    const [ nuevaContrasenia, setNuevaContrasenia ] = useState(false);

    const [errorEmpleado, setErrorEmpleado ]= useState("");
    const [errorRoles, setErrorRoles] = useState("");

    const [ defaultValues, setDefaultValues ]= useState({});



    //CICLO DE VIDA
    useEffect(()=>{

        if(props.isReadOnly == true || props.isEditable == true)
        {
            //console.log("El default Value: ", props.defaultValue);
            _setDefaultValue();
        }

    },[props.defaultValue])


    useEffect(()=>{
        if(props.listaEmpleados != undefined && props.listaEmpleados != null)
        {
            _formarOptionsEmpleados();
        }
        
    },[props.listaEmpleados])

    useEffect(()=>{
        setNuevaContrasenia(false);
    },[modalOpen])
    //FIN CICLO DE VIDA

    //Función que da valores por defecto a los campos en el formulario.
    const _setDefaultValue=()=>{
        let nombreUsuarioIpx="";
        let correoElectronicoIpx = "";
        let empleado_asignado={};
        let {nombreUsuario, correoElectronico, usuarioActivo, empleado, roles} = props.defaultValue;
        // console.log("default Value", props.defaultValue)
        if(nombreUsuario){
            nombreUsuarioIpx = nombreUsuario;
        }
        if(correoElectronico)
        {
            correoElectronicoIpx = correoElectronico;
        }
        if(usuarioActivo)
        {
            setUsuarioActivo(usuarioActivo);
        }
        if(empleado)
        {
            empleadoAsignado.label = empleado.label;
            empleadoAsignado.value= empleado.value;
            setOptionsEmpleados([empleadoAsignado]);
            setEmpleadoAsignado(empleadoAsignado);
            
        }

        if(roles)
        {
            //console.log("vine: ",roles);
            let roles_asig = [];
            roles.map(rol=>{
                let rol_pivote={...rol};
                rol_pivote.marcado=true;
                roles_asig.push(rol_pivote);

            })
            setRolesAsignados(roles_asig);
        }

        setDefaultValues({nombreUsuarioIpx, correoElectronicoIpx});
    }

    const _registrarUsuario=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);
            if(empleadoAsignado.value != 0 && empleadoAsignado.value!="0")
            {
                let token= Cookies.get('token');

                if(rolesAsignados.length!=0)
                {
                    let contrasenia="";

                    let { nombreUsuarioIpx,
                        correoElectronicoIpx} = valor_inputs;

                    if(props.isEditable == true && nuevaContrasenia == true)
                    {
                        let { nuevaContraseniaIpx } = valor_inputs;
                        contrasenia = nuevaContraseniaIpx
                    }
                    else
                    {
                        let {contraseniaIpx} = valor_inputs;
                        contrasenia = contraseniaIpx
                    }
                        
                        //console.log("los roles", rolesAsignados);
                        let valor = {};
                        valor.nombre_usuario = nombreUsuarioIpx;
                        valor.correo_electronico =correoElectronicoIpx;
                        valor.editar_contrasenia=nuevaContrasenia;
                        valor.contrasenia = contrasenia;
                        valor.usuario_activo = usuarioActivo;
                        valor.roles=rolesAsignados;
                        valor.id_f_empleado = empleadoAsignado.value;
                        valor.nombre_empleado = empleadoAsignado.label;
                        let tipo="";
                        if(props.isEditable)
                        {
                            valor.id_usuario = props.defaultValue.idUsuario;

                            try{
                                let respuesta_usuario_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_ACTUALIZAR_USUARIO)
                                .set('Accept', 'application/json')
                                .set("Authorization", "Bearer " + token)
                                .send(valor)

                                if(respuesta_usuario_creado.body.message == "OK")
                                {
                                    swal({
                                        title:"Usuario Actualizado",
                                        text:"usuario actualizado con éxito",
                                        icon:"success",
                                        button:"Aceptar"
                                    });
                                }
                                else{
                                    swal({
                                        title:"Error al actualizar el usuario ",
                                        text:respuesta_usuario_creado.body.message,
                                        icon:"error",
                                        button:"Aceptar"
                                    });
                                }

                            }catch(e){
                                console.log(e);
                                swal({
                                    title:"Error al Editar datos de usuario",
                                    text: e.errorMessage,
                                    icon: "error",
                                    button:"Aceptar"
                                });
                            }
                        }
                        else
                        {
                            try{

                                let respuesta_usuario_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CREAR_USUARIO)
                                .set('Accept', 'application/json')
                                .set("Authorization", "Bearer " + token)
                                .send(valor)

                                if(respuesta_usuario_creado.body.message == "OK")
                                {
                                    swal({
                                        title:"Usuario Creado",
                                        text:"usuario creado con éxito",
                                        icon:"success",
                                        button:"Aceptar"
                                    });
                                }
                                else{
                                    swal({
                                        title:"Error al crear el usuario ",
                                        text:respuesta_usuario_creado.body.message,
                                        icon:"error",
                                        button:"Aceptar"
                                    });
                                }

                            }catch(e)
                            {
                                console.log(e);
                                swal({
                                    title:"Error al crear datos de usuario",
                                    text: e.errorMessage,
                                    icon: "error",
                                    button:"Aceptar"
                                });
                            }
                           
                        }
                    tipo="actualizarListaEmpleados";
                    let envio={tipo};
                    await props.cambioDatos(envio);
                    tipo="actualizarListaUsuarios";
                    envio={tipo};
                    await props.cambioDatos(envio);
                    _limpiarFormulario();
                    setModalOpen(false);
                }
                else{
                    setErrorRoles("Debe escoger al menos un rol para este usuario.");
                }
            }
            else{
                setErrorEmpleado("Seleccione un empleado para este usuario.");
            }
      
 

    }

    const _validacionEjemplo=(value, ctx, input, cb) =>{
        if("palabra" == value)
        {
            return true;
        }
        else{
            return "no dice palabra";
        }
    }

    const _asignarRoles = (roles) =>{

        //console.log("lo que recibe: ",roles);
        
        setRolesAsignados(roles);
        if(roles.length!=0)
        {
            setErrorRoles("");
        }
    }

    const _cambiarEstadoActivo = ()=>
    {
        setUsuarioActivo(!usuarioActivo);
    }

    const _formarOptionsEmpleados = ()=>{

        let options_empleados=[];
        let default_option={};
    
        default_option={label:"Seleccione un empleado", value:0};
        
    
        options_empleados.push(default_option);
        props.listaEmpleados.map(empleado_it =>{
            let option={
                label: empleado_it.nombre_empleado,
                value: empleado_it.id_empleado
            };

            options_empleados.push(option);
        })
       
        setOptionsEmpleados(options_empleados);
    }

    const _cambioEmpleado = (value)=>{
        setEmpleadoAsignado(value);
        if(value.value != 0)
        {
            setErrorEmpleado("");
        }
    }

    const _limpiarFormulario =()=>{
        setRolesAsignados([]);
        setEmpleadoAsignado({label:"Seleccione un empleado", value:0});
        setNuevaContrasenia(false);
    }

    const _cambiarNuevaContrasenia =()=>{
        setNuevaContrasenia(!nuevaContrasenia);
    }

    const _unicidadCorreoElectronico = (value, ctx, input, cb)=>{
        let id_usuario =0;
        let validacion=true;
        if(props.defaultValue != null && props.defaultValue != undefined)
        {
            id_usuario = props.defaultValue.idUsuario;
            console.log("id_recurso: ", id_usuario);
        }

            props.correos.length != 0?(()=>{
                let coincidencias = props.correos.filter(correo =>correo.correo_electronico == value && correo.id_usuario != id_usuario);
                if(coincidencias.length != 0)
                {
                    // setRutaRepetida(true);
                   
                    validacion= "correo ya registrado";
                }   
                else{
                    // setRutaRepetida(false);
        
                    validacion= true;
                }
            })():(()=>{
                //setRutaRepetida(false);
                validacion= true
            })()

        return validacion;
    }




    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
         
                <Button 
                    className={props.classNames?(props.classNames):("btn btn-success ")}
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Usuario"
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
                    <h4 className="modal-title mt-0">Crear nuevo usuario</h4>
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
                    onValidSubmit={(e,v)=>{_registrarUsuario(v)}}
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Ingrese el nombre de Usuario</b></Label>
                                            <AvField
                                                id="nombreUsuarioIpx"
                                                name="nombreUsuarioIpx"
                                                // label="Ingrese Nombre de Usuario"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: salher"
                                                type="text"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                    <Label><b>Ingrese el Correo Electrónico</b></Label>
                                    <br />
                                            <AvField
                                                id="correoElectronicoIpx"
                                                name="correoElectronicoIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: pablo@correo.com"
                                                type="text"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  email: { value: true, errorMessage: "Debe escribir un correo válido"},
                                                  myValidation: _unicidadCorreoElectronico
                                                }}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                {props.isReadOnly!=true && props.isEditable != true?(
                                    <Col md={6}>
                                    <Label><b>Ingrese la Contraseña</b></Label>
                    
                                            <AvField
                                                id="contraseniaIpx"
                                                name="contraseniaIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                //placeholder="ej: pablo@correo.com"
                                                type="password"
                                               
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  minLength: { value: 8, errorMessage: "La contraseña debe tener mínimo 8 caracteres."}
                                                }}
                                            />
                                    <Label><b>Vuelva a ingresar la contraseña</b></Label>

                                            <AvField
                                                id="confirmContraseniaIpx"
                                                name="confirmContraseniaIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                //placeholder="ej: pablo@correo.com"
                                                type="password"
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  match: { value:'contraseniaIpx', errorMessage: "Las contraseñas no coinciden."}
                                                }}
                                            />

                                    </Col>
                                    ):(
                                       props.isEditable?(
                                        <Col md={6}>
                                            <Label check >
                                                <Input type="checkbox" onChange={_cambiarNuevaContrasenia} value={nuevaContrasenia}/>
                                                {' '} Nueva Constraseña
                                            </Label>

                                            <br /> <br />
                                            {
                                                nuevaContrasenia?(
                                                    <Fragment>
                                                        <Label><b>Ingrese la Nueva Contraseña</b></Label>
                        
                                                        <AvField
                                                            id="nuevaContraseniaIpx"
                                                            name="nuevaContraseniaIpx"
                                                            // label="Ingrese Correo Electrónico"
                                                            value=""
                                                            className="form-control"
                                                            //placeholder="ej: pablo@correo.com"
                                                            type="password"
                                                        
                                                            validate={{
                                                            required: { value: true, errorMessage: "Obligatorio."},
                                                            minLength: { value: 8, errorMessage: "La contraseña debe tener mínimo 8 caracteres."}
                                                            }}
                                                        />
                                                        <Label><b>Vuelva a ingresar la contraseña</b></Label>

                                                                <AvField
                                                                    id="confirmNuevaContraseniaIpx"
                                                                    name="confirmNuevaContraseniaIpx"
                                                                    // label="Ingrese Correo Electrónico"
                                                                    value=""
                                                                    className="form-control"
                                                                    //placeholder="ej: pablo@correo.com"
                                                                    type="password"
                                                                    validate={{
                                                                    required: { value: true, errorMessage: "Obligatorio."},
                                                                    match: { value:'nuevaContraseniaIpx', errorMessage: "Las contraseñas no coinciden."}
                                                                    }}
                                                                />
                                                    </Fragment>
                                                ):(
                                                    undefined
                                                )
                                            }
                                   
    
                                        </Col>
                                       ):(
                                           undefined
                                       )
                                    )}

                                    <Col md={6}>
                                    {/* Switch */}
                                    <Label><b>Estado de usuario</b></Label>
                                    <center>
                                        <div
                                            className="custom-control custom-switch custom-switch-md mb-3"
                                            dir="ltr"
                                        >
                                            <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={"nuevoUsuarioSwitch"}
                                            name={"nuevoUsuarioSwitch"}
                                            checked={usuarioActivo}
                                            onClick={_cambiarEstadoActivo}
                                            disabled={props.isReadOnly?true:false}

                                            />
                                            <label
                                            className="custom-control-label"
                                            htmlFor={"nuevoUsuarioSwitch"}
                                            >
                                
                                            </label>
                                        </div>
                                 </center>

                                  {/* fin switch */}
                                    <br /><br />
                                    {props.isReadOnly!=true?(
                                    <>
                                   <EscogerRoles 
                                        submitRoles={_asignarRoles}
                                        rolesAsignados={rolesAsignados}
                                   />
                                   <p id="errorEscogerRoles" style={{color:'red'}}>{errorRoles}</p>
                                   </>
                                   ):(undefined)}

                                    </Col>
                                </Row>
                                {props.isReadOnly!=true?(
                                <Row>
                                    <Col md={12}>
                                        <Label>Empleado: </Label>
                                                <Select
                                                    value={empleadoAsignado} 
                                                    onChange={_cambioEmpleado}
                                                    options={optionsEmpleados}
                                                    isDisabled={props.isEditable?true:false}
                                                />
                                                <p style={{color:"red"}}>{errorEmpleado}</p>
                                    </Col>
                                </Row>
                                ):(undefined)}
                                
                                <Row>
                                    <Col md={12}>
                                        { rolesAsignados.length!=0?
                                        <div id="divTablaRoles">
                                            <DataTable datosTabla={rolesAsignados} columnasTabla={columnasTabla} />
                                        </div>:
                                        undefined
                                        }
                                    </Col>
                                </Row>
                           
                        </Container>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col >
                        {props.isReadOnly?(undefined):(
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
export default NuevoUsuario;