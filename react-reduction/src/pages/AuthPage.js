//Librerías
import logo200Image from 'assets/img/logo/logo_200.png';
import React, { useState} from 'react';
import { Card, Col, Row, FormGroup, Spinner } from 'reactstrap';
import superagent from 'superagent';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import Cookies from 'js-cookie';
import { Alert } from 'reactstrap';
import { withRouter, Link } from "react-router-dom"
import logoSerrano from 'assets/img/logo/logoSerrano2.png';

// Redux
import { connect } from "react-redux"

//Endpoints
import { API_LOGIN,
         OBTENER_DATOS_USUARIO_TOKEN
 } from '../api/apiTypes';

 //actions
 import { setDatosUsuario, setTokenUsuario, setListaPermisos } from '../store/actions';



const AuthPage = props =>{

  const [mensaje_error_autenticacion, setMensaje_error_autenticacion] = useState("");
  const [error_autenticacion, setError_autenticacion]=useState(false);
  const [cargando_autenticacion, setCargando_autenticacion]=useState(false);
  const _autenticar=async(passwordIpx, correoElectronicoIpx)=>{
    try{
     
      setCargando_autenticacion(true);
    
      let values={correo_electronico:correoElectronicoIpx, contrasenia:passwordIpx};
      let token = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LOGIN)
                                  .set('Content-Type', 'application/json')
                                  .send(values);
      token = token.body.token;
      

      Cookies.set('token', token);
     

      let datos_usuario = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + OBTENER_DATOS_USUARIO_TOKEN)
                                            .set('Accept', 'application/json')
                                            .set("Authorization", "Bearer " + token);
      datos_usuario = datos_usuario.body;
      datos_usuario.correo_electronico_usuario=correoElectronicoIpx; // borrar Al modificar servicio.
  

      props.setListaPermisos(datos_usuario.permisos)

      localStorage.setItem("authUser", JSON.stringify(
                                                        {
                                                          "usuario_id":datos_usuario.id_usuario,
                                                          "usuario_nombreUsuario": datos_usuario.nombre_usuario,
                                                          "usuario_correoElectronico": datos_usuario.correo_electronico_usuario
                                                          //falta rol
                                                        }
                                                      ));
      // set de datos y token en store.
      let datos={nombre_usuario: datos_usuario.nombre_usuario, correo_electronico_usuario: datos_usuario.correo_electronico_usuario};

      await props.setDatosUsuario(datos);

      await props.setTokenUsuario(token);
    
    setCargando_autenticacion(false);
    
    props.history.push("/");
    }catch(error)
    {
      setCargando_autenticacion(false);
      console.log(error);
      setError_autenticacion(true);
      switch(error.status){
        case 401:
          setMensaje_error_autenticacion(error.message);
          break;
        case 500:
            setMensaje_error_autenticacion(error.message);
          break;
        default:
          setMensaje_error_autenticacion("Error de comunicación con el servidor");
      }

    }
  }


       return (
      <Row
        style={{
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Col md={6} lg={4}>
          <Card body>
            {/* <AuthForm
              authState={this.props.authState}
              onChangeAuthState={this.handleAuthState}
              onLogoClick={this.handleLogoClick}
            /> */}
            <AvForm
              className="form-horizontal"
              onValidSubmit={(e,v) =>{
                
                let {passwordIpx, correoElectronicoIpx} = v;
                _autenticar(passwordIpx, correoElectronicoIpx)
              }}
            >
              <div className="text-center pb-4">
            <img
              src={logoSerrano}
              className="rounded"
              style={{ width: 60, height: 60, cursor: 'pointer' }}
              alt="logo"
              
            />
          </div>
              {error_autenticacion ? (
                <Alert color="danger">{mensaje_error_autenticacion}</Alert>
              ):null}
              <FormGroup>
                <AvField
                  name="correoElectronicoIpx"
                  label="Correo electrónico"
                  value=""
                  className="form-control"
                  placeholder="Ingrese su correo electrónico"
                  type="text"
                  validate={{
                    required: { valued: true, errorMessage: "Ingrese su correo electrónico."}
                  }}
                />
              </FormGroup>
              <FormGroup>
                <AvField
                  name="passwordIpx"
                  label="Contraseña"
                  value=""
                  type="password"
                  placeholder="Ingrese su contraseña"
                  validate={{
                    required: {value: true, errorMessage: "Ingrese una contraseña valida"}
                  }}
                />
              </FormGroup>

              {cargando_autenticacion?
                <center className="float-center">
                    <Spinner className="mr-2" color="primary" />
                </center>
                :
                <div className="mt-3">
                  <button 
                    className="btn btn-primary btn-block waves-effect waves-light"
                    type="submit"
                  >
                    Iniciar Sesión
                  </button>

                </div>
              }
            </AvForm>
          </Card>
        </Col>
      </Row>
    );

}

const mapStateToProps = reducers => {
  return{
    state: reducers.datosUsuarioReducer,
    permisos: reducers.permisosReducer
  }
}

const mapDispatchToProps = dispatch => {
  return{
    setDatosUsuario: (datos) => dispatch(setDatosUsuario(datos)),
    setTokenUsuario: (token) => dispatch(setTokenUsuario(token)),
    setListaPermisos: (permisos) => dispatch(setListaPermisos(permisos)),
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthPage)
  );
