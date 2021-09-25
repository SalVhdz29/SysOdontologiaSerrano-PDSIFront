import React from 'react';
import { Redirect } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage';
import AuthPage from '../pages/AuthPage';
import  AlertPage from '../pages/AlertPage';
import  AuthModalPage from'pages/AuthModalPage';
import BadgePage from'pages/BadgePage';
import ButtonGroupPage from 'pages/ButtonGroupPage';
import ButtonPage from 'pages/ButtonPage';
import CardPage from 'pages/CardPage';
import ChartPage from 'pages/ChartPage';
import DropdownPage from 'pages/DropdownPage';
import FormPage from 'pages/FormPage';
import InputGroupPage from 'pages/InputGroupPage';
import ModalPage from 'pages/ModalPage';
import ProgressPage from 'pages/ProgressPage';
import TablePage from 'pages/TablePage';
import TypographyPage from 'pages/TypographyPage';
import WidgetPage from 'pages/WidgetPage';
import BasePage from '../components/BasePage/BasePage';
import GestionUsuarios from '../components/GestionUsuarios/GestionUsuarios';
import TipoRecurso from '../components/TipoRecurso/TipoRecurso';
import NuevoTipoRecurso from '../components/TipoRecurso/NuevoTipoRecurso/NuevoTipoRecurso';
import GestionRoles from '../components/GestionRoles/GestionRoles';
import Expediente from '../components/Expediente/';
import Insumo from '../components/Insumo/Insumo';
import infoRecursos from '../components/GestionRecursos/infoRecursos/infoRecursos'; 
import NuevoRecurso from '../components/GestionRecursos/NuevoRecurso/NuevoRecurso';
import BusquedaPacientes from '../components/BusquedaPacientes/BusquedaPacientes';
import CitasPorAtender from '../components/CitasPorAtender/CitasPorAtender';
import Diagnostico from '../components/Diagnostico/Diagnostico';
import Factura from '../components/Factura/Factura';
import InventarioLote from '../components/Inventario/InventarioLote';
import infoServicios from '../components/GestionServicios/infoServicios/infoServicios';

const userRoutes =[
    //{path:"/", component: TipoRecurso},
    
    //{path:"/", component: BasePage},
    //{path:"/", component: DashboardPage},
    {path:"/AlertPage", component: AlertPage},
    {path: "/AuthModalPage", component: AuthModalPage},
    {path: "/BadgePage", component: BadgePage},
    {path:"/ButtonGroupPage", component: ButtonGroupPage},
    {path:"/ButtonPage", component: ButtonPage},
    {path:"/CardPage", component:CardPage},
    {path:"/ChartPage", component:ChartPage},
    {path:"/DropdownPage", component:DropdownPage},
    {path:"/FormPage", component:FormPage},
    {path:"/InputGroupPage", component:InputGroupPage},
    {path:"/ModalPage", component:ModalPage},
    {path:"/ProgressPage", component:ProgressPage},
    {path:"/TablePage", component:TablePage},
    {path:"/TypographyPage", component:TypographyPage},
    {path:"/WidgetPage", component: WidgetPage},
    {path:"/BasePage", component:BasePage },
    {path:"/GestionUsuarios", component:GestionUsuarios},
    {path:"/TipoRecurso", component: TipoRecurso},
    {path:"/GestionRoles", component:GestionRoles },
    {path:"/Expediente", component:Expediente },
     {path:"/Insumo", component:Insumo },
    {path:"/infoRecursos", component: infoRecursos},
    {path:"/NuevoRecurso", component: NuevoRecurso},
    {path:"/CitasPorAtender", component:CitasPorAtender},
    {path:"/", component: BusquedaPacientes},
    {path:"/Diagnostico", component:Diagnostico},
    {path:"/Factura", component:Factura},
    {path:"/InventarioLote", component:InventarioLote},
    {path: "/infoServicios", component: infoServicios},
];

const authRoutes=[
    {path:"/login", component:AuthPage}
];


export{
    userRoutes,
    authRoutes
}