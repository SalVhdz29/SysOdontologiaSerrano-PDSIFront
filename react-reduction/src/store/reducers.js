import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'


const rootReducer = combineReducers({
    datosUsuarioReducer,
});

export default rootReducer
