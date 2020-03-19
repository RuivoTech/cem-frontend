const Utils = {
    converteData: function (rowData, coluna) {
        let data = rowData[coluna];
        const [ ano, mes, dia ] = data.split("-");

        return data.length > 0 ? ( dia + '/' + mes + '/' + ano ) : ( null );
    },
}

export default Utils;