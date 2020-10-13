import React, { useState } from 'react'


function Calculator() {
    const [display, setdisplay] = useState("0");
    const [equation, setequation] = useState(' ');

    const numero = (e) => {
        const val = e.currentTarget.value;
        if (!equation.includes("=")) {
            setdisplay(val)
            setequation(val)
        }

        if (equation.match(/[0-9]$/)) {
            setdisplay(display + val)
            setequation(equation + val)
        }
        else if (equation.match(/[+-/*\/]$/)) {
            setdisplay(val)
            setequation(equation + val)
        }

    }
    const operator = (e) => {
        const val = e.currentTarget.value;

        if (equation.match(/[+-/*\/]$/)) {
            setdisplay(display)
            setequation(equation)
        }
        if (equation.match(/[0-9]$/)) {
            setdisplay(display + val)
            setequation(equation + val)
        }
        if (equation.includes("=")) {
            setdisplay(display + val)
            setequation(equation.slice(equation.indexOf("=") + 1) + val)
        }
        if (equation === "") {
            setequation(display + val);
        }
    }
    const decimal = (e) => {
        const val = e.currentTarget.value;
        if (!equation.includes(val)) {
            setdisplay(display + val)
            setequation(equation + val)
        }
    }
    const percent = () => {
        setdisplay(display / 100);
        setequation(equation.slice(0, equation.search(/[+-/*\/]/) + 1) + (display / 100))
    }
    const clear = () => {
        setequation("");
        setdisplay("0")
    }
    const del = () => {
        if (equation.includes("=")) {
            setequation("")
        }
        else{
            setdisplay(display.slice(0, -1));
            setequation(equation.slice(0, -1));
        }
    }
    const clrdisplay = () => {
        setdisplay("0")
    }
    const inverse = () =>{
        setdisplay(1/display);
        setequation(equation.slice(0, equation.search(/[+-/*\/]/) + 1) + (1/display)) 
    }
    const equals = (e) => {
        if (equation === "" ) {
            setequation("0")
            setdisplay("0")
        }
        else{
            const val = e.currentTarget.value;
            const ans = eval(equation);
            setequation(equation + val + ans)
            setdisplay(ans)
        }

    }
    return (
        <div className="container">
            <Display equation={equation} display={display} />
            <div className="mseries">
                <Button value="MC" display="MC" class="row1 col1" />
                <Button value="MR" display="MR" class="row1 col2" />
                <Button value="M+" display="M+" class="row1 col3" />
                <Button value="MC-" display="M-" class="row1 col4" />
                <Button value="M*" display="M*" class="row1 col5" />
            </div>
            <div className="disp">
                <Button value="%" display="%" class="row2 col1" click={percent} />
                <Button value="CE" display="CE" class="row2 col2" click={clrdisplay} />
                <Button value="C" display="C" class="row2 col3" click={clear} />
                <Button value="<x|" display="<x|" class="row2 col4" click={del} />
                <Button value="1/x" display="1/x" class="row3 col1" click={inverse} />
                <Button value="x*" display="x*" class="row3 col2" />
                <Button value="1/x*" display="1/x*" class="row3 col3" />
                <Button value="/" display="÷" class="row3 col4" click={operator} />
                <Button value="7" display="7" class="row4 col1" click={numero} />
                <Button value="8" display="8" class="row4 col2" click={numero} />
                <Button value="9" display="9" class="row4 col3" click={numero} />
                <Button value="*" display="x" class="row4 col4" click={operator} />
                <Button value="4" display="4" class="row5 col1" click={numero} />
                <Button value="5" display="5" class="row5 col2" click={numero} />
                <Button value="6" display="6" class="row5 col3" click={numero} />
                <Button value="-" display="_" class="row5 col4" click={operator} />
                <Button value="1" display="1" class="row6 col1" click={numero} />
                <Button value="2" display="2" class="row6 col2" click={numero} />
                <Button value="3" display="3" class="row6 col3" click={numero} />
                <Button value="+" display="+" class="row6 col4" click={operator} />
                <Button value="+/-" display="±" class="row7 col1" />
                <Button value="0" display="0" class="row7 col2" click={numero} />
                <Button value="." display="." class="row7 col3" click={decimal} />
                <Button value="=" display="=" class="row7 col4 equals" click={equals} />
            </div>
        </div>
    )
}
const Button = (props) => {
    return <button value={props.value} className={props.class} onClick={props.click}>{props.display}</button>
}
const Display = (props) => {
    return (
        <div className="dispcon">
            <span id="equation">{props.equation}</span><br />
            <span id="display">{props.display}</span>
        </div>
    )
}

export default Calculator
