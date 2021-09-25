import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

import {
    API_CAMBIAR_ESTADO_SERVICIO
} from '../../../api/apiTypes'

const SwitchServicioActivo = props =>{

    const [ idServicio, setIdServicio ] = useState(null);
    const [ servicioActivo, setServicioActivo ] = useState(false);

    useEffect(()=>{
        setIdServicio(props.id_servicio)
        setServicioActivo(props.servicio_activo)
    },[])

    useEffect(()=>{
        if(props.id_servicio != undefined && props.id_servicio != null)
        {
            setIdServicio(props.id_servicio)
        }
        
    },[props.id_servicio])

    useEffect(()=>{
        console.log("useF servicio activo, id y valor", props.id_servicio, props.servicio_activo);
        if(props.servicio_activo != undefined && props.servicio_activo!= null)
        {
            console.log("vino");

            setServicioActivo(servicioActivo)
        }

    },[props.servicio_activo])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del servicio.
    const _cambioServicioActivo=(e)=>{
        e.preventDefault();
        try{

            let mensaje_advertencia = "";
            let boton_aceptar ="";
            console.log("id y activo ==>: ",props.id_servicio, props.servicio_activo);

            if(props.servicio_activo == true )
            {
                mensaje_advertencia +="¿Desea desactivar el servicio seleccionado?."
                boton_aceptar+="Desactivar";
            }
            else
            {
                mensaje_advertencia +="¿Desea activar el servicio seleccionado?."
                boton_aceptar+="Activar";
            }

            swal({
                title:"Cambiar Estado de Servicio",
                text:mensaje_advertencia,
                icon: "warning",
                buttons:["Cancelar", boton_aceptar],
            }).then(async respuesta =>{

                if(respuesta)
                {
                    let id_servicio = props.id_servicio;

                    let datos={id_servicio};

                    let token= Cookies.get('token');  

                    let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIAR_ESTADO_SERVICIO)
                                                .send(datos)
                                                .set('Accept', 'application/json')
                                                .set('Authorization', "Bearer " + token);

                    //let valor ={id_servicio};
                    console.log("RESPUESTA: ",respuesta);
                    if(respuesta.body.message == "OK")
                            {
                                swal({
                                    title:"Estado Actualizado",
                                    text:"Estado actualizado correctamente",
                                    icon: "success",
                                    button:"Aceptar",
                                    timer:3000
                                })

                                let tipo ="actualizarListaServicios";
                                let envio ={tipo};
        
                                props.cambioEnServicios(envio);
                            }
                            else{
                                let mensaje_error=respuesta.body.message;

                                swal({
                                    title:"Error al cambiar El estado del servicio",
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
                title:"Error al cambiar el estado del servicio",
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
              id={props.id_servicio+"switchActiva"}
              name={props.id_servicio+"switchActiva"}
              checked={props.servicio_activo}
              onClick={e=>{_cambioServicioActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.id_servicio+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchServicioActivo;