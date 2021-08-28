import React, { useEffect, useState } from "react"
import Typography from '../../../components/Typography';

import { 
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  FormGroup
} from "reactstrap"

import Cookies from 'js-cookie';
import DataTable from '../../DataTable/DataTable';
import superagent from 'superagent';


//Json
import listHistorial from './Json/listHistorial.json';
import {ColumnasTablaHistorialLote} from './Json/ColumnasTablaHistorialLote';

const HistorialLote = props =>{
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
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Historial ingreso de lote </h4><br/>
                   <p><FormGroup row>
                        De insumo: <Col sm={10}><Typography className="text-primary">Insumo 1</Typography></Col>
                    </FormGroup>
                  </p>
                  <DataTable datosTabla={listHistorial} columnasTabla={ColumnasTablaHistorialLote}/>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default HistorialLote;