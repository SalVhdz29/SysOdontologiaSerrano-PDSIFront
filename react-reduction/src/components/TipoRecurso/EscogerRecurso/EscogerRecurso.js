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

const EscogerRecurso = props =>{

    const [modalRecursoOpen, setModalRecursoOpen] = useState(false);
    const [ listaRecurso, setListaRecurso ]= useState([]);

    const [recurso, setRecurso] = useState([]);


    const checkBoxStyle={
        margin:'0px,3px',
    }

    useEffect(()=>{
        _obtenerRecurso();
    },[]);


    useEffect(()=>{
        if(listaRecurso.length != 0)
        {
            _setearRecurso();
        }
    },[props.recursoAsignados, listaRecurso])

    const _obtenerRecurso = async ()=> {
        let RecursoList = await listRecursoJson;
         setListaRecurso(RecursoList);
    }

    const _recursoSubmit=()=>{
        // console.log(v);
        let recurso_marcados=[];

  

        recurso_marcados = recurso.filter((recurso)=> recurso.marcado == true );

        props.submitRecurso(recurso_marcados)
        setModalRecursoOpen(false);
    }





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
                    onClick={()=>{setModalRecursoOpen(true)}}
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
                                <Label for="checkboxExample"><b>Nota:</b> los recursos que escoja Cambiarán su modulo por el nuevo</Label>
                            </Row>
                            <Row>
                                <Col md={12}>
                                <AvCheckboxGroup  name="RecursoEscogidosCbx"         
                                validate={{ required: { value: true, errorMessage: "Debe elegir al menos un Recurso."},
                                            //myValidation: _validacionEjemplo -> CUSTOM VALIDATION EXAMPLE ON HOOKS, POR FIN
                                                              }}>
                                    <Row>
                                    {
                                        listaRecurso.length != 0?
                                        (                                              
                                                    listaRecurso.map((recurso,key) =>{
                                                        return(
                                                        <Col md={12} style={checkBoxStyle} key={key}>
                                                        <Row>                                           
                                                            <Col>
                                                        <AvCheckbox 
                                                            label={recurso.nombre_recurso} 
                                                            value={recurso.id_recurso}                                                             
                                                            key={key}
                                                            onChange={_cambioCheckbox}
                                                            className="checkbox_animated"
                                                    
                                                            // 
                                                        />
                                                        </Col>
                                                        <Col>                                                        
                                                       <label>{recurso.descripcion_recurso} </label>
                                                        </Col>
                                                        <Col>
                                                       <label>{recurso.estado_recurso} </label>
                                                        </Col>
                                                        </Row>                                                        
                                                        </Col>
                                                        
                                                        )

                                                    })
                                        )   
                                        :
                                        undefined
                                }
                                    
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