import { SETLISTASERVICIOS, 
    SETFILASLISTASERVICIOSACTIVOS,
    SETFILASLISTASERVICIOSINACTIVOS  
} from './actionTypes';
export const setListaServicios = listaServicios =>({
type: SETLISTASERVICIOS,
payload: listaServicios
})

export const setFilasListaServiciosActivos = listServiciosActivos =>({
type: SETFILASLISTASERVICIOSACTIVOS,
payload: listServiciosActivos
})

export const setFilasListaServiciosInactivos = listServiciosInactivos =>({
type: SETFILASLISTASERVICIOSINACTIVOS,
payload: listServiciosInactivos
})
