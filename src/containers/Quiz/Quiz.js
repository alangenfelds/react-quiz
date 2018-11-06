import React, {Component} from 'react';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null,
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
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            console.log(this.state.answerState)
            if (this.state.answerState[key] === 'success') {
                return;
            }

        }

        const question = this.state.quiz[this.state.activeQuestion];
        
        if (question.rightAnswerId === answerId) {

            this.setState({
                answerState: {[answerId]:'success'}
            });

            const timeout = window.setTimeout( () => {
                if (this.isQuizFinished()) {
                    console.log('QUIZ Finished');
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout();
            }, 1000);

            console.log('CORRECT');
        } else {
            this.setState({
                answerState: {[answerId]: 'error'}
            })
        }
    }


    render(){
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Выберите свой ответ</h1>
                    <ActiveQuiz 
                    quizLength={this.state.quiz.length}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    answerNumber={this.state.activeQuestion + 1}
                    onAnswerClick = {this.onAnswerClickHandler}
                    answerState={this.state.answerState}
                    />
                </div>
            </div>
        )
    }
}

export default Quiz;