import{
    INSERTAR_LISTA_CITAS_HOY,
    INSERTAR_LISTA_PACIENTES_ACTIVOS,
    INSERTAR_LISTA_SERVICIOS_ACTIVOS
} from './actionTypes';

const INIT_STATE={
    listaPacientes:[],
    listaServicios:[],
    listaCitas: [],
}

const CitasPorAtenderReducer =(state = INIT_STATE, {type, payload})=>{

    switch(type)
    {
        case INSERTAR_LISTA_CITAS_HOY:
            return{
                ...state,
                listaCitas: payload
            }
        
        case INSERTAR_LISTA_PACIENTES_ACTIVOS:
            return{
                ...state,
                listaPacientes: payload
            }
        case INSERTAR_LISTA_SERVICIOS_ACTIVOS:
            return{
                ...state,
                listaServicios: payload
            }
        default:
            return state
    }
}

export default CitasPorAtenderReducer;