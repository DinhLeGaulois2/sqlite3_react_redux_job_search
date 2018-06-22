import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { renderInputField } from '../../common/reduxForm/renderField'
import { reduxForm, Field } from 'redux-form'

class Signin extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
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
        <h1 align="center" style={{backgroundColor: 'black', width: '100%', padding: '10px', borderRadius: "10px"}}><font color="cyan">Sign In</font></h1>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <Field
            name="email"
            component={renderInputField}
            placeholder="Email"
            validate={this.emailValidation}
          />
          <Field
            name="password"
            type="password"
            component={renderInputField}
            placeholder="Password"
            validate={this.passwordValidation}
          />
          <div>{this.props.errorMessage}</div><br/>
          <button type="submit" disabled={submitting}>Sign In!</button>
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
  reduxForm({ form: 'signin' })
)(Signin);
