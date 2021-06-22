import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionUsuariosReducer from './GestionUsuarios/reducer'
import gestionRolesReducer from './GestionRoles/reducer'

import TipoRecursoReducer from './TipoRecurso/reducer'
import ExpedienteReducer from './Expediente/reducers'
const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionUsuariosReducer
    TipoRecursoReducer
    gestionRolesReducer
    ExpedienteReducer
});

export default rootReducer