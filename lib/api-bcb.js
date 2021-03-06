const axios = require('axios');

const getUrl = date => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao=\'${date}\'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`

const getCotacaoAPI = date => axios.get(getUrl(date));
const extractCotacao = (res) => res.data.value[0].cotacaoVenda;

const getToday = () => {
    const today = new Date();
    return (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
}

const getCotacao = async() => {
    try{
        const today = getToday();
        const res = await getCotacaoAPI(today);
        const cotacao = extractCotacao(res);

        return cotacao;
    } catch (err) {
        return '';
    }
}

module.exports = {
    getCotacaoAPI,
    getCotacao,
    extractCotacao,
    getToday
}