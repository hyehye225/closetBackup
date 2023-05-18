import http from '../http-common';
import authHeader from './AuthHeader';
class ClosetService {
  /////////////////////////옷 관련/////////////////////////
  // 옷 관리 페이지 서비스
  createCloth(data) {
    return http.post(`/cloth/add`, data);
  }
  //모든 아우터 조회
  getAllOuters(userId) {
    return http.get(`/cloth/outers?id=`+userId);
  }
  //모든 상의 조회
  getAllTops(userId) {
    return http.get(`/cloth/tops?id=`+userId);
  }
  //모든 하의 조회
  getAllBottoms(userId) {
    return http.get(`/cloth/bottoms?id=`+userId);
  }
  //특정 아우터 조회
  getAOuter(userId, id) { //유저와 옷의 아이디
    return http.get(`/cloth/outer/${id}`+"?id="+userId);
  }
  //특정 상의 조회
  getATop(userId, id) {
    return http.get(`/cloth/top/${id}`+"?id="+userId);
  }
  //특정 하의 조회
  getABottom(userId, id) {
    return http.get(`/cloth/bottom/${id}`+"?id="+userId);
  }
  //아우터 삭제
  deleteOuters(userId, deleteList) {
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cloth/outers/'+query);
  }
  //상의 삭제
  deleteTops(userId, deleteList) {
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cloth/tops/'+query);
  }
  //하의 삭제
  deleteBottoms(userId, deleteList) {
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cloth/bottoms/'+query);
  }
  /////////////////////////코디 관련/////////////////////////
  createCody(data) {
    return http.post(`/cody/add`, data);
  }
  //모든 코디 조회
  getAllCodys(userId) {
    return http.get(`/cody/codys?id=`+userId);
  }
  //코디 삭제
  deleteCodys(userId, deleteList) {
    var query = "?memberID="+userId;
    for(var i in deleteList){
      query += "&delete="+deleteList[i];
    } 
    return http.delete('/cody/codys/'+query);
  }
  /////////////////////////추천 관련/////////////////////////
  //모든 사용자 옷 기반 추천 코디 조회
  getAllCCodys(userId) {
    return http.get(`/recommend/clothbased?id=`+userId);
  }
  //모든 선호스타일1 기반 추천 코디 조회
  getAllPS1Codys(userId, style) {
    return http.get(`/recommend/stylebased1?id=`+userId+'&style='+style);
  }
  //모든 선호스타일2 기반 추천 코디 조회
  getAllPS2Codys(userId, style) {
    return http.get(`/recommend/stylebased2?id=`+userId+'&style='+style);
  }
}
export default new ClosetService();
