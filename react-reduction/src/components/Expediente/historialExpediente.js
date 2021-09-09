import React, { Fragment, useEffect, useState } from 'react';

import superagent from 'superagent'; 

import {
  API_NUEVO_EXPEDIENTE,
  API_UPDATE_EXPEDIENTE,
  API_OBTENER_EXPEDIENTE,
  API_OBTENER_UN_EXPEDIENTE,
  API_OBTENER_PIEZAS
} from  '../../api/apiTypes';

import Cookies from 'js-cookie';


import DetalleDiente from './detalleDiente';

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
import AvRadioGroup from 'availity-reactstrap-validation/lib/AvRadioGroup';


//Jsons
import { columnasTabla } from './Json/columnasHistorial';

//Componentes
import DataTable from '../DataTable/DataTable';

import 'react-tabs/style/react-tabs.css';

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



//Componente

const HistorialExpediente = props =>{

    const [modalOpen, setModalOpen ]= useState(false);



  const [ activo, setActivo ] = useState(false);


    const [ estadoExpediente, setExpedienteActivo] = useState(false);

    const [ defaultValues, setDefaultValues ]= useState({});



    //const _crearFilasListaExpediente=async()=>{
/*
const arraypiezas=async()=>{
    let imagenes_piezas = {d11,d12,d13};
    
    for (let arrayimagenes of imagenes_piezas)
    {
        let imagen = (
        <tr>
        <td>
            <center>
            <DetalleDiente 
        diente='18'
        pieza={arrayimagenes}
        />
             </center>
        </td>
        </tr>
        )

    }

}
*/

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



    function calcularEdad(birthday) {
        var birthday_arr = birthday.split("-");
        var birthday_date = new Date(birthday_arr[2], birthday_arr[1] - 1, birthday_arr[0]);
        var ageDifMs = Date.now() - birthday_date.getTime();
        var ageDate = new Date(ageDifMs);
        return ageDate.getUTCFullYear()-2029 ; // Math.abs(ageDate.getUTCFullYear() - 1970);
    }





//----------------------------------------------------------------------------


    //Función que simula la inicialización de servicios.
    const _obtenerServicios=async(listaExpediente)=>{
        /* simulando la llamada a un servicio */
           
         let token= Cookies.get('token');  
  
        let respuesta_Expediente = await superagent.post(
          process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_PIEZAS)
          .set('Accept', 'application/json').set("Authorization", "Bearer " + token);
          await props.setListaExpediente(respuesta_Expediente.body);
  
          console.log("valor de filas detectadas: ", respuesta_Expediente.body)  
  
    }
  
  
      //Función que llama a los usuarios en el servidor.
      const _obtenerExpediente = async() =>{
    
        let token= Cookies.get('token');
  
        let respuesta_Expediente = await superagent.post(
          process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EXPEDIENTE)
        .set('Accept', 'application/json').set("Authorization", "Bearer " + token);
  
        
  
  
        await props.setListaExpediente(respuesta_Expediente.body);
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
                    {
                        props.mensajeBoton
                    
                    }

                </Button>
        

            <Modal
                size="xl"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">
         





                        <h4 className="modal-title mt-0"><b>Historial Clínico</b></h4>                        


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
                         
                                <Row>
                                    <Col md={6}>
                                    <h5> <b>Paciente:</b> {props.nombre} {props.apellido} </h5>
                                    </Col>



                                    <Col md={6}>
                                    <h5> <b>Edad:</b> {calcularEdad(props.edad)}</h5>
                                    </Col>

                                    
                                 
                               </Row>




                               <Tabs>
    <TabList>
      <Tab><b>Ficha Clínica</b></Tab>
      <Tab><b>Diagnósticos</b></Tab>
    </TabList>

    <TabPanel>

    <Row>
                        <Col >
                        <div>

                            <h5 className="modal-title mt-0"><b>Odontograma</b></h5>      



<table border='1' width='100%'>



                        <tr>
                            <td>
                                <center>
                                <DetalleDiente 
                            diente='18'
                            pieza={d18}
                        />

                            <img
                                src={d18}
                                width="30"
                                height="50"
                                className="pr-2"
                                alt=""
                                /><br></br>
                                18

                                </center>

                            </td>






                            <td><center>
                            <img
                src={d17}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                17
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d16}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                16
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d15}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                15
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d14}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                14
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d13}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                13
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d12}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                12
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d11}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                11
                                </center>
                            </td>
                            <td><center>
                                --
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d21}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                21
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d22}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                22
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d23}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                23
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d24}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                24
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d25}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                25
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d26}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                26
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d27}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                27
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d28}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                28
                                </center>
                            </td>
                            
                    

                            
                            </tr>




                                                    <tr>
                            <td><center>
                            <img
                src={d48}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                48
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d47}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                47
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d46}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                46
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d45}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                45
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d44}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                44
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d43}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                43
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d42}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                42
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d41}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                41
                                </center>
                            </td>
                            <td><center>
                                --
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d31}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                31
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d32}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                32
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d33}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                33
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d34}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                34
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d35}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                35
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d36}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                36
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d37}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                37
                                </center>
                            </td>
                            <td><center>
                            <img
                src={d38}
                width="30"
                height="50"
                className="pr-2"
                alt=""
              /><br></br>
                                38
                                </center>
                            </td>
                            
                    

                            
                            </tr>


</table>

               </div>

                      </Col>

                        </Row>


  
                    <Row>
                        <Col md={12}>

                            <br/><br/>
                            <h5> <b>Anexos</b> </h5>
                        </Col>
                    </Row>
                    <hr />
                    <AvForm >

                    <Row>
                    <Col md={12}>

                    <h6> <b>Puente</b> </h6>
                    </Col>
</Row>
<Row>
                                <Col md={4}>

                                        <Label><b>Diente Color</b></Label>
                    <FormGroup>

                                        <AvField
                                            //id="nombreUsuarioIpx"
                                            id="diente_color_front"
                                            name="diente_color_front"
                                            value=""
                                            className="form-control"
                                            placeholder="Escriba el Color del Diente"
                                            type="text"
                            key="5"
                                           
                                           
                                        />
                    </FormGroup>

                                </Col>
                             
                                <Col md={4}>

                                        <Label><b>Guia</b></Label>
                    <FormGroup>

                                        <AvField
                                            //id="nombreUsuarioIpx"
                                            id="guia_front"
                                            name="guia_front"
                            key="6"
                                         
                                            value=""
                                            className="form-control"
                                            placeholder="Escriba la guía"
                                            type="text"
                             
                                        />
                            </FormGroup>

                                </Col>
                           
                                
                       

                                                    <Col md={4}>

                            <Label><b>Tipo de Puente</b></Label>

                            <AvRadioGroup inline name="tipo">

                       

                            <AvRadio                                       
                                
                                label="Acrílico"                                                        
                                key="1"      
                                />
                
                                <AvRadio                                     
                                
                                label="Porcelana"                                                        
                                key="1"
                                />
                                  

</AvRadioGroup>
</Col>
                                
                           </Row>
                           <hr />

<Row>
<Col>

<h6> <b>Limpieza</b> </h6>
<AvField
                                            //id="nombreUsuarioIpx"
                                            id="limpieza_front"
                                            name="limpieza_front"
                            key="6"
                                         
                                            value=""
                                            className="form-control"
                                            placeholder="Escriba el tipo de limpieza requerido"
                                            type="text"
                             
                                        />

</Col>
</Row>
                           <hr />

                           <Row>
                    <Col md={12}>

                    <h6> <b>Endodoncia</b> </h6>
                    </Col>
</Row>
<Row>
                                <Col md={4}>

                                        <Label><b>Diente</b></Label>
                    <FormGroup>

                                        <AvField
                                            //id="nombreUsuarioIpx"
                                            id="diente_front"
                                            name="diente_front"
                                            value=""
                                            className="form-control"
                                            placeholder="Escriba el Diente"
                                            type="text"
                            key="5"
                                           
                                           
                                        />
                    </FormGroup>

                                </Col>
                             
                                <Col md={4}>

                                        <Label><b>Vitalidad</b></Label>
                    <FormGroup>

                                        <AvField
                                            //id="nombreUsuarioIpx"
                                            id="guia_front"
                                            name="guia_front"
                            key="6"
                                         
                                            value=""
                                            className="form-control"
                                            placeholder="Escriba el nivel de Vitaliad"
                                            type="text"
                             
                                        />
                            </FormGroup>

                                </Col>
                             
                             <Col md={4}>

                                     <Label><b>Medida Provisional</b></Label>
                 <FormGroup>

                                     <AvField
                                         //id="nombreUsuarioIpx"
                                         id="medida_front"
                                         name="medida_front"
                         key="6"
                                      
                                         value=""
                                         className="form-control"
                                         placeholder="Escriba el tipo de lima a Usar"
                                         type="text"
                          
                                     />
                         </FormGroup>

                             </Col>
                                
                                           
                      
                      
                            </Row>

                            <hr />

<Row>
<Col md={12}>

<h6> <b>Notas Adicionales</b> </h6>


                            <AvField
                                                
                                                id="otros"
                                                name="otros"
                                                
                                                value=""
                                                className="form-control"
                                                placeholder="Notas Relevantes"
                                                type="textarea"    
                                                style={{ height: 120 }}                                                      

                                            />

</Col>
</Row>

</AvForm>


      
    </TabPanel>
    <TabPanel>



      <h5 className="modal-title mt-0"><b>Diagnósticos</b></h5>                         

<div id="divTablaHistorial">
                    <DataTable  columnasTabla={columnasTabla} />
                </div>




    </TabPanel>
  </Tabs>

                                <Row>
                        <Col >







                   </Col>
                        </Row>

           









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
       

            </Modal>
        </Fragment>
    )
}
export default HistorialExpediente;


