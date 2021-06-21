import React, { Fragment, useEffect, useState } from 'react'; 

//Librerias
import request from 'superagent';
import Cookies from 'js-cookie';
import superagent from 'superagent';

//ApiTypes
import {
    API_CREAR_ROL,
    API_ACTUALIZAR_ROL
  } from '../../../api/apiTypes';

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

//Componentes
import DataTable from '../../DataTable/DataTable';
import EscogerPermisos from '../EscogerPermisos/EscogerPermisos';
import swal from 'sweetalert'; 

//Json
import {columnasTabla} from './Json/ColumnasTabla';


const NuevoRol = props =>{ 
 
    const [modalOpen, setModalOpen ]= useState(false); 

    const [ permisosAsignados, setPermisosAsignados ] = useState([]);

    const [optionsRoles, setOptionsRoles ] = useState([]);

    const [ rolActivo, setRolActivo ] = useState(false);

    const [errorPermisos, setErrorPermisos] = useState("");

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
        if(props.listaRoles != undefined && props.listaRoles != null)
        {
            _formarOptionsRoles();
        }
        
    },[props.listaRoles])
    //FIN CICLO DE VIDA
 
    //Función que da valores por defecto a los campos en el formulario.
    const _setDefaultValue=()=>{
        let nombreRolIpx="";
        let descripcionRolIpx = "";
        let {nombreRol, descripcionRol, rolActivo, permisos} = props.defaultValue;
        // console.log("default Value", props.defaultValue)
        if(nombreRol){
            nombreRolIpx = nombreRol;
        }
        if(descripcionRol)
        {
            descripcionRolIpx = descripcionRol;
        }
        if(rolActivo)
        {
            setRolActivo(rolActivo);
        }
        if(permisos)
        {
            //console.log("vine: ",permisos);
            let permisos_asig = [];
            permisos.map(permiso=>{
                let permiso_pivote={...permiso};
                permiso_pivote.marcado=true;
                permisos_asig.push(permiso_pivote);

            })
            setPermisosAsignados(permisos_asig);
        }

        setDefaultValues({nombreRolIpx, descripcionRolIpx});
    }

    const _registrarRol=async(valor_inputs)=>{
        //console.log("el valor obtenido", valor_inputs);
        let token= Cookies.get('token'); 

            if(permisosAsignados.length!=0)
            {

                let { nombreRolIpx,
                    descripcionRolIpx} = valor_inputs;
                    
                    //console.log("los permisos", permisosAsignados);
                    let valor = {};
                    valor.nombre_rol = nombreRolIpx;
                    valor.descripcion_rol =descripcionRolIpx;
                    valor.rol_activo = rolActivo;
                    valor.permisos=permisosAsignados;
                    let tipo="";

                    if(props.isEditable)
                    {
                        valor.id_rol = props.defaultValue.idRol;

                        try{ 
                            let respuesta_rol_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_ACTUALIZAR_ROL) 
                            .set('Accept', 'application/json') 
                            .set("Authorization", "Bearer " + token) 
                            .send(valor) 

                            if(respuesta_rol_creado.body.message == "OK") 
                            { 
                                swal({ 
                                    title:"Rol Actualizado", 
                                    text:"Rol actualizado con éxito", 
                                    icon:"success", 
                                    button:"Aceptar" 
                                }); 
                            } 
                            else{ 
                                swal({ 
                                    title:"Error al actualizar rol ", 
                                    text:respuesta_rol_creado.body.message, 
                                    icon:"error", 
                                    button:"Aceptar" 
                                }); 
                            } 

                        }catch(e){ 
                         //   console.log(e); 
                            swal({ 
                                title:"Error al editar datos de rol", 
                                text: e.errorMessage, 
                                icon: "error", 
                                button:"Aceptar" 
                            }); 
                        } 

                    }
                    else
                    {
                        try{ 
 
                            let respuesta_rol_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CREAR_ROL) 
                            .set('Accept', 'application/json') 
                            .set("Authorization", "Bearer " + token) 
                            .send(valor) 

                            if(respuesta_rol_creado.body.message == "OK") 
                            { 
                                swal({ 
                                    title:"Rol Creado", 
                                    text:"Rol creado con éxito", 
                                    icon:"success", 
                                    button:"Aceptar" 
                                }); 
                            } 
                            else{ 
                                swal({ 
                                    title:"Error al crear rol ", 
                                    text:respuesta_rol_creado.body.message, 
                                    icon:"error", 
                                    button:"Aceptar" 
                                }); 
                            } 

                        }catch(e) 
                        { 
                       //     console.log(e); 
                            swal({ 
                                title:"Error al crear datos de rol", 
                                text: e.errorMessage, 
                                icon: "error", 
                                button:"Aceptar" 
                            }); 
                        } 

                    }

                tipo="actualizarListaRoles"; 
                let envio={tipo};

                await props.cambioDatos(envio);
                _limpiarFormulario();
                setModalOpen(false);
            }
            else{
                setErrorPermisos("Debe escoger al menos un permiso para este rol.");
            }
    }

    const _asignarPermisos = (permisos) =>{

        //console.log("lo que recibe: ",permisos);
        
        setPermisosAsignados(permisos);
        if(permisos.length!=0)
        {
            setErrorPermisos("");
        }
    }

    const _cambiarEstadoActivo = ()=>
    {
        setRolActivo(!rolActivo);
    }

    const _formarOptionsRoles = ()=>{

        let options_roles=[];
        let default_option={};
    
        default_option={label:"Seleccione un rol", value:0};
        
    
        options_roles.push(default_option);
        props.listaRoles.map(rol_it =>{
            let option={
                label: rol_it.nombre_rol,
                value: rol_it.id_rol
            };

            options_roles.push(option);
        })
       
        setOptionsRoles(options_roles);
    }

    const _limpiarFormulario =()=>{
        setPermisosAsignados([]);
    }

    return( 
        <Fragment> 
            {/* <FormGroup className="float-right"> */} 
                <Button  
                    className="btn btn-success" 
                    onClick={()=>{setModalOpen(true)}} 
 
                > 
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Rol"
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
                    <h4 className="modal-title mt-0">Crear nuevo rol</h4> 
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
                            onValidSubmit={(e,v)=>{_registrarRol(v)}}
                            model={defaultValues}
                            > 
                <div className="modal-body"> 
                        <Container fluid={true}> 
                            
                                <Row> 
                                    <Col md={6}> 
                                        <FormGroup> 
                                            <Label><b>Ingrese el nombre de Rol</b></Label> 
                                            <AvField 
                                                id="nombreRolIpx" 
                                                name="nombreRolIpx" 
                                                value="" 
                                                className="form-control" 
                                                placeholder="Ingrese rol" 
                                                type="text" 
                                                disabled={props.isReadOnly?true:false}
                                                validate={{ 
                                                  required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
                                            />         
                                        </FormGroup> 
                                    </Col>  
                                    <Col md = {6}>
                                        {/*switch*/}
                                        <center><Label><b>Rol Activo:</b></Label></center>
                                        <center>
                                        <div
                                            className="custom-control custom-switch custom-switch-md mb-3"
                                            dir="ltr"
                                        >
                                            <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={"nuevoRolSwitch"}
                                            name={"nuevoRolSwitch"}
                                            checked={rolActivo}
                                            onClick={_cambiarEstadoActivo}
                                            disabled={props.isReadOnly?true:false}
                                            />
                                            <label
                                            className="custom-control-label"
                                            htmlFor={"nuevoRolSwitch"}
                                            >
                                
                                            </label>
                                        </div>
                                        </center>
                                    </Col>  
                                </Row>
                                <Row>
                                    <Col md={6}> 
                                        <FormGroup> 
                                            <Label><b>Ingrese la descripcion del Rol</b></Label> 
                                            <AvField 
                                                id="descripcionRolIpx" 
                                                name="descripcionRolIpx" 
                                                value="" 
                                                className="form-control" 
                                                placeholder="Ingrese descripcion" 
                                                type="text" 
                                                disabled={props.isReadOnly?true:false}
                                                validate={{ 
                                                  required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
                                            /> 
                                        </FormGroup> 
                                    </Col>
                                    <Col>
                                    <br /><br />
                                    {props.isReadOnly!=true?(
                                    <>
                                   <EscogerPermisos 
                                        submitPermisos={_asignarPermisos} 
                                        permisosAsignados={permisosAsignados}
                                   />
                                   <p id="errorEscogerPermisos" style={{color:'red'}}>{errorPermisos}</p>
                                   </>
                                   ):(undefined)}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        { permisosAsignados.length!=0?
                                        <div id="divTablaPermisos">
                                            <DataTable datosTabla={permisosAsignados} columnasTabla={columnasTabla} />
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
                                        className="btn btn-secondary btn-md w-md"
                                        type="submit"
                                        color = "success"
                                    >
                                    Guardar
                                    </Button>
                                </div>
                                    )} 
                                </Col>
                                <Col>
                                    <div className="mt-3">
                                    <Button className="btn btn-danger btn-md w-md " color="danger" onClick={()=>{setModalOpen(false)}}>Cerrar</Button>
                                    </div>
                                </Col>
                                </Row>
                                </div>            
                </AvForm> 
 
            </Modal> 
        </Fragment> 
    ) 
} 
export default NuevoRol;