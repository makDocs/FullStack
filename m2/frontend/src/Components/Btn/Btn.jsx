import React from 'react'

const Btn = (props) => {
    return (
        <button className ="button" type={props.type}>
            {props.children}
        </button>
    )
}
export default Btn;