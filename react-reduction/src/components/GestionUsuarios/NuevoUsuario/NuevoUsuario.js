import React, { Fragment, useEffect, useState } from 'react';
import request from 'superagent';

import{
    FormGroup,
    Button,
    Modal, 
    Container,
    Label,
    Row,
    Col
} from 'reactstrap';


import{
    AvForm,
    AvField
} from 'availity-reactstrap-validation'

import Select from 'react-select';

//Jsons
import { columnasTabla } from './Json/columnasTabla';


//Componentes
import DataTable from '../../DataTable/DataTable';
import EscogerRoles from '../EscogerRoles/EscogerRoles';

const NuevoUsuario = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    const [ rolesAsignados, setRolesAsignados ] = useState([]);

    const [ usuarioActivo, setUsuarioActivo ] = useState(false);

    const [optionsEmpleados, setOptionsEmpleados ] = useState([]);

    const [ empleadoAsignado, setEmpleadoAsignado ]= useState({label:"Seleccione un empleado", value:0});

    const [errorEmpleado, setErrorEmpleado ]= useState("");
    const [errorRoles, setErrorRoles] = useState("");

    const [ defaultValues, setDefaultValues ]= useState({});


    useEffect(()=>{
        
        if(props.isReadOnly)
        {
            _setDefaultValue();
        }
    },[props.isReadOnly])

    useEffect(()=>{
        
        if(props.isEditable)
        {
            _setDefaultValue();
        }
    },[props.isEditable])


    useEffect(()=>{
        if(props.listaEmpleados != undefined && props.listaEmpleados != null)
        {
            _formarOptionsEmpleados();
        }
        
    },[props.listaEmpleados])


    const _setDefaultValue=()=>{
        let nombreUsuarioIpx="";
        let correoElectronicoIpx = "";
        let empleado_asignado={};
        let {nombreUsuario, correoElectronico, usuarioActivo, empleado, roles} = props.defaultValue;
        console.log("default Value", props.defaultValue)
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
            console.log("vine: ",roles);
            roles.map(rol=>{
                rol.marcado=true;

            })
            setRolesAsignados(roles);
        }

        setDefaultValues({nombreUsuarioIpx, correoElectronicoIpx});
    }

    const _registrarUsuario=async(valor_inputs)=>{
            console.log("el valor obtenido", valor_inputs);
            if(empleadoAsignado.value != 0 && empleadoAsignado.value!="0")
            {
                if(rolesAsignados.length!=0)
                {

            

                        let { nombreUsuarioIpx,
                            correoElectronicoIpx,
                            contraseniaIpx} = valor_inputs;

                        
                        console.log("los roles", rolesAsignados);
                        let valor = {};
                        valor.nombre_usuario = nombreUsuarioIpx;
                        valor.correo_electronico =correoElectronicoIpx;
                        valor.contrasenia = contraseniaIpx;
                        valor.usuario_activo = usuarioActivo;
                        valor.roles=rolesAsignados;
                        valor.id_f_empleado = empleadoAsignado.value;
                        valor.nombre_empleado = empleadoAsignado.label;
                        let tipo="";
                        if(props.isEditable)
                        {
                            valor.id_usuario = props.defaultValue.idUsuario;
                            tipo="editarUsuarioLista";
                        }
                        else
                        {
                            tipo="agregarUsuarioLista";
                        }

                    let envio={tipo,valor};
                   

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

        console.log("lo que recibe: ",roles);
        
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
                                                  email: { value: true, errorMessage: "Debe escribir un correo válido"}
                                                }}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                {props.isReadOnly!=true?(
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
                                    ):undefined}

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
                                        <Label>Empleado </Label>
                                                <Select
                                                    value={empleadoAsignado}
                                                    onChange={_cambioEmpleado}
                                                    options={optionsEmpleados}
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