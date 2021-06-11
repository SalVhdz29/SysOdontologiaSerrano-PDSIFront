import React,{Fragment, useEffect, useState } from 'react';
import swal from 'sweetalert';
import request from 'superagent';
import Cookies from 'js-cookie';

//ApiTypes
import {
    API_CAMBIAR_ESTADO_ROL
  } from '../../../api/apiTypes';

const SwitchRolActivo = props =>{

    const [ idRol, setIdRol ] = useState(null);
    const [ rolActivo, setRolActivo ] = useState(false);

    useEffect(()=>{
        setIdRol(props.id_rol)
        setRolActivo(props.rol_activo)
    },[])

    useEffect(()=>{
        if(props.id_rol != undefined && props.id_rol != null)
        {
            setIdRol(props.id_rol)
        }
        
    },[props.id_rol])

    useEffect(()=>{
        console.log("useF rol activo, id y valor", props.id_rol, props.rol_activo);
        if(props.rol_activo != undefined && props.rol_activo!= null)
        {
           // console.log("si viniste");

            setRolActivo(rolActivo)
        }

    },[props.rol_activo])

    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del rol.
    const _cambioRolActivo=(e)=>{
        e.preventDefault();

        try{

        let mensaje_advertencia = "";
        let boton_aceptar ="";
        console.log("id y activo ==>: ",props.id_rol, props.rol_activo);

        if(props.rol_activo == true )
        {
            mensaje_advertencia +="¿Desea desactivar el rol seleccionado?."
            boton_aceptar+="Desactivar";
        }
        else
        {
            mensaje_advertencia +="¿Desea activar el rol seleccionado?."
            boton_aceptar+="Activar";
        }

        swal({
            title:"Cambiar Estado de Rol",
            text:mensaje_advertencia,
            icon: "warning",
            buttons:["Cancelar", boton_aceptar],
        }).then(async respuesta =>{

            if(respuesta)
            {
                let id_rol = props.id_rol;

                let datos={id_rol};

                let token= Cookies.get('token');

                let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_CAMBIAR_ESTADO_ROL)
                                              .send(datos)
                                             .set('Accept', 'application/json')
                                             .set('Authorization', "Bearer " + token);

                //console.log("RESPUESTA: ", respuesta);

                if(respuesta.body.message == "OK") 
                        { 
                            swal({ 
                                title:"Estado Actualizado", 
                                text:"Estado actualizado correctamente", 
                                icon: "success", 
                                button:"Aceptar", 
                                timer:3000 
                            }) 
 
                            let tipo ="actualizarListaRoles"; 
                            let envio ={tipo}; 
     
                            props.cambioEnRoles(envio); 
                        } 
                        else{ 
                            let mensaje_error=respuesta.body.message; 
 
                            swal({ 
                                title:"Error al cambiar el estado del rol", 
                                text:mensaje_error, 
                                icon: "error", 
                                button:"Aceptar", 
                            }) 
 
                        }                      
            }
        })

    }
    catch(error){
       // console.log("EL ERROR: ",error) 
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
            title:"Error al cambiar el estado del rol", 
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
              id={props.id_rol+"switchActiva"}
              name={props.id_rol+"switchActiva"}
              checked={props.rol_activo}
              onClick={e=>{_cambioRolActivo(e)}}

            />
            <label
              className="custom-control-label"
              htmlFor={props.id_rol+"switchActiva"}
            >
 
            </label>
          </div>
        </Fragment>
    )
}

export default SwitchRolActivo;