import React from 'react'

export default function ButtonGroup(props) {

    const [clickedId, setClickedId] = React.useState(-1)
    const {options, handleClick } = props

    const checkClick = (event, id) => {
        setClickedId(id);
        handleClick(event)
    }
    return(
        <>
            {options.map((label, id) => (
                <button 
                    key={id} 
                    name={label} 
                    className={id === clickedId ? 'option-button active': 'option-button'}
                    onClick= {(event) => checkClick(event, id)}
                >
                    {label}
                </button>
            ))}
        </>
    );
};