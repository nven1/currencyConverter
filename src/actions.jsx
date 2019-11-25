import axios from 'axios';

export function getCurrencies() {
    return (dispatch) => {
        dispatch({type: "CURRENCIES_REQUEST"});
        axios.get('https://api.ratesapi.io/api/latest')
            .then((response) => {
                let x = [response.data.base,...Object.keys(response.data.rates)]
                dispatch({type: "CURRENCIES_SUCCES", payload: x})
            })
            .catch((err) => {

                dispatch({type: "CURRENCIES_ERROR", payload: err})
            })
    } 
}

export function convert(from, to) {
    return (dispatch) => {
        dispatch({type: "CONVERT_REQUEST"});
        axios.get('https://api.ratesapi.io/api/latest?base='+from+'&symbols='+to)
            .then((response) => {
                console.log('ayy')
                dispatch({type: "CONVERT_SUCCES", payload: response.data.rates[to]})
            })
            .catch((err) => {
                console.log('xx');
                dispatch({type: "CONVERT_ERROR", payload: err})
            })
    } 
}