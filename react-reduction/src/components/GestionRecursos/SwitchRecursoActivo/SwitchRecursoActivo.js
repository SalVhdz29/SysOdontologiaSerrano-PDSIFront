import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

import {
    API_CAMBIAR_ESTADO_RECURSO
} from '../../../api/apiTypes'

const SwitchRecursoActivo = props =>{

    const [ idRecurso, setIdRecurso ] = useState(null);
    const [ recursoActivo, setRecursoActivo ] = useState(false);

    useEffect(()=>{
        setIdRecurso(props.id_recurso)
        setRecursoActivo(props.recurso_activo)
    },[])

    useEffect(()=>{
        if(props.id_recurso != undefined && props.id_recurso != null)
        {
            setIdRecurso(props.id_recurso)
        }
        
    },[props.id_recurso])

    useEffect(()=>{
        console.log("useF recurso activo, id y valor", props.id_recurso, props.recurso_activo);
        if(props.recurso_activo != undefined && props.recurso_activo!= null)
        {
            console.log("si vinistexd");

            setRecursoActivo(recursoActivo)
        }

    },[props.recurso_activo])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del recurso.
    const _cambioRecursoActivo=(e)=>{
        e.preventDefault();
        try{

            let mensaje_advertencia = "";
            let boton_aceptar ="";
            console.log("id y activo ==>: ",props.id_recurso, props.recurso_activo);

            if(props.recurso_activo == true )
            {
                mensaje_advertencia +="¿Desea desactivar el recurso seleccionado?."
                boton_aceptar+="Desactivar";
            }
            else
            {
                mensaje_advertencia +="¿Desea activar el recurso seleccionado?."
                boton_aceptar+="Activar";
            }

            swal({
                title:"Cambiar Estado de Recurso",
                text:mensaje_advertencia,
                icon: "warning",
                buttons:["Cancelar", boton_aceptar],
            }).then(async respuesta =>{

                if(respuesta)
                {
                    let id_recurso = props.id_recurso;

                    let datos={id_recurso};

                    let token= Cookies.get('token');  

                    let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIAR_ESTADO_RECURSO)
                                                .send(datos)
                                                .set('Accept', 'application/json')
                                                .set('Authorization', "Bearer " + token);

                    //let valor ={id_recurso};
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

                                let tipo ="actualizarListaRecursos";
                                let envio ={tipo};
        
                                props.cambioEnRecursos(envio);
                            }
                            else{
                                let mensaje_error=respuesta.body.message;

                                swal({
                                    title:"Error al cambiar El estado del recurso",
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
                title:"Error al cambiar el estado del recurso",
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
              id={props.id_recurso+"switchActiva"}
              name={props.id_recurso+"switchActiva"}
              checked={props.recurso_activo}
              onClick={e=>{_cambioRecursoActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.id_recurso+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchRecursoActivo;