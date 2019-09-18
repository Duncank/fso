import React from 'react';

const Total = ({parts}) => {
    const sum = parts.reduce((acc, cur) => {
        return cur.exercises + acc
    }, 0);

    return (
        <strong>
            Number of exercises{" "}{sum}
        </strong>
    );
};

export default Total;