import {
    SETLISTAROLES,
    SETFILASLISTAROLESACTIVOS,
    SETFILASLISTAROLESINACTIVOS,
    SETLISTAPERMISOS
} from './actionTypes'

const INIT_STATE={
    listaRoles:[],
    listaPermisos:[],
    filasListaRolesActivos: [],
    filasListaRolesInactivos: []
}

const gestionRolesReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTAROLES:
            return{
                ...state,
                listaRoles: payload
            }
        case SETLISTAPERMISOS:
            return{
                ...state,
                listaPermisos: payload
            }
        case SETFILASLISTAROLESACTIVOS:
            return{
                ...state,
                filasListaRolesActivos: payload
            }
        case SETFILASLISTAROLESINACTIVOS:
            return{
                ...state,
                filasListaRolesInactivos: payload
            }
        default:
            return state
    }
}

export default gestionRolesReducer;