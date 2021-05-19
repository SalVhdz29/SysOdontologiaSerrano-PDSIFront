//librerias
import React, { useEffect, useState } from "react"

import { 
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
import NuevoUsuario from './NuevoUsuario/NuevoUsuario';
import DataTable from '../DataTable/DataTable';
import SwitchUsuarioActivo from './switchUsuarioActivo/SwitchUsuarioActivo';

//jsons de prueba
import listUsuarios from './Json/listUsuarios.json';


// Redux
import { connect } from "react-redux";

//actions
import {
    setListaUsuarios,
    setFilasListaUsuariosActivos,
    setFilasListaUsuariosInactivos
} from '../../store/actions'

//columnas -tabla usuarios
import {columnasTablaUsuario} from './Json/columnasTablaUsuarios';




const GestionUsuarios = props =>{

    const[listaUsuarios, setListaUsuarios] = useState([]);
    const[filasListaUsuario, setFilasListaUsuario] =useState([]);

    useEffect(()=>{
        _obtenerListaUsuarios(listUsuarios);
    },[])

    useEffect(()=>{
            console.log("vino aqui");
         setListaUsuarios(props.state.listaUsuarios);
      let result =  _crearFilasListaUsuario();
    },[props.state.listaUsuarios])

    useEffect(()=>{
        console.log("valor de filas detectadas: ", props.state.filasListaUsuariosActivos)
        const _setearFilas =async()=>{
            await setFilasListaUsuario(props.state.filasListaUsuariosActivos);
        }
        _setearFilas();
    },[props.state.filasListaUsuariosActivos])

    const _obtenerListaUsuarios=async(lista)=>{
        /* simulando la llamada a un servicio */
        console.log("valor del JSON en el llamado: ", lista);
        await props.setListaUsuarios(lista);
       
    }

    const _cambiosEnUsuarios =({tipo, valor})=>{
        console.log("vino al cambio usuarios");
        switch(tipo){
            case 'actualizarListaUsuarios':
                   let nuevas_filas= _cambiarActivoJsonUsuarios(valor.id_usuario);
                    console.log("volvio");
                    _obtenerListaUsuarios(nuevas_filas);
                break;
        }
    }

    const _crearFilasListaUsuario=async()=>{
        console.log("detecto el cambio");

        let filas=[];

        props.state.listaUsuarios.map(usuario=>{

            let {id_usuario,
                nombre_usuario, 
                id_f_empleado, 
                nombre_empleado, 
                correo_electronico, 
                fecha_creacion, 
                usuario_activo } = usuario;

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
            fila.id_empleado = id_f_empleado;
            fila.nombre_empleado= nombre_empleado;
            fila.correo_electronico = correo_electronico;
            fila.fecha_creacion = fecha_creacion;
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
            filas.push(fila);
        })
        await props.setFilasListaUsuariosActivos(filas);


    }

    //funcion que simula los cambios de estado en los usuarios en el servidor.
    const _cambiarActivoJsonUsuarios=(id_usuario)=>{
        console.log("vino al cambio JSOn");
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
        
        console.log("nuevo valor del JSOn ", listUsuarios);
        return nueva_lista_usuarios
        //listUsuarios
        /* comente las lineas donde clonaba el objeto porque no estoy modificando el store invalidamente, solo el JSOn de prueba. */
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
                        <NuevoUsuario />
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
        setFilasListaUsuariosActivos: (datos) =>dispatch(setFilasListaUsuariosActivos(datos)),
        setFilasListaUsuariosInactivos: (datos) =>dispatch(setFilasListaUsuariosInactivos(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GestionUsuarios);
