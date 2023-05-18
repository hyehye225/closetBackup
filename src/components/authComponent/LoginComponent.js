import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/AuthService';
import { withRouter } from '../common/with-router';
import closet from './closet.png';
import styled from 'styled-components';
import '../../styles/common/App.css';

// 페이지 틀 아래부분
const AuthTemplateBlock = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 110px;
  bottom: 0;
  display: flex;
  flex-direction: cloumn;
  justify-content: center;
  aligh-items: center;
`;
// contents 있는부분
const WhiteBox = styled.div`
  .logo-area {
    display: block;
    padding-bottom: 2rem;
    text-align: center;
    font-weight: bold;
    letter-spacing: 2px;
  }
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: white;
  border-radius: 2px;
`;
const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        이 항목을 필수로 입력하세요.
      </div>
    );
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      id: '',
      password: '',
      loading: false,
      message: '',
    };
  }

  onChangeId(e) {
    this.setState({
      id: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: '',
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.id, this.state.password).then(
        () => {
          this.props.router.navigate('/profile');
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        },
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <AuthTemplateBlock>
        <WhiteBox>
          <div className="logo-area" style={{fontFamily:"Tenada"}}>
            <img src={closet} width="70%" height="70%" />

            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="form-group">
                <label htmlFor="id">아이디</label>
                <Input
                  type="text"
                  className="form-control"
                  name="id"
                  value={this.state.id}
                  onChange={this.onChangeId}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <button
                  className="btn btn-block"
                  disabled={this.state.loading}
                  style={{ backgroundColor: '#C8BEE6' }}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>로그인</span>
                </button>
              </div>

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: 'none' }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </WhiteBox>
      </AuthTemplateBlock>
    );
  }
}

export default withRouter(Login);
