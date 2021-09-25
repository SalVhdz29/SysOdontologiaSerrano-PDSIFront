import React, { useEffect, useState, Fragment } from "react"
import Typography from '../../../components/Typography';

import { 
  TabContent,
  TabPane,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Modal,
  Col,
  Button,
  FormGroup
} from "reactstrap"

import DataTable from '../../DataTable/DataTable';
import superagent from 'superagent';
import swal from 'sweetalert'; 
import request from "superagent";
import Cookies from 'js-cookie';
import{ 
  AvForm, 
  AvField 
} from 'availity-reactstrap-validation' 

import {
  API_TABLA_HISTORIAL
} from '../../../api/apiTypes'

// Redux
import { connect } from "react-redux";

//Json
import listHistorial from './Json/listHistorial.json';
import {ColumnasTablaHistorialLote} from './Json/ColumnasTablaHistorialLote';

//actions
import {
  setListaHistorial
} from '../../../store/actions'

const HistorialLote = props =>{

  const [modalOpen, setModalOpen ]= useState(false);
  const[listaHistorial, setListaHistorial] = useState([]);
  const[filasListaHistorial, setFilasListaHistorial] =useState([]);
  const [obtenido, setObtenido]=useState(false)

  //CICLO DE VIDA
  // useEffect(()=>{
    
  //   },[])

    useEffect(()=>{ 
      //console.log("vino aqui"); 
      if(obtenido == false)
      {
        _obtenerServicios();
      }
    
         _crearFilasListaHistorial()
      }, [listaHistorial, modalOpen]) //detecta cambios en la lista del historial en el reducer y vuelve a formar las filas. 

    //FIN DE CICLO DE VIDA  
    
    //Función que simula la inicialización de servicios. 
    const _obtenerServicios=async()=>{ 
      /* simulando la llamada a un servicio */ 
      //console.log("valor del JSON en el llamado: ", listaHistorial); 
      let token= Cookies.get('token');
      let respuesta_historial = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_TABLA_HISTORIAL)
      .send({id_insumo: props.id_insumo})
      .set('Accept', 'application/json')
      .set("Authorization", "Bearer " + token);
      console.log("respuesta historial: ", respuesta_historial.body)


        await setListaHistorial(respuesta_historial.body); 
        setObtenido(true)
 
   
          
    } 

    //Función que crea las filas a partir de la lista de Lotes del historial obtenida.
    const _crearFilasListaHistorial=async()=>{
      //console.log("detecto el cambio");

      let filas=[];
      console.log("listaHisotirila: ", listaHistorial)

     listaHistorial.map(lote=>{

          let {n_lote,
              fecha_lote, 
              existencia_lote, 
              estado_lote
              
              } = lote;

          let fila ={};
          fila.n_lote = n_lote;
          fila.fecha_lote=fecha_lote;
          fila.existencia_lote = existencia_lote;
          fila.estado_lote = estado_lote;
          
          filas.push(fila);

        })
        console.log("nfilas. ",filas)
        setFilasListaHistorial(filas)
       
     }

    return(
        <Fragment>
          {/* <FormGroup className="float-right"> */} 
          <Button  
                    className="btn btn-warning" 
                    onClick={()=>{setModalOpen(true)}} 
 
                > 
                    {props.mensajeBoton!=undefined?(
                        props.mensajeBoton
                    ):(
                        "Historial"
                        )
                    }
                </Button> 
 
            <Modal 
                size="lg" 
                isOpen={modalOpen} 
                toggle={()=>{ 
                    setModalOpen() 
                }} 
                centered={true} 
            > 
                 <div className="modal-header"> 
                    <h4 className="modal-title mt-0">Historial de ingreso de lote</h4> 
                    <button 
                        type="button" 
                        onClick={() => { 
                            setModalOpen() 
                        }} 
                        className="close" 
                        data-dismiss="modal" 
                        aria-label="Close" 
                    > 
                        <span aria-hidden="true">&times;</span> 
                    </button> 
 
                </div>
                <div className="modal-body"> 
                    <Container fluid={true}> 
                      <Card>
                        <CardBody>
                          <p><FormGroup row>
                          De insumo: <Col sm={10}><Typography className="text-primary">Insumo 1</Typography></Col>
                          </FormGroup>
                          </p>
                          <DataTable datosTabla={filasListaHistorial} columnasTabla={ColumnasTablaHistorialLote}/>
                        </CardBody>
                      </Card>
                    </Container>
                  </div>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = reducers => {
  return{
    state: reducers.inventarioReducer
  }
}

const mapDispatchToProps = dispatch =>{
  return{
      setListaHistorial: (datos) =>dispatch(setListaHistorial(datos)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HistorialLote);