import { SETLISTARECURSOS, 
    SETFILASLISTARECURSOSACTIVOS,
    SETFILASLISTARECURSOSINACTIVOS  
} from './actionTypes';
export const setListaRecursos = listaRecursos =>({
type: SETLISTARECURSOS,
payload: listaRecursos
})

export const setFilasListaRecursosActivos = listRecursosActivos =>({
type: SETFILASLISTARECURSOSACTIVOS,
payload: listRecursosActivos
})

export const setFilasListaRecursosInactivos = listRecursosInactivos =>({
type: SETFILASLISTARECURSOSINACTIVOS,
payload: listRecursosInactivos
})
