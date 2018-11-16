import axios from '../../axios/axios-quiz';

import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from './actionTypes';

export function fetchQuizes() {
    return dispatch => {

        dispatch(fetchQuizesStart());

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

                dispatch(fetchQuizesSuccess(quizes));
            })
            .catch(error => {
                dispatch(fetchQuizesError(error));
            })
    }
}

export function fetchQuizById(quizId) {
    console.log(quizId)
    return dispatch => {
        dispatch(fetchQuizesStart());

        let quiz = [];

        axios.get(`/quizes/${quizId}.json`)
            .then(response => {
                quiz = response.data;
                dispatch(fetchQuizSuccess(quiz));
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchQuizError(error));
            })

    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        payload: quizes
    }
}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        payload: error
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        payload: quiz
    }
}

export function fetchQuizError(error) {
    return {
        type: FETCH_QUIZ_ERROR,
        payload: error
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY,
    }
}

export function quizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion: activeQuestion,
        answerState: null
    }
}


export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {

        const state = getState().quiz;

        if (state.answerState) {
            // const key = Object.keys(this.state.answerState)[0];
            // console.log(Object.keys(this.state.answerState)[0])
            // console.log(this.state.answerState)
            // if (this.state.answerState[key] === 'success') {
            //     return;
            // }
            return;
        }
    
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            dispatch(quizSetState({[answerId]:'success'}, results))
            // this.setState({
            //     answerState: {[answerId]:'success'},
            //     results: results
            // });
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]:'error'}, results))
            // this.setState({
            //     answerState: {[answerId]: 'error'},
            //     results: results
            // });
        }
    
        window.setTimeout( () => {
            if (isQuizFinished(state)) {
                dispatch(finishQuiz())
            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
                // this.setState({
                //     activeQuestion: state.activeQuestion + 1,
                //     answerState: null
                // })
            }
    
            window.clearTimeout();
        }, 1000);

    }

   
}

function isQuizFinished (state) {
    return state.activeQuestion + 1 === state.quiz.length
}