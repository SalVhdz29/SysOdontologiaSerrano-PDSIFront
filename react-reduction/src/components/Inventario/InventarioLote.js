import React, { useEffect, useState } from "react"

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
import DataTable from '../DataTable/DataTable';
import request from "superagent";

// Redux
import { connect } from "react-redux";

//Componentes
import SwitchLoteActivo from './SwitchLoteActivo/SwitchLoteActivo';
import IngresarLote from "./IngresarLote/IngresarLote";
import { BsBoxArrowInRight, BsClockHistory } from "react-icons/bs";
import HistorialLote from "./HistorialLote/HistorialLote";

//actions
import {
    setListaLotes,
    setFilasListaLotesActivos,
    setFilasListaLotesInactivos
  } from '../../store/actions'

  //apis
  import{
      API_TABLA_INVENTARIO,
      API_TABLA_HISTORIAL
  } from '../../api/apiTypes';

//Json
import {ColumnasTablaInventario} from './Json/ColumnasTablaInventario';
import listInventario from './Json/listInventario.json';

const InventarioLote = props =>{

    const[listaLotes, setListaLotes] = useState([]);
    const[filasListaLotes, setFilasListaLotes] =useState([]);
    
    //CICLO DE VIDA
    useEffect(()=>{
        _obtenerServicios(listInventario);
        },[])

    useEffect(()=>{ 
        //console.log("vino aqui"); 
        setListaLotes(props.state.listaLotes); 
            let result =  _crearFilasListaLote(); 
        }, [props.state.listaLotes]) //detecta cambios en la lista de Lotes en el reducer y vuelve a formar las filas. 

    useEffect(()=>{
        //console.log("valor de filas detectadas: ", props.state.filasListaLotesActivos)
        const _setearFilas =async()=>{
            await setFilasListaLotes(props.state.filasListaLotesActivos);
        }
        _setearFilas();
    },[props.state.filasListaLotesActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.

    //FIN DE CICLO DE VIDA

    //Función que simula la inicialización de servicios. 
    const _obtenerServicios=async(listaLotes)=>{ 
        /* simulando la llamada a un servicio */ 
        //console.log("valor del JSON en el llamado: ", listaLotes); 

        let token= Cookies.get('token');

        
        let respuesta_inventario = await request.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_TABLA_INVENTARIO)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);

        console.log("lotes_ :",respuesta_inventario.body)
        
        await props.setListaLotes(respuesta_inventario.body); 
            
    } 

    //Función que llama a los Lotes en el servidor. 
    const _obtenerLotes = async(listaLotes) =>{ 
        //console.log("valor del JSON en el llamado: ", listaLotes); 
        await props.setListaLotes(listaLotes); 
    }
    




    //Función que crea las filas a partir de la lista de Lotes obtenida.
    const _crearFilasListaLote=async()=>{
        //console.log("detecto el cambio");
  
        let filas=[];
  
        props.state.listaLotes.map(lote=>{
  
            let {id_insumo,
                nombre_insumo, 
                existencia_insumo, 
                operaciones_lote
                } = lote;
  


                let fila ={};
                fila.id_insumo = id_insumo;
                fila.nombre_insumo=nombre_insumo;
                fila.existencia_insumo = existencia_insumo;
      
                
                fila.operaciones_lote="Operaciones";
                let defaultValues={
                    id_insumo,
                    nombreInsumo: nombre_insumo,
                    existenciaInsumo: existencia_insumo
                }

                fila.operaciones_lote=(
                    <FormGroup>
      
                    <IngresarLote
                        defaultValue={defaultValues}
                        classNames={"btn-info btn-sm "}
                        isEditable={true}
                        mensajeBoton={<BsBoxArrowInRight />}
                        cambioDatos={_obtenerServicios}
                    />{' '}
                    <HistorialLote 
                        id_insumo={id_insumo}
                        classNames={"btn-warning btn-sm "}
                        mensajeBoton={<BsClockHistory />}
                        isEditable={false}
                    />
      
                    </FormGroup>
                )

                filas.push(fila);
            })
             props.setFilasListaLotesActivos(filas);
            
          }                

    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Inventario </h4><br/>
                  <DataTable datosTabla={props.state.filasListaLotesActivos} columnasTabla={ColumnasTablaInventario}/>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = reducers => {
    return{
      state: reducers.inventarioReducer
    }
  }

const mapDispatchToProps = dispatch =>{
    return{
        setListaLotes: (datos) =>dispatch(setListaLotes(datos)),
        setFilasListaLotesActivos: (datos) =>dispatch(setFilasListaLotesActivos(datos)),
        setFilasListaLotesInactivos: (datos) =>dispatch(setFilasListaLotesInactivos(datos)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps) (InventarioLote);