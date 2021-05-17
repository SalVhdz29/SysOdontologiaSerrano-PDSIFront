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
import DataTable from '../DataTable/DataTable';

const BasePage = props =>{
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
            "nombre_paciente": "Salvador",
            "nombre_campo": "el tercer campo",
        }
    ];
    const columnasTabla=[
        {
          text: "No.",
          dataField: "id_expediente",
        },
        {
          text: "Paciente",
          dataField: "nombre_paciente",
        },
        {
          text: "campo 3",
          dataField: "nombre_campo",
        },
      
      ];
    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  titulo Página </h4><br/>
                  <DataTable datosTabla={datosTabla} columnasTabla={columnasTabla}/>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default BasePage;