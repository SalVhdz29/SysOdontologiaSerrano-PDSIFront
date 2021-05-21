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





const TipoRecursos = props =>{

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
    
    const datosTabla=[
        {
            "id_tipo_recurso":1,
            "nombre_tipo_recurso": "Modulo de Seguridad",
            "descripcion_tipo_recurso": "Modulo encargado de la Seguridad",
            "estado_tipo_recurso":1,
        },
        {
          "id_tipo_recurso":2,
          "nombre_tipo_recurso": "Modulo de Expediente",
          "descripcion_tipo_recurso": "Modulo encargado de los Expedientes de Pacientes",
          "estado_tipo_recurso":0,
      }
    ];

    const columnasTabla=[
        {
          text: "id.",
          dataField: "id_tipo_recurso",
        },
        {
          text: "Tipo Recurso",
          dataField: "nombre_tipo_recurso",
        },
        {
          text: "Descripción",
          dataField: "descripcion_tipo_recurso",
        },
        {
          text: "Estado",
          dataField: "estado_tipo_recurso",
        },
        {
          text: "Operaciones",
          dataField: "nombre_campo",
        },
      ];
    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i></i> 
                    Gestión de Tipos de Recursos </h4>
                    <br/>
        <Row>
          <Col md="3" sm="3" xs="3">

            <Button>Crear Nuevo Tipo Recurso</Button>
        
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

export default TipoRecursos;