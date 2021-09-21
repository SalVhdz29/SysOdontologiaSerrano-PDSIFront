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
import Cookies from 'js-cookie';
import request from 'superagent';
import DateSelector from '../../DateSelector/DateSelector';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import Select from 'react-select'
import swal from 'sweetalert';
import { connect } from 'react-redux';
import {DateTime} from 'luxon'

//actions
import{
  insertarListaServiciosActivosModal,
  insertarListaPacientesActivosModal,
} from '../../../store/actions'

//api
import{
  API_OBTENER_EXPEDIENTE,
  API_GUARDAR_CITA_PACIENTE,
  API_OBTENER_SERVICIOS,
  API_OBTENER_SERVICIOS_ACTIVOS,
  API_REPROGRAMAR_CITA,
} from '../../../api/apiTypes'

//jsons
import { servicios_json } from '../../../constants/servicios'

const CitaModal = props =>{

    const [ modal, setModal ] = useState(false);
    const [ tipoUtilizacion, setTipoUtilizacion ] = useState(1);
    
    const [ pacientesOption, setPacientesOption ] = useState([]);
    const [ pacienteEscogido, setPacienteEscogido ] = useState(null);

    const [ serviciosOption, setServiciosOption ] = useState([]);
    const [ servicioEscogido, setServicioEscogido ] = useState(null);

    const [ recomendaciones, setRecomendaciones ] =useState("");
    const [ detallesCitas, setDetallesCitas ] = useState("");

    const [ fechaCita, setFechaCita ] = useState(DateTime.now());
    const [ horaLlegada, setHoraLlegada ] = useState(DateTime.now());
    const [ horaSalida, setHoraSalida ] = useState(DateTime.now());
    const [ errorSalida, setErrorSalida ] = useState(false)
    const [ citaReprogramar, setCitaReprogramar ] = useState(null);
    const [ motivoReprogramacion, setMotivoReprogramacion ] = useState("")
    const [ desactivar, setDesactivar ] = useState(false)

    useEffect(()=>{
      _obtenerServicios()
    },[])
    useEffect(()=>{
      if(props.cita_modal_state.listaPacientes != null)
      {
        _formarOptionsPacientes()
      }
    },[props.cita_modal_state.listaPacientes])

    useEffect(()=>{
      if(props.cita_modal_state.listaServicios != null)
      {
        _formarOptionsServicios()
      }
    },[props.cita_modal_state.listaServicios])

    const _obtenerServicios=async()=>{
      try{

      let token= Cookies.get('token');

      let respuesta_expedientes_pacientes = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EXPEDIENTE)
                                                  .set('Accept', 'application/json')
                                                  .set("Authorization", "Bearer " + token);
      let respuesta_servicios = await request.get(process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_SERVICIOS_ACTIVOS)
                                                  .set('Accept', 'application/json')
                                                  .set("Authorization", "Bearer " + token) 


      props.insertarListaPacientesActivosModal(respuesta_expedientes_pacientes.body);
      props.insertarListaServiciosActivosModal(respuesta_servicios.body)
    }
    catch(e)
    {
      console.log("error ", e)
    }

    }
    const _toggleModal=async()=>{

      let antigua_bandera_modal = modal;
        await setModal(!modal);

        if(antigua_bandera_modal == false && props.citaReprogramar == null)
        {
          setPacienteEscogido(null)
          setServicioEscogido(null)
          setDetallesCitas("")
          setRecomendaciones("")
          setFechaCita(DateTime.now())
          setHoraLlegada(DateTime.now())
          setHoraSalida(DateTime.now())
          setErrorSalida(false)
        }
        else{
          if(antigua_bandera_modal == false && props.citaReprogramar != null)
          {
          _precargarCita()
          }
        }
        
    }
    const _formarOptionsPacientes = ()=>{
      let n_options_pacientes =[]

      for(let iterador_pacientes of props.cita_modal_state.listaPacientes)
      {
        let{
          id_expediente,
          nombre_paciente, apellido_paciente
        } = iterador_pacientes;

        let n_option ={
          label: nombre_paciente + " " +apellido_paciente,
          value: id_expediente
        }
        n_options_pacientes.push(n_option)
      }
      setPacientesOption(n_options_pacientes)
    }
    const _formarOptionsServicios = ()=>{
      let n_options_servicios =[]

      for(let iterador_servicios of props.cita_modal_state.listaServicios)
      {
        let{
          id_servicio,
          nombre_servicio
        } = iterador_servicios;

        let n_option ={
          value: id_servicio,
          label: nombre_servicio
        }
        n_options_servicios.push(n_option)
      }
      setServiciosOption(n_options_servicios)
    }
    const _obtenerPacienteEscogido = (pacienteOption) =>{
      setPacienteEscogido(pacienteOption)
    }
    const _obtenerServicioEscogido = (servicioOption)=>{
      setServicioEscogido(servicioOption)

      let {value} = servicioOption;

      let servicio_correspondiente = props.cita_modal_state.listaServicios.find(it => it.id_cita == value);

      if(servicio_correspondiente != null)
      {
        let { restricciones } = servicio_correspondiente;

        setRecomendaciones(restricciones);
      }
    }
    const _obtenerFechaCita = ({identificador, fecha}) =>{

      let fecha_cita = DateTime.fromJSDate(fecha)

      setFechaCita(fecha_cita)

    }
    const _obtenerHoraLlegada = ({identificador, fecha}) =>{

      let hora_llegada = DateTime.fromJSDate(fecha)
      setHoraLlegada(hora_llegada)

      if(hora_llegada > horaSalida)
      {
        setErrorSalida(true)
      }
      else{
        setErrorSalida(false)
      }
    }
    const _obtenerHoraSalida = ({identificador, fecha}) =>{
      let hora_salida = DateTime.fromJSDate(fecha)
      setHoraSalida(hora_salida)

      if(horaLlegada > hora_salida)
      {
        setErrorSalida(true)
      }
      else{
        setErrorSalida(false)
      }
    }
    const _obtenerDetallesCita = (detalles)=>{

      setDetallesCitas(detalles)
    }
    const _guardarCita =async()=>{

      let validez_campos = _validarCampos();

      console.log("entre")
      if(validez_campos == true)
      {
        try{

          let token= Cookies.get('token');
          console.log("fechaCita. ",fechaCita)
          console.log("horaLlegada: ",horaLlegada.toISO())

          let datos={
            id_expediente: pacienteEscogido.value,
            id_servicio: servicioEscogido.value,
            detalles_cita: detallesCitas,
            fecha_cita: fechaCita,
            hora_entrada: horaLlegada,
            hora_salida: horaSalida
          }

          if(tipoUtilizacion == 1)
          {
            let respuesta_guardar = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_GUARDAR_CITA_PACIENTE)
            .set('Accept', 'application/json')
            .set("Authorization", "Bearer " + token)
            .send(datos);
            console.log("guardar: ", respuesta_guardar.body)
            if(respuesta_guardar.body.message =="OK")
            {
                swal({
                title:"Guardado",
                icon:"success",
                text:"Se ha guardado correctamente",
                button:"Aceptar"
                })
                props.recargarServicios()
                _toggleModal()
            }
          }
          else
          {
            if(tipoUtilizacion == 2)
            {
              datos.id_cita = citaReprogramar.id_cita;
              datos.motivo_reprogramacion=motivoReprogramacion;

              let respuesta_guardar = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_REPROGRAMAR_CITA)
              .set('Accept', 'application/json')
              .set("Authorization", "Bearer " + token)
              .send(datos);
              console.log("guardar: ", respuesta_guardar.body)
              if(respuesta_guardar.body.message =="OK")
              {
                  swal({
                  title:"Guardado",
                  icon:"success",
                  text:"Se ha guardado correctamente",
                  button:"Aceptar"
                  })
                  props.recargarServicios()
                  _toggleModal()
              }
            }

          }

         

        }catch(e)
        {
          console.log("error: ", e);
          swal({
            title:"Error en Guardar Cita",
            icon:"error",
            text:"Ha ocurrido un error al guardar la cita."
          })
        }
      }
      else{
        swal({
          title:"Error en Campos",
          icon:"error",
          text:"Existen errores en los campos ingresados",
          button:"Aceptar"
        })
      }

    }
    const _validarCampos = ()=>{
      let validez = false;
      if(errorSalida != true && pacienteEscogido != null && servicioEscogido != null)
      {
        validez = true;
      }

      return validez;
    }
    const _obtenerMotivoReprogramacion = (motivo)=>{
        setMotivoReprogramacion(motivo)
    }
    const _precargarCita=()=>{
      let { id_expediente, fecha_cita, hora_entrada, hora_salida, id_servicio } = props.citaReprogramar

      console.log("los props. ", props.cita_modal_state);
      console.log("el id expediente: ", id_expediente)
      let paciente_escogido = props.cita_modal_state.listaPacientes.find(it=> it.id_expediente  == id_expediente)
      
      console.log("paciente_escogido: ", paciente_escogido)
      if(paciente_escogido != null)
      {
        let{id_expediente, nombre_paciente, apellido_paciente }=paciente_escogido
        let paciente_option={
          label: nombre_paciente +" "+apellido_paciente,
          value: id_expediente
        }

        setPacienteEscogido(paciente_option)
      }

      hora_entrada= DateTime.fromISO(hora_entrada);
      hora_salida = DateTime.fromISO(hora_salida)

      setHoraLlegada(hora_entrada);
      setHoraSalida(hora_salida);

      let servicio_escogido = props.cita_modal_state.listaServicios.find(it=>it.id_servicio == id_servicio);

      if(servicio_escogido != null)
      {
        let {id_servicio, nombre_servicio} = servicio_escogido;

        let servicio_option={
          label: nombre_servicio,
          value: id_servicio
        }

        setServicioEscogido(servicio_option)
      }

      if(props.deshabilitar != null)
      {
        setDesactivar(props.deshabilitar)

        if(props.deshabilitar == true)
        {
          setTipoUtilizacion(3)
        }
        else{
          setTipoUtilizacion(2)
        }
      }

      setCitaReprogramar(props.citaReprogramar)

    }
   

  
    
    
    return(
        <Fragment>
            <FormGroup>
                <ButtonToggle
                    color={props.color != null?(props.color):("success")}
                    size={props.size!= null?(props.size):("")}
                    onClick={()=>{_toggleModal()}}
                    // disabled={listaEvaluaciones.length == 0?(true):(false)}
                >{props.textoBoton}</ButtonToggle>
            </FormGroup>
        <Modal
        size="xl"
        isOpen={modal}
      >
        <div className="modal-header">
          <h5 className="modal-title mt-0" id="myModalLabel">
           {tipoUtilizacion == 1?(<span>Agendar Cita</span>):(tipoUtilizacion == 2?(<span>Reprogramar Cita</span>):(<span>Ver Cita</span>))} 
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
                                        {tipoUtilizacion == 1?(
                                            <Select
                                              id={"pacienteSelect"}
                                              name={"pacienteSelect"}
                                              options={pacientesOption}
                                              value={pacienteEscogido}
                                              placeholder={"Seleccione un Paciente"}
                                              onChange={e=>_obtenerPacienteEscogido(e)}
                                              isDisabled={desactivar || tipoUtilizacion == 2?(true):(false)}
                                            />
                                            ):(
                                              <p><b>{pacienteEscogido.label}</b></p>
                                            )}
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
                                              isDisabled={desactivar || tipoUtilizacion == 2?(true):(false)}
                                            />
                                        </Col>
                          </FormGroup>
                 
                          <FormGroup row>
                            <Label for="recomendacionestxt"><b>Recomendaciones: </b></Label>
                                        <Col>
                                          <Input
                                            type="textarea"
                                            id="recomendacionestxt"
                                            name="recomendacionestxt"
                                            value={recomendaciones}
                                            readOnly={true}
                                          />
                                        </Col>
                          </FormGroup>

                 
                    </Col>
              </Row>
              <Row>
                <Col md={10}>
                  {tipoUtilizacion == 1 || tipoUtilizacion == 3?(
                  <FormGroup row>
                              <Label for="detallesCitatxt"><b>Detalles Cita: </b></Label>
                                          <Col>
                                            <Input
                                              type="textarea"
                                              id="detallesCitatxt"
                                              name="detallesCitatxt"
                                              value={detallesCitas}
                                              onChange={e=>{_obtenerDetallesCita(e.target.value)}}
                                              disabled={desactivar}
                                            />
                                          </Col>
                            </FormGroup>
                    ):(
                      <FormGroup row>
                              <Label for="motivoReprogramaciontxt"><b>Motivo Reprogramacion: </b></Label>
                                          <Col>
                                            <Input
                                              type="textarea"
                                              id="motivoReprogramaciontxt"
                                              name="motivoReprogramaciontxt"
                                              value={motivoReprogramacion}
                                              onChange={e=>{_obtenerMotivoReprogramacion(e.target.value)}}
                                              disabled={desactivar}
                                            />
                                          </Col>
                            </FormGroup>
                    )}

                  </Col>
              </Row>
              <Row>
              <Col md={6}>
                  <FormGroup row>
                              <Label for="FechaCitaLlegadatxt"><b>Fecha de Cita: </b></Label>
                                          <Col>
                                            <DateSelector
                                              identificador={null}
                                              limiteSuperiorFecha={null}
                                              fechaSeleccionada={fechaCita}
                                              cambioFecha={_obtenerFechaCita}
                                              // deshabilitar={desactivar}
                                            />
                                          </Col>
                            </FormGroup>

                  </Col>
              </Row>
              <Row>
              <Col md={3}>
                    <FormGroup row>
                        <Label for="FechaCitaSalidatxt" ><b>Hora Inicio: </b></Label>
                              <Col>
                                  <DateSelector
                                      identificador={null}
                                      limiteSuperiorFecha={null}
                                      fechaSeleccionada={horaLlegada}
                                      showTimeSelectOnly={true}
                                      dateFormat={"HH:mm:aa"}
                                      placeholder={"hh:mm:aa"}
                                      cambioFecha={_obtenerHoraLlegada}
                                      // deshabilitar={desactivar}
                                  />
                              </Col>
                      </FormGroup>

                  </Col>

                  <Col md={3}>
                    <FormGroup row>
                        <Label for="FechaCitaSalidatxt"><b>Hora Salida: </b></Label>
                              <Col>
                                  <DateSelector
                                      identificador={null}
                                      limiteSuperiorFecha={null}
                                      fechaSeleccionada={horaSalida}
                                      showTimeSelectOnly={true}
                                      dateFormat={"HH:mm:aa"}
                                      placeholder={"hh:mm:aa"}
                                      cambioFecha={_obtenerHoraSalida}
                                      // deshabilitar={desactivar}
                                  />
                                  {errorSalida == true?(<p style={{color:"red"}}>Coloque una hora de salida correcta</p>):(<span></span>)}
                              </Col>
                      </FormGroup>

                  </Col>
              </Row>
        </div>
        <div className="modal-footer">
           
                  <Button
                  type="button"
                  onClick={()=>_guardarCita()}
                  className=" waves-effect"
                  color="success"
                  data-dismiss="modal"
                  disabled={desactivar}
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

const mapStateToProps = reducers =>{
  return{
      cita_modal_state: reducers.CitaModalReducer,
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    insertarListaPacientesActivosModal: listaP => dispatch(insertarListaPacientesActivosModal(listaP)),
    insertarListaServiciosActivosModal: listaS => dispatch(insertarListaServiciosActivosModal(listaS))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CitaModal);