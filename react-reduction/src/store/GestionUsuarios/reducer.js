import {
    SETLISTAUSUARIOS,
    SETFILASLISTAUSUARIOSACTIVOS,
    SETFILASLISTAUSUARIOSINACTIVOS,
    SETLISTAEMPLEADOS,
    SETLISTAROLES
} from './actionTypes'

const INIT_STATE={
    listaUsuarios:[],
    listaEmpleados:[],
    listaRoles:[],
    filasListaUsuariosActivos: [],
    filasListaUsuariosInactivos: []
}

const gestionUsuariosReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTAUSUARIOS:
            return{
                ...state,
                listaUsuarios: payload
            }
        case SETLISTAEMPLEADOS:
            return{
                ...state,
                listaEmpleados: payload
            }
        case SETLISTAROLES:
            return{
                ...state,
                listaRoles: payload
            }
        case SETFILASLISTAUSUARIOSACTIVOS:
            return{
                ...state,
                filasListaUsuariosActivos: payload
            }
        case SETFILASLISTAUSUARIOSINACTIVOS:
            return{
                ...state,
                filasListaUsuariosInactivos: payload
            }
        default:
            return state
    }
}

export default gestionUsuariosReducer;