import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

import {
    API_CAMBIAR_ESTADO_DIAGNOSTICO
} from '../../../api/apiTypes'



const SwitchDiagnosticoActivo = props =>{

    const [ idDiagnostico, setIdDiagnostico ] = useState(null);
    const [ diagnosticoActivo, setDiagnosticoActivo ] = useState(false);

    useEffect(()=>{
        setIdDiagnostico(props.id_diagnostico)
        setDiagnosticoActivo(props.diagnostico_activo)
    },[])

    useEffect(()=>{
        if(props.id_diagnostico != undefined && props.id_diagnostico != null)
        {
            setIdDiagnostico(props.id_diagnostico)
        }
        
    },[props.id_diagnostico])

    useEffect(()=>{
        console.log("useF diagnostico activo, id y valor", props.id_diagnostico, props.diagnostico_activo);
        if(props.diagnostico_activo != undefined && props.diagnostico_activo!= null)
        {
            console.log("si viniste");

            setDiagnosticoActivo(diagnosticoActivo)
        }

    },[props.diagnostico_activo])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del diagnostico.
    const _cambioDiagnosticoActivo=(e)=>{
        e.preventDefault();
        try{

            let mensaje_advertencia = "";
            let boton_aceptar ="";
            console.log("id y activo ==>: ",props.id_diagnostico, props.diagnostico_activo);

            if(props.diagnostico_activo == true )
            {
                mensaje_advertencia +="¿Desea desactivar al diagnostico seleccionado?."
                boton_aceptar+="Desactivar";
            }
            else
            {
                mensaje_advertencia +="¿Desea activar al diagnostico seleccionado?."
                boton_aceptar+="Activar";
            }

            swal({
                title:"Cambiar Estado de Diagnostico",
                text:mensaje_advertencia,
                icon: "warning",
                buttons:["Cancelar", boton_aceptar],
            }).then(async respuesta =>{

                    if(respuesta)
                    {
                        let id_diagnostico = props.id_diagnostico;

                        let datos={id_diagnostico};

                        let token= Cookies.get('token');  

                        let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIAR_ESTADO_DIAGNOSTICO)
                                                    .send(datos)
                                                    .set('Accept', 'application/json')
                                                    .set('Authorization', "Bearer " + token);

                        //let valor ={id_diagnostico};
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

                            let tipo ="actualizarListaDiagnosticos";
                            let envio ={tipo};
    
                            props.cambioEnDiagnosticos(envio);
                        }
                        else{
                            let mensaje_error=respuesta.body.message;

                            swal({
                                title:"Error al cambiar El estado del diagnostico",
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
                title:"Error al cambiar El estado del diagnostico",
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
              id={props.id_diagnostico+"switchActiva"}
              name={props.id_diagnostico+"switchActiva"}
              checked={props.diagnostico_activo}
              onClick={e=>{_cambioDiagnosticoActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.id_diagnostico+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchDiagnosticoActivo;