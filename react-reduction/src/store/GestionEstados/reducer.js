import {
    SETLISTAESTADOS,
    SETFILASLISTAESTADOSACTIVOS,
    SETFILASLISTAESTADOSINACTIVOS,
    SETLISTAPERMISOS
} from './actionTypes'

const INIT_STATE={
    listaEstados:[],
    listaPermisos:[],
    filasListaEstadosActivos: [],
    filasListaEstadosInactivos: []
}

const gestionEstadosReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTAESTADOS:
            return{
                ...state,
                listaEstados: payload
            }
        case SETLISTAPERMISOS:
            return{
                ...state,
                listaPermisos: payload
            }
        case SETFILASLISTAESTADOSACTIVOS:
            return{
                ...state,
                filasListaEstadosActivos: payload
            }
        case SETFILASLISTAESTADOSINACTIVOS:
            return{
                ...state,
                filasListaEstadosInactivos: payload
            }
        default:
            return state
    }
}

export default gestionEstadosReducer;