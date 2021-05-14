import AuthForm, { STATE_LOGIN } from 'components/AuthForm';
import logo200Image from 'assets/img/logo/logo_200.png';
import React, {Fragment, useState} from 'react';
import { Card, Col, Row, FormGroup, Spinner, Button} from 'reactstrap';
import superagent from 'superagent';

//Endpoints
import { API_LOGIN,
         OBTENER_DATOS_USUARIO_TOKEN
 } from '../api/apiTypes';

import {AvForm, AvField} from 'availity-reactstrap-validation';
import Cookies from 'js-cookie';
import { Alert } from 'reactstrap';


const AuthPage = props =>{

  const [mensaje_error_autenticacion, setMensaje_error_autenticacion] = useState("");
  const [error_autenticacion, setError_autenticacion]=useState(false);
  const [cargando_autenticacion, setCargando_autenticacion]=useState(false);
  const _autenticar=async(passwordIpx, usernameIpx)=>{
    try{
      console.log(passwordIpx, usernameIpx);
      setCargando_autenticacion(true);
    
      let values={correo_electronico:usernameIpx, contrasenia:passwordIpx};
      let token = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + API_LOGIN)
                                  .set('Content-Type', 'application/json')
                                  .send(values);
      token = token.body.token;
      console.log("token ", token);

      Cookies.set('token', token);
      console.log("primero: ===>:", process.env.REACT_APP_ENDPOINT_BASE_URL + API_LOGIN);
      console.log("segundo  ===>: ", process.env.REACT_APP_ENDPOINT_BASE_URL + OBTENER_DATOS_USUARIO_TOKEN);

      let datos_usuario = await superagent.post(process.env.REACT_APP_ENDPOINT_BASE_URL + OBTENER_DATOS_USUARIO_TOKEN)
                                            .set('Accept', 'application/json')
                                            .set("Authorization", "Bearer " + token);
      datos_usuario = datos_usuario.body;
      console.log("vine aqui");
      console.log("datos Usuario", datos_usuario);

      localStorage.setItem("authUser", JSON.stringify(
                                                        {
                                                          "usuario_id":datos_usuario.id_usuario,
                                                          "usuario_nombreUsuario": datos_usuario.nombre_usuario,
                                                          //falta rol
                                                        }
                                                      ));
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
                console.log(v);
                let {passwordIpx, usernameIpx} = v;
                _autenticar(passwordIpx, usernameIpx)
              }}
            >
              <div className="text-center pb-4">
            <img
              src={logo200Image}
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
                  name="usernameIpx"
                  label="Usuario"
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

// class AuthPage extends React.Component {
//   handleAuthState = authState => {
//     if (authState === STATE_LOGIN) {
//       this.props.history.push('/login');
//     } else {
//       this.props.history.push('/signup');
//     }
//   };

//   handleLogoClick = () => {
//     this.props.history.push('/');
//   };

//   render() {
   
//   }
// }

export default AuthPage;
