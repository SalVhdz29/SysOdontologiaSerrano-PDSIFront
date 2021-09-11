import { 
    SETLISTALOTES, 
    SETFILASLISTALOTESACTIVOS, 
    SETFILASLISTALOTESINACTIVOS,
    SETLISTAHISTORIAL
} from './actionTypes' 
 
const INIT_STATE={ 
    listaLotes:[], 
    filasListaLotesActivos: [], 
    filasListaLotesInactivos: [],
    listaHistorial: [] 
} 
 
const inventarioReducer =(state = INIT_STATE, {type, payload})=>{ 
 
    switch(type) 
    { 
        case SETLISTALOTES: 
            return{ 
                ...state, 
                listaLotes: payload 
            } 
        case SETFILASLISTALOTESACTIVOS: 
            return{ 
                ...state, 
                filasListaLotesActivos: payload 
            } 
        case SETFILASLISTALOTESINACTIVOS: 
            return{ 
                ...state, 
                filasListaLotesInactivos: payload 
            }
        case SETLISTAHISTORIAL:
            return{
                ...state,
                listaHistorial: payload
            } 
        default: 
            return state 
    } 
} 
 
export default inventarioReducer;