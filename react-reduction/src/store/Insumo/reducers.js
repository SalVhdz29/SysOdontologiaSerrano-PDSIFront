import {
    SETLISTAInsumo,
    SETFILASLISTAInsumoACTIVOS,
    SETFILASLISTAInsumoINACTIVOS
} from './actionTypes'

const INIT_STATE={
    listaInsumo:[],
    filasListaInsumoActivos: [],
    filasListaInsumoInactivos: []
}
const InsumoReducer =(state = INIT_STATE, {type, payload})=>{
    switch(type)
    {
        case SETLISTAInsumo:
            return{
                ...state,
                listaInsumo: payload
            }
        case SETFILASLISTAInsumoACTIVOS:
            return{
                ...state,
                filasListaInsumoActivos: payload
            }
        case SETFILASLISTAInsumoINACTIVOS:
            return{
                ...state,
                filasListaInsumoInactivos: payload
            }
        default:
            return state
    }
}
export default InsumoReducer;