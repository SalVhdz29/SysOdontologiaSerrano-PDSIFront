//librerias
import React, { Fragment, useEffect, useState } from "react"

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

import { FaEye, FaPencilAlt } from 'react-icons/fa';
import {GrConfigure } from 'react-icons/gr';

import Cookies from 'js-cookie';

import superagent from 'superagent';

//Componentes
import NuevoUsuario from './NuevoUsuario/NuevoUsuario';
import DataTable from '../DataTable/DataTable';
import SwitchUsuarioActivo from './switchUsuarioActivo/SwitchUsuarioActivo';

//jsons de prueba
import listUsuarios from './Json/listUsuarios.json';
import listEmpleados from './Json/listEmpleados.json';
import listRoles from './Json/listRoles.json';

//apiTypes
import {
    API_LISTA_USUARIO_REGISTRADOS,
    API_LISTA_USUARIO_ROLES,
    API_LISTA_EMPLEADOS_ACTIVOS
} from '../../api/apiTypes';

// Redux
import { connect } from "react-redux";

//actions
import {
    setListaUsuarios,
    setListaEmpleados,
    setListaRoles,
    setFilasListaUsuariosActivos,
    setFilasListaUsuariosInactivos
} from '../../store/actions'

//columnas -tabla usuarios
import {columnasTablaUsuario} from './Json/columnasTablaUsuarios';




//Componentes
const GestionUsuarios = props =>{

    const[listaUsuarios, setListaUsuarios] = useState([]);
    const[filasListaUsuario, setFilasListaUsuario] =useState([]);
    const[listaEmpleados, setListaEmpleados] = useState([]);
    const [correos, setCorreos] = useState([]);

    //Ciclo de vida
    useEffect(()=>{
        _obtenerServicios(listUsuarios, listEmpleados, listRoles);
    },[])

    useEffect(()=>{
            //console.log("vino aqui");
         setListaUsuarios(props.state.listaUsuarios);
      let result =  _crearFilasListaUsuario();
    },[props.state.listaUsuarios]) //detecta cambios en la lista de usuarios en el reducer y vuelve a formar las filas.

    useEffect(()=>{
        //console.log("valor de filas detectadas: ", props.state.filasListaUsuariosActivos)
        const _setearFilas =async()=>{
            await setFilasListaUsuario(props.state.filasListaUsuariosActivos);
        }
        _setearFilas();
    },[props.state.filasListaUsuariosActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
    //Fin ciclo de vida

    //Función que simula la inicialización de servicios.
    const _obtenerServicios=async(listUsuarios, listaEmpleados,listaRoles)=>{
        /* simulando la llamada a un servicio */
        //console.log("valor del JSON en el llamado: ", listaUsuarios);
        let token= Cookies.get('token');

        
        let respuesta_empleados = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_EMPLEADOS_ACTIVOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
    
        console.log("la respuesta: ", respuesta_empleados.body);

        await props.setListaEmpleados(respuesta_empleados.body);

        
        let respuesta_roles = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_USUARIO_ROLES)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
    
        console.log("la respuesta: ", respuesta_roles.body);


        await props.setListaRoles(respuesta_roles.body);

        let respuesta_usuarios = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_USUARIO_REGISTRADOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
        //let {lista_usuarios} = respuesta_usuarios.body;
        console.log("la respuesta: ", respuesta_usuarios.body);
 
        //await props.setListaUsuarios(listaUsuarios);
        await props.setListaUsuarios(respuesta_usuarios.body);
        
       
    }
    //Función que llama a los usuarios en el servidor.
    const _obtenerUsuarios = async() =>{
        //console.log("valor del JSON en el llamado: ", listaUsuarios);
        let token= Cookies.get('token');

        let respuesta_usuarios = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_USUARIO_REGISTRADOS)
                .set('Accept', 'application/json')
                .set("Authorization", "Bearer " + token);
        //let {lista_usuarios} = respuesta_usuarios.body;
        console.log("la respuesta: ", respuesta_usuarios.body);

        //await props.setListaUsuarios(listaUsuarios);
        await props.setListaUsuarios(respuesta_usuarios.body);
 
    }

    //Funcion que llama a los empleados activos sin usuario en el servidor.
    const _obtenerEmpleados = async() =>{
        let token= Cookies.get('token');

        let respuesta_empleados = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_EMPLEADOS_ACTIVOS)
        .set('Accept', 'application/json')
        .set("Authorization", "Bearer " + token);

        console.log("la respuesta: ", respuesta_empleados.body);

        await props.setListaEmpleados(respuesta_empleados.body);
    }

    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnUsuarios =({tipo, valor})=>{
      
        switch(tipo){
            case 'actualizarListaUsuarios':
                  
                    _obtenerUsuarios();
                break;
            case 'actualizarListaEmpleados':
                _obtenerEmpleados();
                break;
            case 'agregarUsuarioLista':
                    let nueva_lista =_agregarUsuarioALista(valor);
                 
                    _obtenerUsuarios(nueva_lista);
                break;
            case 'editarUsuarioLista':
                
                    let lista_actualizada =_actualizarUsuario(valor);
        
                    _obtenerUsuarios(lista_actualizada);
                break;

            default:
                break;
        }
    }

    //Función que crea las filas a partir de la lista de usuarios optenida.
    const _crearFilasListaUsuario=async()=>{
        

        let filas=[];
        if(props.state.listaUsuarios.length != 0)
        {
            let correos=[];
            for(let usuario of props.state.listaUsuarios)
            {
                let { correo_electronico, id_usuario } = usuario;
                let correo={correo_electronico, id_usuario}
                correos.push(correo)
            }
    
            setCorreos(correos);

       
            props.state.listaUsuarios.map(usuario=>{

                let {id_usuario,
                    nombre_usuario, 
                    id_f_empleado, 
                    nombre_empleado, 
                    correo_electronico, 
                    fecha_creacion, 
                    usuario_activo,
                    roles } = usuario;

                    if(usuario_activo == 1)
                    {
                        usuario_activo=true;
                    }
                    else{
                        usuario_activo=false;
                    }


                let fila ={};
                fila.id_usuario = id_usuario;
                fila.nombre_usuario=nombre_usuario;
                //fila.id_empleado = id_f_empleado;
                fila.nombre_empleado= nombre_empleado;
                fila.correo_electronico = correo_electronico;
                fila.fecha_creacion = fecha_creacion;

                // fila.
                fila.roles=(
                    <ul>
                        {roles.map(rol => {
                            return(
                        <li>{rol.nombre_usuario}</li>
                        )
                        })
                        }

                    </ul>
                )

                fila.usuario_activo = (
                    <div>
                        <SwitchUsuarioActivo
                            id_usuario={id_usuario}
                            usuario_activo={usuario_activo}
                            cambioEnUsuarios={_cambiosEnUsuarios}
                        />
                    </div>
                );
                fila.operaciones="Coming soon";
                    let defaultValues={
                        idUsuario:id_usuario,
                        nombreUsuario: nombre_usuario,
                        empleado:{label:nombre_empleado, value:id_f_empleado},
                        correoElectronico: correo_electronico,
                        usuarioActivo: usuario_activo,
                        roles:roles
                    }
                fila.operaciones=(
                    < FormGroup>

                    <NuevoUsuario
                        isReadOnly={true}
                        defaultValue={defaultValues}
                        classNames={"btn-success btn-sm "}
                        mensajeBoton={<FaEye />}
                        correos={correos}
                    />{' '}
                    <NuevoUsuario 
                        defaultValue={defaultValues}
                        classNames={"btn-danger btn-sm "}
                        mensajeBoton={<FaPencilAlt />}
                        isEditable={true}
                        cambioDatos={_cambiosEnUsuarios}
                        correos={correos}
                    />

                    </FormGroup>
                )
                filas.push(fila);
            })

        }
         props.setFilasListaUsuariosActivos(filas);


    }

    //Función que simula los cambios de estado en los usuarios en el servidor. -temporal.
    const _cambiarActivoJsonUsuarios=(id_usuario)=>{
        //console.log("vino al cambio JSOn");
        let nueva_lista_usuarios=[];
        props.state.listaUsuarios.map(usuario=>{
            let usuario_it = {...usuario};
            if(usuario_it.id_usuario == id_usuario)
            {
                let activo = usuario_it.usuario_activo;

                if(activo == 0)
                {
                    activo =1;
                }
                else
                {
                    activo =0;
                }
                usuario_it.usuario_activo = activo;
            }
            nueva_lista_usuarios.push(usuario_it);
           

        });
        
        //console.log("nuevo valor del JSOn ", listUsuarios);
        return nueva_lista_usuarios
        //listUsuarios
        /* comente las lineas donde clonaba el objeto porque no estoy modificando el store invalidamente, solo el JSOn de prueba. */
    }

    //Función que simula el añadir el usuario obtenido para anexarlo al JSON - temporal.
    const _agregarUsuarioALista = (nuevo_usuario)=>{
        console.log("el uevo ", nuevo_usuario);

        let { listaUsuarios } = props.state;

        let n_lista = [];

        listaUsuarios.map(usuario_it =>{
            let usuario = {...usuario_it};
            n_lista.push(usuario);

        });

        let usuario ={};
        usuario.id_usuario = listaUsuarios.length + 1;
        usuario.id_f_empleado = nuevo_usuario.id_f_empleado
        usuario.nombre_empleado = nuevo_usuario.nombre_empleado
        usuario.nombre_usuario = nuevo_usuario.nombre_usuario;
        usuario.correo_electronico = nuevo_usuario.correo_electronico;
        usuario.fecha_creacion = "hoy";
        usuario.usuario_activo = nuevo_usuario.usuario_activo;
        // usuario.roles=nuevo_usuario.roles;

        let n_roles = [];
        nuevo_usuario.roles.map(rol_it=>{
            let rol = {id_usuario:rol_it.id_usuario, nombre_usuario:rol_it.nombre_usuario};
            n_roles.push(rol);
        });

        usuario.roles=n_roles;

        n_lista.push(usuario);
        //console.log("la lista antes de ingresar ", n_lista);
      return n_lista;

    };

    //Función que simula la actualización en la data de un usuario.
    const _actualizarUsuario = (usuario_actualizar)=>{

        let { listaUsuarios } = props.state;

        let n_lista = [];

        listaUsuarios.map(usuario_it =>{
            let usuario = {...usuario_it};

            if(usuario.id_usuario == usuario_actualizar.id_usuario)
            {
                //console.log("coincidencia: ",usuario.id_usuario);
                usuario.nombre_empleado = usuario_actualizar.nombre_empleado
                usuario.nombre_usuario = usuario_actualizar.nombre_usuario;
                usuario.correo_electronico = usuario_actualizar.correo_electronico;
                usuario.fecha_creacion = "hoy";
                usuario.usuario_activo = usuario_actualizar.usuario_activo;
        
                let n_roles = [];
                usuario_actualizar.roles.map(rol_it=>{
                    let rol = {id_usuario:rol_it.id_usuario, nombre_usuario:rol_it.nombre_usuario};
                    n_roles.push(rol);
                });
        
                usuario.roles=n_roles;
            }
            n_lista.push(usuario);

        });

       
      return n_lista;
    }

    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestión de Usuarios </h4><br/>

                  <Row>
                    <Col md={4} xs={12}>
                        <NuevoUsuario 
                            cambioDatos={_cambiosEnUsuarios}
                            listaEmpleados={props.state.listaEmpleados}
                            correos={correos}
                        />
                    </Col>
                  </Row>
                  <Row>
                      <Col md={12} xs={12}>
                             <DataTable datosTabla={props.state.filasListaUsuariosActivos} columnasTabla={columnasTablaUsuario}
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
      state: reducers.gestionUsuariosReducer
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return{
        setListaUsuarios: (datos) =>dispatch(setListaUsuarios(datos)),
        setListaEmpleados: (datos) =>dispatch(setListaEmpleados(datos)),
        setListaRoles: (datos) =>dispatch(setListaRoles(datos)),
        setFilasListaUsuariosActivos: (datos) =>dispatch(setFilasListaUsuariosActivos(datos)),
        setFilasListaUsuariosInactivos: (datos) =>dispatch(setFilasListaUsuariosInactivos(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GestionUsuarios);
