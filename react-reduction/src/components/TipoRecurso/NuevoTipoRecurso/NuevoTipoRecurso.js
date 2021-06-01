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

//Jsons
import { columnasTabla } from './Json/columnasTabla';

//Componentes
import DataTable from '../../DataTable/DataTable';
import EscogerRecurso from '../EscogerRecurso/EscogerRecurso';


//Componente

const NuevoTipoRecurso = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    const [ Recurso, setRecurso ] = useState([]);

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
        // console.log("default Value", props.defaultValue)
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


        if(recurso)
        {
            console.log("vine: ",recurso);
            let recurso_asig = [];
            recurso.map(rol=>{
                let recurso_pivote={...recurso};
                recurso_pivote.marcado=true;
                recurso_asig.push(recurso_pivote);

            })
            setRecursoAsignados(recurso_asig);
        }

        setDefaultValues({nombreTipoRecursoIpx, descripcionTipoRecursoIpx, estadoTipoRecursoIpx});
    }


    const _registrarTipoRecurso=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);

            let { nombreTipoRecursoIpx,
                    descripcionTipoRecursoIpx,
                    estadoTipoRecursoIpx,
                    } = valor_inputs;

            let valor = {};
            valor.tipo_recurso_nombre = nombreTipoRecursoIpx;
            valor.tipo_recurso_descripcion =descripcionTipoRecursoIpx;
            valor.tipo_recurso_estado = estadoTipoRecursoIpx;
            valor.recurso=recursoAsignados;

            let tipo="";
            if(props.isEditable)
                        {
                            valor.id_TipoRecurso = props.defaultValue.idTipoRecurso;
                            tipo="editarTipoRecursoLista";
                        }
                        else
                        {
                            tipo="agregarTipoRecursoLista";
                        }

            let envio={tipo,valor};
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

        console.log("lo que recibe: ",recurso);
        
        setRecursoAsignados(recurso);
        if(recurso.length!=0)
        {
            setErrorRecurso("");
        }
    }


    const _cambiarEstadoActivo = ()=>
    {
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
                                            <Label><b>Ingrese el nombre de Tipo Recurso</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="nombreTipoRecursoIpx"
                                                name="nombreTipoRecursoIpx"
                                                // label="Ingrese Nombre de Usuario"
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
                                recursoAsignados={recursoAsignados}
                                submitRecurso={_asignarRecurso}
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
                                    <center>
                                        <div
                                            className="custom-control custom-switch custom-switch-md mb-3"
                                            dir="ltr"
                                        >
                                            <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={props.id_TipoRecurso+"switchActiva"}
                                            name={props.id_TipoRecurso+"switchActiva"}
                                            checked={props.TipoRecurso_activo?true:false}
                                            disabled={props.isReadOnly?true:false}
                                            onClick={e=>{console.log("dsd")}}                                                                      

                                            />
                                            <label
                                            className="custom-control-label"
                                            htmlFor={props.id_TipoRecurso+"switchActiva"}
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
                                    <label><b>Recursos Elegidos para el Nuevo Tipo Recurso:</b></label>

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
                        <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              type="submit"
                            >
                             Guardar
                            </Button>
                          </div> 
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