import React, { Component } from "react";
import {NavLink} from 'react-router-dom';

import classes from "./Drawer.css";
import Backdrop from '../../UI/Backdrop/Backdrop';

const links = [
    { to: '/', label: 'Список', exact: true },
    { to: '/auth', label: 'Авторизация', exact: true },
    { to: '/quiz-creator', label: 'Конструктор', exact: true },
];



class Drawer extends Component {

    renderLinks () {
        return links.map( (link, index) => {
            return (
                <li key={index}>
                    <NavLink 
                        to={link.to} 
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

  render() {

    const cls = [
        classes.Drawer,
        this.props.isOpen ? null : classes.close
    ]

    return (
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    { this.renderLinks() }
                </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        </React.Fragment>
    )

  }
}

export default Drawer;
