import React from 'react'

export default function ButtonGroup({ options }) {

    return(
        <>
            {options.map((label, i) => (
                <button key={i} value={label} className='option-button'>
                    {label}
                </button>
            ))}
        </>
    );
};