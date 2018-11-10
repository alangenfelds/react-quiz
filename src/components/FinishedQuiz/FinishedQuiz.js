import React from 'react';
import { Link } from 'react-router-dom';

import classes from './FinishedQuiz.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.results).reduce( (total, key) => {
        if (props.results[key] === 'success') {
            total++;
        }

        return total;
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <h1>Finished</h1>
            <ul>
                {props.quiz.map( (quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'success' ? 'fa-check' : 'fa-times',
                        classes[props.results[quizItem.id]]
                    ]
                    return (
                        <li key={index}>
                            <strong>{index + 1}.&nbsp;</strong>
                            {quizItem.question}&nbsp;
                            <i className={ cls.join(' ') } />        
                        </li>
                    )
                })}
            </ul>

            <p>Правильных ответов {successCount} из {props.quiz.length}</p>

            <div>
                <Button
                btnType="primary"
                onClick={props.onRetry}>
                    Повторить
                </Button>
              
              <Link to='/'>
                    <Button
                    btnType="success"
                    >
                        Перейти в список тестов
                    </Button>
                </Link>
            </div>

        </div>
    )
}

export default FinishedQuiz;