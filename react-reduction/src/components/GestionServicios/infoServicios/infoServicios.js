import React, { Fragment, useEffect, useState } from "react"

import { 
  Button,
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
import { FaEye, FaPencilAlt } from 'react-icons/fa';

import superagent from 'superagent';

//Componentes
import NuevoServicio from '../NuevoServicio/NuevoServicio';
import DataTable from '../../DataTable/DataTable';
import SwitchServicioActivo from '../SwitchServicioActivo/SwitchServicioActivo';

//jsons de prueba
import listServicios from '../Json/listServicios.json';

//apiTypes
import{
    API_SERVICIOS_REGISTRADOS,
}from '../../../api/apiTypes';

//actions 
import { 
    setListaServicios, 
  } from '../../../store/actions' 
   


// Redux
import { connect } from "react-redux";


//columnas -tabla Servicios
import {columnasTablaServicio} from '../Json/columnasTablaServicios';


//Componentes
const GestionServicios = props =>{

  const[listaServicios, setListaServicios] = useState([]);
  const[filasListaServicio, setFilasListaServicio] =useState([]);

  //Ciclo de vida
  useEffect(()=>{
      _obtenerServiciosV(listServicios);
  },[])

//   useEffect(()=>{
//           //console.log("////");
//        setListaServicios(props.state.listaServicios);
//     let result =  _crearFilasListaServicio();
//   },[props.state.listaServicios]) 

  useEffect(()=>{
    //   console.log("valor de filas detectadas: ", props.state.filasListaServiciosActivos)
    _crearFilasListaServicio()
  },[props.state.listaServicios]) 
  //Fin ciclo de vida



  //Función que simula la inicialización de servicios.
  const _obtenerServiciosV=async(listaServicios)=>{
      /* simulando la llamada a un servicio */
      //console.log("valor del JSON en el llamado: ", listaServicios);
      let token= Cookies.get('token');
     
      let respuesta_servicios = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_SERVICIOS_REGISTRADOS)
                                                .set('Accept', 'application/json')
                                                .set("Authorization", "Bearer " + token);
     let {lista_servicios} = respuesta_servicios.body;
    //  console.log("Respuesta: ", respuesta_servicios.body);

      await props.setListaServicios(listaServicios);
      await props.setListaServicios(respuesta_servicios.body);
      
     
  }
  //Función que llama a los servicios en el servidor.
  const _obtenerServicios = async() =>{
      //console.log("valor del JSON en el llamado: ", listaServicios);
      let token= Cookies.get('token');

      let respuesta_servicios = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_SERVICIOS_REGISTRADOS)
                .set('Accept', 'application/json')
                .set("Authorization", "Bearer " + token);
        //let {lista_servicios} = respuesta_servicios.body;
        // console.log("Respuesta: ", respuesta_servicios.body);
      
        //await props.setListaServicios(listaServicios);
        await props.setListaServicios(respuesta_servicios.body);
  }

  //Función que sirve de puerto en cambios obtenidos por componentes hijos.
  const _cambiosEnServicios =({tipo, valor})=>{

      switch(tipo){
          case 'actualizarListaServicios':

                  //console.log("volvio");
                  _obtenerServicios();
              break;
          case 'agregarServicioLista':
                  let nueva_lista =_agregarServicioALista(valor);
                  //console.log("lo que devolvio: ", nueva_lista);
                  _obtenerServicios(nueva_lista);
              break;
          case 'editarServicioLista':
              //console.log(valor, "deeee");
                  let lista_actualizada =_actualizarServicio(valor);

                  _obtenerServicios(lista_actualizada);
              break;

          default:
              break;
      }
  }

  //Función que crea las filas a partir de la lista de usuarios optenida.
  const _crearFilasListaServicio=async()=>{
      //console.log("detecto el cambio");

      let filas=[];
      if (props.state.listaServicios.length !=0){

        props.state.listaServicios.map(servicio=>{

            let {id_servicio,
                nombre_servicio, 
                descripcion_servicio, 
                costo_servicio,
                precio_servicio, 
                servicio_activo,
                minimo_numero_citas,
                maximo_numero_citas,                
                } = servicio;

                if(servicio_activo == 1)
                {
                    servicio_activo=true;
                }
                else{
                    servicio_activo=false;
                }

            //console.log("funciona");
            let fila ={};
            fila.id_servicio = id_servicio;
            fila.nombre_servicio=nombre_servicio;
            fila.descripcion_servicio = descripcion_servicio;
            fila.costo_servicio = costo_servicio;
            fila.precio_servicio = precio_servicio;
            fila.minimo_citas = minimo_numero_citas;
            fila.maximo_citas = maximo_numero_citas;

            // fila.

            // fila.servicio_activo = (
            //     <div>
            //         <SwitchServicioActivo
            //             id_servicio={id_servicio}
            //             servicio_activo={servicio_activo}
            //             cambioEnServicios={_cambiosEnServicios}
            //         />
            //     </div>
            // );
            fila.operaciones="Coming soon";
                let defaultValues={
                    idServicio:id_servicio,
                    nombreServicio: nombre_servicio,
                    descripcionServicio: descripcion_servicio,
                    costoServicio: costo_servicio,
                    precioServicio: precio_servicio,
                    servicioActivo: servicio_activo,
                    minimo_citas: minimo_numero_citas,
                    maximo_citas: maximo_numero_citas

                }
            fila.operaciones=(
                < FormGroup>

                <NuevoServicio
                    isReadOnly={true}
                    defaultValue={defaultValues}
                    classNames={"btn-success btn-sm "}
                    mensajeBoton={<FaEye />}

                />{' '}
                <NuevoServicio 
                    defaultValue={defaultValues}
                    classNames={"btn-danger btn-sm "}
                    mensajeBoton={<FaPencilAlt />}
                    isEditable={true}
                    cambioDatos={_cambiosEnServicios}

                />

                </FormGroup>
            )
            // console.log(fila);
            filas.push(fila);
      })
        // console.log(filas);
        setFilasListaServicio(filas);
    }

  }

  //Función que simula los cambios de estado en los usuarios en el servidor. -temporal.
  const _cambiarActivoJsonServicios=(id_servicio)=>{

      let nueva_lista_servicios=[];
      props.state.listaServicios.map(servicio=>{
          let servicio_it = {...servicio};
          if(servicio_it.id_servicio == id_servicio)
          {
              let activo = servicio_it.servicio_activo;

              if(activo == 0)
              {
                  activo =1;
              }
              else
              {
                  activo =0;
              }
              servicio_it.servicio_activo = activo;
          }
          nueva_lista_servicios.push(servicio_it);
      });
      
      return nueva_lista_servicios
      //listServicios

  }

  //Función que simula el añadir el usuario obtenido para anexarlo al JSON - temporal.
  const _agregarServicioALista = (nuevo_servicio)=>{
      console.log("servicioagregardo ", nuevo_servicio);

      let { listaServicios } = props.state;

      let n_lista = [];

      listaServicios.map(servicio_it =>{
          let servicio = {...servicio_it};
          n_lista.push(servicio);

      });

      let servicio ={};
      servicio.id_servicio = listaServicios.length + 1;
      servicio.nombre_servicio = nuevo_servicio.nombre_servicio;
      servicio.descripcion_servicio = nuevo_servicio.descripcion_servicio;
      servicio.costo_servicio=nuevo_servicio.costo_servicio;
      servicio.precio_servicio= nuevo_servicio.precio_servicio;
      servicio.minimo_citas=nuevo_servicio.minimo_citas;
      servicio.maximo_citas= nuevo_servicio.maximo_citas;
      servicio.servicio_activo = nuevo_servicio.servicio_activo;

      n_lista.push(servicio);

    return n_lista;

  };

  //Función que simula la actualización en la data de un usuario.
  const _actualizarServicio = (servicio_actualizar)=>{

      let { listaServicios } = props.state;

      let n_lista = [];

      listaServicios.map(servicio_it =>{
          let servicio = {...servicio_it};

          if(servicio.id_servicio == servicio_actualizar.id_servicio)
          {

              servicio.nombre_servicio = servicio_actualizar.nombre_servicio;
              servicio.descripcion_servicio = servicio_actualizar.descripcion_servicio;
              servicio.costo_servicio= servicio_actualizar.costo_servicio;
              servicio.precio_servicio= servicio_actualizar.precio_servicio;
              servicio.minimo_citas= servicio_actualizar.minimo_citas;
              servicio.maximo_citas= servicio_actualizar.maximo_citas;
              servicio.servicio_activo = servicio_actualizar.servicio_activo;
      
          }
          n_lista.push(servicio);

      });

     
    return n_lista;
  }

  return(
      <React.Fragment>
      <div className="page-content">
      <Container fluid={true}>
      <Card>
              <CardBody>
                <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestión de Servicios </h4><br/>

                <Row>
                  <Col md={4} xs={12}>
                      <NuevoServicio 
                          cambioDatos={_cambiosEnServicios}


                      />
                  </Col>
                </Row>
                <Row>
                    <Col md={12} xs={12}>
                           <DataTable datosTabla={filasListaServicio} columnasTabla={columnasTablaServicio}
                              /> 
                    </Col>
                </Row>
                
              </CardBody>
      </Card>
      </Container>
      </div>
      </React.Fragment>
  )
}

const mapStateToProps = reducers => { 
    return{ 
      state: reducers.gestionServiciosReducer 
    } 
  } 
   
   
  const mapDispatchToProps = dispatch =>{ 
    return{ 
        setListaServicios: (datos) =>dispatch(setListaServicios(datos)), 
    } 
  } 

export default connect(mapStateToProps,mapDispatchToProps)(GestionServicios);
