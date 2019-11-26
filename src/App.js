import React, {useEffect, useState} from 'react';
import CookieConsent from "react-cookie-consent";
import { getCurrencies, convert } from './actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import Picker from './Picker';

function App(props) {
  const [state, setState] = useState({
    currencyFrom: 'EUR',
    currencyTo: 'GBP',
    valueInput: '',
    valueOutput: 1,
  })

  useEffect(() => {props.getCurrencies()}, []);
  useEffect(() => {setState({...state, valueOutput: state.valueInput*props.rates})}, [props.rates]);
  useEffect(() => {
    if (state.currencyTo && state.currencyFrom) {
      props.convert(state.currencyFrom, state.currencyTo);
    }
  }, [state.currencyFrom, state.currencyTo]);

  const handleChangePicker = (left, right) => {
    setState({...state, currencyFrom: left, currencyTo: right});
  }

  const handleChangeInput = input => {
    setState({...state, valueInput: input.target.value, valueOutput: input.target.value * props.rates});
  }

  const reverse = () => {
    props.convert(state.currencyTo, state.currencyFrom)
    setState({...state, currencyTo: state.currencyFrom, currencyFrom:state.currencyTo});
  }

  return (
      <div className="App">
        <Picker
          id="currencyPicker"
          className="currencyPicker"
          valueLeft={state.currencyFrom}
          valueRight={state.currencyTo}
          options={props.currencies}
          handleChange={handleChangePicker}
        />
        <div className="bottom">
          <div>
            <input type="number" name="valueFrom" id="valueFrom" min="0" value={state.valueInput} onChange={handleChangeInput} placeholder="Enter a value"/>
            <input type="number" name="valueTo" id="valueTo" value={state.valueOutput} disabled/>
          </div>
          <button onClick={reverse}>Reverse</button>
          <CookieConsent
              location="bottom"
              buttonText="No prob my dude"
              cookieName="cookie"
              style={{ background: "rgb(48, 102, 219)" }}
              buttonStyle={{ backgroundColor: "rgb(241, 241, 241)", fontSize: "13px" }}
          >
              You’re so cool bro, thank you for using this magnificent currency app!
          </CookieConsent>
        </div>


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
