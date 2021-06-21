import { SETLISTAROLES, 
    SETLISTAPERMISOS,
    SETFILASLISTAROLESACTIVOS,
    SETFILASLISTAROLESINACTIVOS        
} from './actionTypes';
export const setListaRoles = listaRoles =>({
type: SETLISTAROLES,
payload: listaRoles
})

export const setFilasListaRolesActivos = listRolesActivos =>({
type: SETFILASLISTAROLESACTIVOS,
payload: listRolesActivos
})

export const setFilasListaRolesInactivos = listRolesInactivos =>({
type: SETFILASLISTAROLESINACTIVOS,
payload: listRolesInactivos
})

export const setListaPermisos = listaPermisos =>({
type: SETLISTAPERMISOS,
payload: listaPermisos
})