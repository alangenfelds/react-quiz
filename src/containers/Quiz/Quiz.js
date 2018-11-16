import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {fetchQuizById} from '../../store/actions/quiz';

class Quiz extends Component {

    // state = {
    //     loading: true,
    //     results: {}, // {[id]: success error }
    //     isFinished: false,
    //     activeQuestion: 0,
    //     answerState: null, // {[id]: 'success' 'error'}
    //     quiz: []
    // }

    isQuizFinished () {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onAnswerClickHandler = (answerId) => {
        console.log('answerId=',answerId);
        
        if (this.state.answerState) {
            // const key = Object.keys(this.state.answerState)[0];
            // console.log(Object.keys(this.state.answerState)[0])
            // console.log(this.state.answerState)
            // if (this.state.answerState[key] === 'success') {
            //     return;
            // }
            return;
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            this.setState({
                answerState: {[answerId]:'success'},
                results: results
            });
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results
            });
        }

        window.setTimeout( () => {
            if (this.isQuizFinished()) {
                this.setState({
                    isFinished: true
                })
            } else {
                this.setState({
                    activeQuestion: this.state.activeQuestion + 1,
                    answerState: null
                })
            }

            window.clearTimeout();
        }, 1000);
    }

    componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id);
    }

    render(){
        console.log(this.props);
        return (
            <div className={classes.Quiz}>
            
            {this.props.loading || !this.props.quiz ? <Loader /> 
            :
                <div className={classes.QuizWrapper}>
                    <h1>Выберите свой ответ</h1>
                    {
                        this.props.isFinished 
                        ? <FinishedQuiz 
                            results={this.props.results}
                            quiz={this.props.quiz}
                            />
                    : 
                    <ActiveQuiz 
                    quizLength={this.props.quiz.length}
                    question={this.props.quiz[this.props.activeQuestion].question}
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    questionNumber={this.props.activeQuestion + 1}
                    onAnswerClick = {this.onAnswerClickHandler}
                    answerState={this.props.answerState}
                    />
                    }
                </div>
            }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        results: state.quiz.results, // {[id]: success error }
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState, // {[id]: 'success' 'error'}
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);