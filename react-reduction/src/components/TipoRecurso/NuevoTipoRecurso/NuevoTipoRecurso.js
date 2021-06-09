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



import Cookies from 'js-cookie';

import superagent from 'superagent';

import{
    API_CREAR_TIPORECURSO,
    API_ACTUALIZAR_TIPO_RECURSO
} from '../../../api/apiTypes';




//Jsons
import { columnasTabla } from './Json/columnasTabla';

//Componentes
import DataTable from '../../DataTable/DataTable';
import EscogerRecurso from '../EscogerRecurso/EscogerRecurso';
import swal from 'sweetalert';




//Componente

const NuevoTipoRecurso = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

  //  const [ Recurso, setRecurso ] = useState([]);

//const [ TipoRecursoActivo, setTipoRecursoActivo ] = useState(false);
  

  const [ activo, setActivo ] = useState(false);

    const [ recursoAsignados, setRecursoAsignados ] = useState([]);

    const [ estadoTipoRecurso, setTipoRecursoActivo] = useState(false);

    const [errorRecurso, setErrorRecurso] = useState("");

    const [ defaultValues, setDefaultValues ]= useState({});



    //CICLO DE VIDA
    useEffect(()=>{

        if(props.isReadOnly == true || props.isEditable == true)
        {
            //console.log("El default Value: ", props.defaultValue);
            _setDefaultValue();
        }

    },[props.defaultValue])


    


    //FIN CICLO DE VIDA



    //Función que da valores por defecto a los campos en el formulario.
    const _setDefaultValue=()=>{
        let nombreTipoRecursoIpx="";
        let descripcionTipoRecursoIpx = "";    
        let estadoTipoRecursoIpx=false;   
        let recurso_asignado={};
        let {nombreTipoRecurso, descripcionTipoRecurso, estadoTipoRecurso, recurso} = props.defaultValue;
        if(nombreTipoRecurso){
            nombreTipoRecursoIpx = nombreTipoRecurso;
        }
        if(descripcionTipoRecurso)
        {
            descripcionTipoRecursoIpx = descripcionTipoRecurso;
        }
        if(estadoTipoRecurso)
        {
            setTipoRecursoActivo(estadoTipoRecurso);
        }
        console.log("default Value", props.defaultValue)


        if(recurso)
        {
            console.log("vine: ",recurso);
            let recurso_asig = [];
            recurso.map(recurso=>{
                let recurso_pivote={...recurso};
                recurso_pivote.marcado=true;
                recurso_asig.push(recurso_pivote);

            })
            setRecursoAsignados(recurso_asig);
        }

        setDefaultValues({nombreTipoRecursoIpx, descripcionTipoRecursoIpx});
    }


    const _registrarTipoRecurso=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);
            let token= Cookies.get('token');

            let { nombreTipoRecursoIpx,
                    descripcionTipoRecursoIpx
                    } = valor_inputs;

            let valor = {};
            valor.tipo_recurso_nombre = nombreTipoRecursoIpx;
            valor.tipo_recurso_descripcion =descripcionTipoRecursoIpx;
            valor.tipo_recurso_estado = estadoTipoRecurso;
            valor.recurso=recursoAsignados;
           // console.log("valor.recurso =", valor.recurso)

            let tipo="";
            if(props.isEditable)
                        {
                            valor.tipo_recurso_id = props.defaultValue.idTipoRecurso;
                            //tipo="editarTipoRecursoLista";

                            try{
                                let respuesta_tiporecurso_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_ACTUALIZAR_TIPO_RECURSO)
                                .set('Accept', 'application/json')
                                .set("Authorization", "Bearer " + token)
                                .send(valor)

                                if(respuesta_tiporecurso_creado.body.message == "OK")
                                {
                                    swal({
                                        title:"Tipo Recurso Actualizado",
                                        text:"Tipo Recurso actualizado con éxito",
                                        icon:"success",
                                        button:"Aceptar"
                                    });
                                }
                                else{
                                    swal({
                                        title:"Error al actualizar el Tipo Recurso ",
                                        text:respuesta_tiporecurso_creado.body.message,
                                        icon:"error",
                                        button:"Aceptar"
                                    });
                                }

                            }catch(e){
                                console.log(e);
                                swal({
                                    title:"Error al Editar datos del Tipo Recurso",
                                    text: e.errorMessage,
                                    icon: "error",
                                    button:"Aceptar"
                                });
                            }
          

                        }
                        else
                        {
                            //tipo="agregarTipoRecursoLista";

                            try{

                                let respuesta_tiporecurso_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CREAR_TIPORECURSO)
                                .set('Accept', 'application/json')
                                .set("Authorization", "Bearer " + token)
                                .send(valor)

                                if(respuesta_tiporecurso_creado.body.message == "OK")
                                {
                                    swal({
                                        title:"Tipo Recurso Creado",
                                        text:"Tipo Recurso creado con éxito",
                                        icon:"success",
                                        button:"Aceptar"
                                    });
                                }
                                else{
                                    swal({
                                        title:"Error al crear el Tipo Recurso ",
                                        text:respuesta_tiporecurso_creado.body.message,
                                        icon:"error",
                                        button:"Aceptar"
                                    });
                                }

                            }catch(e)
                            {
                                console.log(e);
                                swal({
                                    title:"Error al crear datos de Tipo Recurso",
                                    text: e.errorMessage,
                                    icon: "error",
                                    button:"Aceptar"
                                });
                            }



                        }


            tipo="actualizarListaRecurso";
            let envio={tipo};
            await props.cambioDatos(envio);
            tipo="actualizarListaTipoRecurso";
            envio={tipo};
            //let envio={tipo,valor};
            await props.cambioDatos(envio);
            _limpiarFormulario();
            setModalOpen(false);

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


    const _asignarRecurso = (recurso) =>{

       // console.log("lo que recibe: ",recurso);
        
        setRecursoAsignados(recurso);
        if(recurso.length!=0)
        {
            setErrorRecurso("");
        }
    }


    const _cambiarEstadoActivo = ()=>
    {
      // console.log("estadotipo-Z: ",estadoTipoRecurso);
        setTipoRecursoActivo(!estadoTipoRecurso);
    }


    const _limpiarFormulario =()=>{
        setRecursoAsignados([]);
    }


    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
     
                <Button 
                    className="btn btn-dark btn-sm"
                   
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Tipo Recurso"
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
                {props.isEditable?(
                    <h4 className="modal-title mt-0"><b>Editar nuevo Tipo Recurso</b></h4>
                    ):(
                        props.isReadOnly?(
                            <h4 className="modal-title mt-0"><b>Ver nuevo Tipo Recurso</b></h4>
                            ):(
                                <h4 className="modal-title mt-0"><b>Crear nuevo Tipo Recurso</b></h4>
                                )
                        )
                    }


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
                    onValidSubmit={(e,v)=>{_registrarTipoRecurso(v)}}
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>nombre de Tipo Recurso</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="nombreTipoRecursoIpx"
                                                name="nombreTipoRecursoIpx"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Ej.: Modulo de ..."
                                                type="text"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                   { props.isReadOnly?(
                            <h4 className="modal-title mt-0"><b> </b></h4>
                            ):(
                                <Col md={6}>
                                {/* Switch */}
                                <Label><b>Asignación de Recursos</b></Label>
                                <center>

                                <EscogerRecurso
                                    submitRecurso={_asignarRecurso}
                                    recursoAsignados={recursoAsignados}
                               />
                                </center>

                              {/* fin switch */}
                                <br /><br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                                <Row>
                                <Col md={6}>
                                    <Label><b>Descripcion del Tipo Recurso</b></Label>
                                    <br />
                                    
                                            <AvField
                                                //id="correoElectronicoIpx"
                                                id="descripcionTipoRecursoIpx"
                                                name="descripcionTipoRecursoIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: Conjunto de Roles para Modulo de Seguridad"
                                                type="textarea"    
                                                style={{ height: 120 }}      
                                                disabled={props.isReadOnly?true:false}                                
                                                validate={{
                                                required: { value: true, errorMessage: "Obligatorio.Debe escribir una descripción del Tipo de Recurso"},

                                                }}
                                            />
                                    </Col>
                                    <Col md={6}>
                                    {/* Switch */}
                                    <Label><b>Estado de Tipo Recurso</b></Label>
                                    
                                    {/* Verificando Estado Activo */}
                                    <center>

                                    <div
                                            className="custom-control custom-switch custom-switch-md mb-3"
                                            dir="ltr"
                                        >
                                            <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={"nuevoTipoRecursoSwitch"}
                                            name={"nuevoTipoRecursoSwitch"}
                                            checked={estadoTipoRecurso}
                                            onChange={_cambiarEstadoActivo}
                                            disabled={props.isReadOnly?true:false}

                                            />
                                            <label
                                            className="custom-control-label"
                                            htmlFor={"nuevoTipoRecursoSwitch"}
                                            >
                                
                                            </label>
                                        </div>


                                        
                                    </center>
                                  {/* fin switch */}
                                    <br /><br />                                    
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>     
                                    <label><b>Recursos para el Nuevo Tipo Recurso:</b></label>

                                    { recursoAsignados.length!=0?
                                        <div id="divTablaRecursos">
                                            <DataTable datosTabla={recursoAsignados} columnasTabla={columnasTabla} />
                                        </div>:
                                        <p><label>   Sin Recursos Asignados</label></p>

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
export default NuevoTipoRecurso;