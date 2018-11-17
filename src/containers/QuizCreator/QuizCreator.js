import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./QuizCreator.css";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import Input from "../../components/UI/Input/Input";
import {
  createControl,
  validate,
  validateForm
} from "../../form/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";

import {
  createQuizQuestion, 
  finishCreateQuiz
} from '../../store/actions/create';

function createOptionControl(number) {
  return createControl(
    {
      label: `Ответ ${number}`,
      errorMessage: "Поле не может быть пустым",
      id: number
    },
    { required: true }
  );
}

function createFormControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым"
      },
      { required: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}

class QuizCreator extends Component {
  state = {
    // quiz: [],
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  };

  submitHandler = event => {
    event.preventDefault();
  };

  addQuestionHandler = event => {
    event.preventDefault();

    const {
      question,
      option1,
      option2,
      option3,
      option4
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id }
      ]
    };

    // quiz.push(questionItem);
    this.props.createQuizQuestion(questionItem);


    this.setState({
      // quiz: quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls()
    });
  };

  createQuizHandler = event => {
    event.preventDefault();
    try {
      // axios.post("/quizes.json", this.state.quiz);
      this.setState({
        // quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
      });

      this.props.finishCreateQuiz();

    } catch (err) {
      console.log(err);
    }
  };

  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls: formControls,
      isFormValid: validateForm(formControls)
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={event =>
              this.changeHandler(event.target.value, controlName)
            }
          />
        </Auxiliary>
      );
    });
  }

  selectChangeHandler = event => {
    this.setState({
      rightAnswerId: +event.target.value
    });
  };

  render() {
    const select = (
      <Select
        label="Выберите правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: "1", value: "1" },
          { text: "2", value: "2" },
          { text: "3", value: "3" },
          { text: "4", value: "4" }
        ]}
      />
    );

    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}

            <Button
              btnType="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              btnType="success"
              onClick={this.createQuizHandler}
              disabled={this.props.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    quiz: state.create.quiz
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuizCreator);
