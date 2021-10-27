import React, {Fragment, useState, useEffect} from 'react'
import{
    Button,
    Container,
    Card,
    CardBody,
    Row, Col,
    Input, Label,
    FormGroup,
    ButtonToggle,
} from 'reactstrap';
import Select from 'react-select'
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';
import { FaTrashAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import request from 'superagent';


import {AvForm, AvCheckbox, AvCheckboxGroup} from 'availity-reactstrap-validation'

//api
import{
    API_OBTENER_SERVICIOS,
} from '../../api/apiTypes'

//Components
import DataTable from '../DataTable/DataTable';

//json
import { columnas_tabla } from './Json/columnasTabla';
import { API_OBTENER_INSUMOS_CONSUMIBLES, API_OBTENER_SERVICIOS_ACTIVOS, API_OBTENER_SALDO_CLIENTE, API_FINALIZAR_FACTURA } from '../../api/Facturacion/apiTypes';

const Factura = props =>{

    const [ idExpediente, setIdExpediente ] = useState(0);
    const [ nombrePaciente, setNombrePaciente ] = useState("");

    const [ idServicio, setIdServicio ]=useState(0);
    const [ servicio , setServicio ] = useState("");

    const [ servicioInsumos, setServicioInsumos ] = useState([]);
    const [ optionsInsumo, setOptionsInsumo ] = useState([]);
    const [ insumoSeleccionado, setInsumoSeleccionado ] = useState(null)
    const [ cantidadInsumo, setCantidadInsumo ] = useState(0)
    const [ insumosEscogidos, setInsumosEscogidos ] = useState([]);

    const [ servicioServicios, setServicioServicios ] = useState([]);
    const [ optionsServicio, setOptionsServicio ] = useState([]);
    const [ servicioSeleccionado, setServicioSeleccionado ]= useState(null)
    const [ serviciosEscogidos, setServiciosEscogidos ] = useState([]);
    const [ receta, setReceta ] = useState("")
    const [ detalleDiagnostico, setDetalleDiagnostico ] =useState("")
    const [ saldoCliente, setSaldoCliente ] = useState(0.00);

    const [ totalFacturacion, setTotalFacturacion ] = useState(0.00);
    const [ totalAPagar, setTotalAPagar ] = useState(0.00);
    const [ deber, setDeber ] = useState(false)
    const [abono, setAbono ] = useState(0.00)


    const [ filas, setFilas ] = useState([])

    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        _iniciador()
    },[])

    useEffect(()=>{
        if(servicioInsumos != null)
        {
            _armarInsumoOptions()
        }
    },[servicioInsumos])

    useEffect(()=>{
        if(servicioServicios != null)
        {
            _armarServicioOptions()
        }
    },[servicioServicios])

    useEffect(()=>{
        _armarFilas()
    },[insumosEscogidos, serviciosEscogidos])



    const _iniciador = async() =>{
      if(props.location.state != null)
      {
        var {id_expediente, nombre_persona, id_servicio, nombre_servicio, receta, detalle_diagnostico} = props.location.state;

        setIdExpediente(id_expediente)
        setNombrePaciente(nombre_persona)
        setIdServicio(id_servicio)
        setServicio(nombre_servicio)

        setReceta(receta)
        setDetalleDiagnostico(detalle_diagnostico)
      }
      console.log("antes del servicio: ")
     try{
        let token= Cookies.get('token');
        let respuesta_insumos = await request.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_INSUMOS_CONSUMIBLES)
        .set('Accept', 'application/json')
        .set("Authorization", "Bearer " + token)
  
        console.log("la respuesta: ", respuesta_insumos.body)

        let respuesta_servicios = await request.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_SERVICIOS)
        .set('Accept', 'application/json')
        .set("Authorization", "Bearer " + token) 

        let respuesta_saldo = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_SALDO_CLIENTE)
        .send({id_expediente})
        .set('Accept', 'application/json')
        .set("Authorization", "Bearer " + token) 
  
        setServicioInsumos(respuesta_insumos.body);

        setServicioServicios(respuesta_servicios.body)

        setSaldoCliente(respuesta_saldo.body.saldo_cliente)

     }catch(e)
     {
         console.log("error: ",e)
         swal({
             title:"Error al traer los servicios",
             icon:"error",
             text:"Ha ocurrido un error al obtener los servicios",
             button:"Aceptar"
         })
     }

    }
    const _armarInsumoOptions=()=>{
        let options=[];

        for(let it of servicioInsumos)
        {
            if(it != null)
            {
                let precio_unitario = parseInt(it.precio_efectivo)/parseInt(it.cantidad_insumo)

                precio_unitario =precio_unitario.toFixed(2)

                let n_option={
                    label: it.nombre_insumo,
                    value: it.id_insumo,
                    cantidad_insumo: it.cantidad_insumo,
                    precio_efectivo: it.precio_efectivo,
                    precio_unitario
                }

                options.push(n_option)
            }
        }

        setOptionsInsumo(options)
    }

    const _armarServicioOptions=()=>{
        let options=[];

        for(let it of servicioServicios)
        {
            if(it != null)
            {
              

                let n_option={
                    label: it.nombre_servicio,
                    value: it.id_servicio,
                    precio_servicio: it.precio_servicio
                }

                options.push(n_option)
            }
        }
        setOptionsServicio(options);
    }
    const _agregarInsumo = () =>{
        console.log("agregar insumo")
        if(cantidadInsumo > 0 && insumoSeleccionado != null)
        {
            console.log("pase")
            let { value, label, precio_efectivo, precio_unitario } = insumoSeleccionado;
            console.log("insumosEscogidos: ", insumosEscogidos)
            let coincidencias = insumosEscogidos.find(it=>it.id_insumo == value);


            if(coincidencias != null)
            {
                swal({
                    title:"Insumo ya agregado",
                    icon:"error",
                    text:"El insumo ya ha sido agregado a los detalles de la factura",
                    button:"Aceptar"
                })
            }
            else{
        
                let n_insumo={
                    id_insumo: value,
                    nombre_detalle: label,
                    cantidad_detalle: cantidadInsumo,
                    precio_efectivo,
                    precio_unitario
                }

                let n_insumos_escogidos =[...insumosEscogidos];

                n_insumos_escogidos.push(n_insumo)

                setInsumosEscogidos(n_insumos_escogidos)
            }
        }
        else{
            swal({
                title:"Campos Incompletos",
                icon:"error",
                text:"Seleccione un insumo y configure una cantidad",
                button:"Aceptar"
            })
        }
    }

    const _agregarServicio = () =>{
        if(servicioSeleccionado != null)
        {
            let{value, label, precio_servicio} = servicioSeleccionado;

            let coincidencias = serviciosEscogidos.find(it=>it.id_servicio == value);

            if(coincidencias != null)
            {
                swal({
                    title:"Servicio ya agregado",
                    icon:"error",
                    text:"El servicio ya ha sido agregado a los detalles de la facturación",
                    button:"Aceptar"
                })
            }
            else{
                let n_servicio ={
                    id_servicio: value,
                    nombre_detalle: label, 
                    precio_servicio,
                    deducible_detalle:parseFloat(0.00)
                }

                let n_servicios=[...serviciosEscogidos];
                n_servicios.push(n_servicio)

                setServiciosEscogidos(n_servicios)
            }
        }
        else{
            swal({
                title:"Sin servicio seleccionado",
                icon:"error",
                text:"Seleccione un servicio para agregar a la facturacion",
                button:"Aceptar"
            })
        }
    }

    const _armarFilas=()=>{
        let n_filas=[]

        let n_total_factura = parseFloat(0.00);
        if(insumosEscogidos != null)
        {
            for(let it of insumosEscogidos)
            {
                if(it != null)
                {
                    let { id_insumo, nombre_detalle, cantidad_detalle, precio_unitario } = it;

                    let operaciones=(
                        <div className="btn-group">
                            <ButtonToggle
                            color="danger"
                            onClick={(e)=>{_eliminarDetalle({id_detalle:id_insumo, tipo: 1})}}
                            >
                                <FaTrashAlt />
                            </ButtonToggle>
                        </div>
                    )

                    let subtotal_detalle=parseFloat(precio_unitario) * parseInt(cantidad_detalle)

                    n_total_factura+=subtotal_detalle;

                    subtotal_detalle = "$ "+parseFloat(subtotal_detalle).toFixed(2);

                    let n_fila={nombre_detalle, cantidad_detalle,deducible_detalle:"N/A",subtotal_detalle, operaciones};

                    n_filas.push(n_fila)
                }
            }

        }

        if(serviciosEscogidos != null)
        {
            for( let iter of serviciosEscogidos)
            {
                if(iter != null)
                {
                    let { id_servicio, nombre_detalle , precio_servicio, deducible_detalle}=iter;

                    if(deducible_detalle === "" || deducible_detalle === null)
                    {
                        deducible_detalle =parseFloat(0.00)
                    }

                    let deducible_input=(
                        <Input 
                            id={"inputDeducible"+id_servicio}
                            name={"inputDeducible"+id_servicio}
                            type="number"
                            value={deducible_detalle}
                            onChange={e=>{_cambioDeducible({id_detalle: id_servicio, cantidad: e.target.value})}}
                        />
                    )

                    let operaciones=(
                        <div className="btn-group">
                            <ButtonToggle
                            color="danger"
                            onClick={(e)=>{_eliminarDetalle({id_detalle:id_servicio, tipo: 2})}}
                            >
                                <FaTrashAlt />
                            </ButtonToggle>
                        </div>
                    )

                    let subtotal_detalle = precio_servicio - deducible_detalle;

                    n_total_factura+=subtotal_detalle;

                    subtotal_detalle = "$ "+parseFloat(subtotal_detalle).toFixed(2);

                    let n_fila={nombre_detalle, cantidad_detalle:"N/A", deducible_detalle: deducible_input, subtotal_detalle, operaciones};

                    n_filas.push(n_fila)
                }
            }
        }

        setFilas(n_filas)
        setTotalFacturacion(n_total_factura.toFixed(2))

        let n_total_a_pagar = n_total_factura + parseFloat(saldoCliente);
        setTotalAPagar(n_total_a_pagar.toFixed(2))




    }

    const _cambioDeducible =({id_detalle, cantidad})=>{

        console.log("llegue: ", id_detalle, cantidad);

    let n_servicios =[]

    for(let it of serviciosEscogidos)
    {
        let pivote = {...it}

        if(it.id_servicio == id_detalle)
        {
           pivote.deducible_detalle = cantidad;
        }
        n_servicios.push(pivote)
    }

    setServiciosEscogidos(n_servicios)
    }

    const _eliminarDetalle=({id_detalle, tipo})=>{
        console.log("vine: ",id_detalle,", ",tipo)
        if(tipo == 1)
        {
            let n_insumos=[]

            for(let it of insumosEscogidos)
            {
                let pivote = {...it}

                if(it.id_insumo != id_detalle)
                {
                    n_insumos.push(pivote)
                }
            }
            console.log("n_insumos: ", n_insumos)
            setInsumosEscogidos(n_insumos)
        }
        else{
            let n_servicios=[]

            for(let it of serviciosEscogidos)
            {
                let pivote = {...it}

                if(it.id_servicio != id_detalle)
                {
                    n_servicios.push(pivote)
                }
            }

            setServiciosEscogidos(n_servicios)
        }
    }

    const _cambioDeber = () =>{

        setDeber(!deber);

        if(!deber == false)
        {
            setAbono(0.00)
            setTotalAPagar(parseFloat(totalFacturacion) + parseFloat(saldoCliente))
        }
        else{
            setTotalAPagar(0.00)
        }
    }

    const _guardarFactura = () =>{
        let validez = _validarFactura();

        if(validez == true)
        {
            swal({
                title:"Finalizar Factura",
                icon:"success",
                text:"¿Desea Finalizar la Factura ?",
                buttons:["Cancelar","Aceptar"]
            }).then(async respuesta =>{

                if(respuesta == true)
                {
                    let servicios_factura = [];
                    let insumos_factura = []

                    for(let iterador of serviciosEscogidos)
                    {
                        let { id_servicio, deducible_detalle, precio_servicio } = iterador;
                        
                        let n_servicio ={
                            id_servicio,
                            deducible: deducible_detalle,
                            subtotal: precio_servicio
                        }

                        servicios_factura.push(n_servicio)

                    }

                    for(let iterador of insumosEscogidos)
                    {
                        let { id_insumo, precio_unitario, cantidad_detalle } = iterador;
                        
                        let n_insumo ={
                            id_insumo,
                            cantidad: cantidad_detalle,
                            subtotal: parseFloat(precio_unitario)* parseInt(cantidad_detalle)
                        }

                        insumos_factura.push(n_insumo)
                    }

                    let cantidad_pagada = totalAPagar;

                    let subtotal_factura = totalFacturacion;

                    let datos ={
                        id_expediente: idExpediente,
                        servicios_factura,
                        insumos_factura,
                        cantidad_pagada,
                        subtotal_factura,
                        deber
                    }
                    try{
                    let token= Cookies.get('token');
                    let respuesta_factura = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_FINALIZAR_FACTURA)
                    .send(datos)
                    .set('Accept', 'application/json')
                    .set("Authorization", "Bearer " + token) 

                    if(respuesta_factura.body.message == "OK")
                    {
                        swal({
                            title:"Factura Finalizada",
                            icon:"success",
                            text:"La Factura ha sido finalizada con éxito",
                            button:"Aceptar"
                        })

                        history.push("/")
                    }
                }catch(e)
                {
                    console.log("Error: ",e)
                    swal({
                        title:"Error al guardar Factura",
                        icon:"error",
                        text:"Ha ocurrido un error al guardar la factura",
                        button:"Aceptar"
                    })
                }
                    
                }
            })
        }



    }

    const _validarFactura=()=>{

        let valido = false;

        let cantidad_detalles = serviciosEscogidos.length + insumosEscogidos.length;

        let validez_cantidad_detalles = false;

        if(cantidad_detalles > 0)
        {
            validez_cantidad_detalles = true;
        }

        let contador_validos = 0;

        let validez_detalles = false;

        for(let it of insumosEscogidos)
        {
            let { cantidad_detalle, id_insumo } = it;

            if(cantidad_detalle !== "" && cantidad_detalle > 0 && id_insumo != null  && id_insumo != undefined)
            {
                contador_validos++;
            }
            else{
                console.log("invalido: ", id_insumo)
            }
        }

        for(let it of serviciosEscogidos)
        {
            let {id_servicio, deducible_detalle } = it;

            if(deducible_detalle !== "" && deducible_detalle!= null && deducible_detalle != undefined && id_servicio != null  && id_servicio != undefined)
            {
                contador_validos++;
            }
        }

        if(contador_validos == cantidad_detalles)
        {
            validez_detalles = true;
        }

        let validez_pago = false;

        if( deber == false && parseFloat(totalFacturacion) >0 ||( deber == true && abono !== "" && abono != undefined && abono != null && parseFloat(abono) > 0 ))
        {
            validez_pago = true;
        }

        if(validez_cantidad_detalles == true && validez_detalles == true && validez_pago == true)
        {
            valido = true;
        }
        else
        {
            console.log("validezcantidad: ", validez_cantidad_detalles, "validezdetalles: ",validez_detalles, "validez_pago: ",validez_pago)
            swal({
                title:"Error en Detalles de facturación",
                icon:"error",
                text:"Existen errores en los campos ingresados",
                button:"Aceptar"
            });
        }

        return valido;
    }

    return(
        <Fragment>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Facturacion </h4><br/>

                  <Row>
                    <Col><Input plaintext value="Datos Cita" style={{textDecoration:'underline'}} readOnly /></Col> 
                  </Row>

                  <Row>
                      <Col>
                            <Label for="pacienteSelect"><b>Paciente: </b>{idExpediente}- {nombrePaciente}</Label>
                      </Col>

                      <Col>
                            <Label for="pacienteSelect"><b>Servicio: </b>{idServicio}- {servicio}</Label>
                      </Col>
                  </Row>

                  <Row>
                    <Col><Input plaintext value="Agregar Detalle Insumo" style={{textDecoration:'underline'}} readOnly /></Col> 
                  </Row>

                  <Row>
                      <Col>
                            <FormGroup row>
                                    <Label for="Insumo" sm='2'>Insumo</Label>
                                    <Col>
                                        <Select
                                              id={"insumoSelect"}
                                              name={"insumoSelect"}
                                              options={optionsInsumo}
                                              value={insumoSeleccionado}
                                              placeholder={"Seleccione un insumo"}
                                              onChange={e=>setInsumoSeleccionado(e)}
                                        />
                                    </Col>
                                    <Col md={2}>
                                        <Input 
                                            id={"cantidadInput"} 
                                            name={"cantidadInput"} 
                                            value={cantidadInsumo}
                                            onChange={e=>setCantidadInsumo(e.target.value)}
                                        />
                                    </Col>
                                    <Col>
                                        <ButtonToggle
                                            id={"agregarInsumoBtn"}
                                            name={"agregarInsumoBtn"}
                                            onClick={(e)=>_agregarInsumo()}
                                        >
                                            +
                                        </ButtonToggle>
                                    </Col>
                            </FormGroup>

                            <FormGroup row>
                                    <Label for="Insumo" sm='2'>Servicio</Label>
                                    <Col>
                                        <Select
                                              id={"servicioSelect"}
                                              name={"servicioSelect"}
                                              options={optionsServicio}
                                              value={servicioSeleccionado}
                                              placeholder={"Seleccione un servicio"}
                                              onChange={e=>setServicioSeleccionado(e)}
                                        />
                                    </Col>
                                  
                                    <Col>
                                        <ButtonToggle
                                            id={"agregarServicioBtn"}
                                            name={"agregarServicioBtn"}
                                            onClick={(e)=>_agregarServicio()}
                                        >
                                            +
                                        </ButtonToggle>
                                    </Col>
                            </FormGroup>
                      </Col>
                      
                  </Row>
                  <hr />
                  <Row>
                    <Col><Input plaintext value="Detalles de Facturación" style={{textDecoration:'underline'}} readOnly /></Col> 
                  </Row>

                  <Row>
                      <Col>
                      <DataTable
                        columnasTabla={columnas_tabla}
                        datosTabla={filas}
                      />
                      </Col>
                  </Row>

                  <Row>
                      <Col>

                        <Row>
                            <Col> <b>Total Factura: $ </b>{totalFacturacion} </Col> 
                        </Row>

                        <Row>
                            <Col> <b>Saldo Cliente: $ </b>{saldoCliente} </Col> 
                        </Row>
                        <hr />
                        <Row>
                            <Col> <b>Total a Pagar: $ </b>{totalAPagar} </Col> 
                        </Row>
                      </Col>
                      
                      <Col>
                        <Row>
                            <Col> 
                            <AvForm>
                                <AvCheckboxGroup name="deberChckx">
                                                     <AvCheckbox 
                                                            label={"deber"} 
                                                            value={"deber"} 
                                                            checked={deber}
                                                             onChange={(e)=>{_cambioDeber()}}
                                                            className="checkbox_animated "
                                                            // 
                                                        />
                                </AvCheckboxGroup>
                            </AvForm>
                                                        </Col> 
                        </Row>

                        <Row>
                            <Col> <b>Abono: $ </b><Input
                                                    id="abonoIpx"
                                                    name="abonoIpx"
                                                    value={abono}
                                                    type="number"
                                                    onChange={e=>{
                                                        setAbono(e.target.value)
                                                        setTotalAPagar(e.target.value)
                                                    }}
                                                    disabled={!deber}
                            /> </Col> 
                        </Row>
                        <hr />
                        
                      </Col >

                      <Col md={6}>
                      </Col>
                  </Row>

                  <Row>
                      <Col>
                        <Button color="success" onClick={()=>{_guardarFactura()}}>Finalizar Factura</Button>
                      </Col>
                  </Row>

                </CardBody>
        </Card>
        </Fragment>
    )
}

export default Factura;