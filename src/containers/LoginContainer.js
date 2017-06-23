import React from 'react';
import { connect } from 'react-redux';
import UserForm from '../components/UserForm';
import { login } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  state = {
    email: '',
    password: '',
    loading: false,
    error: '',
  }

  onSubmit() {
    const { email, password } = this.state;
    this.setState({
      loading: true,
      error: '',
    });
    this.props.login(email, password)
    .catch((err) => {
      this.setState({
        loading: false,
        error: err.message,
        password: '',
      });
    });
  }

  emailChange(value) {
    this.setState({
      email: value,
    });
  }

  passwordChange(value) {
    this.setState({
      password: value,
    });
  }

  render() {
    return (<UserForm
      emailValue={this.state.email}
      passwordValue={this.state.password}
      loading={this.state.loading}
      error={this.state.error}
      passwordChange={this.passwordChange}
      emailChange={this.emailChange}
      onSubmit={this.onSubmit}
      action="Login"
    />);
  }
}

const mapStateToProps = ({ currentUser }) => ({ currentUser });

export default connect(mapStateToProps, { login })(Login);

