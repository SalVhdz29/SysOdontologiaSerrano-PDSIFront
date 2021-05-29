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
import NuevoRol from './NuevoRol/NuevoRol';
import SwitchRol from './SwitchRol/SwitchRol';

//Json
import ListRoles from './Json/ListRoles.json';

//Columnas de tabla de roles
import {ColumnasTablaRol} from './Json/ColumnasTablaRol';

const GestionRoles = props =>{

    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestion de Roles </h4><br/>
                  <row>
                  <Col md={4} xs={12}> 
                        <NuevoRol /> 
                    </Col> 
                  </row>
                  <row>
                  <Col md={12} xs={12}> 
                  <DataTable datosTabla={ListRoles} columnasTabla={ColumnasTablaRol}/>
                  </Col>
                  </row>
                  <row>
                  <Col md={12} xs={12}> 
                  <SwitchRol /> 
                  </Col>
                  </row>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default GestionRoles;