import { combineReducers } from "redux"
import datosUsuarioReducer from './auth/reducer'
import gestionUsuariosReducer from './GestionUsuarios/reducer'
import gestionEstadosReducer from './GestionEstados/reducer'

import gestionRolesReducer from './GestionRoles/reducer'
import gestionRecursosReducer from './GestionRecursos/reducer'
import inventarioReducer from './Inventario/reducer'
import gestionDiagnosticosReducer from './GestionDiagnosticos/reducer'
import gestionServiciosReducer from './GestionServicios/reducer'
import TipoRecursoReducer from './TipoRecurso/reducer'
import ExpedienteReducer from './Expediente/reducers'
import InsumoReducer from './Insumo/reducers'
import permisosReducer from './Permisos/reducer';
import CitasPorAtenderReducer from './CitasPorAtender/reducer'
import CitaModalReducer from './CitasModal/reducer'
const rootReducer = combineReducers({
    datosUsuarioReducer,
    gestionUsuariosReducer,
    TipoRecursoReducer,
    gestionRolesReducer,
    ExpedienteReducer,
    InsumoReducer,	
    gestionRecursosReducer,
    permisosReducer,
    CitasPorAtenderReducer,
    CitaModalReducer,
    inventarioReducer,
    gestionServiciosReducer,
    gestionEstadosReducer,
    gestionDiagnosticosReducer,
});

export default rootReducer