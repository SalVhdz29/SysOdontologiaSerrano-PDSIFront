import React, {Fragment, useEffect, useState } from "react"

import { 
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
import superagent from 'superagent';

//ApiTypes
import {
  API_LISTA_ROL_REGISTRADOS,
  API_CAMBIAR_ESTADO_ROL,
  API_LISTA_ROLES_PERMISO,
  API_CREAR_ROL,
  API_ACTUALIZAR_ROL
} from '../../api/apiTypes';


//Iconos
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import {GrConfigure } from 'react-icons/gr';


//Componentes
import DataTable from '../DataTable/DataTable';
import NuevoRol from './NuevoRol/NuevoRol';
import SwitchRolActivo from './SwitchRolActivo/SwitchRolActivo';

//Json
import ListRoles from './Json/ListRoles.json';
import listPermisos from './Json/listPermisos.json';

//Columnas de tabla de roles
import {ColumnasTablaRol} from './Json/ColumnasTablaRol';

// Redux
import { connect } from "react-redux";

//actions
import {
  setListaRoles,
  setListaPermisos,
  setFilasListaRolesActivos,
  setFilasListaRolesInactivos
} from '../../store/actions'

const GestionRoles = props =>{

    const[listaRoles, setListaRoles] = useState([]);
    const[filasListaRoles, setFilasListaRoles] =useState([]);

    //Ciclo de vida
    useEffect(()=>{
      _obtenerServicios(ListRoles, listPermisos);
      },[])

    useEffect(()=>{
      //console.log("vino aqui");
        setListaRoles(props.state.listaRoles);
        let result =  _crearFilasListaRol();
        },[props.state.listaRoles]) //detecta cambios en la lista de roles en el reducer y vuelve a formar las filas.

    useEffect(()=>{
      //console.log("valor de filas detectadas: ", props.state.filasListaRolesActivos)
    const _setearFilas =async()=>{
      await setFilasListaRoles(props.state.filasListaRolesActivos);
      }
      _setearFilas();
      },[props.state.filasListaRolesActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
    //Fin ciclo de vida

    //Función que simula la inicialización de servicios.
    const _obtenerServicios=async(listaRoles, listaPermisos)=>{
      /* simulando la llamada a un servicio */
      //console.log("valor del JSON en el llamado: ", listaRoles);
     
      let token = Cookies.get('token');
      
      let respuesta_roles = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_ROL_REGISTRADOS)
              .set('accept', 'application/json')
              .set("authorization", "Bearer " + token);

     // console.log("La respuesta: ", respuesta_roles.body);

      await props.setListaRoles(respuesta_roles.body);

         
  }

    //Función que llama a los roles en el servidor.
    const _obtenerRoles = async() =>{
      //console.log("valor del JSON en el llamado: ", listaRoles);

      let token = Cookies.get('token');

      let respuesta_roles = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_ROL_REGISTRADOS)
              .set('accept', 'application/json')
              .set("authorization", "Bearer " + token);

      console.log("La respuesta: ", respuesta_roles.body);

      await props.setListaRoles(respuesta_roles.body);
      //await props.setListaRoles(listaRoles);
  }

    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnRoles =({tipo, valor})=>{
      //console.log("vino al cambio roles con: ", tipo);
      switch(tipo){
        case 'actualizarListaRoles':
              _obtenerRoles();
          break;
        case 'agregarRolLista':
              _obtenerRoles();
          break;
        case 'editarRolLista':
          //console.log(valor, "de");
              _obtenerRoles();
          break;

      default:
          break;
  }
}

    //Función que crea las filas a partir de la lista de roles obtenida.
    const _crearFilasListaRol=async()=>{
      //console.log("detecto el cambio");

      let filas=[];

      props.state.listaRoles.map(rol=>{

          let {id_rol,
              nombre_rol, 
              descripcion, 
              fecha_rol, 
              operaciones_rol,
              rol_activo,
              permisos
              } = rol;

              if(rol_activo == 1)
              {
                rol_activo=true;
              }
              else{
                rol_activo=false;
              }


          let fila ={};
          fila.id_rol = id_rol;
          fila.nombre_rol=nombre_rol;
          fila.descripcion_rol = descripcion;
          fila.fecha_rol = fecha_rol;

          fila.rol_activo = (
              <div>
                  <SwitchRolActivo
                      id_rol={id_rol}
                      rol_activo={rol_activo}
                      cambioEnRoles={_cambiosEnRoles}
                  />
              </div>
          ); 
          if(permisos != undefined )
          {

          
          fila.permisos=(
            <ul>
                {permisos.map(permiso => {
                    return(
                  <li>{permiso.nombre_rol}</li>
                  )
                })
                }

            </ul>
        ) 
      }
          fila.operaciones_rol="Operaciones";
              let defaultValues={
                  idRol:id_rol,
                  nombreRol: nombre_rol,
                  descripcionRol: descripcion,
                  rolActivo: rol_activo,
                  permisos: permisos
              }
          fila.operaciones_rol=(
              <FormGroup>

              <NuevoRol
                  isReadOnly={true}
                  defaultValue={defaultValues}
                  classNames={"btn-success btn-sm "}
                  isEditable={false}
                  mensajeBoton={<FaEye />}
              />{' '}
              <NuevoRol 
                  defaultValue={defaultValues}
                  classNames={"btn-danger btn-sm "}
                  mensajeBoton={<FaPencilAlt />}
                  isEditable={true}
                  cambioDatos={_cambiosEnRoles}
              />

              </FormGroup>
          )
          filas.push(fila);
      })
       props.setFilasListaRolesActivos(filas);


    }


    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestion de Roles </h4><br/>
                  <Row>
                  <Col md={4} xs={12}> 
                        <NuevoRol 
                        cambioDatos={_cambiosEnRoles}
                        /> 
                    </Col> 
                  </Row>
                  <Row>
                    <Col md={12} xs={12}> 
                      <DataTable datosTabla={props.state.filasListaRolesActivos} columnasTabla={ColumnasTablaRol}/>
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
    state: reducers.gestionRolesReducer
  }
}

const mapDispatchToProps = dispatch =>{
  return{
      setListaRoles: (datos) =>dispatch(setListaRoles(datos)),
      setListaPermisos: (datos) =>dispatch(setListaPermisos(datos)),
      setFilasListaRolesActivos: (datos) =>dispatch(setFilasListaRolesActivos(datos)),
      setFilasListaRolesInactivos: (datos) =>dispatch(setFilasListaRolesInactivos(datos)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (GestionRoles);