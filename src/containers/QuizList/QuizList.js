import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';

import classes from './QuizList.css';
import Loader from '../../components/UI/Loader/Loader';

export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map( (quiz, index)=> {
            return (
                <li key={index}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount(){
        const quizes = [];

        axios.get('/quizes.json')
            .then(response => {
                // console.log(response.data);
                Object.keys(response.data).forEach( (key, index) => {
                    quizes.push({
                        id: key,
                        name: `Тест №${index + 1}`
                    })
                } )
                this.setState({
                    quizes,
                    loading: false
                })

            })
            .catch(error => console.log(error))

          
            // console.log('quizes', quizes)
    }

    render() {
        return (
            
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.state.loading ? <Loader /> : 
                    <ul>
                        { this.renderQuizes() }
                    </ul>
                    }
                </div>
            </div>
        )
    }
}