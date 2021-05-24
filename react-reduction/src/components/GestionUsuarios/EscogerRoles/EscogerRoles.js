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
import listRolesJson from './Json/listRoles.json';

const EscogerRoles = props =>{

    const [modalRolOpen, setModalRolOpen] = useState(false);
    const [ listaRoles, setListaRoles ]= useState([]);

    const checkBoxStyle={
        margin:'0px,3px',
    }

    useEffect(()=>{
        _obtenerRoles();
    },[]);

    const _obtenerRoles = async ()=> {
        let rolesList = await listRolesJson;
         setListaRoles(rolesList);
    }

    const _cambioCheckbox=(e,v)=>{
        console.log(v);
    }

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
                size="md"
                className="modal-md primary"

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
                            <Row>                                
                                <Label for="checkboxExample">Listado de roles</Label>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <AvCheckboxGroup  name="rolesEscogidosCbx" required>
                                    <Row>
                                    {
                                        listaRoles.length != 0?
                                        (   
                                           
                                                    listaRoles.map((rol,key) =>{
                                                        return(
                                                        <Col md={6} style={checkBoxStyle} key={key}>
                                                        <AvCheckbox 
                                                            label={rol.nombre_usuario} 
                                                            value={rol.id_usuario} 
                                                            
                                                            key={key}
                                                            onChange={_cambioCheckbox}
                                                            className="checkbox_animated "
                                                            // 
                                                        />
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