import { SETLISTAExpediente, 
    SETFILASLISTAExpedienteACTIVOS,
    SETFILASLISTAExpedienteINACTIVOS  
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