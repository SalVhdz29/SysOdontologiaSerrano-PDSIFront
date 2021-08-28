import { 
    SETLISTALOTES, 
    SETFILASLISTALOTESACTIVOS, 
    SETFILASLISTALOTESINACTIVOS
} from './actionTypes' 
 
const INIT_STATE={ 
    listaLotes:[], 
    filasListaLotesActivos: [], 
    filasListaLotesInactivos: [] 
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
        default: 
            return state 
    } 
} 
 
export default inventarioReducer;