import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import AuthService from '../../services/AuthService';
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
// contents있는부분
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
        이 항목은 필수입력입니다.
      </div>
    );
  }
};
const vid = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        아이디는 3자리 이상 20자리 이하 문자여야합니다.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        비밀번호는 6자리 이상 40자리 이하 문자여야합니다.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        이름은 3자리 이상 20자리 이하 문자여야합니다.
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    // this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeStyle_1 = this.onChangeStyle_1.bind(this);
    this.onChangeStyle_2 = this.onChangeStyle_2.bind(this);

    this.state = {
      id: '',
      password: '',
      username: '',
      // gender: '',
      style_1: '',
      style_2: '',
      successful: false,
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
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  // onChangeGender(e) {
  //   this.setState({
  //     gender: e.target.value,
  //   });
  // }

  onChangeStyle_1(e) {
    this.setState({
      style_1: e.target.value,
    });
    console.log(this.state.style_1.value);
  }
  onChangeStyle_2(e) {
    this.setState({
      style_2: e.target.value,
    });
    console.log(this.state.style_2.value);
  }
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: '',
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      // console.log(this.state.style_1);
      AuthService.register(
        this.state.id,
        this.state.password,
        this.state.username,
        // this.state.gender,
        this.state.style_1,
        this.state.style_2,
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        },
      );
    }
  }

  render() {
    return (
      <AuthTemplateBlock>
        <WhiteBox>
          <div className="logo-area" style={{fontFamily:"Tenada"}}>
            <img src={closet} width="70%" height="70%" />

            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="username">이름</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="id">아이디</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="id"
                      value={this.state.id}
                      onChange={this.onChangeId}
                      validations={[required, vid]}
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
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="style_1">{/*스타일1 */}</label>
                    <select
                      required
                      class="required"
                      type="text"
                      className="form-control"
                      id="style_1"
                      value={this.state.style_1}
                      onChange={this.onChangeStyle_1}
                      name="style_1"
                    >
                      <option value="">선호 스타일1 선택</option>
                      <option key="casual" value="casual">
                        캐주얼
                      </option>
                      <option key="chic" value="chic">
                        시크
                      </option>
                      <option key="dandy" value="dandy">
                        댄디
                      </option>
                      <option key="formal" value="formal">
                        포멀
                      </option>
                      <option key="lovely" value="lovely">
                        러블리
                      </option>
                      <option key="hip" value="hip">
                        힙
                      </option>
                      <option key="minimal" value="minimal">
                        미니멀
                      </option>
                      <option key="business casual" value="business casual">
                        비즈니스 캐주얼
                      </option>
                      <option key="sports" value="sports">
                        스포츠
                      </option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="style_2">{/*스타일2 */}</label>
                    <select
                      required
                      class="required"
                      type="text"
                      className="form-control"
                      id="style_2"
                      value={this.state.style_2}
                      onChange={this.onChangeStyle_2}
                      name="style_2"
                    >
                      <option value="">선호 스타일2 선택</option>
                      <option key="casual" value="casual">
                        캐주얼
                      </option>
                      <option key="chic" value="chic">
                        시크
                      </option>
                      <option key="dandy" value="dandy">
                        댄디
                      </option>
                      <option key="formal" value="formal">
                        포멀
                      </option>
                      <option key="lovely" value="lovely">
                        러블리
                      </option>
                      <option key="hip" value="hip">
                        힙
                      </option>
                      <option key="minimal" value="minimal">
                        미니멀
                      </option>
                      <option key="business casual" value="business casual">
                        비즈니스 캐주얼
                      </option>
                      <option key="sports" value="sports">
                        스포츠
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <button
                      className="btn  btn-block"
                      style={{ backgroundColor: '#C8BEE6' }}
                    >
                      회원가입
                    </button>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? 'alert alert-success'
                        : 'alert alert-danger'
                    }
                    role="alert"
                  >
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
