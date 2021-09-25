import React, { Fragment, useEffect, useState } from "react"
//Librerias
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


import Select from 'react-select';

import Cookies from 'js-cookie';

import superagent from 'superagent';

import{
    API_CREAR_SERVICIO,
    API_ACTUALIZAR_SERVICIO,
    API_SERVICIOS_REGISTRADOS

}from '../../../api/apiTypes';

//Jsons
import { columnasTablaServicios } from '../Json/columnasTablaServicios';

//Componentes
import DataTable from '../../DataTable/DataTable';
import swal from 'sweetalert';

//Componente
const NuevoServicio = props =>{

    const [modalOpen, setModalOpen ]= useState(false);

    const [ servicioActivo, setServicioActivo ] = useState(false);

    const [ defaultValues, setDefaultValues ]= useState({});

    //Update estados
    const [costoServicio,setCostoServicio] =useState();

    const [errorCostoServicio, setErrorCostoServicio]= useState ("");

    const [minimoCitas,setMinimoCitas] =useState(0);
    const [maximoCitas, setMaximoCitas] = useState(0)


        //CICLO DE VIDA

        useEffect(()=>{
            _obtenerServicios();
        },[])
        useEffect(()=>{

            if(props.isReadOnly == true || props.isEditable == true)
            {
                _setDefaultValue();
            }
    
        },[props.defaultValue])

  
        //FIN CICLO DE VIDA

        //Funcion que llama servicios registrados
        const _obtenerServicios=async()=>{
            let token= Cookies.get('token');
            let respuesta = await superagent.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_SERVICIOS_REGISTRADOS)
                                            .set('Accept', 'application/json')
                                            .set("Authorization", "Bearer " + token);

        let { servicios_registrados } = respuesta.body;
        
        }

        //Función que da valores por defecto a los campos en el formulario.
        const _setDefaultValue=()=>{
            let nombreServicioIpx="";
            let descripcionServicioIpx = "";
            let costoServicioIpx = "";
            let precioServicioIpx= "";
            let minimoCitasIpx= "";
            let maximoCitasIpx= "";
            let {nombreServicio, descripcionServicio, servicioActivo, costoServicio, precioServicio, minimoCitas, maximoCitas} = props.defaultValue;
            // console.log("default Value", props.defaultValue)
            if(nombreServicio){
                nombreServicioIpx = nombreServicio;
            }
            if(descripcionServicio)
            {
                descripcionServicioIpx = descripcionServicio;
            }
            if(servicioActivo)
            {
                setServicioActivo(servicioActivo);
            }
            if(costoServicio)
            {
                costoServicioIpx = costoServicio;
            }
            if(precioServicio)
            {
                precioServicioIpx = precioServicio;
            }
            if(minimoCitas)
            {
                minimoCitasIpx = minimoCitas;
            }
            if(maximoCitas)
            {
                maximoCitasIpx = maximoCitas;
            }

            setDefaultValues({nombreServicioIpx, descripcionServicioIpx, precioServicioIpx, costoServicioIpx, precioServicioIpx, minimoCitasIpx, maximoCitasIpx});
        }


    const _registrarServicio=async(valor_inputs)=>{
        

            let token= Cookies.get('token');
           
            console.log("valor Inputs: ", valor_inputs)
            maximoCitas>0 && maximoCitas>minimoCitas && minimoCitas>0?(async ()=>{
                let { nombreServicioIpx,
                    descripcionServicioIpx,
                    precioServicioIpx,
                    minimoCitasIpx,
                    maximoCitasIpx} = valor_inputs;

                let valor = {};
                valor.nombre_servicio = nombreServicioIpx;
                valor.descripcion_servicio =descripcionServicioIpx;
                valor.precio_servicio = precioServicioIpx;
                valor.minimo_numero_citas = minimoCitasIpx;
                valor.maximo_numero_citas= maximoCitasIpx;
                valor.servicio_activo = servicioActivo;
                
                let tipo="";
                                if(props.isEditable)
                                {
                                    valor.id_servicio = props.defaultValue.idServicio;

                                    try{
                                        let respuesta_servicio_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_ACTUALIZAR_SERVICIO)
                                        .set('Accept', 'application/json')
                                        .set("Authorization", "Bearer " + token)
                                        .send(valor)
        
                                        if(respuesta_servicio_creado.body.message == "OK")
                                        {
                                            swal({
                                                title:"Servicio Actualizado",
                                                text:"Servicio actualizado con éxito",
                                                icon:"success",
                                                button:"Aceptar"
                                            });
                                        }
                                        else{
                                            swal({
                                                title:"Error al actualizar el Servicio ",
                                                text:respuesta_servicio_creado.body.message,
                                                icon:"error",
                                                button:"Aceptar"
                                            });
                                        }
        
                                    }catch(e){
                                        console.log(e);
                                        swal({
                                            title:"Error al Editar datos del Servicio",
                                            text: e.errorMessage,
                                            icon: "error",
                                            button:"Aceptar"
                                        });
                                    }
                                }

                                else
                                {
                                    try{

                                        let respuesta_servicio_creado = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CREAR_SERVICIO)
                                        .set('Accept', 'application/json')
                                        .set("Authorization", "Bearer " + token)
                                        .send(valor)
        
                                        if(respuesta_servicio_creado.body.message == "OK")
                                        {
                                            swal({
                                                title:"Servicio Creado",
                                                text:"Servicio creado con éxito",
                                                icon:"success",
                                                button:"Aceptar"
                                            });
                                        }
                                        else{
                                            swal({
                                                title:"Error al crear el servicio ",
                                                text:respuesta_servicio_creado.body.message,
                                                icon:"error",
                                                button:"Aceptar"
                                            });
                                        }
        
                                    }catch(e)
                                    {
                                        console.log(e);
                                        swal({
                                            title:"Error al crear datos el servicio",
                                            text: e.errorMessage,
                                            icon: "error",
                                            button:"Aceptar"
                                        });
                                    }
                                }
                                tipo="actualizarListaServicios";
                                let envio ={tipo};
                                envio={tipo};
                                await props.cambioDatos(envio);
                                
                                setModalOpen(false);
                            })():(
                                setErrorCostoServicio("Valor debe ser mayor que cero")
                            )
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

    const _cambiarEstadoActivo = ()=>
    {
        setServicioActivo(!servicioActivo);
    }

    //Inicio del form
    return(
        <Fragment>
            {/* <FormGroup className="float-right"> */}
            {/* <FormGroup> */}
            <Button 
                    className={props.classNames?(props.classNames):("btn btn-success ")}
                    onClick={()=>{setModalOpen(true)}}

                >
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Nuevo Servicio"
                        )
                    }
                   
                </Button>
            {/* </FormGroup> */}

            <Modal
                size="lg"

                isOpen={modalOpen}
                toggle={()=>{
                    setModalOpen()
                }}
                centered={true}
            >

                <div className="modal-header">
                    <h4 className="modal-title mt-0">Crear nuevo servicio</h4>
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
                    onValidSubmit={(e,v)=>{_registrarServicio(v)}}
                    model={defaultValues}
                >
                <div className="modal-body">
                        <Container fluid={true}>
                         
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label><b>Ingrese el nombre de Servicio</b></Label>
                                            <AvField
                                                id="nombreServicioIpx"
                                                name="nombreServicioIpx"
                                                value=""
                                                className="form-control"
                                                placeholder="ej: salher"
                                                type="text"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                  //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                }}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                    <Label><b>Descripcion del Servicio</b></Label>
                                    <br />
                                            <AvField
                                                id="descripcionServicioIpx"
                                                name="descripcionServicioIpx"
                                                value=""
                                                className="form-control"
                                                placeholder="Ingrese la descripcion del servicio"
                                                type="textarea"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                }}
                                            />
                                    </Col>
                                    <Col md={6}>
                                    <Label><b>Precio de Servicio</b></Label>
                                    <br />
                                            <AvField
                                                id="precioServicioIpx"
                                                name="precioServicioIpx"
                                                value=""
                                                className="form-control"
                                                placeholder="Ingrese precio del servicio"
                                                type="number"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                }}
                                            />
                                    </Col>
                                    

                                </Row>
                                <Row>
                                    <Col md={6}>
                                    <Label><b>Cantidad minima de Sesiones</b></Label>
                    
                                            <AvField
                                                id="minimoCitasIpx"
                                                name="minimoCitasIpx"
                                                value=""
                                                className="form-control"
                                                placeholder="Mayor a cero"
                                                type="text"
                                                pattern="^[0-9]{1}$"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                                                                    
                                                }}
                                                onChange={(e)=>{setMinimoCitas(e.target.value)}}
                                            />

                                    </Col>
                                    <Col md={6}>
                                    <Label><b>Cantidad maxima de Sesiones</b></Label>
                    
                                            <AvField
                                                id="maximoCitasIpx"
                                                name="maximoCitasIpx"
                                                value=""
                                                className="form-control"
                                                placeholder="Mayor a cero"
                                                type="text"
                                                pattern="^[1-9]{1}$"
                                                disabled={props.isReadOnly?true:false}
                                                validate={{
                                                  required: { value: true, errorMessage: "Obligatorio."},
                                                                                                    
                                                }}
                                                onChange={(e)=>{setMaximoCitas(e.target.value)}}
                                            />

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
                </AvForm>


            </Modal>
        </Fragment>
    )
}
export default NuevoServicio;