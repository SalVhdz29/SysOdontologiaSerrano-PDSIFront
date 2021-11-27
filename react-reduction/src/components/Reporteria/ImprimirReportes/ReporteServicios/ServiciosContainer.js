import React, {Fragment} from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

import TablaContainer from './TablaPDF/TablaContainer'
import ServiciosHeader from './ServiciosHeader';


const styles = StyleSheet.create({
    page: {
        width: "100%",
        height: '100%',
        paddingHorizontal: 35,
        paddingVertical:35,
        paddingBottom:130,
        
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 11,
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'left',
        color: 'black',
    },
    pageBackground: {
        position: 'absolute',
        minWidth: '100%',
        minHeight: '100%',
        display: 'block',
        height: '100%',
        width: '100%',
      },
});

// Create Document Component
const ServiciosContainer = (props) => { 
    console.log("componentes dentro del container: ", props.componentes_armados)
    return (
                <Document>
                   {/* <Page size="LETTER"  style={styles.page} wrap>
                    <ServiciosHeader />
                      <TablaContainer/> 
                    </Page> */} 
                    {props.componentes_armados!=null?
                    (props.componentes_armados.map(iterator=>{
                        return(
                            iterator
                        )
                    })):
                    ("")}
                </Document> 
    )

};

export default ServiciosContainer;
