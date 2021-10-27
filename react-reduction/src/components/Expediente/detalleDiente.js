import React, { Fragment, useEffect, useState } from 'react';

import superagent from 'superagent'; 

import {
  API_NUEVO_EXPEDIENTE,
  API_UPDATE_EXPEDIENTE,
  API_OBTENER_EXPEDIENTE,
  API_OBTENER_UN_EXPEDIENTE
} from  '../../api/apiTypes';

import Cookies from 'js-cookie';


import d11 from 'assets/img/dientes/11.jpg';
import d12 from 'assets/img/dientes/12.jpg';
import d13 from 'assets/img/dientes/13.jpg';
import d14 from 'assets/img/dientes/14.jpg';
import d15 from 'assets/img/dientes/15.jpg';
import d16 from 'assets/img/dientes/16.jpg';
import d17 from 'assets/img/dientes/17.jpg';
import d18 from 'assets/img/dientes/18.jpg';
import d21 from 'assets/img/dientes/21.jpg';
import d22 from 'assets/img/dientes/22.jpg';
import d23 from 'assets/img/dientes/23.jpg';
import d24 from 'assets/img/dientes/24.jpg';
import d25 from 'assets/img/dientes/25.jpg';
import d26 from 'assets/img/dientes/26.jpg';
import d27 from 'assets/img/dientes/27.jpg';
import d28 from 'assets/img/dientes/28.jpg';

import d31 from 'assets/img/dientes/31.jpg';
import d32 from 'assets/img/dientes/32.jpg';
import d33 from 'assets/img/dientes/33.jpg';
import d34 from 'assets/img/dientes/34.jpg';
import d35 from 'assets/img/dientes/35.jpg';
import d36 from 'assets/img/dientes/36.jpg';
import d37 from 'assets/img/dientes/37.jpg';
import d38 from 'assets/img/dientes/38.jpg';
import d41 from 'assets/img/dientes/41.jpg';
import d42 from 'assets/img/dientes/42.jpg';
import d43 from 'assets/img/dientes/43.jpg';
import d44 from 'assets/img/dientes/44.jpg';
import d45 from 'assets/img/dientes/45.jpg';
import d46 from 'assets/img/dientes/46.jpg';
import d47 from 'assets/img/dientes/47.jpg';
import d48 from 'assets/img/dientes/48.jpg';



import e01 from 'assets/img/estados/1.jpg';
import e02 from 'assets/img/estados/2.jpg';
import e03 from 'assets/img/estados/3.jpg';
import e04 from 'assets/img/estados/4.jpg';
import e05 from 'assets/img/estados/5.jpg';
import e06 from 'assets/img/estados/6.jpg';
import e07 from 'assets/img/estados/7.jpg';
import e08 from 'assets/img/estados/8.jpg';
import e09 from 'assets/img/estados/9.jpg';
import e10 from 'assets/img/estados/10.jpg';
import e11 from 'assets/img/estados/11.jpg';
import e12 from 'assets/img/estados/12.jpg';
import e13 from 'assets/img/estados/13.jpg';
//import e14 from 'assets/img/estados/14.jpg';


 

import{
    FormGroup,
    Button,
    Modal, 
    Container,
    Label,
    Row,
    Col
} from 'reactstrap';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import{
    AvForm,
    AvField,
    AvRadio,
    AvCheckboxGroup,
    AvCheckbox
} from 'availity-reactstrap-validation'

//Jsons
import { columnasTabla } from './Json/columnasExpediente';

//Componentes
import DataTable from '../DataTable/DataTable';
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';
import Table from 'reactstrap/lib/Table';


//Componente

const DetalleDiente = props =>{

    const [modalOpen, setModalOpen ]= useState(false);



  const [ activo, setActivo ] = useState(false);


    const [ estadoPieza, setEstadoPieza] = useState(1);

    const [ defaultValues, setDefaultValues ]= useState({});

    const estados=
        [ 
            { 
                "id_estado_pieza":1,
                "nombre_estado_pieza": "Bueno"            
            },
            { 
                "id_estado_pieza":2,
                "nombre_estado_pieza": "Ausente"             
            },
            { 
                "id_estado_pieza":3,
                "nombre_estado_pieza": "Extraer"             
            },
            { 
                "id_estado_pieza":4,
                "nombre_estado_pieza": "Endodoncia"             
            },
            { 
                "id_estado_pieza":5,
                "nombre_estado_pieza": "Caries 1"             
            },
            { 
                "id_estado_pieza":6,
                "nombre_estado_pieza": "Caries 2"             
            },
            { 
                "id_estado_pieza":7,
                "nombre_estado_pieza": "Caries 3"             
            },
            { 
                "id_estado_pieza":8,
                "nombre_estado_pieza": "Caries 4"             
            },
            { 
                "id_estado_pieza":9,
                "nombre_estado_pieza": "Caries 5"             
            },
            { 
                "id_estado_pieza":10,
                "nombre_estado_pieza": "Caries 6"             
            },
            { 
                "id_estado_pieza":11,
                "nombre_estado_pieza": "Caries 7"             
            },
            { 
                "id_estado_pieza":12,
                "nombre_estado_pieza": "Caries 8"             
            }
        ]
    


    const estado = [
        e01, 	e02, 	e03, 	e04, 	e05, 	e06,
        e07, 	e08, 	e09, 	e10, 	e11, 	e12, 

    ]


    
function SeleccionarEstados()
{
    const img = [];


    for (var i = 0; i < 6 ; i++)
    {
        const imagen = (
            <td>
                <center>
                <AvRadio     
                                label={estados[i].nombre_estado_pieza}                                                     
                                key={i}  
                                id="1"
                                className="checkbox_animated "
                                onClick={()=>{setEstadoPieza(estados[i].id_estado_pieza)}}
                                />   
                                <img
                                src={estado[i]}
                                value={estados[i].id_estado_pieza}
                                width="60"
                                height="50"
                                className="pr-2"
                                alt=""
                                />    
                </center>
            </td>
        );
        img.push(imagen);
    }

    return (
        <tr>{img}</tr>
    );
}
function SeleccionarEstados2()
{
    const img = [];


    for (var i = 6; i <= 11 ; i++)
    {
        console.log("estado: ", estados[i]);
        const imagen = (
            <td>
                <center>
                <AvRadio     
                                label={estados[i].nombre_estado_pieza}                                                     
                                key={i}  
                                id="1"
                                valor={estados[i].id_estado_pieza}
                                className="checkbox_animated "
                                onClick={()=>{setEstadoPieza(i+1)}}
                                />   
                                <img
                                src={estado[i]}
                                value={estados[i].id_estado_pieza}
                                width="60"
                                height="50"
                                className="pr-2"
                                alt=""
                                />    
                </center>
            </td>
        );
        img.push(imagen);
    }

    return (
        <tr>{img}</tr>
    );
}


const _registrarDetalles=async(valor_inputs)=>{
       
    console.log("INPUTS: ",estadoPieza, ", ", props.diente);

    props.cambioPieza({id_pieza: props.diente, id_f_estado_pieza: estadoPieza})
            setModalOpen(false);


}

  /*  const _detalleSubmit() =>{
        // console.log(v);
        let recurso_marcados=[]; 
        recurso_marcados = recurso.filter((recurso)=> recurso.marcado == true );
        props.submitRecurso(recurso_marcados)

        datos={id_diente: props.diente, valor_estado: valorEstado };
        props.guardarEstadoDiente(datos);
        



        
        setModalRecursoOpen(false);
    }
*/
    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
     

                <Button 
                    className="btn btn-dark btn-sm"
                   
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        props.diente
                        
                        )
                    }

                </Button>
        
                    <br/>

        
                {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(

                       
                        <img
                        src={props.pieza}
                        width="30"
                        height="50"
                        className="pr-2"
                        alt=""                        
                        onClick={()=>{setModalOpen(true)}}        
        
                      />
                   

                        )
                    }


<br/>


            <Modal
                size="lg"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">


                    <h4 className="modal-title mt-0"><b>Detalle Pieza {props.diente}</b>     
                    <img
                                src={props.pieza}
                                width="20"
                                height="25"
                                className="pr-2"
                                alt=""
                                />
                    </h4>
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
                    onValidSubmit={(e,v)=>{ _registrarDetalles(v) }}//_registrarExpediente(v)
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>


                        <Row>
    <Col>
    <br></br>
<Tabs>
    <TabList>
      <Tab><b>Características</b></Tab>
      <Tab disabled><b>Requeridos</b></Tab>
      <Tab disabled><b>Observaciones</b></Tab>
    </TabList>

   

    <TabPanel>

<Row>                  
<Col md={12}>

<Label for="checkboxExample" >Diagnóstico del Estado Actual de la Pieza</Label>
{props.id_pieza}
</Col>
</Row>
    <Row>
        <Col>
    <AvForm> 
    <AvRadioGroup  name="a" >

        <Row>        

        <Col>
        <table border='1' width="100%">
                            <tr>
                                <td colspan="17"><center>Estados Disponibles</center></td>
                            </tr>

                        <SeleccionarEstados/>
                        <SeleccionarEstados2/>


</table>

</Col>
</Row>

                                </AvRadioGroup>

</AvForm>
</Col> 
                                </Row>


    </TabPanel>

    <TabPanel>
    <Row>                  
<Col md={12}>
    <h5 className="modal-title mt-0"><b>Requeridos</b></h5>                         
<p> 
    Servicios Requeridos en pieza.
</p>

</Col>
</Row>/*
<Row>
        <Col md={12}>
            <AvForm> 
                <AvRadioGroup  name="a" >
                                <AvRadio                                        
                                
                                label="Limpieza"                                                        
                                key="1"                                
                                
                                className="checkbox_animated "
                                />                                
                                
                                <AvRadio                                     
                                
                                label="Endodoncia"                                                        
                                key="2"
                                
                                className="checkbox_animated "
                                />
                                
                    
                                </AvRadioGroup>

                                </AvForm> 
                                </Col>

                                </Row>*/



    </TabPanel>
    <TabPanel>
    <h5 className="modal-title mt-0"><b>Observaciones</b></h5>                         
<p> 
    Características Particulares a tomar en cuenta.
</p>
    </TabPanel>



    </Tabs>


  
    </Col>
</Row>


<br></br>
 

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
export default DetalleDiente;