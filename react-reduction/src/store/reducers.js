import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionUsuariosReducer from './GestionUsuarios/reducer'
import gestionRolesReducer from './GestionRoles/reducer'

import TipoRecursoReducer from './TipoRecurso/reducer'
const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionUsuariosReducer
    TipoRecursoReducer
    gestionRolesReducer
});

export default rootReducer
