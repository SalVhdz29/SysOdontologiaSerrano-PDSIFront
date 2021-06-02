import React, { Fragment, useEffect, useState } from "react"

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

const NuevoRecurso = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    const [ recursoActivo, setRecursoActivo ] = useState(false);

    const _registrarRecurso=async(valor_inputs)=>{
        console.log("el valor obtenido", valor_inputs);


        let { nombreRecursoIpx,
              descripcionRecursoIpx,
              rutaRecursoIpx} = valor_inputs;


        let valor = {};
        valor.nombre_recurso = nombreRecursoIpx;
        valor.descripcionRecurso =descripcionRecursoIpx;
        valor.rutaRecurso = rutaRecursoIpx;
        valor.recurso_activo = recursoActivo;

        let envio={valor};
        envio.tipo="agregarRecursoLista";

        await props.cambioDatos(envio);
        //_limpiarFormulario();
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

    const _cambiarEstadoActivo = ()=>
    {
        setRecursoActivo(!recursoActivo);
    }



    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    className="btn btn-success"
                    onClick={()=>{setModalOpen(true)}}

                >
                    Nuevo Recurso
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
                                                type="text"
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
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  
                                                }}
                                            />

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
                             Crear Recurso
                            </Button>
                          </div> 
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalOpen(false)}}>Cancelar</Button>
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