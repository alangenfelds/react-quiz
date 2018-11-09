import React, {Component} from 'react';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends Component {

    state = {
        results: {}, // {[id]: success error }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 1,
                answers: [
                    {text: 'Синий', id: 1},
                    {text: 'Красный', id: 2},
                    {text: 'Чёрный', id: 3},
                    {text: 'Зелёный', id: 4},
                ]
            },
            {
                id: 2,
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 3,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4},
                ]
            }
        ]
    }

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


    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Выберите свой ответ</h1>
                    {
                        this.state.isFinished 
                        ? <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            />
                    :
                    <ActiveQuiz 
                    quizLength={this.state.quiz.length}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    questionNumber={this.state.activeQuestion + 1}
                    onAnswerClick = {this.onAnswerClickHandler}
                    answerState={this.state.answerState}
                    />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;