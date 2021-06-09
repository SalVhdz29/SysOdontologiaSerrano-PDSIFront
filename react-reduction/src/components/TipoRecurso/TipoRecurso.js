import React, { useEffect, useState } from "react"

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

import { FaEye, FaPencilAlt } from 'react-icons/fa';
import {GrConfigure } from 'react-icons/gr';

import Cookies from 'js-cookie';



import superagent from 'superagent';




//Componentes
import NuevoTipoRecurso from "./NuevoTipoRecurso/NuevoTipoRecurso";
import DataTable from '../DataTable/DataTable';
import SwitchTipoRecursoActivo from './switchTipoRecursoActivo/SwitchTipoRecursoActivo';

//jsons de prueba
import listTipoRecurso from './Json/listTipoRecurso.json';
import listRecurso from './Json/listRecurso.json';


//apiTypes
import {
  API_LISTA_TIPORECURSO_REGISTRADOS,
 // API_LISTA_USUARIO_ROLES,
  API_LISTA_RECURSO_ACTIVOS
} from '../../api/apiTypes';


// Redux
import { connect } from "react-redux";
//actions
import {
  setListaTipoRecurso,
  setListaRecurso,
  setFilasListaTipoRecursoActivos,
  setFilasListaTipoRecursoInactivos
} from '../../store/actions'

//columnas -tabla TipoRecursos
import {columnasTabla} from './Json/columnasTablaTipoRecurso';

const TipoRecurso = props =>{
  const[listaTipoRecurso, setListaTipoRecurso] = useState([]);
  const[listaRecurso, setListaRecurso] = useState([]);
  const[filasListaTipoRecurso, setFilasListaTipoRecurso] =useState([]);

//const [tokenU, setTokenU] = useState(null);
    //Ciclo de vida
    useEffect(()=>{
      _obtenerServicios(listTipoRecurso, listRecurso);
  },[])

  useEffect(()=>{
       //  console.log("vino aqui");
    setListaTipoRecurso(props.state.listaTipoRecurso);
    let result =  _crearFilasListaTipoRecurso();
  },[props.state.listaTipoRecurso]) //detecta cambios en la lista de tiporecurso en el reducer y vuelve a formar las filas.

  useEffect(()=>{
      //console.log("valor de filas detectadas: ", props.state.filasListaUsuariosActivos)
      const _setearFilas =async()=>{
          await setFilasListaTipoRecurso(props.state.filasListaTipoRecursoActivos);
      }
      _setearFilas();
  },[props.state.filasListaTipoRecursoActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
  //Fin ciclo de vida



    //Función que simula la inicialización de servicios.


    const _obtenerServicios=async(listaTipoRecurso, listaRecurso)=>{
      /* simulando la llamada a un servicio */
      //console.log("valor del JSON en el llamado: ", listaRecurso);
/*
      await props.setListaTipoRecurso(listaTipoRecurso);
      await props.setListaRecurso(listaRecurso);
       */
      
      
      let token= Cookies.get('token');


      let respuesta_tiporecurso = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_TIPORECURSO_REGISTRADOS)
                                               .set('Accept', 'application/json')
                                               .set("Authorization", "Bearer " + token);

      console.log("la respuesta: ", respuesta_tiporecurso.body);

      await props.setListaTipoRecurso(respuesta_tiporecurso.body);


      let respuesta_recurso = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_RECURSO_ACTIVOS)
                                               .set('Accept', 'application/json')
                                               .set("Authorization", "Bearer " + token);

      console.log("la respuesta: ", respuesta_recurso.body);


      await props.setListaRecurso(respuesta_recurso.body);



  }


    //Función que llama a los usuarios en el servidor.
    //const _obtenerTipoRecurso = async(listaTipoRecurso) =>{
    const _obtenerTipoRecurso = async() =>{
      //console.log("valor del JSON en el llamado: ", listaUsuarios);
      //await props.setListaTipoRecurso(listaTipoRecurso);

      let token= Cookies.get('token');

      let respuesta_tiporecurso = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_TIPORECURSO_REGISTRADOS)
              .set('Accept', 'application/json')
              .set("Authorization", "Bearer " + token);
    
              
      console.log("la respuesta: ", respuesta_tiporecurso.body);

      await props.setListaTipoRecurso(respuesta_tiporecurso.body);

  }

  //Funcion que llama a los recursos activos.
  const _obtenerRecurso = async() =>{
      let token= Cookies.get('token');

      let respuesta_recurso = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_RECURSO_ACTIVOS)
      .set('Accept', 'application/json')
      .set("Authorization", "Bearer " + token);

      console.log("la respuesta: ", respuesta_recurso.body);

      await props.setListaRecurso(respuesta_recurso.body);


  }



    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnTipoRecurso =({tipo, valor})=>{
      //console.log("vino al cambio usuarios con: ", tipo);
      switch(tipo){
          case 'actualizarListaTipoRecurso':
             // let nuevas_filas= _cambiarActivoJsonTipoRecurso(valor.tipo_recurso_id);
                  //console.log("volvio");
                  //_obtenerTipoRecurso(nuevas_filas);
                  _obtenerTipoRecurso();
              break;
          case 'agregarTipoRecursoLista':
                  //let nueva_lista =_agregarTipoRecursoALista(valor);
                  //console.log("lo que devolvio: ", nueva_lista);
                  //_obtenerTipoRecurso(nueva_lista);
                  _obtenerTipoRecurso();

              break;
          case 'editarTipoRecursoLista':
              //console.log(valor, "deeee");
                  let lista_actualizada =_actualizarTipoRecurso(valor);
                  //console.log("lo devuelto: ", lista_actualizada);
                  _obtenerTipoRecurso(lista_actualizada);
              break;

          default:
              break;
      }
  }


    //Función que crea las filas a partir de la lista de usuarios optenida.
    const _crearFilasListaTipoRecurso=async()=>{
      //console.log("detecto el cambio");

      let filas=[];

      if(props.state.listaTipoRecurso.length != 0)
      {


      props.state.listaTipoRecurso.map(TipoRecurso=>{

          let {tipo_recurso_id,
              tipo_recurso_nombre, 
              tipo_recurso_descripcion, 
              tipo_recurso_estado, 
              recurso } = TipoRecurso;

              if(tipo_recurso_estado == 1)
              {
                tipo_recurso_estado=true;
              }
              else{
                tipo_recurso_estado=false;
              }


          let fila ={};
          fila.tipo_recurso_id = tipo_recurso_id;
          fila.tipo_recurso_nombre = tipo_recurso_nombre;
          fila.tipo_recurso_descripcion = tipo_recurso_descripcion;

          // fila.
          fila.recurso=(
              <ul>
                  {recurso.map(recurso => {
                      return(
                    <li>{recurso.nombre_recurso}</li>
                    )
                  })
                  }

              </ul>
          )

          fila.tipo_recurso_estado = (
              <div>
                  <SwitchTipoRecursoActivo
                      tipo_recurso_id={tipo_recurso_id}
                      tipo_recurso_estado={tipo_recurso_estado}
                      cambioEnTipoRecurso={_cambiosEnTipoRecurso}
                  />
              </div>
          );
          fila.operaciones="Coming soon";
              let defaultValues={
                  idTipoRecurso:tipo_recurso_id,
                  nombreTipoRecurso: tipo_recurso_nombre,                
                  descripcionTipoRecurso: tipo_recurso_descripcion,
                  estadoTipoRecurso: tipo_recurso_estado,
                  recurso:recurso
              }
          fila.operaciones=(
              < FormGroup>
              <NuevoTipoRecurso
                  isReadOnly={true}
                  activo={tipo_recurso_estado}
                  defaultValue={defaultValues}
                  classNames={"btn btn-success btn-sm "}
                  mensajeBoton={<FaEye />}
              />{' '}
              <NuevoTipoRecurso 
                  defaultValue={defaultValues}
                  classNames={"btn btn-danger btn-sm "}
                  mensajeBoton={<FaPencilAlt />}
                  isEditable={true}
                  activo={tipo_recurso_estado}
                  cambioDatos={_cambiosEnTipoRecurso}
              />
              </FormGroup>
          )
          filas.push(fila);
      })

    }
      props.setFilasListaTipoRecursoActivos(filas);

  }

//Función que simula los cambios de estado en los Tipo Recurso en el servidor. -temporal.
const _cambiarActivoJsonTipoRecurso=(tipo_recurso_id)=>{
  //console.log("vino al cambio JSOn");
  let nueva_lista_tipo_recurso=[];
  props.state.listaTipoRecurso.map(TipoRecurso=>{
      let TipoRecurso_it = {...TipoRecurso};
      if(TipoRecurso_it.tipo_recurso_id == tipo_recurso_id)
      {
          let activo = TipoRecurso_it.tipo_recurso_estado;

          if(activo == 0)
          {
              activo =1;
          }
          else
          {
              activo =0;
          }
          TipoRecurso_it.tipo_recurso_estado = activo;
      }
      nueva_lista_tipo_recurso.push(TipoRecurso_it);


  });
  
  //console.log("nuevo valor del JSOn ", listTipoRecurso);
  return nueva_lista_tipo_recurso
  //listTipoRecurso
  /* comente las lineas donde clonaba el objeto porque no estoy modificando el store invalidamente, solo el JSOn de prueba. */
}




  //Función que simula el añadir el tipo recurso obtenido para anexarlo al JSON - temporal.
  const _agregarTipoRecursoALista = (nuevo_tipo_recurso)=>{
    console.log("el nuevo ", nuevo_tipo_recurso);

    let { listaTipoRecurso } = props.state;

    let n_lista = [];

    listaTipoRecurso.map(TipoRecurso_it =>{
        let TipoRecurso = {...TipoRecurso_it};
        n_lista.push(TipoRecurso);

    });

    let TipoRecurso ={};
    TipoRecurso.tipo_recurso_id = listaTipoRecurso.length + 1;
    TipoRecurso.tipo_recurso_nombre = nuevo_tipo_recurso.tipo_recurso_nombre;
    TipoRecurso.tipo_recurso_descripcion = nuevo_tipo_recurso.tipo_recurso_descripcion;

    TipoRecurso.tipo_recurso_estado = nuevo_tipo_recurso.tipo_recurso_estado;

    let n_recurso = [];
    nuevo_tipo_recurso.recurso.map(recurso_it=>{
        let recurso = {id_recurso:recurso_it.id_recurso, nombre_recurso:recurso_it.nombre_recurso,descripcion_recurso:recurso_it.descripcion_recurso};
        n_recurso.push(recurso);
    });

    TipoRecurso.recurso=n_recurso;

    n_lista.push(TipoRecurso);
    //console.log("la lista antes de ingresar ", n_lista);
  return n_lista;

};


    //Función que simula la actualización en la data de un tipo Recurso.
    const _actualizarTipoRecurso = (tipo_recurso_actualizar)=>{

      let { listaTipoRecurso } = props.state;

      let n_lista = [];

      listaTipoRecurso.map(TipoRecurso_it =>{
          let TipoRecurso = {...TipoRecurso_it};

          if(TipoRecurso.tipo_recurso_id == tipo_recurso_actualizar.tipo_recurso_id)
          {
              //console.log("coincidencia: ",TipoRecurso.tipo_recurso_id);
              TipoRecurso.tipo_recurso_nombre = tipo_recurso_actualizar.tipo_recurso_nombre;
              TipoRecurso.tipo_recurso_descripcion = tipo_recurso_actualizar.tipo_recurso_descripcion;

              TipoRecurso.tipo_recurso_estado = tipo_recurso_actualizar.tipo_recurso_estado;
      
              let n_recurso = [];
              console.log("ACTUALIZAR: ",tipo_recurso_actualizar);
              
              tipo_recurso_actualizar.recurso.map(recurso_it=>{
                let recurso = {id_recurso:recurso_it.id_recurso, nombre_recurso:recurso_it.nombre_recurso,descripcion_recurso:recurso_it.descripcion_recurso};
                n_recurso.push(recurso);
              });
              console.log("N_RECURSO: ",n_recurso);
      
              TipoRecurso.recurso=n_recurso;
          }
          n_lista.push(TipoRecurso);

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
                  <b>Gestión de Tipos de Recursos </b></h4>
                    <br/>
                    <Row>
                    <Col md={4} xs={12}>
                        <NuevoTipoRecurso 
                            cambioDatos={_cambiosEnTipoRecurso}
                            listaRecurso={props.state.listaRecurso}
                        />
                    </Col>
                  </Row>

                  <Row>
                      <Col md={12} xs={12}>
                            <DataTable datosTabla={props.state.filasListaTipoRecursoActivos} columnasTabla={columnasTabla}
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
      state: reducers.TipoRecursoReducer
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return{
        setTipoRecurso: (datos) =>dispatch(setListaTipoRecurso(datos)),
        setListaTipoRecurso: (datos) =>dispatch(setListaTipoRecurso(datos)),
        setListaRecurso: (datos) =>dispatch(setListaRecurso(datos)),
        setFilasListaTipoRecursoActivos: (datos) =>dispatch(setFilasListaTipoRecursoActivos(datos)),
        setFilasListaTipoRecursoInactivos: (datos) =>dispatch(setFilasListaTipoRecursoInactivos(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TipoRecurso);


