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
        
        await props.setListaLotes(listaLotes); 
            
    } 

    //Función que llama a los Lotes en el servidor. 
    const _obtenerLotes = async(listaLotes) =>{ 
        //console.log("valor del JSON en el llamado: ", listaLotes); 
        await props.setListaLotes(listaLotes); 
    }
    
    //Función que sirve de puerto en cambios obtenidos por componentes hijos. 
    const _cambiosEnLotes =({tipo, valor})=>{ 
        switch(tipo){ 
          case 'actualizarListaLotes': 
               let nuevas_filas= _cambiarActivoJsonLotes(valor.n_insumo); 
                //console.log("volvio"); 
                _obtenerLotes(nuevas_filas); 
            break; 
/*          case 'agregarLoteLista': 
                let nueva_lista =_agregarLoteALista(valor); 
                //console.log("lo que devolvio: ", nueva_lista); 
                _obtenerLotes(nueva_lista); 
            break; */
   
        default: 
            break; 
    } 
  }

    //Función que simula los cambios de estado en los Lotes en el servidor. -temporal. 
    const _cambiarActivoJsonLotes=(n_insumo)=>{ 
        //console.log("vino al cambio JSOn"); 
        let nueva_lista_lotes=[]; 
        props.state.listaLotes.map(lote=>{ 
          let lote_it = {...lote}; 
          if(lote_it.n_insumo == n_insumo) 
          { 
              let activo = lote_it.lote_activo; 
     
              if(activo == 0) 
              { 
                  activo =1; 
              } 
              else 
              { 
                  activo =0; 
              } 
              lote_it.lote_activo = activo; 
          } 
          nueva_lista_lotes.push(lote_it); 
          
     
        });
   
    //console.log("nuevo valor del JSOn ", listRoles); 
    return nueva_lista_lotes 
} 

    //Función que crea las filas a partir de la lista de Lotes obtenida.
    const _crearFilasListaLote=async()=>{
        //console.log("detecto el cambio");
  
        let filas=[];
  
        props.state.listaLotes.map(lote=>{
  
            let {n_insumo,
                nombre_insumo, 
                existencia_insumo, 
                operaciones_lote,
                lote_activo
                } = lote;
  
                if(lote_activo == 1)
                {
                  lote_activo=true;
                }
                else{
                  lote_activo=false;
                }


                let fila ={};
                fila.n_insumo = n_insumo;
                fila.nombre_insumo=nombre_insumo;
                fila.existencia_insumo = existencia_insumo;
      
                fila.lote_activo = (
                    <div>
                        <SwitchLoteActivo
                            n_insumo={n_insumo}
                            lote_activo={lote_activo}
                            cambioEnLotes={_cambiosEnLotes}
                        />
                    </div>
                ); 
                
                fila.operaciones_lote="Operaciones";
                let defaultValues={
                    nInsumo:n_insumo,
                    nombreInsumo: nombre_insumo,
                    existenciaInsumo: existencia_insumo,
                    loteActivo: lote_activo
                }

                fila.operaciones_lote=(
                    <FormGroup>
      
                    <IngresarLote
                        defaultValue={defaultValues}
                        classNames={"btn-success btn-sm "}
                        isEditable={true}
                        mensajeBoton={<BsBoxArrowInRight />}
                        cambioDatos={_cambiosEnLotes}
                    />{' '}
                    <HistorialLote 
                        defaultValue={defaultValues}
                        classNames={"btn-danger btn-sm "}
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
                  <DataTable datosTabla={listInventario} columnasTabla={ColumnasTablaInventario}/>
                </CardBody>
        </Card>
        </Container>
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = reducers => {
    return{
      state: reducers.InventarioReducer
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