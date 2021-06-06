import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'

import ExpedienteReducer from './Expediente/reducers'
const rootReducer = combineReducers({
    datosUsuarioReducer,
    ExpedienteReducer
});

export default rootReducer