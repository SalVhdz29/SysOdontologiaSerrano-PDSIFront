import { Row, Col } from "reactstrap"
//import { MDBDataTable } from "mdbreact"
import React, {Fragment, useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import ToolkitProvider, { Search }  from 'react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'; 
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import './css/DataTable.css';
const { SearchBar } = Search;

const DataTable = props => {
  //Data que recibirá el mdbDataTable para formar sus filas y columnas

  const[ datos, setDatos]=useState([]);


    useEffect(()=>{
      if(props.datosTabla != undefined)
      {
        setDatos(props.datosTabla);
      }
    },[]);

    useEffect(()=>{
    
      if(props.datosTabla != undefined)
      {
        setDatos(props.datosTabla);
      }
      else{
        setDatos([]);
      }
      
    },[props.datosTabla])

  return (
    // <Fragment>
    //   <Row>
    //     <Col>
    //       <MDBDataTable
    //         responsive
    //         striped
    //         data={data}
    //         paginationLabel={["Anterior", "Siguiente"]}
    //         noBottomColumns
    //         entriesOptions={[10, 20, 50, 100]}
    //         infoLabel={["Mostrando", "a", "de", "datos"]}
    //         searchLabel="Buscar"
    //         entriesLabel="Mostrar datos"
    //       />
    //     </Col>

    //     <br />
    //   </Row>
    // </Fragment>

    <Fragment>
      <Row>
        <Col>
      <ToolkitProvider
        keyField="id"
        data={datos}
        columns={props.columnasTabla}
        search
      >
        {props => (
          <>
          <div style={{
            float:"right"
          }}>
            <SearchBar
              {...props.searchProps}
              placeholder="Buscar"
              style={{
                float:"right",
                margin: "1%",
                borderRadius: "1000px",
              }}
            />
            </div>
            <div>
            <br />
            <BootstrapTable
              striped
              noDataIndication="Sin Registros"
              pagination={paginationFactory({
                withFirstAndLast: false,
              })}
              {...props.baseProps}
            />
          </div>
          </>
        )}
      </ToolkitProvider>
      </Col>
      </Row>
    </Fragment>
  )
}

export default DataTable
