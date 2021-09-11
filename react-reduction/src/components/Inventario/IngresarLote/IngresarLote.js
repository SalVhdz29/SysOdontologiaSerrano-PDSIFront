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

//Componentes
import DataTable from '../../DataTable/DataTable';
import swal from 'sweetalert'; 
import { FaNotEqual } from 'react-icons/fa';


const IngresarLote = props =>{

    const [modalOpen, setModalOpen ]= useState(false);
    const [defaultValues, setDefaultValues ]= useState({});

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
        let insumoLoteIpx="";
        let fechaLoteIpx="";
        let costoLoteIpx="";
        let cantidadLoteIpx="";
        let porcentajeLoteIpx="";
        let precioLoteIpx="";
        let precioUnidadLoteIpx="";

        let {insumoLote, porcentajeLote} = props.defaultValue;
        if(insumoLote){
            insumoLoteIpx = insumoLote;
        }
        if(porcentajeLote)
        {
            porcentajeLoteIpx = porcentajeLote;
        }

        setDefaultValues({insumoLoteIpx, fechaLoteIpx, costoLoteIpx, cantidadLoteIpx, porcentajeLoteIpx, precioLoteIpx, precioUnidadLoteIpx});
    }

    const _registrarLote=async(valor_inputs)=>{ 
        //console.log("el valor obtenido", valor_inputs); 

                let { insumoLoteIpx, fechaLoteIpx, costoLoteIpx, cantidadLoteIpx,
                porcentajeLoteIpx, precioLoteIpx, precioUnidadLoteIpx} = valor_inputs; 
                     
                    let valor = {}; 
                    valor.nombre_insumo = insumoLoteIpx;  
                    let tipo=""; 
                    tipo="agregarLoteLista"; 

                    let envio={tipo,valor}; 
                    
     
                    await props.cambioDatos(envio); 
                    setModalOpen(false);  
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
                            onValidSubmit={(e,v)=>{_registrarLote(v)}}
                            model={defaultValues}
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
                                                <Input
                                                class="form-control"
                                                id = "insumoLoteIpx"
                                                type="text"
                                                name="insumoLoteIpx"
                                                value=""
                                                readOnly
                                            />
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
                                                value=""
                                                placeholder="date placeholder"
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
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
                                                value=""
                                                placeholder="00.00"                                               
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
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
                                                value=""
                                                placeholder="00"                                               
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
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
                                                value=""
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
                                                value=""
                                                placeholder="00.00"
                                                validate={{ 
                                                    required: { value: true, errorMessage: "Obligatorio."} 
                                                }} 
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
                                                <Input type="checkbox" /> Cambiar precio sugerido
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
                                                value=""
                                                placeholder="00.00"                                               
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
                                        type="submit"
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