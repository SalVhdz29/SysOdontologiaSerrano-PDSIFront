import React, { useEffect, useState } from "react"

import superagent from 'superagent';


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

import {
  API_NUEVO_INSUMO,
  API_UPDATE_INSUMO,
  API_OBTENER_INSUMO,
  API_OBTENER_UN_INSUMO
} from  '../../api/apiTypes';

import { FaEye, FaPencilAlt } from 'react-icons/fa';
import {GrConfigure } from 'react-icons/gr';

import Cookies from 'js-cookie';

//Componentes
import NuevoInsumo from './NuevoInsumo';
import DataTable from '../DataTable/DataTable';

//jsons de prueba
import listInsumo from './Json/listInsumos.json';

// Redux
import { connect } from "react-redux";
//actions
import {
  setListaInsumo,
  setFilasListaInsumoActivos,
  setFilasListaInsumoInactivos
} from '../../store/actions'

//columnas -tabla Insumos
import {columnasTabla} from './Json/columnasinsumo';

const Insumo = props =>{
  const[listaInsumo, setListaInsumo] = useState([]);
  const[filasListaInsumo, setFilasListaInsumo] =useState([]);


    //Ciclo de vida
    useEffect(()=>{
      _obtenerServicios(listInsumo);
  },[])

  useEffect(()=>{
    
    setListaInsumo(props.state.listaInsumo);
    let result =  _crearFilasListaInsumo();
  },[props.state.listaInsumo]) //detecta cambios en la lista de Insumo en el reducer y vuelve a formar las filas.

  useEffect(()=>{
      
      const _setearFilas =async()=>{
          await setFilasListaInsumo(props.state.filasListaInsumoActivos);
      }
      _setearFilas();
  },[props.state.filasListaInsumoActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
  //Fin ciclo de vida


    //Función que simula la inicialización de servicios.
    const _obtenerServicios=async(listaInsumo)=>{
      /* simulando la llamada a un servicio */

      //await props.setListaInsumo(listaInsumo);      
       let token= Cookies.get('token');

       let respuesta_Insumo = await superagent.post(
        process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_INSUMO)
        .set('Accept', 'application/json').set("Authorization", "Bearer " + token);
        await props.setListaInsumo(respuesta_Insumo.body);

  }


    //Función que llama a los usuarios en el servidor.
    const _obtenerInsumo = async(listaInsumo) =>{
  
      let token= Cookies.get('token');

   let respuesta_Insumo = await superagent.post(
        process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_INSUMO)
        .set('Accept', 'application/json').set("Authorization", "Bearer " + token);
        await props.setListaInsumo(respuesta_Insumo.body);
  }



    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnInsumo =({tipo, valor})=>{
      console.log("vino al cambio usuarios con: ", tipo);
      switch(tipo){
          case 'agregarInsumoLista':
                  let nueva_lista =_agregarInsumoALista(valor);
                 
                  _obtenerInsumo(nueva_lista);
              break;
          case 'editarInsumoLista':
      
                  let lista_actualizada =_actualizarInsumo(valor);
               
                  _obtenerInsumo(lista_actualizada);
              break;

          default:
              break;
      }
  }


    //Función que crea las filas a partir de la lista de usuarios optenida.
    const _crearFilasListaInsumo=async()=>{
     

      let filas=[];

      props.state.listaInsumo.map(Insumo=>{

          let {
              id_insumo,
              nombre_insumo,
              descripcion
               } = Insumo;

          let fila ={};
          fila.id_insumo = id_insumo;
          fila.nombre_insumo = nombre_insumo;
          fila.existencia = 1;
          fila.descripcion = descripcion;
          

          fila.operaciones="Coming soon";
              let defaultValues={
                  id_insumo:id_insumo,
                  nombre_insumo: nombre_insumo,
                  descripcion: descripcion
              }
              
          fila.operaciones_insumo=(     
              < FormGroup>
              <NuevoInsumo
                  isReadOnly={true}
                  defaultValue={defaultValues}
                  className = {"btn btn-success btn-md "}
                  mensajeBoton={<FaEye />}
              />{' '}
              <NuevoInsumo 
                  defaultValue={defaultValues}
                  className={"btn btn-danger btn-md "}
                  mensajeBoton={<FaPencilAlt />}
                  isEditable={true}
                  cambioDatos={_cambiosEnInsumo}
              />
              </FormGroup>
          )
          filas.push(fila);
      })
      props.setFilasListaInsumoActivos(filas);

  }

  //Función que simula el añadir el tipo Insumo obtenido para anexarlo al JSON - temporal.
  const _agregarInsumoALista = (nuevo_Insumo)=>{
    let { listaInsumo } = props.state;

    let n_lista = [];

    listaInsumo.map(Insumo_it =>{
        let Insumo = {...Insumo_it};
        n_lista.push(Insumo);

    });

    let Insumo ={};
    Insumo.id_insumo = listaInsumo.length + 1;
    Insumo.nombre_insumo = nuevo_Insumo.nombre_insumo;
    Insumo.existencia = nuevo_Insumo.existencia;
    Insumo.descripcion = nuevo_Insumo.descripcion;
    
    n_lista.push(Insumo);
    //console.log("la lista antes de ingresar ", n_lista);
  return n_lista;

};


    //Función que simula la actualización en la data de un tipo Insumo.
    const _actualizarInsumo = (Insumo_actualizar)=>{

      let { listaInsumo } = props.state;

      let n_lista = [];

      listaInsumo.map(Insumo_it =>{
          let Insumo = {...Insumo_it};

          if(Insumo.id_insumo == Insumo_actualizar.id_insumo)
          {
              Insumo.id_insumo = Insumo_actualizar.id_insumo;
              Insumo.nombre_insumo = Insumo_actualizar.nombre_insumo;
              Insumo.existencia = Insumo_actualizar.existencia;
              Insumo.descripcion = Insumo_actualizar.descripcion;
              
    }

          n_lista.push(Insumo);

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
                  <b>Gestión de Insumos </b></h4>
                    <br/>
                    <Row>
                    <Col md={4} xs={12}>
                    
                        <NuevoInsumo 
                            className={"btn btn-success btn-md"}
                            cambioDatos={_cambiosEnInsumo}
                        />
                    </Col>
                  </Row>

                  <Row>
                      <Col md={12} xs={12}>
                            <DataTable datosTabla={props.state.filasListaInsumoActivos} columnasTabla={columnasTabla}
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
      state: reducers.InsumoReducer
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return{
        setInsumo: (datos) =>dispatch(setListaInsumo(datos)),
        setListaInsumo: (datos) =>dispatch(setListaInsumo(datos)),
        setFilasListaInsumoActivos: (datos) =>dispatch(setFilasListaInsumoActivos(datos)),
        setFilasListaInsumoInactivos: (datos) =>dispatch(setFilasListaInsumoInactivos(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Insumo);