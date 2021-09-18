import React, { Fragment, useEffect, useState } from 'react';
//librerias
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

import Cookies from 'js-cookie';

import superagent from 'superagent';

//Jsons
import listEstadosJson from './Json/listEstados.json';

//apiTypes
import{
    API_LISTA_DIAGNOSTICO_ESTADOS
} from '../../../api/apiTypes';


//Componente
const EscogerEstados = props =>{

    const [modalEstadoOpen, setModalEstadoOpen] = useState(false);
    const [ listaEstados, setListaEstados ]= useState([]);

    const [estados, setEstados] = useState([]);


    const checkBoxStyle={
        margin:'0px,3px',
    }
    //CICLO DE VIDA
    useEffect(()=>{
        _obtenerEstados();
    },[]);

    useEffect(()=>{
        if(listaEstados.length != 0)
        {
            _setearEstados();
        }
    },[props.estadosAsignados, listaEstados])
    //END CICLO DE VIDA

   //Funcion que simula una petición al servidor por la lista de estados activos.
    const _obtenerEstados = async ()=> {
        let estadosList = await listEstadosJson;

        let token= Cookies.get('token');
       

        
        let respuesta_estados = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_DIAGNOSTICO_ESTADOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
    
        console.log("la respuesta: ", respuesta_estados.body);

         setListaEstados( respuesta_estados.body);
    }
    //Funcion que comunica por medio de props los estados seleccionados.
    const _estadosSubmit=()=>{
        // console.log(v);
        let estados_marcados=[];

  

        estados_marcados = estados.filter((estado)=> estado.marcado == true );



        props.submitEstados(estados_marcados)
        setModalEstadoOpen(false);
    }

    //Funcion que recibe estados pre seleccionados por props y los selecciona de la lista de estados.
    const _setearEstados = ()=>{
        let estados_n=[]
        //console.log("los estados que le llegaron: ", props.estadosAsignados);
        listaEstados.map(estado_it=>{
            
            let estado={...estado_it};
            let marcado=false;
            props.estadosAsignados.map(estado_asig_it =>{
                if(estado_asig_it.id_usuario == estado.id_usuario)
                {
                    marcado = true;
                }
            })

            estado.marcado = marcado;
            //console.log("estado >> ",estado)
            estados_n.push(estado);
        })

        setEstados(estados_n);

    }

    //Funcion que detecta el cambio en un checkbox en especifico y cambia el valor de seleccionado para ese estado en el estado.
    const _cambioCheckbox=(event)=>{
        //console.log(event);
        let {value}=event.target;
        let estados_nuevos=[];

        //console.log(value);
        estados.map(estado_it=>{
            let estado={...estado_it};
           // console.log("estadoit>> ", estado);
            if(estado.id_usuario == value)
            {   
               let valor_actual= estado_it.marcado;
               //console.log("el valor actual: ", valor_actual);
               estado.marcado=!valor_actual;
               
            }
           
            estados_nuevos.push(estado)
        })
        setEstados(estados_nuevos)


    }

    //Funcion para verificar si al menos un checkbox fue escogido- NO EN USO.
    const _verificarCheckbox=(value, ctx, input, cb)=>{
        //console.log("value: ", value);

        if(value.length!=0)
        {
            return true;
        }
        else
        {
            return "Debe escoger al menos un estado para el usuario.";
        }
    }

  
    



    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    id="gestionEstadosbtn"
                    name="gestionEstadosbtn"
                    className="btn btn-primary btn-md btn-block"
                    onClick={()=>{setModalEstadoOpen(true)}}
                >
                    Elegir Estados
                </Button>
            </FormGroup>

            <Modal
                size="md"
                className="modal-md primary"

                isOpen={modalEstadoOpen}
                toggle={()=>{
                    setModalEstadoOpen()
                }}
                centered={true}
            >
                <div className="modal-header">
                    <h4 className="modal-title mt-0">Eleccion de Estados</h4>
                    <button
                        type="button"
                        onClick={() => {
                            setModalEstadoOpen()
                        }}
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>

                </div>
                {/* <AvForm
                    onValidSubmit={(e,v)=>{_estadosSubmit(v)}}
                > */}
                    <div className="modal-body">
                        <Container fluid={true}>
                            <Row>                                
                                <Label for="checkboxExample">Listado de estados</Label>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <AvCheckboxGroup  name="estadosEscogidosCbx" 
                                    //validate={{myValidation: _verificarCheckbox}}
                                    >
                                    <Row>
                                    {
                                        listaEstados.length != 0?
                                        (   
                                            
                                           
                                                    estados.map((estado,key) =>{
                                                       
                                                      

                                                        return(
                                                        <Col md={6} style={checkBoxStyle} key={key}>
                                                        <AvCheckbox 
                                                            label={estado.nombre_usuario} 
                                                            value={estado.id_usuario} 
                                                            checked={estado.marcado}
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
                              onClick={_estadosSubmit}
                            >
                             Asignar
                            </Button>
                          </div> 
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalEstadoOpen(false)}}>Cerrar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
               {/* </AvForm> */}
            </Modal>
        </Fragment>
            )
}

export default EscogerEstados