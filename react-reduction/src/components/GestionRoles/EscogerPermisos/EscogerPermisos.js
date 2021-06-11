import React, { Fragment, useEffect, useState } from 'react';
//librerias
import {
   AvForm,
   AvInput,
   AvCheckboxGroup,
   AvCheckbox
} from 'availity-reactstrap-validation';

import Cookies from 'js-cookie';
import superagent from 'superagent';

//ApiTypes
import {
    API_LISTA_ROLES_PERMISO
  } from '../../../api/apiTypes';

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
import listPermisosJson from './Json/ListPermisos.json';

//Icono
import {BsFillFolderFill } from 'react-icons/bs';

//Componente
const EscogerPermisos = props =>{

    const [modalPermisoOpen, setModalPermisoOpen] = useState(false);
    const [ listaPermisos, setListaPermisos ]= useState([]);

    const [permisos, setPermisos] = useState([]);


    const checkBoxStyle={
        margin:'0px,3px',
    }
    //CICLO DE VIDA
    useEffect(()=>{
        _obtenerPermisos();
    },[]);

    useEffect(()=>{
        if(listaPermisos.length != 0)
        {
            _setearPermisos();
        }
    },[props.permisosAsignados, listaPermisos])
    //END CICLO DE VIDA

   //Funcion que simula una petición al servidor por la lista de Permisos activos.
    const _obtenerPermisos = async ()=> {


        let token= Cookies.get('token'); 
        
    
        let respuesta_permisos = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_ROLES_PERMISO) 
                                                 .set('Accept', 'application/json') 
                                                 .set("Authorization", "Bearer " + token); 
     
       // console.log("la respuesta: ", respuesta_permisos.body); 
 
         setListaPermisos( respuesta_permisos.body);

    }
    //Funcion que comunica por medio de props los permisos seleccionados.
    const _permisosSubmit=()=>{
        // console.log(v);
        let permisos_marcados=[];

  

        permisos_marcados = permisos.filter((permiso)=> permiso.marcado == true );



        props.submitPermisos(permisos_marcados)
        setModalPermisoOpen(false);
    }

    //Funcion que recibe permisos pre seleccionados por props y los selecciona de la lista de permisos.
    const _setearPermisos = ()=>{
        let permisos_n=[]
        //console.log("los permisos que le llegaron: ", props.permisosAsignados);
        listaPermisos.map(permiso_it=>{
            
            let permiso={...permiso_it};
            let marcado=false;
            props.permisosAsignados.map(permiso_asig_it =>{
                if(permiso_asig_it.id_rol == permiso.id_rol)
                {
                    marcado = true;
                }
            })

            permiso.marcado = marcado;
            //console.log("permiso >> ",permiso)
            permisos_n.push(permiso);
        })

        setPermisos(permisos_n);

    }

    //Funcion que detecta el cambio en un checkbox en especifico y cambia el valor de seleccionado para ese permiso en el estado.
    const _cambioCheckbox=(event)=>{
        //console.log(event);
        let {value}=event.target;
        let permisos_nuevos=[];

        //console.log(value);
        permisos.map(permiso_it=>{
            let permiso={...permiso_it};
           // console.log("permisoit>> ", permiso);
            if(permiso.id_rol == value)
            {   
               let valor_actual= permiso_it.marcado;
               //console.log("el valor actual: ", valor_actual);
               permiso.marcado=!valor_actual;
               
            }
           
            permisos_nuevos.push(permiso)
        })
        setPermisos(permisos_nuevos)


    }


    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    id="gestionPermisosbtn"
                    name="gestionPermisosbtn"
                    className="btn btn-primary btn-md btn-block"
                    onClick={()=>{setModalPermisoOpen(true)}}
                >
                    Elegir Permisos
                </Button>
            </FormGroup>

            <Modal
                size="lg"
                className="modal-lg primary"

                isOpen={modalPermisoOpen}
                toggle={()=>{
                    setModalPermisoOpen()
                }}
                centered={true}
            >
                <div className="modal-header">
                    <h4 className="modal-title mt-0">Seleccion de Permisos</h4>
                    <button
                        type="button"
                        onClick={() => {
                            setModalPermisoOpen()
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                {/* <AvForm
                    onValidSubmit={(e,v)=>{_permisosSubmit(v)}}
                > */}
                    <div className="modal-body">
                        <Container fluid={true}>
                            <Row>                                
                                <Label for="checkboxExample" >Listado de permisos</Label>
                            </Row>
                            <Row>
                                <Col md={12}>
                                
                                <AvCheckboxGroup  name="permisosEscogidosCbx"
                                    //validate={{myValidation: _verificarCheckbox}}
                                    >
                                    <Row>
                                    {
                                        listaPermisos.length != 0?
                                        (   
                                            
                                           
                                                    permisos.map((permiso,key) =>{
                                                       
                                                      

                                                        return(
                                                        <Col md={6} style={checkBoxStyle} key={key}>
                                                        <Row>
                                                        < BsFillFolderFill/>                                                      
                                                        <AvCheckbox 
                                                            label={permiso.nombre_rol} 
                                                            value={permiso.id_rol} 
                                                            checked={permiso.marcado}
                                                            key={key}
                                                             onChange={_cambioCheckbox}
                                                            className="checkbox_animated "
                                                        /></Row>
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
                              color = "primary"
                              onClick={_permisosSubmit}
                            >
                             Asignar
                            </Button>
                          </div> 
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalPermisoOpen(false)}}>Cerrar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
               {/* </AvForm> */}
            </Modal>
        </Fragment>
            )
}

export default EscogerPermisos