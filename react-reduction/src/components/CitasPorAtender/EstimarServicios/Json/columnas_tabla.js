export const columnas_tabla = [
    {
        dataField:"numero_fila",
        text:"No.",
        headerStyle: () => {
            return { width: "10%" };
          }
    },
    {
        dataField:"nombre_servicio",
        text:"Nombre Servicio",
        headerStyle: () => {
            return { width: "30%" };
          }
    },
    {
        dataField:"precio_servicio",
        text:"Precio Servicio",
        headerStyle: () => {
            return { width: "20%" };
          }
    },
    {
        dataField:"cantidad_servicio",
        text:"Cantidad",
        headerStyle: () => {
            return { width: "10%" };
          }
    },
    {
        dataField:"subtotal",
        text:"Subtotal",
        headerStyle: () => {
            return { width: "20%" };
          }
    },
    {
        dataField:"operaciones",
        text:"Operaciones"
    }
]