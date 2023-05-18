import React, { Component } from 'react';
import './styles/common/App.css';
import ClothPage from './components/clothComponent/ClothPage';
import CodyPage from './components/codyComponent/CodyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './pages/NotFound';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Switch,
} from 'react-router-dom';

import AuthService from './services/AuthService';
import LoginComponent from './components/authComponent/LoginComponent';
import Register from './components/authComponent/RegisterComponent';
import Profile from './components/profileComponent/ProfileComponent';
import RecommendPage from './components/recommendComponent/RecommendPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.AccountDelete = this.AccountDelete.bind(this);

    this.state = {
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
      deleteurl: '',
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        // showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
        // showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      // showModeratorBoard: false,
      // showAdminBoard: false,
      currentUser: undefined,
    });
  }
  AccountDelete() {
    console.log(this.state.currentUser.id);
    var answer = window.confirm('회원탈퇴하시겠습니까?');
    const url = answer ? '/login' : 'javascript:window.location.reload(true)';

    if (answer) {
      AuthService.delete(this.state.currentUser.id);
      this.setState({
        // showModeratorBoard: false,
        // showAdminBoard: false,
        currentUser: undefined,
        deleteurl: url,
      });
      console.log('회원탈퇴되었습니다.');
    } else {
      // Do nothing!
      // const user = AuthService.getCurrentUser();
      // this.setState({
      //   // showModeratorBoard: false,
      //   // showAdminBoard: false,
      //   currentUser: user,
      // });
      this.setState({
        // showModeratorBoard: false,
        // showAdminBoard: false,
        deleteurl: url,
      });
      console.log('회원탈퇴취소.');
    }
    // AuthService.delete(this.state.currentUser.id);
    // this.setState({
    //   // showModeratorBoard: false,
    //   // showAdminBoard: false,
    //   currentUser: undefined,
    // });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        <nav
          className="navbar navbar-expand"
          style={{
            backgroundColor: '#C8BEE6',
            fontFamily:'Tenada',
          }}
        >
          <a
            className="navbar-brand"
            // href="/recommend"
          >
            <h4 style={{ paddingLeft: 20 }}>옷장 예보</h4>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ justifyContent: 'right' }}
          >
            <ul className="navbar-nav">
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/recommend'} className="nav-link" href="#">
                      옷장 예보의 추천
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/cloth'} className="nav-link" href="#">
                      옷 관리
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/cody'} className="nav-link" href="#">
                      코디 관리
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      로그아웃
                    </a>
                  </li>
                  <li className="nav-item">
                  <a
                      href={this.state.deleteurl}
                      className="nav-link"
                      onClick={this.AccountDelete}
                    >
                      회원 탈퇴
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">
                      로그인
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={'/register'} className="nav-link">
                      회원가입
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/cloth" element={<ClothPage />} />
            <Route path="/cody" element={<CodyPage />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
