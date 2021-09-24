import React,{Fragment, useEffect, useState} from 'react';
import superagent from 'superagent';
import { 
    TabContent,
    TabPane,
    Card,
    CardBody,
    CardTitle,
    Container,
    Row,
    Col,
    FormGroup,
    Input
  } from "reactstrap"
  import { FaEye, FaSearch, FaMoneyBillAlt } from 'react-icons/fa';

  import {

    API_OBTENER_EXPEDIENTE
  } from  '../../api/apiTypes';
  
  import Cookies from 'js-cookie';
  import DataTable from '../DataTable/DataTable';
  import NuevoExpediente from '../Expediente/nuevoExpediente';
  import EstimarServicios from '../CitasPorAtender/EstimarServicios/EstimarServicios';
import { setFilasListaUsuariosInactivos } from '../../store/actions';

  const columnasTabla=[
    {
      text: "ID",
      dataField: "id_expediente",
    },
    {
      text: "Paciente",
      dataField: "nombre_paciente",
    },
    {
      text: "Operaciones",
      dataField: "operaciones",
    },
  
  ];


const BusquedaPacientes = props =>{

    const [ listaExpedientes, setListaExpedientes ] = useState([]);
    const [ listaCoincidencias, setListaCoincidencias ]= useState([]);
    const [ filaCoincidencias, setFilaCoincidencias ] = useState([]);
    const [ busqueda, setBusqueda ] = useState("");

    useEffect(()=>{
        _obtenerPacientes();
    },[])

    useEffect(()=>{
        if(busqueda != "")
        {
            _filtrarCoincidencias();
        }
    },[busqueda]);

    useEffect(()=>{
        if(listaCoincidencias.length != 0)
        {
            _armarFilas();
        }
        else{
            setFilaCoincidencias([]);
        }
    },[listaCoincidencias]);


    const _armarFilas =()=>{
        listaCoincidencias.length!=0?(
            ()=>{
              
                let filas = [];
                for(let coincidencia of listaCoincidencias)
                {
                    let{
                        nombre_paciente,
                        id_expediente,
                        apellido_paciente,
                        dui,
                        sexo, correo,
                        telefono, ultima_fecha, fecha_nacimiento,direccion
                    } = coincidencia;

                    let fila={};
                    fila.id_expediente = id_expediente;
                    fila.nombre_paciente = nombre_paciente +" "+ apellido_paciente;

                    let defaultValues={
                        id_expediente:id_expediente,
                        nombre_paciente: nombre_paciente,
                        apellido_paciente: apellido_paciente,
                        dui: dui,
                        sexo: sexo,
                        correo: correo,
                        telefono: telefono,
                        ultima_fecha: ultima_fecha,
                        fecha_nacimiento: fecha_nacimiento,
                        direccion: direccion
                    }
                    
                fila.operaciones=(
                    <div className="btn-group">
                    < FormGroup>
                    <NuevoExpediente
                        isReadOnly={true}
                        defaultValue={defaultValues}
                        classNames={"btn btn-success btn-sm "}
                        mensajeBoton={<FaEye />}
                    />{' '}
                    <EstimarServicios
                    textoBoton={<FaMoneyBillAlt />}
                    id_expediente={id_expediente}
                    nombre_paciente={nombre_paciente + " "+ apellido_paciente}
                    classNames={"btn btn-success btn-sm "}
                    />
                    </FormGroup>
                    </div>
                )

                filas.push(fila);
                }
                console.log("las filas: ", filas);
                setFilaCoincidencias(filas);

               
            }
        )():(console.log(""))
    }


    const _obtenerPacientes=async()=>{
         //await props.setListaExpediente(listaExpediente);      
       let token= Cookies.get('token');


       let respuesta_Expediente = await superagent.post(
         process.env.REACT_APP_ENDPOINT_BASE_URL + API_OBTENER_EXPEDIENTE)
         .set('Accept', 'application/json').set("Authorization", "Bearer " + token);
          setListaExpedientes(respuesta_Expediente.body);
    }

    const _filtrarCoincidencias=()=>{

        let coincidencias =[];
        for(let expediente_it of listaExpedientes)
        {
            
            let { nombre_paciente } = expediente_it;

            if(busqueda != "")
            {
                nombre_paciente = nombre_paciente.toLowerCase();
                let busqueda_str = busqueda.toLowerCase();
                let resultado = nombre_paciente.search(busqueda_str);
                if(resultado != -1)
                {
                    coincidencias.push(expediente_it);
                }
            }
        }
        setListaCoincidencias(coincidencias);
    }

    const _cambioBusqueda=(e)=>{

        setBusqueda(e.target.value);
    }


    return(
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><FaSearch/><i className="far fa-file-alt"> </i>  Busqueda Pacientes </h4><br/>
                  <Row>
                      <Col>
                      <Input type="text" id="busquedaInput" name="busquedaInput" 
                        placeholder="Busqueda por nombre de paciente"
                        value={busqueda}
                        onChange={(e)=>{_cambioBusqueda(e)}}
                      />
                      </Col>
                  </Row>
                  {
                      filaCoincidencias.length!=0?(
                        <DataTable datosTabla={filaCoincidencias} columnasTabla={columnasTabla} />
                      ):(
                          <center><p><b>Sin Coincidencias</b></p></center>
                      )
                  }
                </CardBody>
        </Card>
        </Container>
        </div>
    );
}

export default BusquedaPacientes;