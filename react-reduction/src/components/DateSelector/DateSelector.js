import React, {Fragment, useState, useEffect } from 'react';
import DatePicker,{ registerLocale } from 'react-datepicker';
import es from "date-fns/locale/es";
import { DateTime } from 'luxon';
import "react-datepicker/dist/react-datepicker.css";
registerLocale("es",es);


const DateSelector = props =>{

    const [ fechaSeleccionada, setFechaSeleccionada ] = useState(DateTime.now());
    const [ identificador, setIdentificador ] = useState(0);
    const [limiteSuperiorFecha, setLimiteSuperiorFecha] = useState(null);
    const [ deshabilitar, setDeshabilitar] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(()=>{
        props.deshabilitar != null?(async()=>{
            await setDeshabilitar(props.deshabilitar);
            await setError(false);
        })():(()=>{return null})();
    },[props.deshabilitar])

    useEffect(()=>{
        props.identificador != null?(async()=>{
            await setIdentificador(props.identificador);
        })():(()=>{return null})()
    },[props.identificador]);

    useEffect(()=>{
        props.fechaSeleccionada != null?(async()=>{
            await setFechaSeleccionada(props.fechaSeleccionada);
        })():(()=>{return null})()
    },[props.fechaSeleccionada])

    
    useEffect(()=>{
        
        limiteSuperiorFecha != null?(async()=>{
           await _validarFecha();
        })():(()=>{return null})()
    },[fechaSeleccionada, deshabilitar, limiteSuperiorFecha])

    useEffect(()=>{

        props.limiteSuperiorFecha != null?(async()=>{
            await setLimiteSuperiorFecha(props.limiteSuperiorFecha);
        })():(()=>{return null})()
    },[props.limiteSuperiorFecha])

    const _validarFecha=async()=>{
        let valido = false;
       
        limiteSuperiorFecha != null?(()=>{
        if(limiteSuperiorFecha.startOf("day") < fechaSeleccionada.startOf("day"))
        {
          
            valido = true;
        }
   
        })():(valido = true);

        await setError(!valido);
    }

    const _cambioFecha=(fecha)=>{

        let datos={identificador,fecha}
        props.cambioFecha(datos);
    }

    return(
        <Fragment>
             <DatePicker
                //{...this.props}
                dateFormat={"Pp"}
                locale="es"
                className={error?("form-control red-border"):("form-control ")}
                selected={deshabilitar!=true?(fechaSeleccionada.toJSDate()):(null)}
                onChange={val =>{
                    _cambioFecha(val);
                }}
                dateFormat={props.dateFormat!=null?(props.dateFormat):("dd/MM/yyyy")}
                showTimeSelect={props.showTimeSelectOnly != null || props.showTimeSelect != null?(true):(false)}
                showTimeSelectOnly={props.showTimeSelectOnly!=null?(true):(false)}
                placeholderText={props.placeholder!=null?(props.placeholder):("dd/mm aaaa")}
                disabled={deshabilitar}

            />
            {
                error==true?(<p style={{color:"red"}}>Fecha Incorrecta</p>):(<></>)
            }

        </Fragment>
            
    )
}

export default DateSelector;