import { SETLISTADIAGNOSTICOS, 
        SETLISTAPIEZAS,
        SETLISTAESTADOS,
        SETFILASLISTADIAGNOSTICOSACTIVOS,
        SETFILASLISTADIAGNOSTICOSINACTIVOS        
    } from './actionTypes';
export const setListaDiagnosticos = listaDiagnosticos =>({
    type: SETLISTADIAGNOSTICOS,
    payload: listaDiagnosticos
})

export const setFilasListaDiagnosticosActivos = listDiagnosticosActivos =>({
    type: SETFILASLISTADIAGNOSTICOSACTIVOS,
    payload: listDiagnosticosActivos
})

export const setFilasListaDiagnosticosInactivos = listDiagnosticosInactivos =>({
    type: SETFILASLISTADIAGNOSTICOSINACTIVOS,
    payload: listDiagnosticosInactivos
})

export const setListaPiezas= listaPiezas =>({
    type: SETLISTAPIEZAS,
    payload: listaPiezas
})

export const setListaEstados = listaEstados =>({
    type: SETLISTAESTADOS,
    payload: listaEstados
})