import axios from '../../axios/axios-quiz';

import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZ_ERROR
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