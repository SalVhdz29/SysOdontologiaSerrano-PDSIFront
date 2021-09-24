import {
    INSERTAR_LISTA_PACIENTES_ACTIVOS_MODAL,
    INSERTAR_LISTA_SERVICIOS_ACTIVOS_MODAL
 } from './actionTypes'

 export const insertarListaPacientesActivosModal = listaP =>({
     type: INSERTAR_LISTA_PACIENTES_ACTIVOS_MODAL,
     payload: listaP
 });

 export const insertarListaServiciosActivosModal = listaS =>({
     type: INSERTAR_LISTA_SERVICIOS_ACTIVOS_MODAL,
     payload: listaS
 })