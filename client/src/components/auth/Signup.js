import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { renderInputField } from '../../common/reduxForm/renderField'
import { reduxForm, Field } from 'redux-form'

class Signup extends Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {
      this.props.history.push('/mainMenu');
    });
  };

  emailValidation = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined
  passwordValidation = value =>
    value && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)
      ? 'Invalid password'
      : undefined

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="container">
        <h1 align="center" style={{ backgroundColor: 'black', width: '100%', padding: '10px', borderRadius: "10px" }}><font color="cyan">Sign Up</font></h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            component={renderInputField}
            placeholder="Email"
            validate={this.emailValidation}
          />
          (Email must be unique: i.e. never been registered before)
          <Field
            name="password"
            type="password"
            component={renderInputField}
            placeholder="Password"
            validate={this.passwordValidation}
          />
          (At least 8 characters with - at least - 1 uppercase, 1 lowercase and 1 numeric character)
          <div>{this.props.errorMessage}</div><br />
          <button type="submit" disabled={submitting}>Sign Up!</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' })
)(Signup);
