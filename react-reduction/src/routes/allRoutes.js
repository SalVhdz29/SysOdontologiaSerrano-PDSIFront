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
import TipoRecurso from '../components/TipoRecurso/TipoRecurso';
import NuevoTipoRecurso from '../components/TipoRecurso/NuevoTipoRecurso/NuevoTipoRecurso';



const userRoutes =[
    {path:"/", component: TipoRecurso},
    
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
    {path:"/TipoRecurso", component: TipoRecurso},

];

const authRoutes=[
    {path:"/login", component:AuthPage}
];


export{
    userRoutes,
    authRoutes
}