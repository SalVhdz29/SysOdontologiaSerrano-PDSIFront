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

//Componentes
import SwitchRol from '../SwitchRol/SwitchRol';
import BotonGuardar from './BotonGuardar';
import BotonCerrar from './BotonCerrar';


const NuevoRol = props =>{ 
 
    const [modalOpen, setModalOpen ]= useState(false); 
 
    return( 
        <Fragment> 
            {/* <FormGroup className="float-right"> */} 
            <FormGroup> 
                <Button  
                    className="btn btn-success" 
                    onClick={()=>{setModalOpen(true)}} 
 
                > 
                    Nuevo Rol 
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
                    <h4 className="modal-title mt-0">Crear nuevo rol</h4> 
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
                                    <Col md={6}> 
                                        <FormGroup> 
                                            <Label><b>Ingrese el nombre de Rol</b></Label> 
                                            <AvField 
                                                id="nombreRolIpx" 
                                                name="nombreRolIpx" 
                                                label="Ingrese Nombre de Rol" 
                                                value="" 
                                                className="form-control" 
                                                placeholder="Ingrese rol" 
                                                type="text" 
                                                validate={{ 
                                                  required: { valued: true, errorMessage: "Obligatorio."} 
                                                }} 
                                            />         
                                        </FormGroup> 
                                    </Col>
                                    <Col className="text-center text-md-right">
                                        <label>Rol Activo:</label>
                                        <SwitchRol/> 
                                    </Col>  
                                </Row>
                                <Row>
                                    <Col md={6}> 
                                        <FormGroup> 
                                            <Label><b>Ingrese la descripcion del Rol</b></Label> 
                                            <AvField 
                                                id="descripcionRolIpx" 
                                                name="descripcionRolIpx" 
                                                label="Ingrese Descripcion del Rol" 
                                                value="" 
                                                className="form-control" 
                                                placeholder="Ingrese descripcion" 
                                                type="text" 
                                                validate={{ 
                                                  required: { valued: true, errorMessage: "Obligatorio."} 
                                                }} 
                                            /> 
                                        </FormGroup> 
                                    </Col> 
                                </Row>
                                <div>
                                <Row>
                                <Col className="text-center text-md-right">
                                    <BotonGuardar/>
                                </Col> 
                                <Col className="text-center text-md-right">
                                    <BotonCerrar
                                    type = "button" 
                                    onClick={() => {setModalOpen(false)}} 
                                    className="close" 
                                    data-dismiss="modal" 
                                    aria-label="Close"  />
                                </Col> 
                                </Row>
                                </div> 
                            </AvForm> 
                        </Container> 
                </div> 
 
 
            </Modal> 
        </Fragment> 
    ) 
} 
export default NuevoRol;
