import {
    SETLISTATIPORECURSO,
    SETLISTARECURSO,
    SETFILASLISTATIPORECURSOACTIVOS,
    SETFILASLISTATIPORECURSOINACTIVOS
} from './actionTypes'

const INIT_STATE={
    listaTipoRecurso:[],
    listaRecurso:[],
    filasListaTipoRecursoActivos: [],
    filasListaTipoRecursoInactivos: []
}
const TipoRecursoReducer =(state = INIT_STATE, {type, payload})=>{
    switch(type)
    {
        case SETLISTATIPORECURSO:
            return{
                ...state,
                listaTipoRecurso: payload
            }
        case SETLISTARECURSO:
                return{
                    ...state,
                    listaRecurso: payload
                }
        case SETFILASLISTATIPORECURSOACTIVOS:
            return{
                ...state,
                filasListaTipoRecursoActivos: payload
            }
        case SETFILASLISTATIPORECURSOINACTIVOS:
            return{
                ...state,
                filasListaTipoRecursoInactivos: payload
            }
        default:
            return state
    }
}
export default TipoRecursoReducer;