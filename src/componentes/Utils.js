const Utils = {
    converteData: function (rowData, column) {
        let dataVisita = rowData.dataVisita;
        const [ ano, mes, dia ] = dataVisita.split("-");

        return dataVisita.length > 0 ? ( dia + '/' + mes + '/' + ano ) : ( null );
    },
}

export default Utils;