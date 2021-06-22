import {
    SETLISTAPERMISOS
} from './actionTypes';

const INIT_STATE={
    permisos:[]
}

const permisosReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case SETLISTAPERMISOS:
            return{
                permisos: payload
            }
        default:
            return state
    }
}

export default permisosReducer;