import React, {Component} from 'react';
import axios from '../../axios/axios-quiz';

import classes from './Quiz.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends Component {

    state = {
        loading: true,
        results: {}, // {[id]: success error }
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success' 'error'}
        quiz: []
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

    componentDidMount(){
        console.log('Quiz id = ' + this.props.match.params.id);
        let quiz = [];

        axios.get(`/quizes/${this.props.match.params.id}.json` )
            .then(response => {
                console.log(response.data);

                quiz = response.data;

                // Object.keys(response.data).forEach( (key, index) => {
                //     console.log('key', key)

                //     const quizItem = response.data[key];

                //     quiz.push({
                //         id: quizItem.id,
                //         question: quizItem.data,
                //         rightAnswerId: quizItem.rightAnswerId,
                //         answers: quizItem.answers
                //     })
                // } )

                this.setState({
                    quiz,
                    loading: false
                })

            })
            .catch(error => console.log(error))


    }

    render(){
        return (
            <div className={classes.Quiz}>
            
            {this.state.loading ? <Loader /> 
            :
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
            }
            </div>
        )
    }
}

export default Quiz;