import {
    SETLISTAPERMISOS
} from './actionTypes';

export const setListaPermisos = listPermisos =>({
    type:SETLISTAPERMISOS,
    payload: listPermisos
})