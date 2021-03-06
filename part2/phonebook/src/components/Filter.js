import React from 'react';

const Filter = ({ name, onUpdate }) => {
    const handleFilterNameChange = (event) => {
        onUpdate(event.target.value.toLowerCase());
    }

    return (
        <div>
            filter shown with
            <input
                value={name}
                onChange={handleFilterNameChange}
            />
        </div>
    )
};

export default Filter;