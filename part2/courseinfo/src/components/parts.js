import React from 'react';

const Content = ({parts}) => {
    const list = parts.map(part => (
        <Part name={part.name} exercises={part.exercises} key={part.name} />
    ));
    return <>{list}</>;
};

const Part = props => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};

export default Content