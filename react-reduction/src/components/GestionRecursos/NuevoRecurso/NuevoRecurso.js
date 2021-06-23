import React, { Fragment, useEffect, useState } from "react"
//Librerias
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

import Cookies from 'js-cookie';

import superagent from 'superagent';

import{
    API_CREAR_RECURSO,
    API_ACTUALIZAR_RECURSO,
    API_LISTA_TIPOS_RECURSO

}from '../../../api/apiTypes';

//Jsons
import { columnasTablaRecursos } from '../Json/columnasTablaRecursos';

//Componentes
import DataTable from '../../DataTable/DataTable';
import swal from 'sweetalert';

//Componente
const NuevoRecurso = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    const [ recursoActivo, setRecursoActivo ] = useState(false);

    const [ defaultValues, setDefaultValues ]= useState({});

    const [optionsTipoRecurso, setOptionsTipoRecurso ] = useState([]);

    const [ tipoRecurso, setTipoRecurso ] = useState({label:"Seleccione un tipo de recurso", value:0})
    const [rutaRepetida, setRutaRepetida ] = useState(false);
    const [errorRuta, setErrorRuta ] =useState("");
    const [errorTipoRecurso,setErrorTipoRecurso] =useState("");

        //CICLO DE VIDA

        useEffect(()=>{
            _obtenerServicios();
        },[])
        useEffect(()=>{

            if(props.isReadOnly == true || props.isEditable == true)
            {
                //console.log("El default Value: ", props.defaultValue);
                _setDefaultValue();
            }
    
        },[props.defaultValue])

        // useEffect(()=>{

        //     rutaRepetida?(setErrorRuta("Ruta ya registrada")):(setErrorRuta(""))
        // },[rutaRepetida]);
    
        //FIN CICLO DE VIDA

        //Funcion que llama servicios registrados
        const _obtenerServicios=async()=>{
            let token= Cookies.get('token');
            let respuesta = await superagent.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_TIPOS_RECURSO)
                                            .set('Accept', 'application/json')
                                            .set("Authorization", "Bearer " + token);
      

            let default_op = {label:"Seleccione un tipo de recurso", value:0};

            let options=[];
            options.push(default_op);

            let { tipos_recurso_registrados } = respuesta.body;

            for(let tipo_recurso of tipos_recurso_registrados)
            {
             
                let option_it = { value: tipo_recurso.ID_TIPO_RECURSO, label: tipo_recurso.NOMBRE_TIPO_RECURSO};
                options.push(option_it);
            }

            setOptionsTipoRecurso(options);
        }

        //Función que da valores por defecto a los campos en el formulario.
        const _setDefaultValue=()=>{
            let nombreRecursoIpx="";
            let descripcionRecursoIpx = "";
            let rutaRecursoIpx = "";
            let {nombreRecurso, descripcionRecurso, recursoActivo, tipo_recurso, ruta_recurso} = props.defaultValue;
            // console.log("default Value", props.defaultValue)
            if(nombreRecurso){
                nombreRecursoIpx = nombreRecurso;
            }
            if(descripcionRecurso)
            {
                descripcionRecursoIpx = descripcionRecurso;
            }
            if(recursoActivo)
            {
                setRecursoActivo(recursoActivo);
            }
            if(tipoRecurso)
            {
                let option = {value:tipo_recurso.id_tipo_recurso, label: tipo_recurso.nombre_tipo_recurso};
               
                setTipoRecurso(option);
            }
            if(ruta_recurso)
            {
                rutaRecursoIpx = ruta_recurso;
            }

            setDefaultValues({nombreRecursoIpx, descripcionRecursoIpx, rutaRecursoIpx});
        }


    const _registrarRecurso=async(valor_inputs)=>{
        //console.log("el valor obtenido", valor_inputs);

            let token= Cookies.get('token');
           
    
        tipoRecurso.value!=0 && tipoRecurso.value != "0" && rutaRepetida == false?(async ()=>{
            let { nombreRecursoIpx,
                descripcionRecursoIpx,
                rutaRecursoIpx} = valor_inputs;

            let valor = {};
            valor.nombre_recurso = nombreRecursoIpx;
            valor.descripcion_Recurso =descripcionRecursoIpx;
            valor.ruta_Recurso = rutaRecursoIpx;
            valor.recurso_activo = recursoActivo;
            valor.tipo_recurso = tipoRecurso.value;
            let tipo="";
                            if(props.isEditable)
                            {
                                valor.id_recurso = props.defaultValue.idRecurso;

                                try{
                                    let respuesta_recurso_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_ACTUALIZAR_RECURSO)
                                    .set('Accept', 'application/json')
                                    .set("Authorization", "Bearer " + token)
                                    .send(valor)
    
                                    if(respuesta_recurso_creado.body.message == "OK")
                                    {
                                        swal({
                                            title:"Recurso Actualizado",
                                            text:"Recurso actualizado con éxito",
                                            icon:"success",
                                            button:"Aceptar"
                                        });
                                    }
                                    else{
                                        swal({
                                            title:"Error al actualizar el Recurso ",
                                            text:respuesta_recurso_creado.body.message,
                                            icon:"error",
                                            button:"Aceptar"
                                        });
                                    }
    
                                }catch(e){
                                    console.log(e);
                                    swal({
                                        title:"Error al Editar datos del Recurso",
                                        text: e.errorMessage,
                                        icon: "error",
                                        button:"Aceptar"
                                    });
                                }
                            }

                            else
                            {
                                try{

                                    let respuesta_recurso_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CREAR_RECURSO)
                                    .set('Accept', 'application/json')
                                    .set("Authorization", "Bearer " + token)
                                    .send(valor)
    
                                    if(respuesta_recurso_creado.body.message == "OK")
                                    {
                                        swal({
                                            title:"Recurso Creado",
                                            text:"Recurso creado con éxito",
                                            icon:"success",
                                            button:"Aceptar"
                                        });
                                    }
                                    else{
                                        swal({
                                            title:"Error al crear el recurso ",
                                            text:respuesta_recurso_creado.body.message,
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
                            tipo="actualizarListaRecursos";
                            let envio ={tipo};
                            envio={tipo};
                            await props.cambioDatos(envio);
                            //_limpiarFormulario();
                            setModalOpen(false);
                        })():(
                            // 
                            setErrorTipoRecurso("Escoja un modulo para el recurso")
                        )
            }
        

    //

    const _validacionEjemplo=(value, ctx, input, cb) =>{
        if("palabra" == value)
        {
            return true;
        }
        else{
            return "no dice palabra";
        }
    }

    const _unicidadRuta=(value, ctx, input, cb) =>{
       
        let id_recurso =0;
        let validacion=true;
        if(props.defaultValue != null && props.defaultValue != undefined)
        {
            id_recurso = props.defaultValue.idRecurso;
            console.log("id_recurso: ", id_recurso);
        }

            props.rutas.length != 0?(()=>{
                let coincidencias = props.rutas.filter(ruta =>ruta.ruta_recurso == value && ruta.id_recurso != id_recurso);
                if(coincidencias.length != 0)
                {
                    setRutaRepetida(true);
                   
                    validacion= "ruta ya registrada";
                }
                else{
                    setRutaRepetida(false);
        
                    validacion= true;
                }
            })():(()=>{
                setRutaRepetida(false);
                validacion= true
            })()

        return validacion;
        
     
        
    }

    const _cambiarEstadoActivo = ()=>
    {
        setRecursoActivo(!recursoActivo);
    }

    const _cambioTipoRecurso = (value) =>{
        setTipoRecurso(value)
        setErrorTipoRecurso("");
    }


    //Inicio del form
    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            {/* <FormGroup> */}
            <Button 
                    className={props.classNames?(props.classNames):("btn btn-success ")}
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Recurso"
                        )
                    }
                   
                </Button>
            {/* </FormGroup> */}

            <Modal
                size="lg"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">
                    <h4 className="modal-title mt-0">Crear nuevo recurso</h4>
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
                    onValidSubmit={(e,v)=>{_registrarRecurso(v)}}
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Ingrese el nombre de Recurso</b></Label>
                                            <AvField
                                                id="nombreRecursoIpx"
                                                name="nombreRecursoIpx"
                                                // label="Ingrese Nombre de Recurso"
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
                                    <Label><b>Descripcion del Recurso</b></Label>
                                    <br />
                                            <AvField
                                                id="descripcionRecursoIpx"
                                                name="descripcionRecursoIpx"
                                                // label="Descripcion del Recurso"
                                                value=""
                                                className="form-control"
                                                placeholder="Ingrese la descripcion del recurso"
                                                type="textarea"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                }}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <Label><b>Ruta Recurso</b></Label>
                    
                                            <AvField
                                                id="rutaRecursoIpx"
                                                name="rutaRecursoIpx"
                                                // label="Ruta Recurso"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: /ruta_ejemplo_recurso"
                                                type="text"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  myValidation: _unicidadRuta
                                                  
                                                }}
                                            />
                                            <p id="errorRuta" name="errorRuta" style={{color:"red"}}>{errorRuta}</p>

                                    </Col>

                                    <Col md={6}>
                                    {/* Switch */}
                                    <Label><b>Activo</b></Label>
                                    <center>
                                        <div
                                            className="custom-control custom-switch custom-switch-md mb-3"
                                            dir="ltr"
                                        >
                                            <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={"nuevoRecursoSwitch"}
                                            name={"nuevoRecursoSwitch"}
                                            checked={recursoActivo}
                                            onClick={_cambiarEstadoActivo}
                                            disabled={props.isReadOnly?true:false}

                                            />
                                            <label
                                            className="custom-control-label"
                                            htmlFor={"nuevoRecursoSwitch"}
                                            >
                                
                                            </label>
                                        </div>
                                 </center>

                                  {/* fin switch */}
                                    <br /><br />
                                    

                                   
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                            <Select 
                                                value={tipoRecurso}
                                                onChange={(valor)=>{_cambioTipoRecurso(valor)}}
                                                options={optionsTipoRecurso}
                                                isDisabled={props.isReadOnly?true:false}
                                            />
                                        <p  id="errorTipoRecurso" style={{color:"red"}}>{errorTipoRecurso}</p>
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
export default NuevoRecurso;