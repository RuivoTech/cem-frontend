const Utils = {
    converteData: (rowData, coluna, formato) => {
        let data = rowData[coluna] ? new Date(rowData[coluna]) : "0000-00-00";
        const ano = data.getFullYear();
        const mes = data.getMonth();
        const dia = data.getDate();

        let dataConvertida = "";

        switch (formato) {
            case "DD/MM":
                dataConvertida = dia + '/' + mes;
                break;
            case "DD/MM/YY":
                dataConvertida = dia + '/' + mes + "/" + ano.substring(2, 4);
                break;
            case "DD":
                dataConvertida = dia;
                break;
            case "MM/DD":
                dataConvertida = mes + "/" + dia;
                break;
            default:
                dataConvertida = dia + '/' + mes + '/' + ano;
                break;
        }

        return data && ano !== "0000" ? dataConvertida : (null);
    },
    separarString: (string, quantidadeRetorno) => {
        let stringSplit = string.split(" ");
        let retorno = "";
        for (let i = 0; i < quantidadeRetorno; i++) {
            retorno = retorno + " " + stringSplit[i];
        }

        return retorno;
    }
}

export default Utils;