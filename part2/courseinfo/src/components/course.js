import React from 'react';
import Header from './header';
import Content from './parts';
import Total from './total';

const Course = ({ course }) => {
    return (
        <>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
};

export default Course;