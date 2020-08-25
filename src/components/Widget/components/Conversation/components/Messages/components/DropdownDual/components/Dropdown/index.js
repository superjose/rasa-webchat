import React, { memo } from 'react';

export const Dropdown = memo(props => {
    const { options, label, onChange } = props;
    return (
        <label>
            {label}
            <select onChange={onChange}>
                {options.map(o => (
                    <option key={o.value} value={o.value}>
                        {o.label}{' '}
                    </option>
                ))}
            </select>
        </label>
    );
});

export default Dropdown;
