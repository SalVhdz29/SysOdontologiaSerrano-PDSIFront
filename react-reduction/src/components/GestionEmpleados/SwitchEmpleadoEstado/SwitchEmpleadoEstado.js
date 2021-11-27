import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

import {
    API_CAMBIAR_ESTADO_EMPLEADO
} from '../../../api/apiTypes'



const SwitchEmpleadoEstado = props =>{

    const [ idEmpleado, setIdEmpleado ] = useState(null);
    const [ empleadoActivo, setEmpleadoActivo ] = useState(false);

    useEffect(()=>{
        setIdEmpleado(props.id_empleado)
        setEmpleadoActivo(props.empleado_activo)
    },[])

    useEffect(()=>{
        if(props.id_empleado != undefined && props.id_empleado != null)
        {
            setIdEmpleado(props.id_empleado)
        }
        
    },[props.id_empleado])

    useEffect(()=>{
        if(props.empleado_activo != undefined && props.empleado_activo!= null)
        {
            console.log("si viniste");

            setEmpleadoActivo(props.empleado_activo)
        }

    },[props.empleado_activo])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del usuario.
    const _cambioEmpleadoActivo=(e)=>{
        e.preventDefault();
        try{

            let mensaje_advertencia = "";
            let boton_aceptar ="";
            console.log("id y activo ==>: ",props.id_empleado, props.empleado_activo);

            if(props.usuario_activo == true )
            {
                mensaje_advertencia +="¿Desea desactivar al empleado seleccionado?."
                boton_aceptar+="Desactivar";
            }
            else
            {
                mensaje_advertencia +="¿Desea activar al empleado seleccionado?."
                boton_aceptar+="Activar";
            }

            swal({
                title:"Cambiar Estado de Empleado",
                text:mensaje_advertencia,
                icon: "warning",
                buttons:["Cancelar", boton_aceptar],
            }).then(async respuesta =>{

                    if(respuesta)
                    {
                        let id_empleado = props.id_empleado;

                        let datos={id_empleado};

                        let token= Cookies.get('token');  

                        let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIAR_ESTADO_EMPLEADO)
                                                    .send(datos)
                                                    .set('Accept', 'application/json')
                                                    .set('Authorization', "Bearer " + token);

                        //let valor ={id_usuario};
                        console.log("RESPUESTA: ", respuesta);
                        if(respuesta.body.message == "OK")
                        {
                            swal({
                                title:"Estado Actualizad0",
                                text:"Estado actualizado correctamente",
                                icon: "success",
                                button:"Aceptar",
                                timer:3000
                            })

                            let tipo ="actualizarListaUsuarios";
                            let envio ={tipo};
    
                            props.actualizarPadre();
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
                title:"Error al cambiar El estado del empleado",
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
              id={props.id_empleado+"switchActiva"}
              name={props.id_empleado+"switchActiva"}
              checked={props.empleado_activo}
              onClick={e=>{_cambioEmpleadoActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.id_empleado+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchEmpleadoEstado;