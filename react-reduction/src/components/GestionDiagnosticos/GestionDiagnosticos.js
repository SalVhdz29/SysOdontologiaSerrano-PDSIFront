//librerias
import React, { Fragment, useEffect, useState } from "react"

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

import { FaEye, FaPencilAlt } from 'react-icons/fa';
import {GrConfigure } from 'react-icons/gr';

import Cookies from 'js-cookie';

import superagent from 'superagent';

//Componentes
import NuevoDiagnostico from './NuevoDiagnostico/NuevoDiagnostico';
import DataTable from '../DataTable/DataTable';
import SwitchDiagnosticoActivo from './switchDiagnosticoActivo/SwitchDiagnosticoActivo';

//jsons de prueba
import listDiagnosticos from './Json/listDiagnosticos.json';
import listPiezas from './Json/listPiezas.json';
import listEstados from './Json/listEstados.json';

//apiTypes
import {
    API_LISTA_DIAGNOSTICO_REGISTRADOS,
    API_LISTA_DIAGNOSTICO_ESTADOS,
    API_LISTA_PIEZAS_ACTIVOS
} from '../../api/apiTypes';

// Redux
import { connect } from "react-redux";

//actions
import {
    setListaDiagnosticos,
    setListaPiezas,
    setListaEstados,
    setFilasListaDiagnosticosActivos,
    setFilasListaDiagnosticosInactivos
} from '../../store/actions'

//columnas -tabla diagnosticos
import {columnasTablaDiagnostico} from './Json/columnasTablaDiagnosticos';




//Componentes
const GestionDiagnosticos = props =>{

    const[listaDiagnosticos, setListaDiagnosticos] = useState([]);
    const[filasListaDiagnostico, setFilasListaDiagnostico] =useState([]);
    const[listaPiezas, setListaPiezas] = useState([]);
    const [correos, setCorreos] = useState([]);

    //Ciclo de vida
    useEffect(()=>{
        _obtenerServicios(listDiagnosticos, listPiezas, listEstados);
    },[])

    useEffect(()=>{
            //console.log("vino aqui");
         setListaDiagnosticos(props.state.listaDiagnosticos);
      let result =  _crearFilasListaDiagnostico();
    },[props.state.listaDiagnosticos]) //detecta cambios en la lista de diagnosticos en el reducer y vuelve a formar las filas.

    useEffect(()=>{
        //console.log("valor de filas detectadas: ", props.state.filasListaDiagnosticosActivos)
        const _setearFilas =async()=>{
            await setFilasListaDiagnostico(props.state.filasListaDiagnosticosActivos);
        }
        _setearFilas();
    },[props.state.filasListaDiagnosticosActivos]) //detecta cambios en las filas en el reducer y las setea en el estado local - de momento, inutil.
    //Fin ciclo de vida

    //Función que simula la inicialización de servicios.
    const _obtenerServicios=async(listDiagnosticos, listaPiezas,listaEstados)=>{
        /* simulando la llamada a un servicio */
        //console.log("valor del JSON en el llamado: ", listaDiagnosticos);
        let token= Cookies.get('token');

        
        let respuesta_Piezas = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_PIEZAS_ACTIVOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
    
        console.log("la respuesta: ", respuesta_Piezas.body);

        await props.setListaPiezas(respuesta_Piezas.body);

        
        let respuesta_estados = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_DIAGNOSTICO_ESTADOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
    
        console.log("la respuesta: ", respuesta_estados.body);


        await props.setListaEstados(respuesta_estados.body);

        let respuesta_diagnosticos = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_DIAGNOSTICO_REGISTRADOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);
        //let {lista_diagnosticos} = respuesta_diagnosticos.body;
        console.log("la respuesta: ", respuesta_diagnosticos.body);
 
        //await props.setListaDiagnosticos(listaDiagnosticos);
        await props.setListaDiagnosticos(respuesta_diagnosticos.body);
        
       
    }
    //Función que llama a los diagnosticos en el servidor.
    const _obtenerDiagnosticos = async() =>{
        //console.log("valor del JSON en el llamado: ", listaDiagnosticos);
        let token= Cookies.get('token');

        let respuesta_diagnosticos = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_DIAGNOSTICO_REGISTRADOS)
                .set('Accept', 'application/json')
                .set("Authorization", "Bearer " + token);
        //let {lista_diagnosticos} = respuesta_diagnosticos.body;
        console.log("la respuesta: ", respuesta_diagnosticos.body);

        //await props.setListaDiagnosticos(listaDiagnosticos);
        await props.setListaDiagnosticos(respuesta_diagnosticos.body);
 
    }

    //Funcion que llama a los Piezas activos sin diagnostico en el servidor.
    const _obtenerPiezas = async() =>{
        let token= Cookies.get('token');

        let respuesta_Piezas = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_PIEZAS_ACTIVOS)
        .set('Accept', 'application/json')
        .set("Authorization", "Bearer " + token);

        console.log("la respuesta: ", respuesta_Piezas.body);

        await props.setListaPiezas(respuesta_Piezas.body);
    }

    //Función que sirve de puerto en cambios obtenidos por componentes hijos.
    const _cambiosEnDiagnosticos =({tipo, valor})=>{
      
        switch(tipo){
            case 'actualizarListaDiagnosticos':
                  
                    _obtenerDiagnosticos();
                break;
            case 'actualizarListaPiezas':
                _obtenerPiezas();
                break;
            case 'agregarDiagnosticoLista':
                    let nueva_lista =_agregarDiagnosticoALista(valor);
                 
                    _obtenerDiagnosticos(nueva_lista);
                break;
            case 'editarDiagnosticoLista':
                
                    let lista_actualizada =_actualizarDiagnostico(valor);
        
                    _obtenerDiagnosticos(lista_actualizada);
                break;

            default:
                break;
        }
    }

    //Función que crea las filas a partir de la lista de diagnosticos optenida.
    const _crearFilasListaDiagnostico=async()=>{
        

        let filas=[];
        if(props.state.listaDiagnosticos.length != 0)
        {
            let correos=[];
            for(let diagnostico of props.state.listaDiagnosticos)
            {
                let { correo_electronico, id_diagnostico } = diagnostico;
                let correo={correo_electronico, id_diagnostico}
                correos.push(correo)
            }
    
            setCorreos(correos);

       
            props.state.listaDiagnosticos.map(diagnostico=>{

                let {id_diagnostico,
                    nombre_diagnostico, 
                    id_f_empleado, 
                    nombre_empleado, 
                    correo_electronico, 
                    fecha_creacion, 
                    diagnostico_activo,
                    estados } = diagnostico;

                    if(diagnostico_activo == 1)
                    {
                        diagnostico_activo=true;
                    }
                    else{
                        diagnostico_activo=false;
                    }


                let fila ={};
                fila.id_diagnostico = id_diagnostico;
                fila.nombre_diagnostico=nombre_diagnostico;
                //fila.id_empleado = id_f_empleado;
                fila.nombre_empleado= nombre_empleado;
                fila.correo_electronico = correo_electronico;
                fila.fecha_creacion = fecha_creacion;

                // fila.
                fila.estados=(
                    <ul>
                        {estados.map(rol => {
                            return(
                        <li>{rol.nombre_diagnostico}</li>
                        )
                        })
                        }

                    </ul>
                )

                fila.diagnostico_activo = (
                    <div>
                        <SwitchDiagnosticoActivo
                            id_diagnostico={id_diagnostico}
                            diagnostico_activo={diagnostico_activo}
                            cambioEnDiagnosticos={_cambiosEnDiagnosticos}
                        />
                    </div>
                );
                fila.operaciones="Coming soon";
                    let defaultValues={
                        idDiagnostico:id_diagnostico,
                        nombreDiagnostico: nombre_diagnostico,
                        empleado:{label:nombre_empleado, value:id_f_empleado},
                        correoElectronico: correo_electronico,
                        diagnosticoActivo: diagnostico_activo,
                        estados:estados
                    }
                fila.operaciones=(
                    < FormGroup>

                    <NuevoDiagnostico
                        isReadOnly={true}
                        defaultValue={defaultValues}
                        classNames={"btn-success btn-sm "}
                        mensajeBoton={<FaEye />}
                        correos={correos}
                    />{' '}
                    <NuevoDiagnostico 
                        defaultValue={defaultValues}
                        classNames={"btn-danger btn-sm "}
                        mensajeBoton={<FaPencilAlt />}
                        isEditable={true}
                        cambioDatos={_cambiosEnDiagnosticos}
                        correos={correos}
                    />

                    </FormGroup>
                )
                filas.push(fila);
            })

        }
         props.setFilasListaDiagnosticosActivos(filas);


    }

    //Función que simula los cambios de estado en los diagnosticos en el servidor. -temporal.
    const _cambiarActivoJsonDiagnosticos=(id_diagnostico)=>{
        //console.log("vino al cambio JSOn");
        let nueva_lista_diagnosticos=[];
        props.state.listaDiagnosticos.map(diagnostico=>{
            let diagnostico_it = {...diagnostico};
            if(diagnostico_it.id_diagnostico == id_diagnostico)
            {
                let activo = diagnostico_it.diagnostico_activo;

                if(activo == 0)
                {
                    activo =1;
                }
                else
                {
                    activo =0;
                }
                diagnostico_it.diagnostico_activo = activo;
            }
            nueva_lista_diagnosticos.push(diagnostico_it);
           

        });
        
        //console.log("nuevo valor del JSOn ", listDiagnosticos);
        return nueva_lista_diagnosticos
        //listDiagnosticos
        /* comente las lineas donde clonaba el objeto porque no estoy modificando el store invalidamente, solo el JSOn de prueba. */
    }

    //Función que simula el añadir el diagnostico obtenido para anexarlo al JSON - temporal.
    const _agregarDiagnosticoALista = (nuevo_diagnostico)=>{
        console.log("el uevo ", nuevo_diagnostico);

        let { listaDiagnosticos } = props.state;

        let n_lista = [];

        listaDiagnosticos.map(diagnostico_it =>{
            let diagnostico = {...diagnostico_it};
            n_lista.push(diagnostico);

        });

        let diagnostico ={};
        diagnostico.id_diagnostico = listaDiagnosticos.length + 1;
        diagnostico.id_f_empleado = nuevo_diagnostico.id_f_empleado
        diagnostico.nombre_empleado = nuevo_diagnostico.nombre_empleado
        diagnostico.nombre_diagnostico = nuevo_diagnostico.nombre_diagnostico;
        diagnostico.correo_electronico = nuevo_diagnostico.correo_electronico;
        diagnostico.fecha_creacion = "hoy";
        diagnostico.diagnostico_activo = nuevo_diagnostico.diagnostico_activo;
        // diagnostico.estados=nuevo_diagnostico.estados;

        let n_estados = [];
        nuevo_diagnostico.estados.map(rol_it=>{
            let rol = {id_diagnostico:rol_it.id_diagnostico, nombre_diagnostico:rol_it.nombre_diagnostico};
            n_estados.push(rol);
        });

        diagnostico.estados=n_estados;

        n_lista.push(diagnostico);
        //console.log("la lista antes de ingresar ", n_lista);
      return n_lista;

    };

    //Función que simula la actualización en la data de un diagnostico.
    const _actualizarDiagnostico = (diagnostico_actualizar)=>{

        let { listaDiagnosticos } = props.state;

        let n_lista = [];

        listaDiagnosticos.map(diagnostico_it =>{
            let diagnostico = {...diagnostico_it};

            if(diagnostico.id_diagnostico == diagnostico_actualizar.id_diagnostico)
            {
                //console.log("coincidencia: ",diagnostico.id_diagnostico);
                diagnostico.nombre_empleado = diagnostico_actualizar.nombre_empleado
                diagnostico.nombre_diagnostico = diagnostico_actualizar.nombre_diagnostico;
                diagnostico.correo_electronico = diagnostico_actualizar.correo_electronico;
                diagnostico.fecha_creacion = "hoy";
                diagnostico.diagnostico_activo = diagnostico_actualizar.diagnostico_activo;
        
                let n_estados = [];
                diagnostico_actualizar.estados.map(rol_it=>{
                    let rol = {id_diagnostico:rol_it.id_diagnostico, nombre_diagnostico:rol_it.nombre_diagnostico};
                    n_estados.push(rol);
                });
        
                diagnostico.estados=n_estados;
            }
            n_lista.push(diagnostico);

        });

       
      return n_lista;
    }

    return(
        <React.Fragment>
        <div className="page-content">
        <Container fluid={true}>
        <Card>
                <CardBody>
                  <h4><i className="fas fa-stethoscope"><i className="far fa-file-alt"></i>  </i>  Gestión de Diagnosticos </h4><br/>

                  <Row>
                    <Col md={4} xs={12}>
                        <NuevoDiagnostico 
                            cambioDatos={_cambiosEnDiagnosticos}
                            listaPiezas={props.state.listaPiezas}
                            correos={correos}
                        />
                    </Col>
                  </Row>
                  <Row>
                      <Col md={12} xs={12}>
                             <DataTable datosTabla={props.state.filasListaDiagnosticosActivos} columnasTabla={columnasTablaDiagnostico}
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
      state: reducers.gestionDiagnosticosReducer
    }
  }
  

const mapDispatchToProps = dispatch =>{
    return{
        setListaDiagnosticos: (datos) =>dispatch(setListaDiagnosticos(datos)),
        setListaPiezas: (datos) =>dispatch(setListaPiezas(datos)),
        setListaEstados: (datos) =>dispatch(setListaEstados(datos)),
        setFilasListaDiagnosticosActivos: (datos) =>dispatch(setFilasListaDiagnosticosActivos(datos)),
        setFilasListaDiagnosticosInactivos: (datos) =>dispatch(setFilasListaDiagnosticosInactivos(datos))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GestionDiagnosticos);
