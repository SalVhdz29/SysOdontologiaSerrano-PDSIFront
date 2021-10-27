import React,{Fragment, useEffect, useState } from 'react'; 
import swal from 'sweetalert'; 
import request from 'superagent'; 
import Cookies from 'js-cookie'; 
 
 
 
const SwitchLoteActivo = props =>{ 
 
    const [ numLote, setNumLote ] = useState(null); 
    const [ loteActivo, setLoteActivo ] = useState(false); 
 
    useEffect(()=>{ 
        setNumLote(props.n_insumo) 
        setLoteActivo(props.lote_activo) 
    },[]) 
 
    useEffect(()=>{ 
        if(props.n_insumo != undefined && props.n_insumo != null) 
        { 
            setNumLote(props.n_insumo) 
        } 
         
    },[props.n_insumo]) 
 
    useEffect(()=>{ 
        if(props.lote_activo != undefined && props.lote_activo!= null) 
        {            
            setLoteActivo(loteActivo) 
        } 
 
    },[props.lote_activo]) 
 
    //Funcion que detecta el cambio en el switch para cambiar el estado de activo del lote. 
    const _cambioLoteActivo=(e)=>{ 
        e.preventDefault(); 
 
        let mensaje_advertencia = ""; 
        let boton_aceptar =""; 
 
        if(props.lote_activo == true ) 
        { 
            mensaje_advertencia +="¿Desea desactivar el lote seleccionado?." 
            boton_aceptar+="Desactivar"; 
        } 
        else 
        { 
            mensaje_advertencia +="¿Desea activar el lote seleccionado?." 
            boton_aceptar+="Activar"; 
        } 
 
        swal({ 
            title:"Cambiar Estado de Lote", 
            text:mensaje_advertencia, 
            icon: "warning", 
            buttons:["Cancelar", boton_aceptar], 
        }).then(async respuesta =>{ 
             
            if(respuesta) 
            { 
                let n_insumo = props.n_insumo; 
 
                let datos={n_insumo}; 
 
                let valor ={n_insumo}; 
                let tipo ="actualizarListaLotes"; 
                let envio ={tipo, valor}; 
 
                props.cambioEnLotes(envio); 
 
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
              id={props.n_insumo+"switchActiva"} 
              name={props.n_insumo+"switchActiva"} 
              checked={props.lote_activo} 
              onClick={e=>{_cambioLoteActivo(e)}} 
 
            /> 
            <label 
              className="custom-control-label" 
              htmlFor={props.n_insumo+"switchActiva"} 
            > 
  
            </label> 
          </div> 
        </Fragment> 
    ) 
} 
 
export default SwitchLoteActivo;