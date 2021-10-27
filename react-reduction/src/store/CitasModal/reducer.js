import{
INSERTAR_LISTA_PACIENTES_ACTIVOS_MODAL,
INSERTAR_LISTA_SERVICIOS_ACTIVOS_MODAL
} from './actionTypes'

const INIT_STATE={
    listaPacientes:[],
    listaServicios:[],
}

const CitaModalReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case INSERTAR_LISTA_PACIENTES_ACTIVOS_MODAL:
            return{
                ...state,
                listaPacientes: payload
            }
        case INSERTAR_LISTA_SERVICIOS_ACTIVOS_MODAL:
            return{
                ...state,
                listaServicios: payload
            }
        default:
            return state
    }
}

export default CitaModalReducer