import React, { useEffect, useState } from "react"

import { 
  Button,
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
import DataTable from '../../DataTable/DataTable';

const infoRecursos = props =>{
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
            "id_recurso": 1,
            "nombre_recurso": "Salvador",
            "descripcion_recurso": "Recurso de Salvador",
        },
        {
          "id_recurso": 2,
          "nombre_recurso": "Daniel",
          "descripcion_recurso": "Recurso de Daniel",
      },
    ];
    
    const columnasTabla=[
        {
          text: "ID Rec.",
          dataField: "id_recurso",
        },
        {
          text: "Recurso",
          dataField: "nombre_recurso",
        },
        {
          text: "Descripcion",
          dataField: "descripcion_recurso",
        },
        {
          text: "Activo",
          dataField: "",
        },
        {
          text: "Operaciones",
          dataField: "",
        },
      
      ];
    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>

        <Card>
                <CardBody>
                  
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestion de Recursos </h4><br/>
                  <Button color="primary">Crear Nuevo Recurso</Button>
                  <DataTable datosTabla={datosTabla} columnasTabla={columnasTabla}/>
                  
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default infoRecursos;