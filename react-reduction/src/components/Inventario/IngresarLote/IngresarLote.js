import React, { Fragment, useEffect, useState } from 'react'; 

//Librerias
import request from 'superagent';
import Cookies from 'js-cookie';
import superagent from 'superagent';

import{ 
    FormGroup, 
    Button, 
    Modal,  
    Container, 
    Label, 
    Row, 
    Col,
    Input 
} from 'reactstrap'; 
 
import{ 
    AvForm, 
    AvField 
} from 'availity-reactstrap-validation' 

import{
    API_CREAR_LOTE
} from '../../../api/apiTypes'

//Componentes
import DataTable from '../../DataTable/DataTable';
import swal from 'sweetalert'; 
import { FaNotEqual } from 'react-icons/fa';


const IngresarLote = props =>{

    const [modalOpen, setModalOpen ]= useState(false);
    const [costoLote, setCostoLote] = useState(0.00);
    const [fechaVencimiento, setFechaVencimiento]=useState(new Date());
    const [porcentajeGanancia, setPorcentajeGanancia]=useState(0.20);
    const [cantidadLote, setCantidadLote]=useState(0);
    const [precioLote, setPrecioLote]=useState(0.00);
    const [precioLoteUnidad, setPrecioLoteUnidad]=useState(0.00);
    const [cambiarPrecio, setCambiarPrecio]=useState(false)


    //CICLO DE VIDA
    useEffect(()=>{
        console.log("costo lote: ", costoLote);
        setPrecioLote(parseFloat(parseInt(costoLote)+parseInt(costoLote)*parseFloat(porcentajeGanancia)).toFixed(2));

    },[costoLote])
    useEffect(()=>{
        if(cantidadLote > 0)
        {
            setPrecioLoteUnidad(parseFloat(precioLote/cantidadLote).toFixed(2));
        }
        else
        {
            setPrecioLoteUnidad(0);
        }
       

    },[precioLote, cantidadLote])

    //FIN CICLO DE VIDA

    //Función que da valores por defecto a los campos en el formulario.

    const _registrarLote=async(valor_inputs)=>{ 
        //console.log("el valor obtenido", valor_inputs); 

                if( parseInt(cantidadLote) > 0 && parseFloat(costoLote) > 0 && parseFloat(precioLote) > 0 && parseFloat(precioLoteUnidad) > 0)
                {
                    let token= Cookies.get('token');
                    let respuesta_guardar = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CREAR_LOTE)
                    .send({id_insumo: props.defaultValue.id_insumo, precio_lote: precioLote, cantidad_lote: cantidadLote, costo_lote: costoLote, fecha_lote: fechaVencimiento})
                    .set('Accept', 'application/json')
                    .set("Authorization", "Bearer " + token);
                    console.log("respuesta historial: ", respuesta_guardar.body)

                    if(respuesta_guardar.body.message =="OK")
                    {
                        swal({
                            title:"Guardado",
                            icon:"success",
                            text:"El lote se ha guardado correctamente",
                            button:"Aceptar"
                        })

                        setModalOpen(!modalOpen);
                        props.cambioDatos();
                    }
                }
                else{
                    console.log(fechaVencimiento, " ", cantidadLote, " ", costoLote, " ", precioLote, " ", precioLoteUnidad)
                    swal({
                        title:"Errores detectados",
                        icon:"error",
                        text:"Existen errores detectados en los campos",
                        button:"Aceptar"
                    })
                }
    
                   
    }

return(
    <Fragment> 
            {/* <FormGroup className="float-right"> */} 
                <Button  
                    className="btn btn-info" 
                    onClick={()=>{setModalOpen(true)}} 
 
                > 
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Lote"
                        )
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
                    <h4 className="modal-title mt-0">Ingresar nuevo lote</h4> 
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
                       
                           
                            > 
                <div className="modal-body"> 
                        <Container fluid={true}> 

                                <Row> 
                                    <Col md={6}> 
                                        <FormGroup> 
                                            <Label Style="font-size: 170%;"><b><u>Datos del Lote</u></b></Label>
                                            
                                            <FormGroup row>
                                                <Label for="insumoSeleccionado" sm={2} md={6}>
                                                    Insumo: 
                                                </Label>
                                                <Col sm={10}>
                                               <b>{props.defaultValue.nombreInsumo}</b>
                                                </Col>
                                            </FormGroup>        
                                        </FormGroup> 
                                    </Col>  
                                    <Col md = {6}>
                                    <br></br><br></br>
                                        <FormGroup row>
                                            <Label for="fechaVencimiento" sm={2} md={6} >
                                                Fecha de vencimiento:
                                            </Label>
                                            <Col sm={10}>
                                            <Input
                                                id = "fechaLoteIpx"
                                                type="date"
                                                name="fechaLoteIpx"
                                                value={fechaVencimiento}
                                                placeholder="date placeholder"
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
                                                onChange={e=>setFechaVencimiento(e.target.value)}
                                            />
                                            </Col>
                                        </FormGroup>  
                                    </Col>  
                                </Row>

                                {/*Siguiente linea*/}

                                <Row>
                                    <Col md={6}> 
                                        <FormGroup row>
                                            <Label for="costoLote" sm={2} md={6}>
                                                Costo de Lote:
                                            </Label>
                                            <Col sm={10}>
                                            <Input
                                                id = "costoLoteIpx"
                                                type="number"
                                                name="costoLoteIpx"
                                                value={costoLote}
                                                placeholder="00.00"                                               
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
                                                onChange={e=>setCostoLote(e.target.value)}
                                            />
                                            </Col>
                                        </FormGroup>  
                                    </Col>
                                    <Col md={6}> 
                                        <FormGroup row>
                                            <Label for="cantidadLote" sm={2} md={6}>
                                                Cantidad de Lote:
                                            </Label>
                                            <Col sm={10}>
                                            <Input
                                                id = "cantidadLoteIpx"
                                                type="number"
                                                name="cantidadLoteIpx"
                                                value={cantidadLote}
                                                placeholder="00"                                               
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
                                                onChange={e=>setCantidadLote(e.target.value)}
                                            />
                                            </Col>
                                        </FormGroup>  
                                    </Col>
                                </Row>

                                {/*Siguiente linea*/}

                                <Row>
                                <Col md={6}> 
                                        <FormGroup> 
                                            <Label Style="font-size: 170%;"><b><u>Precios del Lote</u></b></Label> 
                                            <FormGroup row>
                                                <Label for="porcentajeInsumo" sm={2} md={6}>
                                                    Porcentaje de ganancia: 
                                                </Label>
                                                <Col sm={10}>
                                                <Input
                                                class="form-control"
                                                id = "porcentajeLoteIpx"
                                                type="text"
                                                name="porcentajeLoteIpx"
                                                value={porcentajeGanancia}
                                                readOnly
                                            />
                                                </Col>
                                            </FormGroup>        
                                        </FormGroup> 
                                    </Col>  
                                    <Col md = {6}>
                                    <br></br><br></br>
                                        <FormGroup row>
                                            <Label for="precioLote" sm={2} md={6}>
                                                Precio del lote:
                                            </Label>
                                            <Col sm={10}>
                                            <Input
                                                id = "precioLoteIpx"
                                                type="number"
                                                name="precioLoteIpx"
                                                value={precioLote}
                                                placeholder="00.00"
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }}
                                                readOnly={!cambiarPrecio}
                                                onChange={e=>{setPrecioLote(e.target.value)}}
                                            />
                                            </Col>
                                        </FormGroup>  
                                    </Col>  
                                </Row>

                                {/*Siguiente linea*/}

                                <Row>
                                    <Col md={6}> 
                                        <FormGroup row>
                                            <Label check sm={2} md={6} Style="text-align: center;">
                                                <Input type="checkbox" onChange={()=>{setCambiarPrecio(!cambiarPrecio)}}/> Cambiar precio sugerido
                                            </Label>
                                        </FormGroup>  
                                    </Col>
                                    <Col md={6}> 
                                        <FormGroup row>
                                            <Label for="precioUnidadLote" sm={2} md={6}>
                                                Precio de Lote (por unidad):
                                            </Label>
                                            <Col sm={10}>
                                            <Input
                                                id = "precioUnidadLoteIpx"
                                                type="number"
                                                name="precioUnidadLoteIpx"
                                                value={precioLoteUnidad}
                                                placeholder="00.00"    
                                                onChange={e=>{setPrecioLoteUnidad(e.target.value)}}                                           
                                            />
                                            </Col>
                                        </FormGroup>  
                                    </Col>
                                </Row>    

                                {/*Botones*/}

                                </Container>
                                </div>
                                <div className="modal-footer">
                                <Row>
                                <Col >
                                    <div className="mt-3">
                                    <Button
                                        className="btn btn-secondary btn-md w-md"
                                        onClick={()=>_registrarLote()}
                                        color = "success"
                                    >
                                    Guardar
                                    </Button>
                                </div>

                                </Col>
                                <Col>
                                    <div className="mt-3">
                                    <Button className="btn btn-danger btn-md w-md " color="danger" onClick={()=>{setModalOpen(false)}}>Cerrar</Button>
                                    </div>
                                </Col>
                                </Row>
                                </div>            
                </AvForm> 
 
            </Modal> 
        </Fragment> 
)
}

export default IngresarLote;