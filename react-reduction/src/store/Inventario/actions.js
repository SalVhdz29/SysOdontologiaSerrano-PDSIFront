import { SETLISTALOTES,   
    SETFILASLISTALOTESACTIVOS, 
    SETFILASLISTALOTESINACTIVOS         
} from './actionTypes'; 
export const setListaLotes = listaLotes =>({ 
type: SETLISTALOTES, 
payload: listaLotes 
}) 
 
export const setFilasListaLotesActivos = listLotesActivos =>({ 
type: SETFILASLISTALOTESACTIVOS, 
payload: listLotesActivos 
}) 
 
export const setFilasListaLotesInactivos = listLotesInactivos =>({ 
type: SETFILASLISTALOTESINACTIVOS, 
payload: listLotesInactivos 
}) 
 