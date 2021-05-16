import { SETDATOSUSUARIO, SETTOKENUSUARIO } from './actionTypes';

export const setDatosUsuario=datosUsuario=>({
    type: SETDATOSUSUARIO,
    payload: datosUsuario

});

export const setTokenUsuario = token =>({
    type: SETTOKENUSUARIO,
    payload: token
})