import {
    SETLISTARECURSOS,
    SETFILASLISTARECURSOSACTIVOS,
    SETFILASLISTARECURSOSINACTIVOS
} from './actionTypes'

const INIT_STATE={
    listaRecursos:[],
    filasListaRecursosActivos: [],
    filasListaRecursosInactivos: []
}

const gestionRecursosReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTARECURSOS:
            return{
                ...state,
                listaRecursos: payload
            }
        case SETFILASLISTARECURSOSACTIVOS:
            return{
                ...state,
                filasListaRecursosActivos: payload
            }
        case SETFILASLISTARECURSOSINACTIVOS:
            return{
                ...state,
                filasListaRecursosInactivos: payload
            }
        default:
            return state
    }
}

export default gestionRecursosReducer;