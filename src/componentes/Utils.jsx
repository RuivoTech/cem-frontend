const Utils = {
    converteData: function (rowData, coluna) {
        let data = rowData[coluna];
        const [ ano, mes, dia ] = data.split("-");

        return data.length > 0 && ano !== "0000" ? ( dia + '/' + mes + '/' + ano ) : ( null );
    },
}

export default Utils;