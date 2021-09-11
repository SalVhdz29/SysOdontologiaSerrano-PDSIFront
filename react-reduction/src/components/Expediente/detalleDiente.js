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

const NuevoExpediente = props =>{

    const [modalOpen, setModalOpen ]= useState(false);



  const [ activo, setActivo ] = useState(false);


    const [ estadoExpediente, setExpedienteActivo] = useState(false);

    const [ defaultValues, setDefaultValues ]= useState({});



    //CICLO DE VIDA
    useEffect(()=>{

        if(props.isReadOnly == true || props.isEditable == true)
        {
            //console.log("El default Value: ", props.defaultValue);
            _setDefaultValue();
        }

    },[props.defaultValue])



    //FIN CICLO DE VIDA



    //Función que da valores por defecto a los campos en el formulario.
    const _setDefaultValue=()=>{
        let id_expediente = 0;
        let nombre_paciente_front="";
        let apellido_paciente_front="";
        let dui_front = "";
        let sexo_front = 0;
        let correo_front = "";
        let telefono_front = "";
        let ultima_fecha_front = "";
        let fecha_nacimiento_front="";
        let direccion_front = "";

        let {
            nombre_paciente,
            apellido_paciente,
            dui,
            sexo,
            correo,
            telefono,
            ultima_fecha,
            fecha_nacimiento,
            direccion
        } = props.defaultValue;

        if(nombre_paciente){
            nombre_paciente_front = nombre_paciente;
        }
        if(apellido_paciente){
            apellido_paciente_front = apellido_paciente;
        }
        if(sexo){
            sexo_front = "Masculino";
        }else{
            sexo_front = "Femenino";
        }
        if(dui){
            dui_front = dui;
        }
        if(correo){
            correo_front = correo;
        }
        if(telefono){
            telefono_front = telefono;
        }
        if(ultima_fecha){
            ultima_fecha_front = ultima_fecha;
        }
        if(fecha_nacimiento){
            fecha_nacimiento_front = fecha_nacimiento;
        }
        if(direccion){
            direccion_front = direccion;
        }
        //console.log("default Value", props.defaultValue)


        setDefaultValues({nombre_paciente_front,apellido_paciente_front,dui_front, sexo_front,correo_front, telefono_front, ultima_fecha_front,fecha_nacimiento_front,direccion_front});
    }

    const _registrarExpediente=async(valor_inputs)=>{
            //console.log("el valor obtenido", valor_inputs);
            console.log("ENTRO AL METODO REGISTRAS");
            let fecha_actual = new Date();            
            let mes = fecha_actual.getMonth()+1;
            let { 
                    nombre_paciente_front,
                    apellido_paciente_front,
                    dui_front,
                    sexo_front,
                    correo_front,
                    telefono_front,
                    fecha_nacimiento_front,
                    direccion_front
                } = valor_inputs;

            let valor = {};
            valor.nombre_paciente = nombre_paciente_front;
            valor.apellido_paciente = apellido_paciente_front;
            valor.dui = dui_front;
            
            valor.correo = correo_front;
            valor.telefono = telefono_front;
            valor.ultima_fecha = fecha_actual.getDate()+"-"+mes+"-"+fecha_actual.getFullYear();
            valor.fecha_nacimiento = fecha_nacimiento_front;
            valor.direccion = direccion_front;
            console.log("antes del sexo");
           if(sexo_front == "M"){
            valor.sexo = 1;
           }else{
            valor.sexo = 0;
           }
        //    console.log("despues del sexo del sexo");

            let tipo="";
            if(props.isEditable)
                        {
                            console.log("LO QUE ENVIA: ", valor);
                            valor.id_expediente = props.defaultValue.id_expediente;
                            tipo="editarExpedienteLista";
                            let token= Cookies.get('token');
                              let respuesta_Expediente = await superagent.post(
                                process.env.REACT_APP_ENDPOINT_BASE_URL + API_UPDATE_EXPEDIENTE)
                                .set('Accept', 'application/json').set("Authorization", "Bearer " + token).send(valor)
                                console.log("LA RESPUESTA: ", respuesta_Expediente)
                        }
                        else
                        {
                            console.log("entro al else: "+valor.sexo);
                            tipo="agregarExpedienteLista";
                            let token= Cookies.get('token');
                              let respuesta_Expediente = await superagent.post(
                                process.env.REACT_APP_ENDPOINT_BASE_URL + API_NUEVO_EXPEDIENTE)
                                .set('Accept', 'application/json').set("Authorization", "Bearer " + token).send(valor)
                        }

            let envio={tipo,valor};
            if(props.cambioDatos != undefined)
            {
                await props.cambioDatos(envio);
            }
            
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
                    onValidSubmit={(e,v)=>{_registrarExpediente(v)}}
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
</Col>
</Row>
    <Row>
        <Col>
    <AvForm> 
    <AvRadioGroup  name="a" >

        <Row>        
        <Col>
                    <Label>
                        <center>
                                <AvRadio     
                                label="Bueno"                                                        
                                key="1"  
                                id="1"
                                className="checkbox_animated "
                                />   
                                <img
                                src={e01}
                                width="60"
                                height="50"
                                className="pr-2"
                                alt=""
                                />                            
                                </center>
                    </Label>
                    </Col>
        <Col>
                                
                    <Label>
                        <center>
                                <AvRadio     
                                label="Ausente"                                                        
                                key="1"  
                                id="1"
                                className="checkbox_animated "
                                />   
                                <img
                                src={e02}
                                width="60"
                                height="50"
                                className="pr-2"
                                alt=""
                                />                            
                                </center>
                    </Label>      
        </Col>
        <Col>
                                
                                <Label>
                                    <center>
                                            <AvRadio     
                                            label="Extraer"                                                        
                                            key="1"  
                                            id="1"
                                            className="checkbox_animated "
                                            />   
                                            <img
                                            src={e03}
                                            width="60"
                                            height="50"
                                            className="pr-2"
                                            alt=""
                                            />                            
                                    </center>

                                </Label>      
                    </Col>
                    <Col>
                                
                                <Label>
                                <center>

                                            <AvRadio     
                                            label="Endodoncia"                                                        
                                            key="1"  
                                            id="1"
                                            className="checkbox_animated "
                                            />   
                                            <img
                                            src={e04}
                                            width="60"
                                            height="50"
                                            className="pr-2"
                                            alt=""
                                            />    
                                    </center>

                                </Label>      
                    </Col>
                    <Col>
                                
                                <Label>
                                <center>

                                            <AvRadio     
                                            label="Caries 1"                                                        
                                            key="1"  
                                            id="1"
                                            className="checkbox_animated "
                                            />   
                                            <img
                                            src={e05}
                                            width="60"
                                            height="50"
                                            className="pr-2"
                                            alt=""
                                            />    
                                    </center>

                                </Label>      
                    </Col>
                    <Col>
                                
                                <Label>
                                <center>

                                            <AvRadio     
                                            label="Caries 2"                                                        
                                            key="1"  
                                            id="1"
                                            className="checkbox_animated "
                                            />   
                                            <img
                                            src={e06}
                                            width="60"
                                            height="50"
                                            className="pr-2"
                                            alt=""
                                            />                            
                                    </center>

                                </Label>      
                    </Col>
                    <Col>
                                
                                <Label>
                                <center>

                                            <AvRadio     
                                            label="Caries 3"                                                        
                                            key="1"  
                                            id="1"
                                            className="checkbox_animated "
                                            />   
                                            <img
                                            src={e07}
                                            width="60"
                                            height="50"
                                            className="pr-2"
                                            alt=""
                                            />                            
                                    </center>

                                </Label>      
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
</Row>
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

                                </Row>



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
                        {props.isReadOnly?(undefined):(
                        <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              type="submit"
                            >
                             Guardar
                            </Button>
                          </div> 
                               )} 
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
export default NuevoExpediente;