import React, {Fragment, useState, useEffect } from 'react'
import{
    Container,
    Card,
    CardBody,
    Row, Col,
    FormGroup,
    Label,
    Button,
    Input
} from 'reactstrap'

import {
    AvField,
    AvForm
} from 'availity-reactstrap-validation'
import { useHistory, useLocation } from 'react-router-dom';
import swal from 'sweetalert';



const Diagnostico=props=>{

    const [ detallesDiagnostico, setDetallesDiagnostico ] = useState("");
    const [ receta, setReceta ] = useState("");

    const [ idCita, setIdCita ] = useState(0)

    const [ idExpediente, setIdExpediente ] = useState(0);
    const [ nombrePaciente, setNombrePaciente ] = useState("");

    const [ idServicio, setIdServicio ]=useState(0);
    const [ servicio , setServicio ] = useState("");

    const location = useLocation();
    const history = useHistory();

    useEffect(()=>{
        _iniciador()
    },[])

    const _iniciador = () =>{
      if(props.location.state != null)
      {
        let {id_expediente, nombre_persona, id_servicio, nombre_servicio, id_cita} = props.location.state;

        setIdExpediente(id_expediente)
        setNombrePaciente(nombre_persona)
        setIdServicio(id_servicio)
        setServicio(nombre_servicio)
        setIdCita(id_cita)
      }
    }

    const _siguiente = () =>{

      swal({
        title:"Siguiente- Facturación",
        icon:"warning",
        text:"¿Desea dar por atendido el servicio y pasar a su facturación?",
        buttons:["Cancelar", "Aceptar"]
      }).then(async respuesta =>{

        if(respuesta == true)
        {
          history.push({
            pathname: "/Factura",
            state:{
               id_cita: idCita,
               id_expediente: idExpediente,
               nombre_persona: nombrePaciente,
               id_servicio: idServicio,
               nombre_servicio: servicio,
               detalle_diagnostico: detallesDiagnostico,
               receta: receta
            }
        });
        }
      })
    }


    return(
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="far fa-file-alt"> </i> Diagnostico:  </h4><br/>

                  <Row>
                    <Col><Input plaintext value="Datos Cita" style={{textDecoration:'underline'}} readOnly /></Col> 
                  </Row>

                  <Row>
                      <Col>
                            <Label for="pacienteSelect"><b>Paciente: </b>{idExpediente}- {nombrePaciente}</Label>
                      </Col>

                      <Col>
                            <Label for="pacienteSelect"><b>Servicio: </b>{idServicio}- {servicio}</Label>
                      </Col>
                  </Row>

                  <Row>
                      <Col>
                      <FormGroup >
                            <Label for="detallesDiagnosticoIpx"><b>Detalles de Diagnostico: </b></Label>
                                        <Col>
                                           <AvForm>
                                               <AvField
                                                    id={"detallesDiagnosticoIpx"}
                                                    name={"detallesDiagnosticoIpx"}
                                                    value={detallesDiagnostico}
                                                    type="textarea"
                                                    onChange={e=>{setDetallesDiagnostico(e.target.value)}}
                                                    validate={{
                                                        required:{value:true, errorMessage:"Escriba el Detalle de diagnostico"}
                                                    }}
                                               />
                                           </AvForm>
                                        </Col>
                          </FormGroup>
                        </Col>
                  </Row>

                  <Row>
                      <Col>
                      <FormGroup >
                            <Label for="recetaIpx"><b>Receta: </b></Label>
                                        <Col>
                                           <AvForm>
                                               <AvField
                                                    id={"recetaIpx"}
                                                    name={"recetaIpx"}
                                                    value={receta}
                                                    type="textarea"
                                                    onChange={e=>{setReceta(e.target.value)}}
                                                    validate={{
                                                        required:{value:true, errorMessage:"Escriba la Receta del diagnostico"}
                                                    }}
                                               />
                                           </AvForm>
                                        </Col>
                          </FormGroup>
                        </Col>
                  </Row>
                  <Row>
                      <Col>
                        <Button color="success" onClick={()=>{_siguiente()}}>Siguiente - Facturacion </Button>
                      </Col>
                  </Row>

                </CardBody>
        </Card>
        </Container>
        </div>
    );
}

export default Diagnostico;