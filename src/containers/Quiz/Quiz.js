import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';
import {
    fetchQuizById,
     finishQuiz,
      quizAnswerClick,
      retryQuiz
    } from '../../store/actions/quiz';

class Quiz extends Component {

    componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id);
    }

    componentWillUnmount(){
        this.props.onRetry();
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
                            onRetry={this.props.onRetry}
                            />
                    : 
                    <ActiveQuiz 
                    quizLength={this.props.quiz.length}
                    question={this.props.quiz[this.props.activeQuestion].question}
                    answers={this.props.quiz[this.props.activeQuestion].answers}
                    questionNumber={this.props.activeQuestion + 1}
                    onAnswerClick = {this.props.onAnswerClickHandler}
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
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        onAnswerClickHandler: answerId => dispatch(quizAnswerClick(answerId)),
        finishQuiz: () => dispatch(finishQuiz()),
        onRetry: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);