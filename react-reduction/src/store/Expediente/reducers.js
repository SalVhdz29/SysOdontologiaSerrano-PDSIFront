import { setListaPiezas } from './actions'
import {
    SETLISTAExpediente,
    SETFILASLISTAExpedienteACTIVOS,
    SETFILASLISTAExpedienteINACTIVOS
} from './actionTypes'

const INIT_STATE={
    listaExpediente:[],
    filasListaExpedienteActivos: [],
    filasListaExpedienteInactivos: []
}
const ExpedienteReducer =(state = INIT_STATE, {type, payload})=>{
    switch(type)
    {
        case SETLISTAExpediente:
            return{
                ...state,
                listaExpediente: payload
            
            }
        case SETFILASLISTAExpedienteACTIVOS:
            return{
                ...state,
                filasListaExpedienteActivos: payload
            }
        case SETFILASLISTAExpedienteINACTIVOS:
            return{
                ...state,
                filasListaExpedienteInactivos: payload
            }
        default:
            return state
    }
}
export default ExpedienteReducer;