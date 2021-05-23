import React, { Fragment, useEffect, useState } from 'react';
import {
   AvForm,
   AvInput
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

const EscogerRoles = props =>{

    const [modalRolOpen, setModalRolOpen] = useState(false);

    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    id="gestionRolesbtn"
                    name="gestionRolesbtn"
                    className="btn btn-primary btn-md btn-block"
                    onClick={()=>{setModalRolOpen(true)}}
                >
                    Elegir Roles
                </Button>
            </FormGroup>

            <Modal
                size="lg"

                isOpen={modalRolOpen}
                toggle={()=>{
                    setModalRolOpen()
                }}
                centered={true}
            >
                <div className="modal-header">
                    <h4 className="modal-title mt-0">Eleccion de Roles</h4>
                    <button
                        type="button"
                        onClick={() => {
                            setModalRolOpen()
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
                        </Container>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col >
                        {/* <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              type="submit"
                            >
                             Guardar
                            </Button>
                          </div>  */}
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalRolOpen(false)}}>Cerrar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Fragment>
            )
}

export default EscogerRoles