import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionRolesReducer from './GestionRoles/reducer'


const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionRolesReducer
});

export default rootReducer
