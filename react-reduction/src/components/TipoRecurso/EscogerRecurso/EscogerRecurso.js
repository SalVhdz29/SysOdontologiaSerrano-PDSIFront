import React, { Fragment, useEffect, useState } from 'react';
import {
   AvForm,
   AvInput,
   AvCheckboxGroup,
   AvCheckbox
} from 'availity-reactstrap-validation';

import{
    FormGroup,
    Button,
    Modal, 
    Container,
    Label,
    Row,
    Col
} from 'reactstrap';

//Jsons
import listRecursoJson from './Json/listRecurso.json';

const EscogerRecurso = props =>{

    const [modalRecursoOpen, setModalRecursoOpen] = useState(false);
    const [ listaRecurso, setListaRecurso ]= useState([]);

    const checkBoxStyle={
        margin:'0px,3px',
    }

    useEffect(()=>{
        _obtenerRecurso();
    },[]);

    const _obtenerRecurso = async ()=> {
        let RecursoList = await listRecursoJson;
         setListaRecurso(RecursoList);
    }

    const _cambioCheckbox=(e,v)=>{
        console.log(v);
    }

    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    id="gestionRecursobtn"
                    name="gestionRecursobtn"
                    className="btn btn-dark btn-md btn-block"
                    onClick={()=>{setModalRecursoOpen(true)}}
                >
                    Elegir Recurso
                </Button>
            </FormGroup>

            <Modal
                size="lg"
                className="modal-md primary"

                isOpen={modalRecursoOpen}
                toggle={()=>{
                    setModalRecursoOpen()
                }}
                centered={true}
            >
                <div className="modal-header">
                    <h4 className="modal-title mt-0"><b>Escoger Recursos Para el Nuevo Tipo Recurso</b></h4>
                    <button
                        type="button"
                        onClick={() => {
                            setModalRecursoOpen()
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                <div className="modal-body">
                        <Container fluid={true}>
                            <Row>                                
                                <Label for="checkboxExample"><b>Nota:</b> los recursos que escoja Cambiarán su modulo por el nuevo</Label>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <AvCheckboxGroup  name="RecursoEscogidosCbx" required>
                                    <Row>
                                    {
                                        listaRecurso.length != 0?
                                        (                                              
                                                    listaRecurso.map((recurso,key) =>{
                                                        return(
                                                        <Col md={12} style={checkBoxStyle} key={key}>
                                                        <Row>                                           
                                                            <Col>
                                                        <AvCheckbox 
                                                            label={recurso.nombre_recurso} 
                                                            value={recurso.id_recurso}                                                             
                                                            key={key}
                                                            onChange={_cambioCheckbox}
                                                            className="checkbox_animated "
                                                            // 
                                                        />
                                                        </Col>
                                                        <Col>
                                                       <label>{recurso.descripcion_recurso} </label>
                                                        </Col>
                                                        <Col>
                                                       <label>{recurso.estado_recurso} </label>
                                                        </Col>
                                                        </Row>
                                                        
                                                        </Col>
                                                        
                                                        )

                                                    })
                                        )   
                                        :
                                        undefined
                                }
                                    
                                </Row>
                                </AvCheckboxGroup>
                                </Col>
             
                            </Row>
                        </Container>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col >
                        { <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              type="submit"
                            >
                             Guardar
                            </Button>
                          </div>  }
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalRecursoOpen(false)}}>Cancelar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Fragment>
            )
}

export default EscogerRecurso