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
     
      await props.setListaPermisos(listaPermisos);
      await props.setListaRoles(listaRoles);
         
  }

    //Función que llama a los roles en el servidor.
    const _obtenerRoles = async(listaRoles) =>{
      //console.log("valor del JSON en el llamado: ", listaRoles);
      await props.setListaRoles(listaRoles);
  }

    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnRoles =({tipo, valor})=>{
      //console.log("vino al cambio roles con: ", tipo);
      switch(tipo){
        case 'actualizarListaRoles':
             let nuevas_filas= _cambiarActivoJsonRoles(valor.id_rol);
              //console.log("volvio");
              _obtenerRoles(nuevas_filas);
          break;
        case 'agregarRolLista':
              let nueva_lista =_agregarRolALista(valor);
              //console.log("lo que devolvio: ", nueva_lista);
              _obtenerRoles(nueva_lista);
          break;
        case 'editarRolLista':
          //console.log(valor, "de");
              let lista_actualizada =_actualizarRol(valor);
              //console.log("lo devuelto: ", lista_actualizada);
              _obtenerRoles(lista_actualizada);
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
              descripcion_rol, 
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
          fila.descripcion_rol = descripcion_rol;
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
          fila.operaciones_rol="Operaciones";
              let defaultValues={
                  idRol:id_rol,
                  nombreRol: nombre_rol,
                  descripcionRol: descripcion_rol,
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

    //Función que simula los cambios de estado en los roles en el servidor. -temporal.
    const _cambiarActivoJsonRoles=(id_rol)=>{
    //console.log("vino al cambio JSOn");
    let nueva_lista_roles=[];
    props.state.listaRoles.map(rol=>{
      let rol_it = {...rol};
      if(rol_it.id_rol == id_rol)
      {
          let activo = rol_it.rol_activo;

          if(activo == 0)
          {
              activo =1;
          }
          else
          {
              activo =0;
          }
          rol_it.rol_activo = activo;
      }
      nueva_lista_roles.push(rol_it);
     

    });
  
    //console.log("nuevo valor del JSOn ", listRoles);
    return nueva_lista_roles
    //ListRoles
    /* se comento las lineas donde se clonaba el objeto porque no se esta modificando el store invalidamente, solo el JSOn de prueba. */
}

    //Función que simula el añadir el rol obtenido para anexarlo al JSON - temporal.
    const _agregarRolALista = (nuevo_rol)=>{
      console.log("el nuevo ", nuevo_rol);

      let { listaRoles } = props.state;

      let n_lista = [];

      listaRoles.map(rol_it =>{
          let rol = {...rol_it};
          n_lista.push(rol);

      });

      let rol ={};
      rol.id_rol = listaRoles.length + 1;
      rol.nombre_rol = nuevo_rol.nombre_rol;
      rol.descripcion_rol = nuevo_rol.descripcion_rol;
      rol.fecha_rol = "hoy";
      rol.rol_activo = nuevo_rol.rol_activo;
      // rol.permisos=nuevo_rol.permisos;

      let n_permisos = [];
      nuevo_rol.permisos.map(permiso_it=>{
          let permiso = {id_rol:permiso_it.id_rol, nombre_rol:permiso_it.nombre_rol};
          n_permisos.push(permiso);
      });

      rol.permisos=n_permisos; 

      n_lista.push(rol);
      //console.log("la lista antes de ingresar ", n_lista);
    return n_lista;

    };

    //Función que simula la actualización en la data de un rol.
    const _actualizarRol = (rol_actualizar)=>{

      let { listaRoles } = props.state;

      let n_lista = [];

      listaRoles.map(rol_it =>{
          let rol = {...rol_it};

          if(rol.id_rol == rol_actualizar.id_rol)
          {
              //console.log("coincidencia: ",rol.id_rol);
              rol.nombre_rol = rol_actualizar.nombre_rol;
              rol.descripcion_rol = rol_actualizar.descripcion_rol;
              rol.fecha_rol = "hoy";
              rol.rol_activo = rol_actualizar.rol_activo;

              let n_permisos = [];
                rol_actualizar.permisos.map(permiso_it=>{
                    let permiso = {id_rol:permiso_it.id_rol, nombre_rol:permiso_it.nombre_rol};
                    n_permisos.push(permiso);
                });
        
                rol.permisos=n_permisos; 
          }
          n_lista.push(rol);

      });

     
      return n_lista;
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