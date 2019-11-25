export default function ConvertReducer(state = {
    rate: null,
    requested: false,
    success: false,
    error: null,
}, action) {
    
    switch (action.type) {
        case "CONVERT_REQUEST":
            return {...state, requested: true}
        case "CONVERT_ERROR":
            return {...state, requested: false, error: action.payload}
        case "CONVERT_SUCCES":
            return {
                ...state,
                rate: action.payload,
                requested: false,
                success: true,
            }
        default:
            return state
    }
}