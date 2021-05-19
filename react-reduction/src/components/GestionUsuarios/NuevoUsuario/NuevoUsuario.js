import React, { Fragment, useEffect, useState } from 'react';

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
const NuevoUsuario = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    className="btn btn-success"
                    onClick={()=>{setModalOpen(true)}}

                >
                    Nuevo Usuario
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
                    <h4 className="modal-title mt-0">Crear nuevo usuario</h4>
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
                <div className="modal-body">
                        <Container fluid={true}>
                            <AvForm>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label><b>Ingrese el nombre de Usuario</b></Label>
                                            <AvField
                                                id="nombreUsuarioIpx"
                                                name="nombreUsuarioIpx"
                                                label="Ingrese Nombre de Usuario"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: salher"
                                                type="text"
                                                validate={{
                                                  required: { valued: true, errorMessage: "Obligatorio."}
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </AvForm>
                        </Container>
                </div>


            </Modal>
        </Fragment>
    )
}
export default NuevoUsuario;