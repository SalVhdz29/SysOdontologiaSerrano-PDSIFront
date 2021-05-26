import React, { useEffect, useState } from "react"

import { 
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col
} from "reactstrap"

import Cookies from 'js-cookie';

//Componentes
import DataTable from '../DataTable/DataTable';
//import SwitchRolActivo from './SwitchRolActivo/SwitchRolActivo';

//Json
import ListRoles from './Json/ListRoles.json';

//Columnas de tabla de roles
import {ColumnasTablaRol} from './Json/ColumnasTablaRol';

const GestionRoles = props =>{
        const [listaRoles, setListaRoles] = useState();
        const [filasListaRoles, setFilaListaRoles] = useState();
/*
    useEffect(()=>{
       _obtener_listaRoles(ListRoles);
      
    },[])

    useEffect(()=>{
        console.log("Aqui esta");
        setListaRoles(props.state.listaRoles);
       // let result = _crearFilasListaRol();

    },[props.state.listaRoles])

    useEffect(()=>{
      console.log("Valor de filas detectadas", props.state.filasListaRoles);
      setListaRoles(props.state.listaRoles);
      let result = _crearFilasListaRol();

  },[props.state.listaRoles])

    const _obtener_listaRoles=async(lista)=>{
      //Simulando llamada a servicio
      console.log("Valor del Json en el llamado: ", lista);
        await props.setListaRoles(lista);
    }
   */
    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestion de Roles </h4><br/>
                  <DataTable datosTabla={ListRoles} columnasTabla={ColumnasTablaRol}/>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default GestionRoles;