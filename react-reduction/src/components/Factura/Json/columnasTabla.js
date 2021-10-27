export const columnas_tabla=[
    {
        text:"Servicio/Insumo",
        dataField: "nombre_detalle",
        headerStyle: () => {
            return { width: "20%" };
          }
    },
    {
        text:"Cantidad",
        dataField: "cantidad_detalle",
        headerStyle: () => {
            return { width: "10%" };
          }
    },
    {
        text:"Deducible",
        dataField: "deducible_detalle",
        headerStyle: () => {
            return { width: "10%" };
          }
    },
    {
        text:"Subtotal",
        dataField: "subtotal_detalle",
        headerStyle: () => {
            return { width: "10%" };
          }
    },
    {
        text:"Operaciones",
        dataField: "operaciones",
        headerStyle: () => {
            return { width: "10%" };
          }
    }
]