import React, { useState } from "react"
import classnames from "classnames"
import { 
    NavLink,
    NavItem, 
    Nav,
  
  } from "reactstrap" 

  const PestaniasReporteria=(props)=>{
    
return(
<React.Fragment>
        
                  <Nav tabs>
                  <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: props.pestaniaActiva === "1",
                        })}
                        onClick={() => {
                          props.toggle("1")
                        }}
                      >
                      Citas
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: props.pestaniaActiva === "2",
                        })}
                        onClick={() => {
                          props.toggle("2")
                        }}
                      >
                        Servicios
                      </NavLink>
                    </NavItem>

                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({
                          active: props.pestaniaActiva === "3",
                        })}
                        onClick={() => {
                          props.toggle("3")
                        }}
                      >
                        Inventario
                      </NavLink>
                    </NavItem>
                   
                  </Nav>
    </React.Fragment>
)}
export default PestaniasReporteria