import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

import {
    API_CAMBIAR_ESTADO_USUARIO
} from '../../../api/apiTypes'



const SwitchUsuarioActivo = props =>{

    const [ idUsuario, setIdUsuario ] = useState(null);
    const [ usuarioActivo, setUsuarioActivo ] = useState(false);

    useEffect(()=>{
        setIdUsuario(props.id_usuario)
        setUsuarioActivo(props.usuario_activo)
    },[])

    useEffect(()=>{
        if(props.id_usuario != undefined && props.id_usuario != null)
        {
            setIdUsuario(props.id_usuario)
        }
        
    },[props.id_usuario])

    useEffect(()=>{
        console.log("useF usuario activo, id y valor", props.id_usuario, props.usuario_activo);
        if(props.usuario_activo != undefined && props.usuario_activo!= null)
        {
            console.log("si viniste");

            setUsuarioActivo(usuarioActivo)
        }

    },[props.usuario_activo])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del usuario.
    const _cambioUsuarioActivo=(e)=>{
        e.preventDefault();
        try{

            let mensaje_advertencia = "";
            let boton_aceptar ="";
            console.log("id y activo ==>: ",props.id_usuario, props.usuario_activo);

            if(props.usuario_activo == true )
            {
                mensaje_advertencia +="¿Desea desactivar al usuario seleccionado?."
                boton_aceptar+="Desactivar";
            }
            else
            {
                mensaje_advertencia +="¿Desea activar al usuario seleccionado?."
                boton_aceptar+="Activar";
            }

            swal({
                title:"Cambiar Estado de Usuario",
                text:mensaje_advertencia,
                icon: "warning",
                buttons:["Cancelar", boton_aceptar],
            }).then(async respuesta =>{

                    if(respuesta)
                    {
                        let id_usuario = props.id_usuario;

                        let datos={id_usuario};

                        let token= Cookies.get('token');  

                        let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIAR_ESTADO_USUARIO)
                                                    .send(datos)
                                                    .set('Accept', 'application/json')
                                                    .set('Authorization', "Bearer " + token);

                        //let valor ={id_usuario};
                        console.log("RESPUESTA: ", respuesta);
                        if(respuesta.body.message == "OK")
                        {
                            swal({
                                title:"Estado Actualizad",
                                text:"Estado actualizado correctamente",
                                icon: "success",
                                button:"Aceptar",
                                timer:3000
                            })

                            let tipo ="actualizarListaUsuarios";
                            let envio ={tipo};
    
                            props.cambioEnUsuarios(envio);
                        }
                        else{
                            let mensaje_error=respuesta.body.message;

                            swal({
                                title:"Error al cambiar El estado del usuario",
                                text:mensaje_error,
                                icon: "error",
                                button:"Aceptar",
                            })

                        }
                     

                }
                })
        }
        catch(error)
        {
            console.log("EL ERROR: ",error)
            let mensaje_error="";
            switch(error.status){
                case 401:
                  mensaje_error=error.message;
                case 500:
                    mensaje_error=error.message;
                  break;
                default:
                    mensaje_error="Error de comunicación con el servidor";
              }

              swal({
                title:"Error al cambiar El estado del usuario",
                text:mensaje_error,
                icon: "warning",
                button:"Aceptar",
            })
        }


    }
    return(
        <Fragment>
             <div
            className="custom-control custom-switch custom-switch-md mb-3"
            dir="ltr"
          >
            <input
              type="checkbox"
              className="custom-control-input"
              id={props.id_usuario+"switchActiva"}
              name={props.id_usuario+"switchActiva"}
              checked={props.usuario_activo}
              onClick={e=>{_cambioUsuarioActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.id_usuario+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchUsuarioActivo;