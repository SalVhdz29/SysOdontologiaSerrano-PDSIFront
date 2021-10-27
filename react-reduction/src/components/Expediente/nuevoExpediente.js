import React, { Fragment, useEffect, useState } from 'react';

import superagent from 'superagent'; 

import {
  API_NUEVO_EXPEDIENTE,
  API_UPDATE_EXPEDIENTE,
  API_OBTENER_EXPEDIENTE,
  API_OBTENER_UN_EXPEDIENTE
} from  '../../api/apiTypes';

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


import{
    AvForm,
    AvField
} from 'availity-reactstrap-validation'

//Jsons
import { columnasTabla } from './Json/columnasExpediente';

//Componentes
import DataTable from '../DataTable/DataTable';


//Componente

const NuevoExpediente = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

  //  const [ Recurso, setRecurso ] = useState([]);

//const [ ExpedienteActivo, setExpedienteActivo ] = useState(false);
  

  const [ activo, setActivo ] = useState(false);


    const [ estadoExpediente, setExpedienteActivo] = useState(false);

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
        let id_expediente = 0;
        let nombre_paciente_front="";
        let apellido_paciente_front="";
        let dui_front = "";
        let sexo_front = 0;
        let correo_front = "";
        let telefono_front = "";
        let ultima_fecha_front = "";
        let fecha_nacimiento_front="";
        let direccion_front = "";

        let {
            nombre_paciente,
            apellido_paciente,
            dui,
            sexo,
            correo,
            telefono,
            ultima_fecha,
            fecha_nacimiento,
            direccion
        } = props.defaultValue;

        if(nombre_paciente){
            nombre_paciente_front = nombre_paciente;
        }
        if(apellido_paciente){
            apellido_paciente_front = apellido_paciente;
        }
        if(sexo){
            sexo_front = "Masculino";
        }else{
            sexo_front = "Femenino";
        }
        if(dui){
            dui_front = dui;
        }
        if(correo){
            correo_front = correo;
        }
        if(telefono){
            telefono_front = telefono;
        }
        if(ultima_fecha){
            ultima_fecha_front = ultima_fecha;
        }
        if(fecha_nacimiento){
            fecha_nacimiento_front = fecha_nacimiento;
        }
        if(direccion){
            direccion_front = direccion;
        }
        //console.log("default Value", props.defaultValue)


        setDefaultValues({nombre_paciente_front,apellido_paciente_front,dui_front, sexo_front,correo_front, telefono_front, ultima_fecha_front,fecha_nacimiento_front,direccion_front});
    }

    const _registrarExpediente=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);
            console.log("ENTRO AL METODO REGISTRAS");
            let fecha_actual = new Date();            
            let mes = fecha_actual.getMonth()+1;
            let { 
                    nombre_paciente_front,
                    apellido_paciente_front,
                    dui_front,
                    sexo_front,
                    correo_front,
                    telefono_front,
                    fecha_nacimiento_front,
                    direccion_front
                } = valor_inputs;

            let valor = {};
            valor.nombre_paciente = nombre_paciente_front;
            valor.apellido_paciente = apellido_paciente_front;
            valor.dui = dui_front;
            
            valor.correo = correo_front;
            valor.telefono = telefono_front;
            valor.ultima_fecha = fecha_actual.getDate()+"-"+mes+"-"+fecha_actual.getFullYear();
            valor.fecha_nacimiento = fecha_nacimiento_front;
            valor.direccion = direccion_front;
            console.log("antes del sexo");
           if(sexo_front == "M"){
            valor.sexo = 1;
           }else{
            valor.sexo = 0;
           }
        //    console.log("despues del sexo del sexo");

            let tipo="";
            if(props.isEditable)
                        {
                            console.log("LO QUE ENVIA: ", valor);
                            valor.id_expediente = props.defaultValue.id_expediente;
                            tipo="editarExpedienteLista";
                            let token= Cookies.get('token');
                              let respuesta_Expediente = await superagent.post(
                                process.env.REACT_APP_ENDPOINT_BASE_URL + API_UPDATE_EXPEDIENTE)
                                .set('Accept', 'application/json').set("Authorization", "Bearer " + token).send(valor)
                                console.log("LA RESPUESTA: ", respuesta_Expediente)
                        }
                        else
                        {
                            console.log("entro al else: "+valor.sexo);
                            tipo="agregarExpedienteLista";
                            let token= Cookies.get('token');
                              let respuesta_Expediente = await superagent.post(
                                process.env.REACT_APP_ENDPOINT_BASE_URL + API_NUEVO_EXPEDIENTE)
                                .set('Accept', 'application/json').set("Authorization", "Bearer " + token).send(valor)
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
            {/* <FormGroup> */}
                <Button 
                    className="btn btn-dark btn-sm"
                   
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Expediente"
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
                {props.isEditable?(
                    <h4 className="modal-title mt-0"><b>Editar Expediente</b></h4>
                    ):(
                        props.isReadOnly?(
                            <h4 className="modal-title mt-0"><b>Ver Expediente</b></h4>
                            ):(
                                <h4 className="modal-title mt-0"><b>Crear nuevo Expediente</b></h4>
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
                    onValidSubmit={(e,v)=>{_registrarExpediente(v)}}
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Nombre</b></Label> 
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="nombre_paciente_front"
                                                name="nombre_paciente_front"
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
                                 
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Apellido</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="apellido_paciente_front"
                                                name="apellido_paciente_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el Apellido"
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
                                <br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>DUI</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="dui_front"
                                                name="dui_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el DUI del paciente"
                                                type="text"
                                                pattern="^[0-9]{9}$"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label><b>Sexo</b></Label>
                                       
                                            {(props.isReadOnly || props.isEditable)?(




                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="sexo_front"
                                                name="sexo_front"
                                                value=""
                                                className="form-control"
                                                type="text"
                                                placeholder="M = masculino o F = femenino"
                                                pattern="[MF]{1}"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            >
                                                </AvField>
                
                    ):(
                        <select 
                        id="sexo_front"
                        name="sexo_front"                                                
                        className="form-control"               
                        disabled={props.isReadOnly?true:false}

                     >
<option value="M">Masculino</option>
<option value="F">Femenino</option>
</select>
                        
                        )
                    }

                                           
                                                                                          

                                            
                                              

                                        </FormGroup>
                                    </Col>
                                   { props.isReadOnly?(
                            <h4 className="modal-title mt-0"><b> </b></h4>
                            ):(
                                <Col md={6}>

                              {/* fin switch */}
                                <br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                               
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Correo electronico</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="correo_front"
                                                name="correo_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el correo del paciente"
                                                type="mail"
                                                disabled={props.isReadOnly?true:false}
                                                pattern= "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                   
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Telefono</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="telefono_front"
                                                name="telefono_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el telefono del paciente"
                                                type="text"
                                                pattern="^[0-9]{8}$"
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
                                <br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                               
                                 <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Fecha de nacimiento</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="fecha_nacimiento_front"
                                                name="fecha_nacimiento_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="YYYY-MM-DD"
                                                type="text"
                                                pattern = "^\d{4}([\-/.])(0?[1-9]|1[0-2])\1(3[01]|[12][0-9]|0?[1-9])$"
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
                                <br />
                                
                                </Col>
                                )}
                                    
                                </Row>

                                 <Row>
                                    <Col md={12}>
                                        <FormGroup>
                                            <Label><b>Direccion</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="direccion_front"
                                                name="direccion_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba la direccion del paciente"
                                                type="phone"
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
                                <br />
                                <h6><b>(*) Todos los Campos son Requeridos.</b></h6>                               

                              
                                </Col>
                                )}
                                    
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
export default NuevoExpediente;