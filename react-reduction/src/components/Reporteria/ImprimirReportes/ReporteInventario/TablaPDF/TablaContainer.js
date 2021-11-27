import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import TablaHeader from './TablaHeader'
import TablaBody from './TablaBody'
import TablaFooter from './TablaFooter'
/* import TablaFooter from './TablaFooter'; */


const tableRowsCount = 11;

const styles = StyleSheet.create({
    tableContainer: {
        /* flexDirection: 'row', */
        /* flexWrap: 'wrap', */
        marginTop: 10,
       /*  paddingBottom: 10, */
        marginBottom: 10,
        /* borderWidth: 1,
        borderColor: '#000000', */
    },
});

  const TablaContainer = props => (
    <View style={styles.tableContainer}>
        <TablaHeader />
        <TablaBody
        etiquetas={props.etiquetas}
         />
        {/* <TablaFooter 
        costo_cita={props.costo_cita}
        deducible_cita={props.deducible_cita}
        pago_cita={props.pago_cita}
        margen_cita={props.margen_cita}
         /> */}
    </View>
  );
  
  export default TablaContainer