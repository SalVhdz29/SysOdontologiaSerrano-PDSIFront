import { SETLISTAInsumo, 
    SETFILASLISTAInsumoACTIVOS,
    SETFILASLISTAInsumoINACTIVOS  
} from './actionTypes';
export const setListaInsumo = listaInsumo =>({
type: SETLISTAInsumo,
payload: listaInsumo
})
export const setFilasListaInsumoActivos = listInsumoActivos =>({
type: SETFILASLISTAInsumoACTIVOS,
payload: listInsumoActivos
})

export const setFilasListaInsumoInactivos = listInsumoInactivos =>({
type: SETFILASLISTAInsumoINACTIVOS,
payload: listInsumoInactivos
})