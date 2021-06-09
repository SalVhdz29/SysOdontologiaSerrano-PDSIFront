import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

import {
    API_CAMBIO_ESTADO_TIPORECURSO
} from '../../../api/apiTypes'

const SwitchTipoRecursoActivo = props =>{

    const [ idTipoRecurso, setIdTipoRecurso ] = useState(null);
    const [ TipoRecursoActivo, setTipoRecursoActivo ] = useState(false);

    useEffect(()=>{
        setIdTipoRecurso(props.tipo_recurso_id)
        setTipoRecursoActivo(props.TipoRecurso_estado)
    },[])

    useEffect(()=>{
        if(props.tipo_recurso_id != undefined && props.tipo_recurso_id != null)
        {
            setIdTipoRecurso(props.tipo_recurso_id)
        }
        
    },[props.tipo_recurso_id])

    useEffect(()=>{
        console.log("useF TipoRecurso activo, id y valor", props.tipo_recurso_id, props.tipo_recurso_estado);
        if(props.tipo_recurso_estado != undefined && props.tipo_recurso_estado!= null)
        {
            console.log("si viniste");

            setTipoRecursoActivo(TipoRecursoActivo)
        }

    },[props.TipoRecurso_estado])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del TipoRecurso.
    const _cambioTipoRecursoActivo=(e)=>{
        e.preventDefault();
/*
        let mensaje_advertencia = "";
        let boton_aceptar ="";
        console.log("id y activo ==>: ",props.tipo_recurso_id, props.tipo_recurso_estado);

        if(props.tipo_recurso_estado == true )
        {
            mensaje_advertencia +="¿Desea desactivar al TipoRecurso seleccionado?."
            boton_aceptar+="Desactivar";*/

            try{

                let mensaje_advertencia = "";
                let boton_aceptar ="";
                console.log("id y activo ==>: ",props.tipo_recurso_id, props.tipo_recurso_estado);
    
                if(props.tipo_recurso_estado == true )
                {
                    mensaje_advertencia +="¿Desea desactivar al Tipo Recurso seleccionado?."
                    boton_aceptar+="Desactivar";
                }
                else
                {
                    mensaje_advertencia +="¿Desea activar al Tipo Recurso seleccionado?."
                    boton_aceptar+="Activar";
                }
    
                swal({
                    title:"Cambiar Estado de Tipo Recurso",
                    text:mensaje_advertencia,
                    icon: "warning",
                    buttons:["Cancelar", boton_aceptar],
                }).then(async respuesta =>{
    
                        if(respuesta)
                        {
                            let tipo_recurso_id = props.tipo_recurso_id;
    
                            let datos={tipo_recurso_id};
    
                            let token= Cookies.get('token');  
    
                            let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIO_ESTADO_TIPORECURSO)
                                                        .send(datos)
                                                        .set('Accept', 'application/json')
                                                        .set('Authorization', "Bearer " + token);
    
                            //let valor ={id_usuario};
                            console.log("RESPUESTA: ", respuesta);
                            if(respuesta.body.message == "OK")
                            {
                                swal({
                                    title:"Estado Actualizado",
                                    text:"Estado actualizado correctamente",
                                    icon: "success",
                                    button:"Aceptar",
                                    timer:3000
                                })
    
                                let tipo ="actualizarListaTipoRecurso";
                                let envio ={tipo};
    
                                props.cambioEnTipoRecurso(envio);
                            }
                            else{
                                let mensaje_error=respuesta.body.message;
    
                                swal({
                                    title:"Error al cambiar El estado del Tipo Recurso",
                                    text:mensaje_error,
                                    icon: "error",
                                    button:"Aceptar",
                                })
    
                            }
    
    
                    }
                    })

        }
        /*
        else*/
        catch(error)

        {/*
            mensaje_advertencia +="¿Desea activar al TipoRecurso seleccionado?."
            boton_aceptar+="Activar";*/

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
                title:"Error al cambiar El estado del Tipo Recurso",
                text:mensaje_error,
                icon: "warning",
                button:"Aceptar",
            })

        }

/*


        swal({
            title:"Cambiar Estado de TipoRecurso",
            text:mensaje_advertencia,
            icon: "warning",
            buttons:["Cancelar", boton_aceptar],
        }).then(async respuesta =>{

            if(respuesta)
            {
                let tipo_recurso_id = props.tipo_recurso_id;

                let datos={tipo_recurso_id};

                // let token= Cookies.get('token');  

                // let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + "/ruta")
                //                              .send(datos)
                //                              .set('Accept', 'application/json')
                //                              .set('Authorization', "Bearer " + token);

                let valor ={tipo_recurso_id};
                let tipo ="actualizarListaTipoRecurso";
                let envio ={tipo, valor};

                props.cambioEnTipoRecurso(envio);

            }
        })

*/
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
              id={props.tipo_recurso_id+"switchActiva"}
              name={props.tipo_recurso_id+"switchActiva"}
              checked={props.tipo_recurso_estado}
              onClick={e=>{_cambioTipoRecursoActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.tipo_recurso_id+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchTipoRecursoActivo;