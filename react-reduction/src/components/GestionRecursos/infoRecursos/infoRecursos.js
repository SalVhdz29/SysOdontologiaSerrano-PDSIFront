import React, { useEffect, useState } from "react"

import { 
  Button,
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap"

import Cookies from 'js-cookie';

//Componentes
import NuevoRecurso from './NuevoRecurso/NuevoRecurso';
import DataTable from '../../DataTable/DataTable';
import SwitchRecursoActivo from './switchRecursoActivo/SwitchRecursoActivo';

//jsons de prueba
import listRecursos from './Json/listRecursos.json';

// Redux
import { connect } from "react-redux";

//actions
import {
  setListaRecursos,
  setFilasListaRecursosActivos,
  setFilasListaRecursosInactivos
} from '../../store/actions'

//columnas -tabla recursos
import {columnasTablaRecurso} from './Json/columnasTablaRecursos';

const GestionRecursos = props =>{

  const[listaRecursos, setListaRecursos] = useState([]);
  const[filasListaRecurso, setFilasListaRecurso] =useState([]);

  useEffect(()=>{
      _obtenerListaRecursos(listRecursos);
  },[])

  useEffect(()=>{
          console.log("vino aqui");
       setListaRecursos(props.state.listaRecursos);
    let result =  _crearFilasListaRecurso();
  },[props.state.listaRecursos])

  useEffect(()=>{
      console.log("valor de filas detectadas: ", props.state.filasListaRecursosActivos)
      const _setearFilas =async()=>{
          await setFilasListaRecurso(props.state.filasListaRecursosActivos);
      }
      _setearFilas();
  },[props.state.filasListaRecursosActivos])

  const _obtenerListaRecursos=async(lista)=>{
    /* simulando la llamada a un servicio */
    console.log("valor del JSON en el llamado: ", lista);
    await props.setListaRecursos(lista);
   
}

  const _cambiosEnRecursos =({tipo, valor})=>{
    console.log("vino al cambio recurso");
    switch(tipo){
        case 'actualizarListaRecursos':
              let nuevas_filas= _cambiarActivoJsonRecurso(valor.id_recurso);
                console.log("volvio");
                _obtenerListaRecursos(nuevas_filas);
            break;
        case 'agregarRecursoLista':
                let nueva_lista =_agregarRecursoALista(valor);
                console.log("lo que devolvio: ", nueva_lista);
                _obtenerListaRecursos(nueva_lista);
            break;
        default:
            break;
    }
  }

   //función que crea las filas a partir de la lista de recursos optenida.
   const _crearFilasListaRecurso=async()=>{
    console.log("detecto el cambio");

    let filas=[];

    props.state.listaRecursos.map(recurso=>{

        let {id_recurso,
            nombre_recurso, 
            descripcion_recurso, 
            fecha_creacion_recurso, 
            recurso_activo } = recurso;

            if(recurso_activo == 1)
            {
              recurso_activo=true;
            }
            else{
              recurso_activo=false;
            }


        let fila ={};
        fila.id_recurso = id_recurso;
        fila.nombre_recurso=nombre_recurso;
        fila.descripcion_recurso = descripcion_recurso;
        fila.fecha_creacion_recurso = fecha_creacion_recurso;
        fila.recurso_activo = (
            <div>
                <SwitchRecursoActivo
                    id_recurso={id_recurso}
                    recurso_activo={recurso_activo}
                    _cambiosEnRecursos={_cambiosEnRecursos}
                />
            </div>
        );
        fila.operaciones="Coming soon";
        filas.push(fila);
    })
     props.setFilasListaRecursosActivos(filas);
}

//funcion que simula los cambios de estado en los recursos en el servidor. -temporal.
const _cambiarActivoJsonRecurso=(id_recurso)=>{
  console.log("vino al cambio JSOn");
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
  
  console.log("nuevo valor del JSOn ", listRecursos);
  return nueva_lista_recursos

  //listRecursos
  /* comente las lineas donde clonaba el objeto porque no estoy modificando el store invalidamente, solo el JSOn de prueba. */
}



    //función que simula el añadir el recurso obtenido para anexarlo al JSON - temporal.
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
      console.log("la lista antes de ingresar ", n_lista);
    return n_lista;

  };

    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestion de Recursos </h4><br/>
                  
                  <Row>
                    <Col md={4} xs={12}>
                        <NuevoRecurso cambioDatos={_cambiosEnRecursos} />
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