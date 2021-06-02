import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionRecursosReducer from './GestionRecursos/reducer'


const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionRecursosReducer
});

export default rootReducer
