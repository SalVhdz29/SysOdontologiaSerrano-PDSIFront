import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'

import TipoRecursoReducer from './TipoRecurso/reducer'
const rootReducer = combineReducers({
    datosUsuarioReducer,
    TipoRecursoReducer
});

export default rootReducer
