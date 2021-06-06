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
import { columnasTabla } from './Json/columnasExpediente';

//Componentes
import DataTable from '../DataTable/DataTable';


//Componente

const nuevoExpediente = props =>{

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
        let nombre_paciente_front="";
        let sexo_front = "";
        let saldo_front = "";
        let telefono_front = "";
        let ultima_fecha_front = "";

        let {
            nombre_paciente,
            sexo,
            saldo,
            telefono,
            ultima_fecha
        } = props.defaultValue;

        if(nombre_paciente){
            nombre_paciente_front = nombre_paciente;
        }
        if(sexo){
            sexo_front = sexo;
        }
        if(saldo){
            saldo_front = saldo;
        }
        if(telefono){
            telefono_front = telefono;
        }
        if(ultima_fecha){
            ultima_fecha_front = ultima_fecha;
        }
        console.log("default Value", props.defaultValue)


        setDefaultValues({nombre_paciente_front, sexo_front, saldo_front, telefono_front, ultima_fecha_front});
    }

    const _registrarExpediente=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);
            let fecha_actual = new Date();            
            let mes = fecha_actual.getMonth()+1;
            let { 
                    nombre_paciente_front,
                    sexo_front,
                    saldo_front,
                    telefono_front
                } = valor_inputs;

            let valor = {};
            valor.nombre_paciente = nombre_paciente_front;
            valor.sexo =sexo_front;
            valor.saldo = saldo_front;
            valor.telefono = telefono_front;
            valor.ultima_fecha = fecha_actual.getDate()+"-"+mes+"-"+fecha_actual.getFullYear();
           // console.log("valor.recurso =", valor.recurso)

            let tipo="";
            if(props.isEditable)
                        {
                            valor.id_expediente = props.defaultValue.id_expediente;
                            tipo="editarExpedienteLista";
                        }
                        else
                        {
                            tipo="agregarExpedienteLista";
                        }

            let envio={tipo,valor};
            await props.cambioDatos(envio);
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
                                            <Label><b>nombre de Paciente</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="nombre_paciente_front"
                                                name="nombre_paciente_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el nombre del paciente"
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
                                <br /><br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Sexo</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="sexo_front"
                                                name="sexo_front"
                                                value=""
                                                className="form-control"
                                                placeholder="Masculino o Femenino"
                                                type="select"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            >
                                                <option>Masculino</option>
                                                <option>Femenino</option>
                                                </AvField>
                                        </FormGroup>
                                    </Col>
                                   { props.isReadOnly?(
                            <h4 className="modal-title mt-0"><b> </b></h4>
                            ):(
                                <Col md={6}>

                              {/* fin switch */}
                                <br /><br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Saldo</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="saldo_front"
                                                name="saldo_front"
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el Saldo del paciente"
                                                type="number"
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
                                <br /><br />
                                
                                </Col>
                                )}
                                    
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Telefono</b></Label>
                                            <AvField
                                                //id="nombreUsuarioIpx"
                                                id="telefono_front"
                                                name="telefono_front"
                                             
                                                value=""
                                                className="form-control"
                                                placeholder="Escriba el contacto del paciente"
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
                                <br /><br />
                                
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
export default nuevoExpediente;