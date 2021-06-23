import { SETLISTATIPORECURSO, 
    SETLISTARECURSO,
    SETFILASLISTATIPORECURSOACTIVOS,
    SETFILASLISTATIPORECURSOINACTIVOS  
} from './actionTypes';
export const setListaTipoRecurso = listaTipoRecurso =>({
type: SETLISTATIPORECURSO,
payload: listaTipoRecurso
})
export const setListaRecurso = listRecurso =>({
    type: SETLISTARECURSO,
    payload: listRecurso
    })
export const setFilasListaTipoRecursoActivos = listTipoRecursoActivos =>({
type: SETFILASLISTATIPORECURSOACTIVOS,
payload: listTipoRecursoActivos
})

export const setFilasListaTipoRecursoInactivos = listTipoRecursoInactivos =>({
type: SETFILASLISTATIPORECURSOINACTIVOS,
payload: listTipoRecursoInactivos
})