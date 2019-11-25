export default function CurrenciesReducer(state = {
    currencies: [],
    requested: false,
    success: false,
    error: null,
}, action) {
    
    switch (action.type) {
        case "CURRENCIES_REQUEST":
            return {...state, requested: true, currencies: []}
        case "CURRENCIES_ERROR":
            return {...state, requested: false, error: action.payload}
        case "CURRENCIES_SUCCES":
            return {
                ...state,
                requested: false,
                success: true,
                currencies: action.payload
            }
        default:
            return state
    }
}