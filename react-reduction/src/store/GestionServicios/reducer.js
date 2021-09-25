import {
    SETLISTASERVICIOS,
    SETFILASLISTASERVICIOSACTIVOS,
    SETFILASLISTASERVICIOSINACTIVOS
} from './actionTypes'

const INIT_STATE={
    listaServicios:[],
    filasListaServiciosActivos: [],
    filasListaServiciosInactivos: []
}

const gestionServiciosReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTASERVICIOS:
            return{
                ...state,
                listaServicios: payload
            }
        case SETFILASLISTASERVICIOSACTIVOS:
            return{
                ...state,
                filasListaServiciosActivos: payload
            }
        case SETFILASLISTASERVICIOSINACTIVOS:
            return{
                ...state,
                filasListaServiciosInactivos: payload
            }
        default:
            return state
    }
}

export default gestionServiciosReducer; 