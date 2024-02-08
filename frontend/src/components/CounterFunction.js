import React, { useState } from "react";
import App from "../App";

function CounterFunction() {

    let [number, setNumber] = useState(0);

    function increment() {
        
    }

    return(
        <div>
            <h3>function component</h3>
            <h1>Counter = {number}</h1>
            <button>Increment</button>
        </div>
    )
}

export default CounterFunction;