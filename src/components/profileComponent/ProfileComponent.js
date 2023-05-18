import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import '../../styles/common/App.css';

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
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.updateUserInfo = this.updateUserInfo.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeStyle_1 = this.onChangeStyle_1.bind(this);
    this.onChangeStyle_2 = this.onChangeStyle_2.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: {
        id: '',
        username: '',
        password: '',
        // gender: '',
        style_1: '',
        style_2: '',
      },
      
        id: '',
      username: '',
      password: '',
      // gender: '',
      style_1: '',
      style_2: '',
      // loading: true,
      
      successful: false,
      message: '',

    };
  }
  onChangeUsername(e) {
    const username = e.target.value;
    // this.state.username = username;
    this.setState({
      username: e.target.value,
    })
  }
  onChangeStyle_1(e) {
    const style_1 = e.target.value;
    // this.state.style_1 = style_1;
    this.setState({
      style_1: e.target.value,
    })
  }
  onChangeStyle_2(e) {
    const style_2 = e.target.value;
    // this.state.style_2 = style_2;
    this.setState({
      style_2: e.target.value,
    })
  }
  onChangePassword(e) {
    const password = e.target.value;
    // this.state.password = password;
    this.setState({
      password: e.target.value,
    })
  }
  updateUserInfo(e) {
    // loading = false;
    e.preventDefault();
    this.setState({
      message: '',
      successful: false,
    });

    // console.log(this.state.newInfo);

    AuthService.update(
      this.state.id,
      this.state.password,
      this.state.username,
      // this.state.gender,
      this.state.style_1,
      this.state.style_2,
    ).then(
      (response) => {
        console.log(response.message);
        this.setState({
          message: response.message,
          successful: true,
        });

        window.location.reload(true);
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
    )
    // .then( window.location.reload(true));
  }
  componentDidMount() {
    // this.forceUpdate();
    // if (this.state.userReady == false) {
    const currentUser = AuthService.getCurrentUser();
    console.log(currentUser);
    if (!currentUser) {
      alert('로그인을 해주세요');
      // this.state.redirect = '/login';
      this.setState({ redirect: '/login' });
      // console.log(currentUser);
    } else
      this.setState({
        currentUser: currentUser,

        id: currentUser.id,
        password: currentUser.password,
        username: currentUser.username,
        style_1: currentUser.style_1,
        style_2: currentUser.style_2,
        userReady: true,
      });
    // }
    // this.updateUserInfo();
    // console.log(currentUser);
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;
    return (
      <div className="container" style={{ width: '50%' ,fontFamily:"Tenada"}}>
        {this.state.userReady ? (
          <>
            <div>
              <header className="well" style={{ backgroundColor: '#C8BEE6',fontFamily:"Tenada" }}>
                <h3>
                  <strong>{this.state.username}</strong> 님의 프로필
                </h3>
              </header>
              <p>
                <strong>아이디:</strong> {this.state.id}
              </p>
              <p>{/* <strong>성별:</strong> {currentUser.gender} */}</p>
              <p>
                <strong>선호 스타일1:</strong> {this.state.style_1}
              </p>
              <p>
                <strong>선호 스타일2:</strong> {this.state.style_2}
              </p>
            </div>
            <div>
              <header className="well" style={{ backgroundColor: '#C8BEE6',fontFamily:"Tenada" }}>
                <h3>
                  <strong>{this.state.username}</strong> 님의 프로필 수정
                </h3>
              </header>
              <Form
                onSubmit={this.updateUserInfo}
                ref={(c) => {
                  this.form = c;
                }}
              >
                <div>
                  <div className="form-group">
                    <label htmlFor="username">이름</label>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      // validations={[required, vusername]}
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
                      // validations={[required, vpassword]}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label htmlFor="gender">{/*성별 */}
                  {/* </label> */}
                  {/* <select
                      // required
                      type="text"
                      className="form-control"
                      id="gender"
                      value={this.state.gender}
                      onChange={this.onChangeGender}
                      name="gender"
                    >
                      <option value="">성별 선택</option>
                      <option value="male">남성</option>
                      <option value="female">여성</option>
                    </select> */}
                  {/* </div> */}
                  <div className="form-group">
                    <label htmlFor="style_1">{/*스타일1 */}</label>
                    <select
                      // required
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
                      // required
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
                      className="btn btn-block"
                      style={{ backgroundColor: '#C8BEE6' }}
                    >
                      회원 정보 수정
                    </button>
                  </div>
                </div>

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
          </>
        ) : null}
      </div>
    );
  }
}