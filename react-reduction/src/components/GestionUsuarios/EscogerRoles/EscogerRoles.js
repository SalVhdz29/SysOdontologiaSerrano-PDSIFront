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

    const [roles, setRoles] = useState([]);


    const checkBoxStyle={
        margin:'0px,3px',
    }

    useEffect(()=>{
        _obtenerRoles();
    },[]);

    useEffect(()=>{
        if(listaRoles.length != 0)
        {
            _setearRoles();
        }
    },[props.rolesAsignados, listaRoles])

   
    const _obtenerRoles = async ()=> {
        let rolesList = await listRolesJson;
         setListaRoles(rolesList);
    }

    const _rolesSubmit=()=>{
        // console.log(v);
        let roles_marcados=[];

  

        roles_marcados = roles.filter((rol)=> rol.marcado == true );



        props.submitRoles(roles_marcados)
        setModalRolOpen(false);
    }

    const _setearRoles = ()=>{
        let roles_n=[]
        listaRoles.map(rol_it=>{
            
            let rol={...rol_it};
            let marcado=false;
            props.rolesAsignados.map(rol_asig_it =>{
                if(rol_asig_it.id_usuario == rol.id_usuario)
                {
                    marcado = true;
                }
            })

            rol.marcado = marcado;
            console.log("rol >> ",rol)
            roles_n.push(rol);
        })

        setRoles(roles_n);

    }

    const _cambioCheckbox=(event)=>{
        console.log(event);
        let {value}=event.target;
        let roles_nuevos=[];

        console.log(value);
        roles.map(rol_it=>{
            let rol={...rol_it};
            console.log("rolit>> ", rol);
            if(rol.id_usuario == value)
            {   
               let valor_actual= rol_it.marcado;
               console.log("el valor actual: ", valor_actual);
               rol.marcado=!valor_actual;
               
            }
           
            roles_nuevos.push(rol)
        })
        setRoles(roles_nuevos)


    }

    const _verificarCheckbox=(value, ctx, input, cb)=>{
        console.log("value: ", value);

        if(value.length!=0)
        {
            return true;
        }
        else
        {
            return "Debe escoger al menos un rol para el usuario.";
        }
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
                {/* <AvForm
                    onValidSubmit={(e,v)=>{_rolesSubmit(v)}}
                > */}
                    <div className="modal-body">
                        <Container fluid={true}>
                            <Row>                                
                                <Label for="checkboxExample">Listado de roles</Label>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <AvCheckboxGroup  name="rolesEscogidosCbx" 
                                    //validate={{myValidation: _verificarCheckbox}}
                                    >
                                    <Row>
                                    {
                                        listaRoles.length != 0?
                                        (   
                                            
                                           
                                                    roles.map((rol,key) =>{
                                                       
                                                      

                                                        return(
                                                        <Col md={6} style={checkBoxStyle} key={key}>
                                                        <AvCheckbox 
                                                            label={rol.nombre_usuario} 
                                                            value={rol.id_usuario} 
                                                            checked={rol.marcado}
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
                        <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              onClick={_rolesSubmit}
                            >
                             Asignar
                            </Button>
                          </div> 
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalRolOpen(false)}}>Cerrar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
               {/* </AvForm> */}
            </Modal>
        </Fragment>
            )
}

export default EscogerRoles