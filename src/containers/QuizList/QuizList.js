import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './QuizList.css';
import Loader from '../../components/UI/Loader/Loader';
import {fetchQuizes} from '../../store/actions/quiz';

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map( (quiz, index)=> {
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
        this.props.fetchQuizes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.props.loading && this.props.quizes.length !== 0 ? <Loader /> : 
                    <ul>
                        { this.renderQuizes() }
                    </ul>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);