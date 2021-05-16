import { SETDATOSUSUARIO, SETTOKENUSUARIO } from './actionTypes';

const INIT_STATE={
    nombre_usuario: "",
    correo_electronico_usuario: "",
    token_usuario: null

}

const datosUsuarioReducer = (state = INIT_STATE, {type, payload}) =>{
    
    switch(type){
        case SETDATOSUSUARIO:
            
            return{
                ...state,
                nombre_usuario: payload.nombre_usuario,
                correo_electronico_usuario: payload.correo_electronico_usuario,
            }
        
        case SETTOKENUSUARIO:
    
            return{
                ...state,
                token_usuario: payload
            }
        default:
            return state
    }
}

export default datosUsuarioReducer