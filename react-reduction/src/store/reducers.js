import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionUsuariosReducer from './GestionUsuarios/reducer'

import TipoRecursoReducer from './TipoRecurso/reducer'
const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionUsuariosReducer
    TipoRecursoReducer
});

export default rootReducer
