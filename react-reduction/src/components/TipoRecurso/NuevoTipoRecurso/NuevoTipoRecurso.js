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

const NuevoTipoRecurso = props =>{

    const [modalOpen, setModalOpen ]= useState(false);
    const [ Recurso, setRecurso ] = useState([]);

    const [ recursoAsignados, setRecursoAsignados ] = useState([]);

    const _registrarTipoRecurso=async(valor_inputs)=>{
            console.log("el valor obtenido", valor_inputs);

            let { nombreTipoRecursoIpx,
                  descripcionTipoRecursoIpx,
                  estadoTipoRecursoIpx} = valor_inputs;

            let valor = {};
            valor.tipo_recurso_nombre = nombreTipoRecursoIpx;
            valor.tipo_recurso_descripcion =descripcionTipoRecursoIpx;
          //  valor.tipo_recurso_estado = contraseniaIpx;
            

        let envio={valor};
        envio.tipo="agregarTipoRecursoLista";

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


    const _asignarRecurso = (recurso) =>{

        console.log("lo que recibe: ",recurso);
        
        setRecursoAsignados(recurso);
       /* if(recurso.length!=0)
        {
            document.getElementById("errorEscogerRecurso").innerHTML="";
        }*/
    }

    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    className="btn btn-dark"
                    onClick={()=>{setModalOpen(true)}}

                >
                    Nuevo Tipo Recurso
                </Button>
            </FormGroup>

            <Modal
                size="lg"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">
                    <h4 className="modal-title mt-0"><b>Crear nuevo Tipo Recurso</b></h4>
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
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
     
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
                                </Row>
                                <Row>
                                <Col md={6}>
                                    <Label><b>Ingrese la Descripcion del Tipo Recurso</b></Label>
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
                                            checked={props.TipoRecurso_activo}
                                            onClick={e=>{console.log("dsd")}}
                                            style={{ height: 1.25 }}                                      

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
                                        <div id="divTablaRecursos">
                                            <DataTable datosTabla={recursoAsignados} columnasTabla={columnasTabla} />
                                        </div>
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