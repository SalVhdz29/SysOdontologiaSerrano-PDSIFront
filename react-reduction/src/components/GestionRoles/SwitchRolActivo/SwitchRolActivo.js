import React,{Fragment, useEffect, useState } from 'react'; 
import swal from 'sweetalert'; 
import request from 'superagent'; 
import Cookies from 'js-cookie'; 
 
 
 
const SwitchUsuarioActivo = props =>{ 
 
    const [ idRol, setIdRol ] = useState(null); 
    const [ rolActivo, setrolActivo ] = useState(false); 
 
    useEffect(()=>{ 
        setIdRol(props.id_rol) 
        setRolActivo(props.rol_activo) 
    },[]) 
 
    useEffect(()=>{ 
        if(props.id_rol != undefined && props.id_urol != null) 
        { 
            setIdRol(props.id_rol) 
        } 
         
    },[props.id_rol]) 
 
    useEffect(()=>{ 
        console.log("useF rol activo, id y valor", props.id_rol, props.rol_activo); 
        if(props.rol_activo != undefined && props.rol_activo!= null) 
        { 
            console.log("si viniste"); 
 
            setRolActivo(rolActivo) 
        } 
 
    },[props.rol_activo]) 
 
    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del rol. 
    const _cambioRolActivo=(e)=>{ 
        e.preventDefault(); 
 
        let mensaje_advertencia = ""; 
        let boton_aceptar =""; 
        console.log("id y activo ==>: ",props.id_rol, props.rol_activo); 
         
        if(props.rol_activo == true ) 
        { 
            mensaje_advertencia +="¿Desea desactivar al rol seleccionado?." 
            boton_aceptar+="Desactivar"; 
        } 
        else 
        { 
            mensaje_advertencia +="¿Desea activar al rol seleccionado?." 
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
 
                // let token= Cookies.get('token');   
 
                // let respuesta = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + "/ruta") 
                //                              .send(datos) 
                //                              .set('Accept', 'application/json') 
                //                              .set('Authorization', "Bearer " + token); 
 
                let valor ={id_rol}; 
                let tipo ="actualizarListaRoles"; 
                let envio ={tipo, valor}; 
 
                props.cambioEnRoles(envio); 
 
            } 
        }) 
 
 
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