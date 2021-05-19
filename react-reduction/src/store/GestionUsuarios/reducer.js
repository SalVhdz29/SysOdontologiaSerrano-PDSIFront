import {
    SETLISTAUSUARIOS,
    SETFILASLISTAUSUARIOSACTIVOS,
    SETFILASLISTAUSUARIOSINACTIVOS
} from './actionTypes'

const INIT_STATE={
    listaUsuarios:[],
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