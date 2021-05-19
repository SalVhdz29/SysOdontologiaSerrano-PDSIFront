import { SETLISTAUSUARIOS, 
        SETFILASLISTAUSUARIOSACTIVOS,
        SETFILASLISTAUSUARIOSINACTIVOS  
    } from './actionTypes';
export const setListaUsuarios = listaUsuarios =>({
    type: SETLISTAUSUARIOS,
    payload: listaUsuarios
})

export const setFilasListaUsuariosActivos = listUsuariosActivos =>({
    type: SETFILASLISTAUSUARIOSACTIVOS,
    payload: listUsuariosActivos
})

export const setFilasListaUsuariosInactivos = listUsuariosInactivos =>({
    type: SETFILASLISTAUSUARIOSINACTIVOS,
    payload: listUsuariosInactivos
})
