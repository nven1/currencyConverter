import { combineReducers } from "redux";

import CurrenciesReducer from './Currencies';
import ConvertReducer from './Convert';

export default combineReducers({CurrenciesReducer, ConvertReducer})