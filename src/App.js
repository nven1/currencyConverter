import React, {useEffect, useState} from 'react';
import Select from 'react-select'
import { getCurrencies, convert } from './actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';

function App(props) {
  const [state, setState] = useState({
    currencyFrom: null,
    currencyTo: null,
    valueInput: '',
    valueOutput: 0,
  })

  useEffect(() => {props.getCurrencies()}, []);
  useEffect(() => {setState({...state, valueOutput: state.valueInput*props.rates})}, [props.rates]);
  useEffect(() => {
    if (state.currencyTo && state.currencyFrom) {
      props.convert(state.currencyFrom.value, state.currencyTo.value);
    }
  }, [state.currencyFrom, state.currencyTo]);

  const options = props.currencies.map(i => ({value:i, label:i}))
  
  const handleChangeFrom = currencyFrom => {
    setState({...state, currencyFrom: currencyFrom});
  }
  const handleChangeTo = currencyTo => {
    setState({...state, currencyTo: currencyTo});
  }

  const handleChangeInput = input => {
    setState({...state, valueInput: input.target.value, valueOutput: input.target.value * props.rates});
  }

  const reverse = () => {
    props.convert(state.currencyTo.value, state.currencyFrom.value)
    setState({...state, currencyTo: state.currencyFrom, currencyFrom:state.currencyTo});
  }
  
  return (
      <div className="App">
        <Select 
          value={state.currencyFrom}
          onChange={handleChangeFrom}
          name="selectFrom" 
          id="selectFrom"
          options={options}
        />
        <Select 
          value={state.currencyTo}
          onChange={handleChangeTo}
          name="selectTo" 
          id="selectTo"
          options={options}
        />

        <input type="number" name="valueFrom" id="valueFrom" value={state.valueInput} onChange={handleChangeInput} placeholder="Enter value"/>
        <input type="number" name="valueTo" id="valueTo" value={state.valueOutput} disabled/>

        <button onClick={reverse}>Reverse</button>
      </div>

  );
}

App.propTypes = {
  currencyFrom: PropTypes.string,
  currencyTo: PropTypes.string,
  valueInput: PropTypes.number,
  valueOutput: PropTypes.number
}

function mapStateToProps(state) {
    return { 
        currencies: state.CurrenciesReducer.currencies,
        rates: state.ConvertReducer.rate
    }
}

export default connect(mapStateToProps, {getCurrencies, convert})(App);
