import React, {Fragment, useEffect, useState } from 'react';
import {
    // UncontrolledTooltip,
    Collapse,
    Nav,
    Navbar,
    NavItem,
    NavLink as BSNavLink,
  } from 'reactstrap';
  import { NavLink } from 'react-router-dom';

  import {  MdKeyboardArrowDown, MdExtension } from 'react-icons/md';

const SubMenu = props =>{

    const [ OpenCollapse, setOpenCollapse ] = useState(false);
    const [navComponents, setNavComponents ] = useState([]);

    useEffect(()=>{
        props.navComponents!=null?(setNavComponents(props.navComponents)):(setNavComponents([]));
    },[props.navComponents])

    const _cambioOpenCollapse=()=>{
        setOpenCollapse(!OpenCollapse);
    }



    return(

        <Fragment>
        <NavItem
              className={props.bem.e('nav-item')}
              onClick={()=>{_cambioOpenCollapse()}}
            >
              <BSNavLink className={props.bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdExtension className={props.bem.e('nav-item-icon')} />
                  <span className=" align-self-start">{props.nombreModulo}</span>
                </div>
                <MdKeyboardArrowDown
                  className={props.bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: OpenCollapse
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={OpenCollapse}>
              {navComponents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={props.bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={props.bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
        </Fragment>
    );
}

export default SubMenu;