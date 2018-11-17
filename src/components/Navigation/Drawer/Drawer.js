import React, { Component } from "react";
import {NavLink} from 'react-router-dom';

import classes from "./Drawer.css";
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends Component {

    renderLinks (links) {
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

    const links = [
        { to: '/', label: 'Список', exact: true }
    ];

    console.log('Auth', this.props.isAuthenticated)

    if (this.props.isAuthenticated) {
        links.push( { to: '/quiz-creator', label: 'Конструктор', exact: false });
        links.push( { to: '/logout', label: 'Выйти', exact: false });
    } else {
       links.push({ to: '/auth', label: 'Авторизация', exact: false });
    }

    return (
        <React.Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    { this.renderLinks(links) }
                </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
        </React.Fragment>
    )

  }
}

export default Drawer;
