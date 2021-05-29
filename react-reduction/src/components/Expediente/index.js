import React, { useEffect, useState } from "react"; 

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

import datosTabla from './Json/listExpediente.json';
import {columnasTabla} from './Json/columnasExpediente.js';
import nuevoExpediente from './nuevoExpediente.js';





const Expediente = props =>{

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
                    Gestión de Expediente </h4>
                    <br/>
        <Row>
          <Col md="3" sm="3" xs="3">

            <a href = "/nuevoExpediente"><Button>Nuevo Expediente</Button></a>

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

export default Expediente; 