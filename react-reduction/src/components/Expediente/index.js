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

    const datosTabla=[
        {
            "id_expediente":1,
            "nombre_paciente": "Wilbert Menjivar",
            "sexo": "Masculino",
            "saldo":1000.00,
            "telefono":"7654-3211",
            "ultima_fecha":"16-05-2021",
        },
        {
            "id_expediente":2,
            "nombre_paciente": "Ulises Sanchez",
            "sexo": "Masculino",
            "saldo":349.50,
            "telefono":"7754-9941",
            "ultima_fecha":"05-05-2021",
        },
    ];

    const columnasTabla=[
        {
          text: "ID Expediente",
          dataField: "id_expediente",
        },
        {
          text: "Paciente",
          dataField: "nombre_paciente",
        },
        {
          text: "Sexo",
          dataField: "sexo",
        },
        {
          text: "Saldo",
          dataField: "saldo",
        },
        {
          text: "N° de contacto",
          dataField: "telefono",
        },
        {
          text: "Ultima Cita",
          dataField: "ultima_fecha",
        },
      ];
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

            <Button>Crear Nuevo Expediente</Button>

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