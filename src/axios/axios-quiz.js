import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-7ef47.firebaseio.com/'
})