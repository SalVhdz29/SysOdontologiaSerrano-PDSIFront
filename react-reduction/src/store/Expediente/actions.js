import { SETLISTAExpediente, 
    SETFILASLISTAExpedienteACTIVOS,
    SETFILASLISTAExpedienteINACTIVOS,
    SETLISTAPIEZAS,
    SETFILASLISTAPIEZAS
} from './actionTypes';
export const setListaExpediente = listaExpediente =>({
type: SETLISTAExpediente,
payload: listaExpediente
})
export const setFilasListaExpedienteActivos = listExpedienteActivos =>({
type: SETFILASLISTAExpedienteACTIVOS,
payload: listExpedienteActivos
})

export const setFilasListaExpedienteInactivos = listExpedienteInactivos =>({
type: SETFILASLISTAExpedienteINACTIVOS,
payload: listExpedienteInactivos
})

export const setListaPiezas= listaPiezas =>({
    type: SETLISTAPIEZAS,
    payload: listaPiezas
})

export const setFilasListaPiezas= listPiezas =>({
    type: SETFILASLISTAPIEZAS,
    payload: listPiezas
})