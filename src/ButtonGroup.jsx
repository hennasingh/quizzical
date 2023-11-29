import React from 'react'

export default function ButtonGroup(props) {

    const [clickedId, setClickedId] = React.useState(-1)
    const {options, handleClick, answer } = props

    const checkClick = (event, id, answer) => {
        setClickedId(id);
        console.log(id)
        handleClick(event, answer)
    }
    return(
        <>
            {options.map((label, id) => (
                <button 
                    key={id} 
                    name={label} 
                    className={id === clickedId ? 'option-button active': 'option-button'}
                    onClick= {(event) => checkClick(event, id, answer)}
                >
                    {label}
                </button>
            ))}
        </>
    );
};