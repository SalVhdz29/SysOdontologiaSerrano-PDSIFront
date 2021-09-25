import { SETLISTALOTES,   
    SETFILASLISTALOTESACTIVOS, 
    SETFILASLISTALOTESINACTIVOS,
    SETLISTAHISTORIAL         
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

export const setListaHistorial = listaHistorial =>({ 
    type: SETLISTAHISTORIAL, 
    payload: listaHistorial 
    })
 