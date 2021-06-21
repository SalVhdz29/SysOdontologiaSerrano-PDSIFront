import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionUsuariosReducer from './GestionUsuarios/reducer'


const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionUsuariosReducer
});

export default rootReducer
