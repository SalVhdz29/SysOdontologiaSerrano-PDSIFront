import {
    SETLISTADIAGNOSTICOS,
    SETFILASLISTADIAGNOSTICOSACTIVOS,
    SETFILASLISTADIAGNOSTICOSINACTIVOS,
    SETLISTAPIEZAS,
    SETLISTAESTADOS
} from './actionTypes'

const INIT_STATE={
    listaDiagnosticos:[],
    listaEmpleados:[],
    listaEstados:[],
    filasListadiagnosticosActivos: [],
    filasListadiagnosticosInactivos: []
}

const gestionDiagnosticosReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTADIAGNOSTICOS:
            return{
                ...state,
                listaDiagnosticos: payload
            }
        case SETLISTAPIEZAS:
            return{
                ...state,
                listaEmpleados: payload
            }
        case SETLISTAESTADOS:
            return{
                ...state,
                listaEstados: payload
            }
        case SETFILASLISTADIAGNOSTICOSACTIVOS:
            return{
                ...state,
                filasListaDiagnosticosActivos: payload
            }
        case SETFILASLISTADIAGNOSTICOSINACTIVOS:
            return{
                ...state,
                filasListaDiagnosticosInactivos: payload
            }
        default:
            return state
    }
}

export default gestionDiagnosticosReducer;