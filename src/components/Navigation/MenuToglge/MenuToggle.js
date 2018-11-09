import React from 'react';

import classes from './MenuToggle.css';

const MenuToggle = (props) => {
    const cls = [
        classes.MenuToggle,
        'fa',
        props.isOpen ? 'fa-times' : 'fa-bars',
        props.isOpen ? classes.open : null
    ];

    return (
        <i 
        className={cls.join(' ')} 
        onClick={props.onToggle}
        />
    )
}

export default MenuToggle;