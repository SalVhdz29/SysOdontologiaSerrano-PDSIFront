import { SETLISTAESTADOS, 
    SETLISTAPERMISOS,
    SETFILASLISTAESTADOSACTIVOS,
    SETFILASLISTAESTADOSINACTIVOS        
} from './actionTypes';
export const setListaEstados = listaEstados =>({
type: SETLISTAESTADOS,
payload: listaEstados
})

export const setFilasListaEstadosActivos = listEstadosActivos =>({
type: SETFILASLISTAESTADOSACTIVOS,
payload: listEstadosActivos
})

export const setFilasListaEstadosInactivos = listEstadosInactivos =>({
type: SETFILASLISTAESTADOSINACTIVOS,
payload: listEstadosInactivos
})

export const setListaPermisos = listaPermisos =>({
type: SETLISTAPERMISOS,
payload: listaPermisos
})