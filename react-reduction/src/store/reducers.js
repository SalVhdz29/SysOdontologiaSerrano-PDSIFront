import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionUsuariosReducer from './GestionUsuarios/reducer'
import gestionRolesReducer from './GestionRoles/reducer'
import gestionRecursosReducer from './GestionRecursos/reducer'
import inventarioReducer from './Inventario/reducer'

import TipoRecursoReducer from './TipoRecurso/reducer'
import ExpedienteReducer from './Expediente/reducers'
import permisosReducer from './Permisos/reducer';
const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionUsuariosReducer,
    TipoRecursoReducer,
    gestionRolesReducer,
    ExpedienteReducer,
    gestionRecursosReducer,
    permisosReducer,
    inventarioReducer
});

export default rootReducer