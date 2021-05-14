import React, { Component, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';


const Authmiddleware =({
    component: Component,
    layout: Layout,
    isAuthProtected,
    ...rest
}) =>{
    return <Route
            {...rest}
            render={props =>{
                if(isAuthProtected && !localStorage.getItem("authUser") ){
                    return(
                        <Redirect
                            to={{pathname: "/login", state:{ from: props.location}}}
                        />
                    )
                }

                return(
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            }}
        />
}

export default Authmiddleware;
