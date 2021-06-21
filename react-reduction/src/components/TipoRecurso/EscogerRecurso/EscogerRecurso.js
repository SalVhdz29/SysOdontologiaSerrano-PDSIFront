import React, { Fragment, useEffect, useState } from 'react';
import {
   AvForm,
   AvInput,
   AvCheckboxGroup,
   AvCheckbox
} from 'availity-reactstrap-validation';

import{
    FormGroup,
    Button,
    Modal, 
    Container,
    Label,
    Row,
    Col
} from 'reactstrap';

//Jsons
import listRecursoJson from './Json/listRecurso.json';
import { columnasTabla } from './Json/columnasTabla';


//componente
import DataTable from '../../DataTable/DataTable';


import Cookies from 'js-cookie';

import superagent from 'superagent';

//apiTypes
import{
    API_LISTA_RECURSO_ACTIVOS
} from '../../../api/apiTypes';


const EscogerRecurso = props =>{

    const [modalRecursoOpen, setModalRecursoOpen] = useState(false);
    const [ listaRecurso, setListaRecurso ]= useState([]);

    const [recurso, setRecurso] = useState([]);


    const checkBoxStyle={
        margin:'0px,3px',
    }


//ciclo de vida

    useEffect(()=>{
        _obtenerRecurso();
    },[]);

    useEffect(()=>{
        //console.log("longitud >> ",listaRecurso.length)
        if(listaRecurso.length != 0)
        {  
            
            _setearRecurso();
        }
    },[props.recursoAsignados, listaRecurso])

// fin de ciclo de vida

   //Funcion que simula una petición al servidor por la lista de recursos activos.
    const _obtenerRecurso = async ()=> {
        let RecursoList = await listRecursoJson;
        //setListaRecurso(RecursoList);
        let token= Cookies.get('token');



        let respuesta_recursos = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LISTA_RECURSO_ACTIVOS)
                                                 .set('Accept', 'application/json')
                                                 .set("Authorization", "Bearer " + token);

        console.log("la respuesta: ", respuesta_recursos.body);

        setListaRecurso( respuesta_recursos.body);


    }

 //Funcion que comunica por medio de props los recursos seleccionados.
    const _recursoSubmit=()=>{
        // console.log(v);
        let recurso_marcados=[]; 
        recurso_marcados = recurso.filter((recurso)=> recurso.marcado == true );
        props.submitRecurso(recurso_marcados)
        
        setModalRecursoOpen(false);
    }

    //Funcion que recibe recursos pre seleccionados por props y los selecciona de la lista de recursos.

    const _setearRecurso = ()=>{
        let recurso_n=[]
        listaRecurso.map(recurso_it=>{
            
            let recurso={...recurso_it};
            let marcado=false;
            props.recursoAsignados.map(recurso_asig_it =>{          
                if(recurso_asig_it.id_recurso == recurso.id_recurso)
                {
                    marcado = true;
                }
            })
            recurso.marcado = marcado;
            console.log("recurso >> ",recurso)
            recurso_n.push(recurso);
        })
        setRecurso(recurso_n);
    }


    //Funcion que detecta el cambio en un checkbox en especifico y cambia el valor de seleccionado para ese recurso en el estado.

    const _cambioCheckbox=(event)=>{
        console.log(event);
        let {value}=event.target;
        let recurso_nuevos=[];

        console.log(value);
        recurso.map(recurso_it=>{
            let recurso={...recurso_it};
            console.log("recursoit>> ", recurso);
            if(recurso.id_recurso == value)
            {   
               let valor_actual= recurso_it.marcado;
               console.log("el valor actual: ", valor_actual);
               recurso.marcado=!valor_actual;
               
            }
           
            recurso_nuevos.push(recurso)
        })
        setRecurso(recurso_nuevos)
    }

    //Funcion para verificar si al menos un checkbox fue escogido- NO EN USO.
    const _verificarCheckbox=(value, ctx, input, cb)=>{
        console.log("value: ", value);

        if(value.length!=0)
        {
            return true;
        }
        else
        {
            return "Debe escoger al menos un Recurso para el Nuevo Tipo Rol.";
        }
    }



    return(
        <Fragment>
            
            {/* <FormGroup className="float-right"> */}
            <FormGroup>
                <Button 
                    id="gestionRecursobtn"
                    name="gestionRecursobtn"
                    className="btn btn-dark btn-md btn-block"
                    onClick={()=>{
                        setModalRecursoOpen(true)                      
                    }}
                >
                    Elegir Recurso
                </Button>
            </FormGroup>

            <Modal
                size="lg"
                className="modal-md primary"

                isOpen={modalRecursoOpen}
                toggle={()=>{
                    setModalRecursoOpen()
                }}
                centered={true}
            >
                
                <div className="modal-header">
                    <h4 className="modal-title mt-0"><b>Escoger Recursos Para el Nuevo Tipo Recurso</b></h4>
                    <button
                        type="button"
                        onClick={() => {
                            setModalRecursoOpen()
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
                            <Row>                                
                                <Label for="checkboxExample"><b>Nota:</b> Los recursos Activos que seleccione Cambiarán su modulo por el nuevo.</Label>
                            </Row>
                            <Row>
                                
                                <Col md={12}>
                                <AvCheckboxGroup  name="RecursoEscogidosCbx"         
                                //validate={{ required: { value: true, errorMessage: "Debe elegir al menos un Recurso."},
                                            //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                   //           }}
                                                              >
                                    <Row>
                                   
                                    <table id ="table" className="table table-striped">
                                    {
                                        listaRecurso.length != 0?
                                        (                                              
                                                    recurso.map((recurso,key) =>{
                                                        return(
                                                        //<Col md={20} style={checkBoxStyle} key={key}>
                                                          
                                                         /*
                                                        recurso.estado_recurso?
                                                        (*/

                                                            <tr>
                                                            <td style={checkBoxStyle} key={key}>
                                                            <AvCheckbox 
                                                            label={recurso.nombre_recurso}                                                            
                                                            value={recurso.id_recurso}       
                                                            checked={recurso.marcado}                                                      
                                                            key={key}
                                                            onChange={_cambioCheckbox}
                                                            className="checkbox_animated"
                                                    
                                                            // 
                                                        />
                                                                  </td> <td>
                                                            <label>{recurso.descripcion_recurso} </label>
                                                            </td>                         
                                                         
                                                        
                                                                </tr>

                                                   /*     )
                                                        :undefined
                                                       */

                                                       // </Col>
                                                
                                                        )

                                                    })
                                        )   
                                        :
                                        undefined
                                }
                                                     </table>
                                </Row>
                                </AvCheckboxGroup>
                                </Col>


             
                            </Row>
                        </Container>
                </div>
                <div className="modal-footer">
                    <Row>
                        <Col >
                        { <div className="mt-3">
                            <Button
                              className="btn btn-primary btn-md w-md"
                              onClick={_recursoSubmit}
                              
                            >
                             Asignar
                            </Button>
                          </div>  }
                        </Col>
                        <Col>
                            <div className="mt-3">
                            <Button className="btn btn-danger btn-md w-md " onClick={()=>{setModalRecursoOpen(false)}}>Cancelar</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </Fragment>
            )
}

export default EscogerRecurso