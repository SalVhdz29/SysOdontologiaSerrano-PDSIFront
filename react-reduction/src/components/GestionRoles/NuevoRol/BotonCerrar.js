import React from 'react';

import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardSubtitle,
  CardBody,
  CardText,
} from 'reactstrap';

class BotonCerrar extends React.Component {
    state = {
      rSelected: null,
      cSelected: [],
    };
  
    onCheckboxBtnClick(selected) {
      const index = this.state.cSelected.indexOf(selected);
      if (index < 0) {
        this.state.cSelected.push(selected);
      } else {
        this.state.cSelected.splice(index, 1);
      }
      this.setState({ cSelected: [...this.state.cSelected] });
    }

    render() {
        return (
            <div className="Boton">
                    <Button color="danger">Cerrar</Button>   
            </div>
              );
        }
}

export default BotonCerrar;