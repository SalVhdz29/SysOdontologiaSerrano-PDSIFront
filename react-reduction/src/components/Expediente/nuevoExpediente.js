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
import Expediente from './index.js';

const nuevoExpediente = props =>{

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
         <form role="form" className="col-6 mr-auto ml-auto">
           
            <div className="form-group">

              <h3 className="text-center m-3 mb-5">Datos del paciente</h3>

              <label for="nombre_paciente" className="">Nombre Completo:</label>
              <input type="text" className="form-control mb-3" id="nombre_paciente"/>

              <label for="sexo" className="">Sexo:</label>
              <select className="form-control mb-3">
                <option selected value="coconut">---Seleccione un Genero---</option>
                <option value="m">Masculino</option>
                <option value="f">Femenino</option>
              </select>

              <label for="correo" className="">Correo electronico:</label>
              <input type="mail" className="form-control mb-3" id="correo"/>

              <label for="direccion" className="">Direccion:</label>
              <input type="text" className="form-control mb-3" id="direccion"/>

              <label for="celular" className="">Celular:</label>
              <input type="text" className="form-control mb-3" id="celular"/>

              <label for="saldo" className="">Saldo:</label>
              <input type="text" className="form-control mb-3" id="saldo"/>

            </div>



            <div className="form-group">
              <input type="submit" className="btn btn-success m-2 col-5" value ="Guardar"/>
              <a href = "/Expediente"><button className="btn btn-success m-2 col-5">Cancelar</button></a>
            </div>

          </form>
        </Container>
        </div>
        </React.Fragment>
    )
}

export default nuevoExpediente; 