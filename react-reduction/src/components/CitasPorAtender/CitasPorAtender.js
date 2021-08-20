import React, {Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DataTable from '../DataTable/DataTable';
import{
    Button,
    Container,
    Card,
    CardBody,
    Row, Col,
} from 'reactstrap';

import { columnasTabla } from './Json/columnasTabla';

const CitasPorAtender = props =>{

    const [ filasCitas, setFilasCitas ] = useState([]);

    return(
        <Fragment>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestión de Usuarios </h4><br/>

                  <Row>
                    <Col md={4} xs={12}>
                       <Button color="success">Agendar Cita</Button>
                    </Col>
                  </Row>
                  <Row>
                      <Col md={12} xs={12}>
                             <DataTable datosTabla={filasCitas} columnasTabla={columnasTabla}
                                /> 
                      </Col>
                  </Row>
                  
                </CardBody>
        </Card>
        </Fragment>
    )
}