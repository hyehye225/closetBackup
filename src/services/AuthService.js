import http from '../http-common';

class AuthService {
  login(id, password) {
    return http.post(`/auth/login`, {id,password})
      .then((response) => {
        console.log("r"+response);

        if (response.data.accessToken) {
          console.log("r"+response.data);

          //accessToken이 있을 시
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem('user');
  }
  delete(id) {
    localStorage.removeItem('user');
    return http.delete(`/auth/delete/`+id);
  }
  register(id, password, username, style_1, style_2) { 
    return http.post(`/auth/register`, {
      id,
      password,
      username,
      style_1,
      style_2,
    });
  }
  update(id, password, username, style_1, style_2) {
    return http
      .post(`/auth/update/`, {
        id,
        password,
        username,
        style_1,
        style_2,
      })
      .then((response) => {
        if (response) {
          //accessToken이 있을 시
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
