import React, { useEffect, useState } from "react"

import { 
  TabContent,
  TabPane,
  Card,
  CardHeader,
  Button,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap"

import Cookies from 'js-cookie';
import DataTable from '../DataTable/DataTable';


//columnas -tabla TipoRecursos
import {columnasTabla} from './Json/columnasTablaTipoRecurso';

//jsons de prueba
import datosTabla from './Json/TipoRecurso.json';
import NuevoTipoRecurso from "./NuevoTipoRecurso/NuevoTipoRecurso";





const TipoRecurso = props =>{

        const [tokenU, setTokenU] = useState(null);
    useEffect(()=>{
        //obteniendo el token almacenado en las cookies 
    _obtener_token();
      
    },[])

    useEffect(()=>{
        //effect que escucha los cambios del estado: tokenU
        console.log(tokenU);

    },[tokenU])

    const _obtener_token=async()=>{
        let token = Cookies.get('token');
        await setTokenU(token);
    }
    




      
    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i></i> 
                  <b>Gestión de Tipos de Recursos </b></h4>
                    <br/>
        <Row>
          <Col md="3" sm="3" xs="3">

        
            <NuevoTipoRecurso />
          </Col>
          </Row>

                  <DataTable datosTabla={datosTabla} columnasTabla={columnasTabla}/>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default TipoRecurso;