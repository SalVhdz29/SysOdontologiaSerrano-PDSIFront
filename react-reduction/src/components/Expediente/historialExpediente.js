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
import swal from 'sweetalert'

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


//Componente

const HistorialExpediente = props =>{

    const [modalOpen, setModalOpen ]= useState(false);



  const [ activo, setActivo ] = useState(false);



    const [ defaultValues, setDefaultValues ]= useState({});

    const [ listaPiezas, setListaPiezas] = useState({});
    const [ listadoPiezas, crearPiezas] = useState({});

    const [ dienteColor, setDienteColor ] = useState("");
    const [ guia, setGuia ] = useState("");
    const [ tipoPuente, setTipoPuente ]=useState(1);
    const [ limpieza, setLimpieza ] = useState("");
    const [ diente, setDiente ] = useState("");
    const [ vitalidad, setVitalidad ] = useState("");
    const [ medidaProvisional, setMedidaProvisional ] = useState("");
    const [ notas, setNotas ]=useState("")


    
    
    const [estadosPieza, setEstadosPieza]=useState(
        {
            1 : 1, 2 : 1, 3 : 1, 4 : 1, 5 : 1, 6 : 1, 7 : 1, 8 : 1,
            9 : 1, 10 : 1, 11 : 1, 12 : 1, 13 : 1, 14 : 1, 15 : 1, 16 : 1,
            17 : 1, 18 : 1, 19 : 1, 20 : 1, 21 : 1, 22 : 1, 23 : 1, 24 : 1,
            25 : 1, 26 : 1, 27 : 1, 28 : 1, 29 : 1, 30 : 1, 31 : 1, 32 : 1
            
        }
        );

        
           /* 1 : 1, 2 : 5, 3 : 1, 4 : 1, 5 : 1, 6 : 1, 7 : 1, 8 : 1,
            9 : 1, 10 : 1, 11 : 1, 12 : 1, 13 : 1, 14 : 1, 15 : 1, 16 : 1,
            17 : 1, 18 : 1, 19 : 1, 20 : 1, 21 : 1, 22 : 1, 23 : 1, 24 : 1,
            25 : 1, 26 : 1, 27 : 1, 28 : 1, 29 : 1, 30 : 1, 31 : 1, 32 : 1*/

    const [listaDientes, setListaDientes]=useState(
        [ 
            { 
                "id_f_pieza":1,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":2,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":3,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":4,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":5,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":6,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":7,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":8,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":9,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":10,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":11,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":12,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":13,
                "id_f_estado_pieza": 1           
            },
            { 
                "id_f_pieza":14,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":15,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":16,
                "id_f_estado_pieza": 1           
            },
            { 
                "id_f_pieza":17,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":18,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":19,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":20,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":21,
                "id_f_estado_pieza": 1           
            },
            { 
                "id_f_pieza":22,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":23,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":24,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":25,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":26,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":27,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":28,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":29,
                "id_f_estado_pieza": 1           
            },
            { 
                "id_f_pieza":30,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":31,
                "id_f_estado_pieza": 1            
            },
            { 
                "id_f_pieza":32,
                "id_f_estado_pieza": 1            
            }
        ]
        );


        const pieza = [
            d11, 	d12, 	d13, 	d14, 	d15, 	d16, 	d17, 	d18, 	
            d21, 	d22, 	d23, 	d24, 	d25, 	d26, 	d27, 	d28, 	
            d31, 	d32, 	d33, 	d34, 	d35, 	d36, 	d37, 	d38, 	
            d41, 	d42, 	d43, 	d44, 	d45, 	d46, 	d47, 	d48,
        ]

        const estado = [
            e01, 	e02, 	e03, 	e04, 	e05, 	e06,
            e07, 	e08, 	e09, 	e10, 	e11, 	e12, 

        ]


        const _guardarEstado=({id_diente, valor_estado})=>{
            let n_estados=[...estadosPieza]
            n_estados[parseInt(id_diente)-1]=valor_estado
            setEstadosPieza(n_estados)
            }

        // useEffect(()=>{
        //     Superior()
        //     Inferior()
        // },[listaDientes])





/*

    useEffect(()=>{
    
        setListaPiezas(props.state.listaPiezas);
 
        let result =  _crearFilasListPiezas();
      },[props.state.listaPiezas]) //detecta cambios en la lista de Expediente en el reducer y vuelve a formar las filas.
*/

    //FIN CICLO DE VIDA

    const _crearFilasListPiezas=async()=>{
        //console.log("detecto el cambio");
      
        let filas=[];

        props.state.listaPiezas.map(Piezas=>{
      
            let {
              id_pieza,
              id_f_cuadrante,
              numero_pieza,
              ninio_diente
              } = Piezas;     
                    
            let fila ={};
            fila.id_pieza = id_pieza;
            fila.id_f_cuadrante = id_f_cuadrante;
            fila.numero_pieza = numero_pieza;
            fila.ninio_diente = ninio_diente;   
      
          
            filas.push(fila);
        })
      
      
        props.setFilasListaPiezas(filas);
      
      }



    /**************************** */



    function calcularEdad(fecha) {
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();
    
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }
    
        return edad;
    }







function Superior(props)
{
    
    let img = [];


    for (var i = 7; i > -1 ; i--)
    {
        const imagen = (
            <td>
                <center>
                <DetalleDiente 
                            diente={i+11}
                            id_pieza={i+1}
                          
                            pieza={pieza[i]}
                            dentadura={props.listado}
                            cambioPieza={_obtenerEstadoPieza}
                        />      
                        <img
                          key={props.listado[i].id_f_estado_pieza-1}
                                src={estado[props.listado[i].id_f_estado_pieza-1]}
                                width="40"
                                height="40"
                                className="pr-2"
                                alt=""
                                />       
                        
                </center>
            </td>
        );
        img.push(imagen);
    }


   const imagen = (
        <td><center>
            --</center>
        </td>
    );
    img.push(imagen);


    for (var i = 0; i <8 ; i++)
    {
        const imagen = (
            <td>
                <center>
                <DetalleDiente 
                            diente={i+21}
                            id_pieza={i+9}
                         
                            pieza={pieza[i+8]}
                            dentadura={props.listado}
                            cambioPieza={_obtenerEstadoPieza}
                        />         
                                <img
                                 key={props.listado[i].id_f_estado_pieza-1}
                                src={estado[props.listado[i+8].id_f_estado_pieza-1]}
                                width="40"
                                height="40"
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




function Inferior(props)
{
    const img = [];

    console.log("props: ", props)
    for (var i = 7; i > -1 ; i--)
    {
        const imagen = (
            <td>
                <center>
                <DetalleDiente 
                            diente={i+41}
                            id_pieza={i+25}
         
                            pieza={pieza[i+24]}
                            dentadura={props.listado}
                            cambioPieza={_obtenerEstadoPieza}
                        />      
                        <img
                    key={props.listado[i].id_f_estado_pieza-1}
                                src={estado[props.listado[i+24].id_f_estado_pieza-1]}
                                width="40"
                                height="40"
                                className="pr-2"
                                alt=""
                                />       
                        
                </center>
            </td>
        );
        img.push(imagen);
    }


   const imagen = (
        <td><center>
            --</center>
        </td>
    );
    img.push(imagen);


    for (var i = 0; i <8 ; i++)
    {
        const imagen = (
            <td>
                <center>
                <DetalleDiente 
                            diente={i+31}
                            id_pieza={i+17}
                   
                            pieza={pieza[i+16]}
                            dentadura={props.listado}
                            cambioPieza={_obtenerEstadoPieza}
                        />         
                                <img
                                key={props.listado[i].id_f_estado_pieza-1}
                                src={estado[props.listado[i+16].id_f_estado_pieza-1]}
                                width="40"
                                height="40"
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

const _obtenerEstadoPieza=({id_pieza, id_f_estado_pieza})=>{

    let n_lista_dientes = [];
    console.log("obtuve: ", id_pieza, "; ",id_f_estado_pieza)

    for(let iterador of listaDientes)
    {
        let pivote = {...iterador};

        if(iterador.id_f_pieza == id_pieza)
        {
            console.log("encontre")
            pivote.id_f_estado_pieza = id_f_estado_pieza    
        }
        console.log("el diente: ", pivote)
        n_lista_dientes.push(pivote);
    }

    setListaDientes(n_lista_dientes)
}

const _guardarEndodoncia=()=>{

    let datos={
        listaDientes,
        dienteColor,
        guia,
        tipoPuente,
        limpieza,
        diente, vitalidad,
        medidaProvisional,notas
    }

    swal({
        title:"Guardar Odontograma",
        text:"¿Desea guardar el odontograma actual?",
        icon:"warning",
        buttons:["Cancelar","Aceptar"]
    }).then(async respuesta=>{
        if(respuesta)
        {
            swal({
                title:"Guardado",
                icon:"success",
                text:"Odontograma guardado correctamente",
                button:"Aceptar"
            })
        }

        setModalOpen(false)
    })
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
       


                {props.listaPiezas} 


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
      <Tab disabled><b>Diagnósticos</b></Tab>
    </TabList>

    <TabPanel>

    <Row>
                        <Col >
                        <div>

                            <h5 className="modal-title mt-0"><b>Odontograma</b></h5>      

                            <table border='1' width='100%'>
                            <tr>
                                <td colspan="17"><center>Hemisferios Superiores</center></td>
                            </tr>

                        <Superior listado={listaDientes}/>
                            <tr>
                                <td colspan="17"> <center> Hemisferios Inferiores </center></td>
                            </tr>
                        <Inferior listado={listaDientes}/>

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
                                            onChange={(e)=>{setDienteColor(e.target.value)}}
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
                                            onChange={(e)=>{setGuia(e.target.value)}}
                             
                                        />
                            </FormGroup>

                                </Col>
                           
                                
                       

                                                    <Col md={4}>

                            <Label><b>Tipo de Puente</b></Label>

                            <AvRadioGroup inline name="tipo">                   

                            <AvRadio                                       
                                
                                label="Acrílico"                                                        
                                key="1"     
                                value="Acrílico" 
                                onClick={()=>{setTipoPuente(1)}}

                                />
                
                                <AvRadio                                     
                                
                                label="Porcelana"                                                        
                                key="1"
                                value="Porcelana" 
                                onClick={()=>{setTipoPuente(2)}}

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
                                            onChange={(e)=>{setLimpieza(e.target.value)}}
                             
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
                                            onChange={(e)=>{setDiente(e.target.value)}}
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
                                            onChange={(e)=>{setVitalidad(e.target.value)}}
                             
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
                                         onChange={(e)=>{setMedidaProvisional(e.target.value)}}
                          
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
                                                onChange={(e)=>{setNotas(e.target.value)}}                                                     

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

                        </Container>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col >
                       
                        <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              type="submit"
                              onClick={()=>{_guardarEndodoncia()}}
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
       

            </Modal>
        </Fragment>
    )
}
export default HistorialExpediente;


