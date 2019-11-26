import React, {useEffect, useState} from 'react';

const Picker = (props) => {
    const [state, setState] = useState({
        open: false,
        selectedLeft: props.valueLeft,
        selectedRight: props.valueLeft
    })

    useEffect(() => {
        props.handleChange(state.selectedLeft, state.selectedRight)
    }, [state.selectedLeft, state.selectedRight])

    useEffect(() => {
        setState({...state, selectedRight: props.valueRight, selectedLeft: props.valueLeft})
    }, [props.valueLeft, props.valueRight])
    
    const setLeft = input => {
        setState({...state, selectedLeft: input.target.dataset.id})
    }
    const setRight = input => {
        setState({...state, selectedRight: input.target.dataset.id})
    }

    const listLeft = props.options.map(
        item => <li key={item} data-id={item} onClick={setLeft} className={(item===state.selectedLeft) ? 'active' : ''}>{item}</li>   
    );

    const listRight = props.options.map(
        item => <li key={item} data-id={item} onClick={setRight} className={(item===state.selectedRight) ? 'active' : ''}>{item}</li>   
    );

    const toggleState = () => {
        setState({...state, open:!state.open})
    }

    return(
        <div className="pickerContainer">
            { state.open ? (
                <div className="pickerOpen">

                    <div className="pickerUl">
                        <ul>
                            {listLeft}
                        </ul>
                        <ul>
                            {listRight}
                        </ul>
                    </div>
                    <button onClick={toggleState}>Close</button>
                </div>
                ) : (
                <div className="pickerClosed">
                    <span>currency converter</span>
                    <div>
                        <button onClick={toggleState}>{state.selectedRight}</button>
                        <button onClick={toggleState}>{state.selectedLeft}</button>
                    </div>

                </div>)
            }

        </div>
    );

}

export default Picker;