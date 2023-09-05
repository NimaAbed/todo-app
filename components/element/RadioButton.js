import React from 'react';

const RadioButton = ({ status, title, value, setStaus, children }) => {
    return (
        <div className={value}>
            <label htmlFor={value}>{children}{title}</label>
            <input type='radio' id={value} name={value} value={value} checked={status === value} onChange={e => setStaus(e.target.value)} />
        </div>
    );
};

export default RadioButton;