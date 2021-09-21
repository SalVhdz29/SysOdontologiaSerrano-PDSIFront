import React,{ Fragment, useState, useEffect } from 'react';
import {  
    Modal, 
    Row, Col,
    Container,
    Card, CardBody,
    Button, Input,
    ButtonToggle,
    FormGroup,Label
} from 'reactstrap';
import DateSelector from '../../DateSelector/DateSelector';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import Select from 'react-select'
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {DateTime} from 'luxon'
import Cookies from 'js-cookie';
import request from 'superagent';

//Componentes
import DataTable from '../../DataTable/DataTable';

//Apis
import{
    API_OBTENER_SERVICIOS_ACTIVOS,
    API_GUARDAR_COTIZACION_PACIENTE
} from '../../../api/apiTypes'


//json
import { servicios_json } from '../../../constants/servicios';
import { columnas_tabla } from './Json/columnas_tabla';

const EstimarServicios = props =>{

    const [ modal, setModal ] = useState(false);
    const [ listaServicio, setListaServicio ] = useState([])
    const [ serviciosOption, setServiciosOption ] = useState([]);
    const [ servicioEscogido, setServicioEscogido ] = useState(null);
    const [ serviciosEstimados, setServiciosEstimados ] = useState([]) 
    const [ filas, setFilas ] = useState([])
    const [ subtotalEstimado, setSubtotalEstimado ] = useState(0.00)

    useEffect(()=>{
        _obtenerServicios()
    },[])

    useEffect(()=>{
        if(listaServicio != null)
        {
            _armarServiciosOption()
        }
    },[listaServicio])

    useEffect(()=>{
        if(serviciosEstimados != null)
        {
            _armarFilas()
        }
    },[serviciosEstimados])


    const _obtenerServicios=async()=>{
        let token= Cookies.get('token');
        let respuesta_servicios = await request.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_SERVICIOS_ACTIVOS)
                                                .set('Accept', 'application/json')
                                                .set("Authorization", "Bearer " + token)


        setListaServicio(respuesta_servicios.body)
    }
    const _toggleModal=async()=>{

        let antigua_bandera_modal = modal;
          await setModal(!modal);
  
          if(antigua_bandera_modal == false)
          {
              setServicioEscogido(null)
              setServiciosEstimados([])
          }
          
    }
    const _armarServiciosOption =()=>{
        let n_options=[]

        for(let it of listaServicio)
        {
            if(it != null)
            {
                let n_option={
                    label: it.nombre_servicio,
                    value: it.id_servicio
                }

                n_options.push(n_option);
            }
        }

        setServiciosOption(n_options)
    }
    const _obtenerServicioEscogido = (servicioOption)=>{
        setServicioEscogido(servicioOption)
  
        // let {value} = servicioOption;
  
        // let servicio_correspondiente = props.cita_modal_state.find(it => it.id_cita == value);
  
        // if(servicio_correspondiente != null)
        // {
        //   let { restricciones } = servicio_correspondiente;
  
        //   setRecomendaciones(restricciones);
        // }
    }
    const _agregarServicio =()=>{

        let servicio_ingresar = servicioEscogido;

        let coincidencia = serviciosEstimados.find(it => it.id_servicio == servicio_ingresar.value);

        if(coincidencia == null)
        {
            let servicio_correspondiente = listaServicio.find(it => it.id_servicio == servicioEscogido.value)

            if(servicio_correspondiente != null)
            {
                let {id_servicio, nombre_servicio, precio_servicio } = servicio_correspondiente;

                let n_servicio_estimado ={
                    id_servicio, nombre_servicio,
                    precio_servicio, cantidad:1,

                }

                let n_servicios_estimados =[...serviciosEstimados];

                n_servicios_estimados.push(n_servicio_estimado)
                setServiciosEstimados(n_servicios_estimados)
            }
            else{
                swal({
                    title:"Servicio no encontrado",
                    icon:"error",
                    text:"El servicio no fue encontrado en la lista de servicios registrados",
                    button:"Aceptar"
                })
            }
        }
        else{
            swal({
                title:"Servicio ya agregado",
                icon:"error",
                text:"El servicio ya ha sido agregado en la estimación",
                button:"Aceptar"

            })
        }
    }
    const _obtenerCambioCantidadServicio = ({id_servicio, cantidad})=>{

        let n_servicios_estimados =[]

        for(let it of serviciosEstimados)
        {
            let pivote ={...it}

            if(it.id_servicio == id_servicio)
            {
                pivote.cantidad = cantidad;
            }

            n_servicios_estimados.push(pivote)
        }

        setServiciosEstimados(n_servicios_estimados)
    }
    const _eliminarServicioEstimado =({id_servicio})=>{

        let n_servicios_estimados =[]

        for(let it of serviciosEstimados)
        {
            let pivote ={...it}

            if(it.id_servicio != id_servicio)
            {
                n_servicios_estimados.push(pivote)
            }

        }

        setServiciosEstimados(n_servicios_estimados)

    }
    const _guardarEstimacion = ()=>{

        swal({
            title:"¿Guardar Estimación?",
            icon:"warning",
            text:"¿Desea Guardar la Estimación hecha para este paciente?",
            buttons:["Cancelar","Aceptar"]
        }).then(async respuesta =>{

            if(respuesta == true)
            {
                let n_estimacion={
                    id_expediente: props.id_expediente,
                    servicios_estimados: serviciosEstimados,
                    total_estimado: subtotalEstimado
                }

                try{

                
                let token= Cookies.get('token');
                let respuesta_servicios = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_GUARDAR_COTIZACION_PACIENTE)
                                                        .set('Accept', 'application/json')
                                                        .set("Authorization", "Bearer " + token)
                                                        .send(n_estimacion)
                console.log("la respuesta: ", respuesta_servicios.body)
                if(respuesta_servicios.body.message == "OK")
                {
                    swal({
                        title:"Estimación Guardada",
                        icon:"success",
                        text:"Estimación Guardad con exito",
                        button:"Aceptar"
                    })
    
                    _toggleModal()
                }
                 }
                 catch(e)
                 {
                     console.log("Error: ",e);
                     swal({
                         title:"Error al guardar la estimación",
                         icon:"error",
                         text:"Ha ocurrido un error al guardar la estimación",
                         button:"Aceptar"
                     })
                 }
               
            }
        })

    }
    const _armarFilas = () =>{
        let n_filas =[]
        let contador_filas =0;

        let n_subtotal =parseFloat(0.00)

        for(let iterador of serviciosEstimados)
        {
            let{
                id_servicio,
                nombre_servicio,
                precio_servicio,
                cantidad
            } = iterador;


            let cantidad_input=(
                <>
                <Input 
                    id={"cantidadInput"+id_servicio}
                    name={"cantidadInput"+id_servicio}
                    value={cantidad}
                    type="number"
                    onChange={e=>{_obtenerCambioCantidadServicio({id_servicio, cantidad: e.target.value})}}
                />
                {parseInt(cantidad)<=0?(<p style={{color:"red"}}>Ingrese una cantidad mayor a cero</p>):undefined}
                </>
            )

            let subtotal = parseFloat(precio_servicio)*parseInt(cantidad)

            n_subtotal +=subtotal

            subtotal = subtotal.toFixed(2)

            let operaciones =(
                <ButtonToggle
                color="danger"
                size={"sm"}
                onClick={()=>{_eliminarServicioEstimado({id_servicio})}}
            >-</ButtonToggle>
            )
            contador_filas++
            let n_fila ={
                numero_fila: contador_filas,
                id_servicio,
                nombre_servicio,
                precio_servicio,
                subtotal,
                cantidad_servicio: cantidad_input,
                operaciones
            }

            n_filas.push(n_fila)
        }

        setFilas(n_filas)

        setSubtotalEstimado(n_subtotal)
    }

    return(
        <Fragment>
            {/* <FormGroup> */}
                <Button
                    color={props.color != null?(props.color):("success")}
                    size={props.size!= null?(props.size):("")}
                    className={props.className!=null?(props.className):("")}
                    onClick={()=>{_toggleModal()}}
                    // disabled={listaEvaluaciones.length == 0?(true):(false)}
                >{props.textoBoton}</Button>
            {/* </FormGroup> */}
        <Modal
        size="xl"
        isOpen={modal}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
           Estimar Servicios
          </h5>
          <button
            type="button"
            onClick={() =>
                    _toggleModal(null)
            }
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
        <div className="container-fluid">  
             <Row>
             <Col>
                    <FormGroup row>
                            <Label for="pacienteSelect"><b>Paciente: </b></Label>
                                        <Col>
                                            <p><b>{props.nombre_paciente}</b></p>
                                        </Col>
                          </FormGroup>
                    </Col>
                    <Col>
                     
                        <FormGroup row>
                            <Label for="servicioSelect"><b>Servicio: </b></Label>
                                        <Col>
                                            <Select
                                              id={"servicioSelect"}
                                              name={"servicioSelect"}
                                              options={serviciosOption}
                                              value={servicioEscogido}
                                              placeholder={"Seleccione un Servicio"}
                                              onChange={e=>_obtenerServicioEscogido(e)}
                                            />
                                        </Col>
                        </FormGroup>
                          
                    </Col>
                    <Col>
                    <ButtonToggle color="success" onClick={()=>{_agregarServicio()}}>+</ButtonToggle>
                    </Col>
             </Row>
            <hr />
            <Row>
               <Col>
               <DataTable columnasTabla={columnas_tabla} datosTabla={filas} /> 
               </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <h5>Subtotales</h5>
                </Col>
            </Row>
            <Row>
                <Col>
                   Sub-total Estimado: {subtotalEstimado.toFixed(2)}
                </Col>
               
            </Row>
        </div>
        <div className="modal-footer">
           
                  <Button
                  type="button"
                  onClick={()=>_guardarEstimacion()}
                  className=" waves-effect"
                  color="success"
                  data-dismiss="modal"
                >
                  Guardar
                </Button>
      {' '}
          <Button
            type="button"
            onClick={()=>_toggleModal(null)}
            className=" waves-effect"
            color="default"
            data-dismiss="modal"
          >
            Cerrar
          </Button>
        </div>
        </div>
    </Modal>
    </Fragment>
    )
}
export default EstimarServicios;