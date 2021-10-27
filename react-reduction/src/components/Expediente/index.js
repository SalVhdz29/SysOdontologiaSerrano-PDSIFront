import React, { useEffect, useState } from "react"

import superagent from 'superagent';

import {
  API_NUEVO_EXPEDIENTE,
  API_UPDATE_EXPEDIENTE,
  API_OBTENER_EXPEDIENTE,
  API_OBTENER_UN_EXPEDIENTE
} from  '../../api/apiTypes';


import { 
  TabContent,
  TabPane,
  Card,
  CardHeader,
  Button,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  FormGroup
} from "reactstrap"

import { FaEye, FaPencilAlt, FaRegFolderOpen } from 'react-icons/fa';
import {GrConfigure } from 'react-icons/gr';

import Cookies from 'js-cookie';

//Componentes
import NuevoExpediente from './nuevoExpediente';
import HistorialExpediente from './historialExpediente';
import DataTable from '../DataTable/DataTable';

//jsons de prueba
import listExpediente from './Json/listExpediente.json';

// Redux
import { connect } from "react-redux";
//actions
import {
  setListaExpediente,
  setFilasListaExpedienteActivos,
  setFilasListaExpedienteInactivos
} from '../../store/actions'

//columnas -tabla Expedientes
import {columnasTabla} from './Json/columnasExpediente';



const Expediente = props =>{
  const[listaExpediente, setListaExpediente] = useState([]);
  const[filasListaExpediente, setFilasListaExpediente] =useState([]);
  

    //Ciclo de vida
    useEffect(()=>{
      _obtenerServicios(listExpediente);
  },[])


 
    useEffect(()=>{
    
      setListaExpediente(props.state.listaExpediente);
      let result =  _crearFilasListaExpediente();
    },[props.state.listaExpediente]) //detecta cambios en la lista de Expediente en el reducer y vuelve a formar las filas.



  useEffect(()=>{
      
      const _setearFilas =async()=>{
          await setFilasListaExpediente(props.state.filasListaExpedienteActivos);
      }
      _setearFilas();
  },[props.state.filasListaExpedienteActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
  //Fin ciclo de vida


    //Función que simula la inicialización de servicios.
    const _obtenerServicios=async(listaExpediente)=>{
      /* simulando la llamada a un servicio */

      //await props.setListaExpediente(listaExpediente);      
       let token= Cookies.get('token');


      let respuesta_Expediente = await superagent.post(
        process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EXPEDIENTE)
        .set('Accept', 'application/json').set("Authorization", "Bearer " + token);
        await props.setListaExpediente(respuesta_Expediente.body);
  }



    //Función que llama a los usuarios en el servidor.
    const _obtenerExpediente = async() =>{
  
      let token= Cookies.get('token');

      let respuesta_Expediente = await superagent.post(
        process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EXPEDIENTE)
      .set('Accept', 'application/json').set("Authorization", "Bearer " + token);

      await props.setListaExpediente(respuesta_Expediente.body);
  }




    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnExpediente =({tipo, valor})=>{
      console.log("vino al cambio usuarios con: ", tipo);
      switch(tipo){
          case 'agregarExpedienteLista':
                  let nueva_lista =_agregarExpedienteALista(valor);
                 
                  _obtenerExpediente(nueva_lista);
              break;
          case 'editarExpedienteLista':
      
                  let lista_actualizada =_actualizarExpediente(valor);
               
                  _obtenerExpediente(lista_actualizada);
              break;



          default:
              break;
      }
  }



    //Función que crea las filas a partir de la lista de usuarios optenida.
    const _crearFilasListaExpediente=async()=>{
     
        let filas=[];


      props.state.listaExpediente.map(Expediente=>{

          let {
              id_expediente,
              nombre_paciente,
              apellido_paciente,
              dui,
              sexo,
              correo,
              telefono,
              ultima_fecha,
              fecha_nacimiento,
              direccion
               } = Expediente;


          let fila ={};
          fila.id_expediente = id_expediente;
          fila.nombre_paciente = nombre_paciente;
          fila.apellido_paciente = apellido_paciente;
          fila.dui = dui;
          //fila.sexo = sexo;
          fila.correo = correo;
          fila.telefono = telefono;
          fila.ultima_fecha = ultima_fecha;
          fila.fecha_nacimiento = fecha_nacimiento;
          fila.direccion = direccion;
          if(sexo){
            fila.sexo = "Masculino";
          }else{
            fila.sexo = "Femenino";
          }

          // fila.
          
          fila.operaciones="Coming soon";
              let defaultValues={
                  id_expediente:id_expediente,
                  nombre_paciente: nombre_paciente,
                  apellido_paciente: apellido_paciente,
                  dui: dui,
                  sexo: sexo,
                  correo: correo,
                  telefono: telefono,
                  ultima_fecha: ultima_fecha,
                  fecha_nacimiento: fecha_nacimiento,
                  direccion: direccion
              }
              
          fila.operaciones=(
              < FormGroup>
              <NuevoExpediente
                  isReadOnly={true}
                  defaultValue={defaultValues}
                  classNames={"btn btn-success btn-sm "}
                  mensajeBoton={<FaEye />}
              />{' '}
              <NuevoExpediente 
                  defaultValue={defaultValues}
                  classNames={"btn btn-danger btn-sm "}
                  mensajeBoton={<FaPencilAlt />}
                  isEditable={true}
                  cambioDatos={_cambiosEnExpediente}
              />{' '}

            <HistorialExpediente 
                  defaultValue={defaultValues}
                  classNames={"btn btn-info btn-sm "}
                  mensajeBoton={<FaRegFolderOpen />}
                  nombre={fila.nombre_paciente}
                  apellido={fila.apellido_paciente}
                  edad={fila.fecha_nacimiento}
                  historial={true}
                  isReadOnly={true}
                  
              />
              </FormGroup>
          )
          filas.push(fila);
      })
      props.setFilasListaExpedienteActivos(filas);

  }



  //Función que simula el añadir el tipo expediente obtenido para anexarlo al JSON - temporal.
  const _agregarExpedienteALista = (nuevo_expediente)=>{

    let { listaExpediente } = props.state;

    let n_lista = [];

    listaExpediente.map(Expediente_it =>{
        let Expediente = {...Expediente_it};
        n_lista.push(Expediente);

    });

    let Expediente ={};
    Expediente.id_expediente = listaExpediente.length + 1;
    Expediente.nombre_paciente = nuevo_expediente.nombre_paciente;
    Expediente.apellido_paciente = nuevo_expediente.apellido_paciente;
    Expediente.dui = nuevo_expediente.dui;
    Expediente.sexo = nuevo_expediente.sexo;
    Expediente.correo = nuevo_expediente.correo;
    Expediente.telefono = nuevo_expediente.telefono;
    Expediente.ultima_fecha = nuevo_expediente.ultima_fecha;
    Expediente.fecha_nacimiento = nuevo_expediente.fecha_nacimiento;
    Expediente.direccion = nuevo_expediente.direccion;

    
    n_lista.push(Expediente);
    //console.log("la lista antes de ingresar ", n_lista);
  return n_lista;

};


    //Función que simula la actualización en la data de un tipo expediente.
    const _actualizarExpediente = (expediente_actualizar)=>{

      let { listaExpediente } = props.state;

      let n_lista = [];

      listaExpediente.map(Expediente_it =>{
          let Expediente = {...Expediente_it};

          if(Expediente.id_expediente == expediente_actualizar.id_expediente)
          {
              
              Expediente.id_expediente = expediente_actualizar.id_expediente;
              Expediente.nombre_paciente = expediente_actualizar.nombre_paciente;
              Expediente.apellido_paciente = expediente_actualizar.apellido_paciente;
              Expediente.sexo = expediente_actualizar.sexo;
              Expediente.dui = expediente_actualizar.dui;
              Expediente.correo = expediente_actualizar.correo;
              Expediente.telefono = expediente_actualizar.telefono;
              Expediente.ultima_fecha = expediente_actualizar.ultima_fecha;
              Expediente.fecha_nacimiento = expediente_actualizar.fecha_nacimiento;
              Expediente.direccion = expediente_actualizar.direccion;
    }

          n_lista.push(Expediente);

      });

     
    return n_lista;
  }



  
    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i></i> 
                  <b>Gestión de Expedientes </b></h4>
                    <br/>


             

                   <Row>
                    <Col md={4} xs={12}>
                    
                        <NuevoExpediente 
                            cambioDatos={_cambiosEnExpediente}
                        />
                    </Col>
                  </Row>

                  <Row>
                      <Col md={12} xs={12}>
                            <DataTable datosTabla={props.state.filasListaExpedienteActivos} columnasTabla={columnasTabla}
                                /> 
                      </Col>
                  </Row>



                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}



const mapStateToProps = reducers => {
    return{
      state: reducers.ExpedienteReducer
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return{
        setExpediente: (datos) =>dispatch(setListaExpediente(datos)),
        setListaExpediente: (datos) =>dispatch(setListaExpediente(datos)),

        setFilasListaExpedienteActivos: (datos) =>dispatch(setFilasListaExpedienteActivos(datos)),
        setFilasListaExpedienteInactivos: (datos) =>dispatch(setFilasListaExpedienteInactivos(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Expediente);