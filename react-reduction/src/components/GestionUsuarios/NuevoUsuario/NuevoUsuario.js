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
import EscogerRoles from '../EscogerRoles/EscogerRoles';

const NuevoUsuario = props =>{

    const [modalOpen, setModalOpen ]= useState(false);
    const [ roles, setRoles ] = useState([]);

    const _registrarUsuario=async(valor_inputs)=>{
            console.log("el valor obtenido", valor_inputs);

            let { nombreUsuarioIpx,
                  correoElectronicoIpx,
                  contraseniaIpx} = valor_inputs;

            let valor = {};
            valor.nombre_usuario = nombreUsuarioIpx;
            valor.correo_electronico =correoElectronicoIpx;
            valor.contrasenia = contraseniaIpx;
            valor.usuario_activo = 1;

        let envio={valor};
        envio.tipo="agregarUsuarioLista";

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
                <AvForm
                    onValidSubmit={(e,v)=>{_registrarUsuario(v)}}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Ingrese el nombre de Usuario</b></Label>
                                            <AvField
                                                id="nombreUsuarioIpx"
                                                name="nombreUsuarioIpx"
                                                // label="Ingrese Nombre de Usuario"
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
                                    <Label><b>Ingrese el Correo Electrónico</b></Label>
                                    <br />
                                            <AvField
                                                id="correoElectronicoIpx"
                                                name="correoElectronicoIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: pablo@correo.com"
                                                type="text"
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  email: { value: true, errorMessage: "Debe escribir un correo válido"}
                                                }}
                                            />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <Label><b>Ingrese la Contraseña</b></Label>
                    
                                            <AvField
                                                id="contraseniaIpx"
                                                name="contraseniaIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                //placeholder="ej: pablo@correo.com"
                                                type="password"
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  minLength: { value: 8, errorMessage: "La contraseña debe tener mínimo 8 caracteres."}
                                                }}
                                            />
                                    <Label><b>Vuelva a ingresar la contraseña</b></Label>

                                            <AvField
                                                id="confirmContraseniaIpx"
                                                name="confirmContraseniaIpx"
                                                // label="Ingrese Correo Electrónico"
                                                value=""
                                                className="form-control"
                                                //placeholder="ej: pablo@correo.com"
                                                type="password"
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  match: { value:'contraseniaIpx', errorMessage: "Las contraseñas no coinciden."}
                                                }}
                                            />

                                    </Col>

                                    <Col md={6}>
                                    {/* Switch */}
                                    <Label><b>Estado de usuario</b></Label>
                                    <center>
                                        <div
                                            className="custom-control custom-switch custom-switch-md mb-3"
                                            dir="ltr"
                                        >
                                            <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id={props.id_usuario+"switchActiva"}
                                            name={props.id_usuario+"switchActiva"}
                                            checked={props.usuario_activo}
                                            onClick={e=>{console.log("dsd")}}

                                            />
                                            <label
                                            className="custom-control-label"
                                            htmlFor={props.id_usuario+"switchActiva"}
                                            >
                                
                                            </label>
                                        </div>
                                 </center>

                                  {/* fin switch */}
                                    <br /><br />
                                   <EscogerRoles />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={12}>
                                        <div id="divTablaRoles">
                                            <DataTable datosTabla={roles} columnasTabla={columnasTabla} />
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
export default NuevoUsuario;