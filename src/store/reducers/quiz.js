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
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  loading: false,
  error: null,
  results: {}, // {[id]: success error }
  isFinished: false,
  activeQuestion: 0,
  answerState: null, // {[id]: 'success' 'error'}
  quiz: null
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        loading: true
      };

    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        loading: false,
        quizes: action.payload
      };

    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        quiz: action.payload,
        loading: false
      };

    case FETCH_QUIZ_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      };

    case FINISH_QUIZ:
      return {
        ...state,
        isFinished: true
      };

    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: action.activeQuestion,
        answerState: null
      };

    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {}
      };

    default:
      return state;
  }
}
