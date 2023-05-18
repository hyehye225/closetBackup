import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import ClosetService from '../../services/ClosetService';
class Register extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: '',
      id: '',
      password: '',
    };
  }
  handleClick = (event) => {
    console.log('values', this.state.name, this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      name: this.state.name,
      id: this.state.id,
      password: this.state.password,
    };
    ClosetService.createMember(payload)
      .then((response) => {
        console.log(response.data);
        // if (response.data.code == 200) {
        console.log('회원가입이 성공적으로 완료되었습니다!');
        var loginscreen = [];
        loginscreen.push(<Login parentContext={this} />);
        var loginmessage = '회원가입이 필요합니다.';
        self.props.parentContext.setState({
          loginscreen: loginscreen,
          loginmessage: loginmessage,
          buttonLabel: '회원가입',
          isLogin: true,
        });
        // }
        // console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="이름을 입력하세요"
              floatingLabelText="이름"
              onChange={(event, newValue) => this.setState({ name: newValue })}
            />

            <br />
            <TextField
              hintText="아이디를 입력하세요"
              type="id"
              floatingLabelText="아이디"
              onChange={(event, newValue) => this.setState({ id: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="비밀번호를 입력하세요"
              floatingLabelText="비밀번호"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
            />
            <br />
            <RaisedButton
              backgroundColor="#C8BEE6"
              label="회원가입"
              style={style}
              onClick={(event) => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
  justifyContent: 'center',
  alighItems: 'center',
};
export default Register;
