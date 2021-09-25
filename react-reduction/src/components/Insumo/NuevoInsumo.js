import React, { Fragment, useEffect, useState } from 'react';

import superagent from 'superagent'; 

import Cookies from 'js-cookie';


import{
    FormGroup,
    Button,
    Modal, 
    Container,
    Label,
    Row,
    Col
} from 'reactstrap';

import {
  API_NUEVO_INSUMO,
  API_UPDATE_INSUMO,
  API_OBTENER_INSUMO,
  API_OBTENER_UN_INSUMO
} from  '../../api/apiTypes';

import{
    AvForm,
    AvField
} from 'availity-reactstrap-validation'

//Jsons
import { columnasTabla } from './Json/columnasinsumo';

//Componentes
import DataTable from '../DataTable/DataTable';


//Componente

const NuevoInsumo = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

  //  const [ Recurso, setRecurso ] = useState([]);

//const [ InsumoActivo, setInsumoActivo ] = useState(false);
  

  const [ activo, setActivo ] = useState(false);


    const [ estadoInsumo, setInsumoActivo] = useState(false);

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
        let id_insumo = 0;
        let nombre_insumo_front="";
        let existencia_front="";
        let descripcion_front = "";
        
        let {
            nombre_insumo,
            existencia,
            descripcion
        } = props.defaultValue;

        if(nombre_insumo){
            nombre_insumo_front = nombre_insumo;
        }
        if(existencia){
            existencia_front = existencia;
        }
        if(descripcion){
            descripcion_front = descripcion;
        }
        

        setDefaultValues({nombre_insumo_front,existencia_front,descripcion_front});
    }

    const _registrarInsumo=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);
            console.log("ENTRO AL METODO REGISTRAS");
            let { 
                    nombre_insumo_front,
                    existencia_front,
                    descripcion_front
                } = valor_inputs;

            let valor = {};
            valor.nombre_insumo = nombre_insumo_front;
            valor.existencia = existencia_front;
            valor.descripcion = descripcion_front;
            valor.insumo_activo = 1;
            
        //    console.log("despues del sexo del sexo");

            let tipo="";
            if(props.isEditable)
                        {

                            
                            valor.id_insumo = props.defaultValue.id_insumo;
                            console.log("LO QUE ENVIA: ", valor);
                            tipo="editarInsumoLista";
                            let token= Cookies.get('token');
                             let respuesta_Insumo = await superagent.post(
                                process.env.REACT_APP_ENDPOINT_BASE_URL + API_UPDATE_INSUMO)
                                .set('Accept', 'application/json').set("Authorization", "Bearer " + token).send(valor)
                                console.log("LA RESPUESTA: ", respuesta_Insumo)
                             
                        }
                        else
                        {
                            console.log("entro al else: ", valor);
                            tipo="agregarInsumoLista";
                            let token= Cookies.get('token');
                             let respuesta_Insumo = await superagent.post(
                                process.env.REACT_APP_ENDPOINT_BASE_URL + API_NUEVO_INSUMO)
                                .set('Accept', 'application/json').set("Authorization", "Bearer " + token).send(valor)
                                console.log("LA RESPUESTA: ", respuesta_Insumo)
                            
                        }

            let envio={tipo,valor};
            if(props.cambioDatos != undefined)
            {
                await props.cambioDatos(envio);
            }
            
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

    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
     
                <Button
                    className = {props.className}
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Insumo"
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
                    <h4 className="modal-title mt-0"><b>Editar Insumo</b></h4>
                    ):(
                        props.isReadOnly?(
                            <h4 className="modal-title mt-0"><b>Ver Insumo</b></h4>
                            ):(
                                <h4 className="modal-title mt-0"><b>Crear nuevo Insumo</b></h4>
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
                    onValidSubmit={(e,v)=>{_registrarInsumo(v)}}
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={8}>
                                        <FormGroup>
                                            <Label><b>Nombre</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="nombre_insumo_front"
                                                name="nombre_insumo_front"
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el nombre"
                                                type="text"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                 
                                    <Col md={10}>
                                        <FormGroup>
                                            <Label><b>descripcion</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="descripcion_front"
                                                name="descripcion_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el descripcion del paciente"
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

                              {/* fin switch */}
                                
                                </Col>
                                )}
                                    
                                </Row>
                                <Row>
                                    <Col md={10}>
                                        <FormGroup>
                                        <Label><b>Recomendacion</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="existencia_front"
                                                name="existencia_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba una Recomendacion"
                                                type="number"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                            
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                        <Label><b>Porcentaje de ganacia sobre costo</b></Label>
                                        <Col md={4}>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="ganacia"
                                                name="ganacia"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="%"
                                                type="number"
                                                value = "20"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
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
export default NuevoInsumo;