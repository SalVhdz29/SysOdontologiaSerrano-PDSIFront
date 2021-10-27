import{
    INSERTAR_LISTA_CITAS_HOY,
    INSERTAR_LISTA_PACIENTES_ACTIVOS,
    INSERTAR_LISTA_SERVICIOS_ACTIVOS
} from './actionTypes';

export const insertarListaCitasHoy = lista=>({
    type: INSERTAR_LISTA_CITAS_HOY,
    payload: lista
});

export const insertarListaPacientesActivos = listaPActivos =>({
    type: INSERTAR_LISTA_PACIENTES_ACTIVOS,
    paylado: listaPActivos
});

export const insertarListaServiciosActivos = listaSActivos =>({
    type: INSERTAR_LISTA_SERVICIOS_ACTIVOS,
    payload: listaSActivos
});
