import React, { memo } from 'react';
import './style.scss';

export const Dropdown = memo(props => {
    const { options, label, onChange } = props;
    return (
        <div className='dropdown'>
            <label>{label}</label>
            <select onChange={onChange}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}{' '}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Dropdown;
