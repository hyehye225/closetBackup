import authHeader from './AuthHeader';

import http from '../http-common';

class UserService {
  getPublicContent() {
    return http.get(`/user/all`);
  }

  // getUserBoard() {
  //   return http.get(`/user/user`, { headers: authHeader() });
  // }

  // getModeratorBoard() {
  //   return http.get(`/user/mod`, { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return http.get(`/user/admin`, { headers: authHeader() });
  // }
}

export default new UserService();
