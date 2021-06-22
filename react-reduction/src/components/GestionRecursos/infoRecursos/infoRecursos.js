import React, { Fragment, useEffect, useState } from "react"

import { 
  Button,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  FormGroup
} from "reactstrap"

import Cookies from 'js-cookie';
import { FaEye, FaPencilAlt } from 'react-icons/fa';

import superagent from 'superagent';

//Componentes
import NuevoRecurso from '../NuevoRecurso/NuevoRecurso';
import DataTable from '../../DataTable/DataTable';
import SwitchRecursoActivo from '../SwitchRecursoActivo/SwitchRecursoActivo';

//jsons de prueba
import listRecursos from '../Json/listRecursos.json';

//apiTypes
import{
    API_RECURSOS_REGISTRADOS,
}from '../../../api/apiTypes';


// Redux
import { connect } from "react-redux";

//actions
import {
  setListaRecursos,
  setFilasListaRecursosActivos,
  setFilasListaRecursosInactivos
} from '../../../store/actions'

//columnas -tabla recursos
import {columnasTablaRecurso} from '../Json/columnasTablaRecursos';


//Componentes
const GestionRecursos = props =>{

  const[listaRecursos, setListaRecursos] = useState([]);
  const[filasListaRecurso, setFilasListaRecurso] =useState([]);
  const[rutas, setRutas]=useState([]);

  //Ciclo de vida
  useEffect(()=>{
      _obtenerServicios(listRecursos);
  },[])

  useEffect(()=>{
          //console.log("vino aqui");
       setListaRecursos(props.state.listaRecursos);
    let result =  _crearFilasListaRecurso();
  },[props.state.listaRecursos]) 

  useEffect(()=>{
    //   console.log("valor de filas detectadas: ", props.state.filasListaRecursosActivos)
      const _setearFilas =async()=>{
          await setFilasListaRecurso(props.state.filaslistaRecursosActivos);
      }
      _setearFilas();
  },[props.state.filasListaRecursosActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
  //Fin ciclo de vida



  //Función que simula la inicialización de servicios.
  const _obtenerServicios=async(listaRecursos)=>{
      /* simulando la llamada a un servicio */
      //console.log("valor del JSON en el llamado: ", listaRecursos);
      let token= Cookies.get('token');
     
      let respuesta_recursos = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_RECURSOS_REGISTRADOS)
                                                .set('Accept', 'application/json')
                                                .set("Authorization", "Bearer " + token);
     //let {lista_recursos} = respuesta_recursos.body;
    //  console.log("Respuesta: ", respuesta_recursos.body);

      //await props.setListaRecursos(listaRecursos);
      await props.setListaRecursos(respuesta_recursos.body);
      
     
  }
  //Función que llama a los recursos en el servidor.
  const _obtenerRecursos = async() =>{
      //console.log("valor del JSON en el llamado: ", listaRecursos);
      let token= Cookies.get('token');

      let respuesta_recursos = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_RECURSOS_REGISTRADOS)
                .set('Accept', 'application/json')
                .set("Authorization", "Bearer " + token);
        //let {lista_recursos} = respuesta_recursos.body;
        // console.log("Respuesta: ", respuesta_recursos.body);
      
        //await props.setListaRecursos(listaRecursos);
        await props.setListaRecursos(respuesta_recursos.body);
  }

  //Función que sirve de puerto en cambios obtenidos por componentes hijos.
  const _cambiosEnRecursos =({tipo, valor})=>{
      //console.log("vino al cambio usuarios con: ", tipo);
      switch(tipo){
          case 'actualizarListaRecursos':
                 //let nuevas_filas= _cambiarActivoJsonRecursos(valor.id_recurso);
                  //console.log("volvio");
                  _obtenerRecursos();
              break;
          case 'agregarRecursoLista':
                  let nueva_lista =_agregarRecursoALista(valor);
                  //console.log("lo que devolvio: ", nueva_lista);
                  _obtenerRecursos(nueva_lista);
              break;
          case 'editarRecursoLista':
              //console.log(valor, "deeee");
                  let lista_actualizada =_actualizarRecurso(valor);
                  //console.log("lo devuelto: ", lista_actualizada);
                  _obtenerRecursos(lista_actualizada);
              break;

          default:
              break;
      }
  }

  //Función que crea las filas a partir de la lista de usuarios optenida.
  const _crearFilasListaRecurso=async()=>{
      //console.log("detecto el cambio");

      let filas=[];
      if (props.state.listaRecursos.length !=0){

        let rutas=[];
        for(let recurso of props.state.listaRecursos)
        {
            let { ruta_recurso, id_recurso } = recurso;
            let ruta={ruta_recurso, id_recurso}
            rutas.push(ruta)
        }

        setRutas(rutas);

        props.state.listaRecursos.map(recurso=>{

            let {id_recurso,
                nombre_recurso, 
                descripcion_recurso, 
                fecha_creacion_recurso, 
                recurso_activo,
                ruta_recurso,
                tipo_recurso } = recurso;

                if(recurso_activo == 1)
                {
                    recurso_activo=true;
                }
                else{
                    recurso_activo=false;
                }

            //console.log("funciona ya alv ");
            let fila ={};
            fila.id_recurso = id_recurso;
            fila.nombre_recurso=nombre_recurso;
            fila.descripcion_recurso = descripcion_recurso;
            fila.fecha_creacion_recurso = fecha_creacion_recurso;
            fila.ruta_recurso = ruta_recurso;
            fila.tipo_recurso = tipo_recurso.nombre_tipo_recurso;

            // fila.

            fila.recurso_activo = (
                <div>
                    <SwitchRecursoActivo
                        id_recurso={id_recurso}
                        recurso_activo={recurso_activo}
                        cambioEnRecursos={_cambiosEnRecursos}
                    />
                </div>
            );
            fila.operaciones="Coming soon";
                let defaultValues={
                    idRecurso:id_recurso,
                    nombreRecurso: nombre_recurso,
                    descripcionRecurso: descripcion_recurso,
                    recursoActivo: recurso_activo,
                    tipo_recurso,
                    ruta_recurso

                }
            fila.operaciones=(
                < FormGroup>

                <NuevoRecurso
                    isReadOnly={true}
                    defaultValue={defaultValues}
                    classNames={"btn-success btn-sm "}
                    mensajeBoton={<FaEye />}
                    rutas={rutas}
                />{' '}
                <NuevoRecurso 
                    defaultValue={defaultValues}
                    classNames={"btn-danger btn-sm "}
                    mensajeBoton={<FaPencilAlt />}
                    isEditable={true}
                    cambioDatos={_cambiosEnRecursos}
                    rutas={rutas}
                />

                </FormGroup>
            )
            //console.log("Fila antes del push");
            // console.log(fila);
            filas.push(fila);
      })
        //console.log("Revisando valor de filas");
        // console.log(filas);
        props.setFilasListaRecursosActivos(filas);
    }

  }

  //Función que simula los cambios de estado en los usuarios en el servidor. -temporal.
  const _cambiarActivoJsonRecursos=(id_recurso)=>{
      //console.log("vino al cambio JSOn");
      let nueva_lista_recursos=[];
      props.state.listaRecursos.map(recurso=>{
          let recurso_it = {...recurso};
          if(recurso_it.id_recurso == id_recurso)
          {
              let activo = recurso_it.recurso_activo;

              if(activo == 0)
              {
                  activo =1;
              }
              else
              {
                  activo =0;
              }
              recurso_it.recurso_activo = activo;
          }
          nueva_lista_recursos.push(recurso_it);
         

      });
      
      //console.log("nuevo valor del JSOn ", listRecursos);
      return nueva_lista_recursos
      //listRecursos
      /* comente las lineas donde clonaba el objeto porque no estoy modificando el store invalidamente, solo el JSOn de prueba. */
  }

  //Función que simula el añadir el usuario obtenido para anexarlo al JSON - temporal.
  const _agregarRecursoALista = (nuevo_recurso)=>{
      console.log("el uevo ", nuevo_recurso);

      let { listaRecursos } = props.state;

      let n_lista = [];

      listaRecursos.map(recurso_it =>{
          let recurso = {...recurso_it};
          n_lista.push(recurso);

      });

      let recurso ={};
      recurso.id_recurso = listaRecursos.length + 1;
      recurso.nombre_recurso = nuevo_recurso.nombre_recurso;
      recurso.descripcion_recurso = nuevo_recurso.descripcion_recurso;
      recurso.fecha_creacion_recurso = "hoy";
      recurso.recurso_activo = nuevo_recurso.recurso_activo;


      n_lista.push(recurso);
      //console.log("la lista antes de ingresar ", n_lista);
    return n_lista;

  };

  //Función que simula la actualización en la data de un usuario.
  const _actualizarRecurso = (recurso_actualizar)=>{

      let { listaRecursos } = props.state;

      let n_lista = [];

      listaRecursos.map(recurso_it =>{
          let recurso = {...recurso_it};

          if(recurso.id_recurso == recurso_actualizar.id_recurso)
          {
              //console.log("coincidencia: ",usuario.id_recurso);
              recurso.nombre_recurso = recurso_actualizar.nombre_recurso;
              recurso.descripcion_recurso = recurso_actualizar.descripcion_recurso;
              recurso.fecha_creacion_recurso = "hoy";
              recurso.recurso_activo = recurso_actualizar.recurso_activo;
      
          }
          n_lista.push(recurso);

      });

     
    return n_lista;
  }

  return(
      <React.Fragment>
      <div className="page-content">
      <Container fluid={true}>
      <Card>
              <CardBody>
                <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestión de Recursos </h4><br/>

                <Row>
                  <Col md={4} xs={12}>
                      <NuevoRecurso 
                          cambioDatos={_cambiosEnRecursos}
                          rutas={rutas}

                      />
                  </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12}>
                           <DataTable datosTabla={props.state.filasListaRecursosActivos} columnasTabla={columnasTablaRecurso}
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
    state: reducers.gestionRecursosReducer
  }
}

const mapDispatchToProps = dispatch =>{
  return{
      setListaRecursos: (datos) =>dispatch(setListaRecursos(datos)),
      setFilasListaRecursosActivos: (datos) =>dispatch(setFilasListaRecursosActivos(datos)),
      setFilasListaRecursosInactivos: (datos) =>dispatch(setFilasListaRecursosInactivos(datos))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(GestionRecursos);
