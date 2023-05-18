// 라이브러리 불러오기
var multer = require("multer");
// const multerConfig = {
//   storage: multer.diskStorage({
//     destination: function (req, file, next) {
//       next(null, "./public/zip-storage");
//     },
//     filename: function (req, file, next) {
//       console.log(file);
//       const ext = file.mimetype.split("/")[1];
//       next(null, file.fieldname + "-" + Date.now() + "." + ext);
//     },
//   }),

//   fileFilter: function (req, file, next) {
//     if (!file) {
//       next();
//     }

//     const zip = file.mimetype.startsWith("image");
//     if (zip) {
//       console.log("image uploaded");
//       next(null, true);
//     } else {
//       console.log("file not supported");
//       errorReq = true;
//       return next();
//     }
//   },
// };
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/img");
    },
    filename: function (req, file, cb) {
      var newFileName = new Date().valueOf() + path.extname(file.originalname);
      cb(null, newFileName);
    },
  }),
});


const express = require("express");
const router = require("express").Router();
const path = require("path");
var bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const port = 3001; /// process.env.PORT || 8000; // 3001
var connection = require("./db");
var jwt = require("jsonwebtoken");
const morgan = require("morgan");

app.use(morgan("tiny"));

// 3001번 포트에서 서버를 실행
http.listen(port, () => {
  // 서버가 정상적으로 실행되면 콘솔창에 이 메시지를 띄움
  console.log("Listening on " + port);
});

app.use(express.static(path.join(__dirname, "/build")));
// 메인페이지 접속 시 build 폴더의 index.html 보냄
app.get("/", (res, req) => {
  req.sendFile(path.join(__dirname, "/build/index.html"));
});

const cors = require("cors");
const { resolve } = require("path");
const { isArray } = require("lodash");
router.use(cors());
app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error.field);
});

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//배열 쿼리 입력시에 필요함
if (process.env.NODE_ENV === 'production') {
  app.use(hpp()); // hpp 모듈
}

// 회원 관련
// 로그인
app.post("/auth/login", (req, res) => {
  var token = jwt.sign(
    { id: req.id },
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2NzU0OTM3MSwiaWF0IjoxNjY3NTQ5MzcxfQ.BIKdQpm2XvSg39S6oGSBVGz-SsJCh51waAeQBSxbLX4",
    {
      expiresIn: 86400, // 24 hours
    }
  );
  
  let sql = "SELECT * FROM guest WHERE memberID=? AND memberPW=?";
  connection.query(sql, [req.body.id, req.body.password], function (err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    } else if(results=="") { //일치하는 사람 없음
      res.status(400).send({ message: "해당 아이디가 존재하지 않거나, 비밀번호가 일치하지 않습니다." });
    } else {
      res.status(200).send({
        id: results[0].memberID,
        password: results[0].memberPW,
        username: results[0].name,
        style_1: results[0].style1,
        style_2: results[0].style2,
        accessToken: token,
      });
    }
  });
});

//회원가입
app.post("/auth/register", (req, res) => {
  sql = "SELECT * FROM guest WHERE memberID=?";

  // guest테이블에 있는 아이디인가?
  connection.query(sql, req.body.id, function (err, results, fields) { 
    if (err) {
      console.log(err); // 조회결과가 없는건 에러가 아님
      throw err;
    } else if (results!=""){ // 아이디 있음
      res.status(400).send({ message: "존재하는 아이디입니다." });
      return null;
    } else {
      tmp = [req.body.id, req.body.password, req.body.id, req.body.username, req.body.style_1, req.body.style_2];
      sql = "insert into guest value (?, ?, ?, ?, ?, ?)";
      connection.query(sql, tmp, function (err, results, fields) { 
        if (err) {
          console.log("-err: "+err);
          throw err;
        } else {
          res.status(200).send({
            message: "회원가입이 완료되었습니다!",
          });
      }});

      // 한벌옷 조회용 데이터
      sql = "insert into mybottom(memberID, bottomCode, bottomType, bottomColor, bottomImage) value (?, '', '', '', 'cloth-0.PNG')";
      connection.query(sql, req.body.id, function (err, results, fields) { 
        if (err) {
          console.log("-err: "+err);
          throw err;
        } else {
      }});
    }
  });
});
// 회원 정보 수정
app.post("/auth/update/", function (req, res) {
  //user의 id를 가지고 data를 업데이트하여야함
  //업데이트 후에 업데이트 된 데이터를 res에 담아서 프론트에 줌.
  tmp = [req.body.username, req.body.password, req.body.style_1, req.body.style_2, req.body.id];
  sql = "update guest SET name=?, memberPW=?, style1=?, style2=? WHERE memberCode=?";
  connection.query(sql, tmp, function (err, results, fields) { 
    if (err) {
      console.log("-err: "+err);
      res.status(404).send({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        style_1: req.body.style_1,
        style_2: req.body.style_2,
        message: "회원정보수정이 실패했습니다.",
      });
    } else if (!results.changedRows){
      res.status(400).send({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        style_1: req.body.style_1,
        style_2: req.body.style_2,
        message: "변경된 값이 없습니다.",
      });
    } else {
      res.status(200).send({
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        style_1: req.body.style_1,
        style_2: req.body.style_2,
        message: "회원정보수정이 완료되었습니다!",
      });
  }});
});
//로그아웃
app.post("/auth/logout", (req, res) => {
  res.send(req.body);
});
//회원 탈퇴
app.delete("/auth/delete/:id", (req, res) => {
  sql= "DELETE FROM guest WHERE memberID=?";
  connection.query(sql, req.params.id, function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    } else {
      // 상의 삭제
      sql= "DELETE FROM mytop WHERE memberID=?";
      connection.query(sql, req.params.id, function(err, results, fields) { 
        if (err) {
          console.log(err);
          throw err;
        }
      });

      // 하의 삭제
      sql= "DELETE FROM mybottom WHERE memberID=?";
      connection.query(sql, req.params.id, function(err, results, fields) { 
        if (err) {
          console.log(err);
          throw err;
        }
      });

      // 코디 삭제
      sql= "DELETE FROM cody WHERE memberID=?";
      connection.query(sql, req.params.id, function(err, results, fields) { 
        if (err) {
          console.log(err);
          throw err;
        }
      });

      res.sendStatus(204); // 삭제 완료
    }
  });
});

// 옷 등록
app.use(express.static("public/img"));
app.post("/cloth/add", upload.single("img"), function (req, res) {
  try {
    if(!req.body.category||!req.body.color||!req.file.filename){
      res.status(400).send({message: "옷의 카테고리와 색상을 하나씩 선택하시고, 옷의 이미지를 하나 등록해주세요"});
      return null;
    }
  } catch (error) {
    res.status(400).send({message: "옷의 카테고리와 색상을 하나씩 선택하시고, 옷의 이미지를 하나 등록해주세요"});
      return null;
  }

  var file = req.file.filename;
  
  // all테이블 쿼리용
  let sql, sql2, sort;
  let category = req.body.category; //top outer one bottom
  if (category == "coat"||category == "shirt"||category == "jacket"||category == "dress"||category == "suit"||category == "clothing") { //?
    sql = "SELECT * FROM alltop WHERE topType=? AND topColor=?";
    sql2 = "insert into alltop(topCode, topType, topColor) values (?, ?, ?);";
    if(category == "dress"||category == "suit") {sort="one";}
    else if(category == "coat"||category == "jacket"){sort="outer";}
    else {sort="top";}
  } else {
    sql = "SELECT * FROM allbottom WHERE bottomType=? AND bottomColor=?";
    sql2 = "insert into allbottom(bottomCode, bottomType, bottomColor) values (?, ?, ?);";
    sort="bottom";
  }

  // all테이블에 있는 옷인가?
  connection.query(sql, [req.body.category, req.body.color], function (err, results, fields) { 
    if (err) {
      console.log(err); // 조회결과가 없는건 에러가 아님
      throw err;
    } else if (results==""){ // 그런 옷 없음
      // insert
      connection.query(sql2, [req.body.id, req.body.category, req.body.color], function (err, results, fields) { 
        if (err) {
          console.log("-err: "+err);
          throw err;
        } 
      });
    }
  });

  // mycloth insert
  tmp = JSON.parse(req.body.attribute); // attribute 묶기
  var attribute;
  for(var i=0; i<tmp.length; i++){
    attribute+=tmp[i];
    if(i+1!=tmp.length){
      attribute+=",";
    }
  }

  if(sort=="bottom"){ //query문 작성
    tmp = [req.body.userId, req.body.id, req.body.category, req.body.color, file, attribute];
    sql = "insert into mybottom value (?, ?, ?, ?, ?, ?)";
  } else {
    tmp = [req.body.userId, req.body.id, sort, req.body.category, req.body.color, file, attribute];
    sql = "insert into mytop value (?, ?, ?, ?, ?, ?, ?)";
  }
  connection.query(sql, tmp, function (err, results, fields) { 
    if (err) {
      console.log("-err: "+err);
      throw err;
    } else {
      res.sendStatus(201); // 추가 성공
  }});
});

// 옷(아우터,상의,하의) 조회
app.get("/cloth/outers", (req, res) => {
  var resCloth = [];
  let sql = "SELECT * FROM mytop WHERE memberID=? AND topSort='outer'";
  connection.query(sql, req.query.id ,function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    }
    for (var i in results) {
      resCloth[i] = {
        id: results[i].topCode,
        category: results[i].topType,
        color: results[i].topColor,
        pictureAsFile: results[i].topImage,
      }
    }

    res.status(200).send(resCloth);
  });
});
app.get("/cloth/tops", (req, res) => {
  var resCloth = [];
  let sql = "SELECT * FROM mytop WHERE memberID=? AND topSort='top'";
  connection.query(sql, req.query.id, function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    }
    for (var i in results) {
      resCloth[i] = {
        id: results[i].topCode,
        category: results[i].topType,
        color: results[i].topColor,
        pictureAsFile: results[i].topImage,
      }
    }

    res.status(200).send(resCloth);
  });
});
app.get("/cloth/bottoms", (req, res) => {
  var resCloth = [];
  let sql = "SELECT * FROM mybottom WHERE memberID=?";
  connection.query(sql, req.query.id, function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    }
    for (var n=0, i=0; i<results.length; i++) {
      if(results[i].bottomImage!="cloth-0.PNG") {
        resCloth[n] = {
          id: results[i].bottomCode,
          category: results[i].bottomType,
          color: results[i].bottomColor,
          pictureAsFile: results[i].bottomImage,
        }
        n++;
      }
    }

    res.status(200).send(resCloth);
  });
});

// 옷(아우터,상의,하의) 한벌 조회
// 유저아이디는 query id, 옷아이디는 param id
app.get("/cloth/outer/:id", (req, res) => {
  var resCloth;
  let sql = "SELECT * FROM mytop WHERE memberID=? AND topCode=? AND topSort='outer'";
  connection.query(sql, [req.query.id, req.params.id], function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    }
    resCloth = {
      id: req.query.id,
      category: results[0].topType,
      color: results[0].topColor,
      pictureAsFile: results[0].topImage,
    }
    res.status(200).send(resCloth);
  });
});
app.get("/cloth/top/:id", (req, res) => {
  var resCloth;
  let sql = "SELECT * FROM mytop WHERE memberID=? AND topCode=? AND topSort='top'";
  connection.query(sql, [req.query.id, req.params.id], function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    }
    resCloth = {
      id: results[0].memberID,
      category: results[0].topType,
      color: results[0].topColor,
      pictureAsFile: results[0].topImage,
    }
    res.status(200).send(resCloth);
  });
});
app.get("/cloth/bottom/:id", (req, res) => {
  var resCloth;
  let sql = "SELECT * FROM mybottom WHERE memberID=? AND bottomCode=?";
  connection.query(sql, [req.query.id, req.params.id], function(err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    }
    resCloth = {
      id: results[0].memberID,
      category: results[0].bottomType,
      color: results[0].bottomColor,
      pictureAsFile: results[0].bottomImage,
    }
    res.status(200).send(resCloth);
  });
});

// 옷(아우터,상의,하의) 삭제
app.delete("/cloth/outers/", (req, res) => {
  if(Array.isArray(req.query.delete)){ //배열이면(여러개면)
    for(var i=0; req.query.delete[i]!=undefined;){
      let deletePromise = new Promise((resolve, reject) => {
        sql = "DELETE FROM mytop WHERE topSort='outer' AND memberID=? AND topCode=?";
        tmp = [req.query.memberID, req.query.delete[i]];
        connection.query(sql, tmp, function(err, results, fields) { 
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(results);
        });
      });
      deletePromise.then(
        async (rst) => {
          tmp = [req.query.delete[i], req.query.memberID];
          sql = "DELETE FROM cody WHERE outerCode=? AND memberID=?";
          connection.query(sql, tmp, function (err, results, fields) { // 코디 삭제
            if (err) {
              console.log(err);
              throw err;
            }
            i++;
          });
        }
      );
    }
  } else { // 한벌
    let deletePromise = new Promise((resolve, reject) => {
      sql = "DELETE FROM mytop WHERE topSort='outer' AND memberID=? AND topCode=?";
      tmp = [req.query.memberID, req.query.delete];
      connection.query(sql, tmp, function(err, results, fields) { 
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
    deletePromise.then(
      async (rst) => {
        tmp = [req.query.delete, req.query.memberID];
        sql = "DELETE FROM cody WHERE outerCode=? AND memberID=?";
        connection.query(sql, tmp, function (err, results, fields) { // 코디 삭제
          if (err) {
            console.log(err);
            throw err;
          }
          res.sendStatus(204);
        });
      }
    );
  }
});
app.delete("/cloth/tops/", (req, res) => {
  if(Array.isArray(req.query.delete)){ //배열이면(여러개면)
    for(var i=0; req.query.delete[i]!=undefined; i++){
      let deletePromise = new Promise((resolve, reject) => {
        sql = "DELETE FROM mytop WHERE topSort='top' AND memberID=? AND topCode=?";
        tmp = [req.query.memberID, req.query.delete[i]];
        connection.query(sql, tmp, function(err, results, fields) { 
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(results);
        });
      });
      deletePromise.then(
        async (rst) => {
          tmp = [req.query.delete[i], req.query.memberID];
          sql = "DELETE FROM cody WHERE topCode=? AND memberID=?";
          connection.query(sql, tmp, function (err, results, fields) { // 코디 삭제
            if (err) {
              console.log(err);
              throw err;
            }
            i++;
          });
        }
      );
    }
  } else {
    let deletePromise = new Promise((resolve, reject) => {
      sql = "DELETE FROM mytop WHERE topSort='top' AND memberID=? AND topCode=?";
      tmp = [req.query.memberID, req.query.delete];
      connection.query(sql, tmp, function(err, results, fields) { 
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
    deletePromise.then(
      async (rst) => {
        tmp = [req.query.delete, req.query.memberID];
        sql = "DELETE FROM cody WHERE topCode=? AND memberID=?";
        connection.query(sql, tmp, function (err, results, fields) { // 코디 삭제
          if (err) {
            console.log(err);
            throw err;
          }
          res.sendStatus(204);
        });
      }
    );
  }
});
app.delete("/cloth/bottoms/", (req, res) => {
  if(Array.isArray(req.query.delete)){ //배열이면(여러개면)
    for(var i=0; req.query.delete[i]!=undefined; i++){
      let deletePromise = new Promise((resolve, reject) => {
        sql = "DELETE FROM mybottom WHERE memberID=? AND bottomCode=?";
        tmp = [req.query.memberID, req.query.delete[i]];
        connection.query(sql, tmp, function(err, results, fields) { 
          if (err) {
            console.log(err);
            reject(err);
          }
          resolve(results);
        });
      });
      deletePromise.then(
        async (rst) => {
          tmp = [req.query.delete[i], req.query.memberID];
          sql = "DELETE FROM cody WHERE bottomCode=? AND memberID=?";
          connection.query(sql, tmp, function (err, results, fields) { // 코디 삭제
            if (err) {
              console.log(err);
              throw err;
            }
            i++;
          });
        }
      );
    }
  } else {
    let deletePromise = new Promise((resolve, reject) => {
      sql = "DELETE FROM mybottom WHERE memberID=? AND bottomCode=?";
      tmp = [req.query.memberID, req.query.delete];
      connection.query(sql, tmp, function(err, results, fields) { 
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(results);
      });
    });
    deletePromise.then(
      async (rst) => {
        tmp = [req.query.delete, req.query.memberID];
        sql = "DELETE FROM cody WHERE bottomCode=? AND memberID=?";
        connection.query(sql, tmp, function (err, results, fields) { // 코디 삭제
          if (err) {
            console.log(err);
            throw err;
          }
          res.sendStatus(204);
        });
      }
    );
  }
});

// 코디 등록
app.post("/cody/add", (req, res) => {
  tmp = [req.body.codyId, req.body.topId, req.body.outerId, req.body.bottomId, req.body.userId];
  sql = "insert into cody value (?, ?, ?, ?, ?)";
  connection.query(sql, tmp, function (err, results, fields) { 
    if (err) {
      console.log("-err: "+err);
      throw err;
    } else {
      res.sendStatus(201);
  }});
});
// 코디 조회(서버분이 추가수정)
app.get("/cody/codys", (req, res) => {
  var resCody = [];
  var length;
  var i=0;

  let selectPromise = new Promise((resolve, reject) => {
    let sql = "SELECT * FROM cody WHERE memberID=?";
    connection.query(sql, req.query.id, function(err, results, fields) { 
      if (err) {
        console.log(err);
        reject(err);
      } else if (results==""){ // 있는 코디가 없다
      } else {
        for(var i=0; i<results.length; i++){
          resCody[i] = {
            codyId: results[i].matchCode,
            bottomId: results[i].bottomCode,
            //pictureAsFile_bottom: tmp[2],
            outerId: results[i].outerCode,
            // pictureAsFile_outer: tmp[1],
            topId: results[i].topCode,
            //pictureAsFile_top:tmp[0],
          }
        }
        length=results.length;
        resolve(results);

        setTimeout(()=>{res.status(200).send(resCody);},length*250);
      }
    });
  });

  selectPromise.then(
    async (results) => { // 리턴받는것은 select의 결과
      i=0;
      for (const data of results) {
        tmp=[]; //이미지담기
        if(data.topCode) { // 탑 유무
          if(data.outerCode) { // 아우터 유무 //tob 시작
            sql= "select mytop.topImage, mybottom.bottomImage, cody.* from mytop, mybottom, cody where mytop.memberID=? "
              + "and mytop.topCode=? and mybottom.memberID=? and mybottom.bottomCode=? and cody.topCode=? and cody.outerCode=? and cody.bottomCode=?";
            value = [req.query.id, data.topCode, req.query.id, data.bottomCode, data.topCode, data.outerCode, data.bottomCode];
            let tobPromise = new Promise((resolve, reject) => {
              connection.query(sql, value, function(err2, results2, fields2) { //상의+하의
                if (err2) {
                  console.log(err2);
                  reject(err2);
                } else {
                  tmp[0]=results2[0].topImage;
                  tmp[2]=results2[0].bottomImage;

                  resCody[i].pictureAsFile_bottom=tmp[2];
                  resCody[i].pictureAsFile_top=tmp[0];

                  resolve(results2[0].outerCode);
                }
              });
            });
          
            await tobPromise.then(
              (result) => {
                sql= "SELECT * FROM mytop WHERE topCode=?";
                connection.query(sql, result, function(err3, results3, fields3) { // 아우터
                  if (err3) {
                    console.log(err3);
                    throw err3;
                  } else {
                    tmp[1]=results3[0].topImage;
                    
                    resCody[i].pictureAsFile_outer=tmp[1];
                    i+=1;
                  }
                });
              }, (err)=>{
                console.log("-err"+err);
                res.send(err);
              }
            ); // tob 종료
          } else { // tb 시작
            sql= "select mytop.topImage, mybottom.bottomImage, cody.* from mytop, mybottom, cody where mytop.memberID=? "
              + "and mytop.topCode=? and mybottom.memberID=? and mybottom.bottomCode=? and cody.topCode=? and cody.bottomCode=?";
            value = [req.query.id, data.topCode, req.query.id, data.bottomCode, data.topCode, data.bottomCode];
            connection.query(sql, value, function (err2, results2, fields2) {
              if (err2) {
                console.log(err2);
                throw err2;
              }
              tmp[0] = results2[0].topImage;
              tmp[2] = results2[0].bottomImage;

              resCody[i].pictureAsFile_bottom = tmp[2];
              resCody[i].pictureAsFile_top = tmp[0];

              i+=1;
            }); // tb 종료
          }
        } else { // ob 시작
          sql= "select mytop.topImage, mybottom.bottomImage, cody.* from mytop, mybottom, cody where mytop.memberID=? " 
            + "and mytop.topCode=? and mybottom.memberID=? and mybottom.bottomCode=? and cody.outerCode=? and cody.bottomCode=?";
          value = [req.query.id, data.outerCode, req.query.id, data.bottomCode, data.outerCode, data.bottomCode];
          connection.query(sql, value, function(err2, results2, fields2) {  //아우터+하의
            if (err2) {
              console.log(err2);
              throw err2;
            } else {
              tmp[1]=results2[0].topImage;
              tmp[2]=results2[0].bottomImage;

              resCody[i].pictureAsFile_bottom=tmp[2];
              resCody[i].pictureAsFile_outer=tmp[1];
              
              i+=1;
            }
          }); 
        } // ob 종료
      } // for 끝
  });
});

// 코디 삭제
app.delete("/cody/codys/", (req, res) => {
  try{
    if(Array.isArray(req.query.delete)){ //배열이면(여러개면)
      for(var i=0; req.query.delete[i]!=undefined; i++){
        tmp = [req.query.memberID, req.query.delete[i]];
        let sql = "DELETE FROM cody WHERE memberID=? AND matchCode=?";
        connection.query(sql, tmp, function (err, results, fields) { 
          if (err) {
              console.log(err);
              throw err;
          }
        });
      }
    } else { // 하나면
      tmp = [req.query.memberID, req.query.delete];
      let sql = "DELETE FROM cody WHERE memberID=? AND matchCode=?";
      connection.query(sql, tmp, function (err, results, fields) { 
        if (err) {
            console.log(err);
            throw err;
        }
      });
    }
  } catch(e){
    console.log(e);
    throw e;
  } finally{
    res.sendStatus(204);
  }
});

/////////////////////////추천 관련/////////////////////////
// 사용자 옷 기반 추천 코디 조회
app.get("/recommend/clothbased", (req, res) => { // query id에 유저id
  closetCody = [];
  sql = "select mytop.*, mybottom.bottomImage from lookbook, mytop, mybottom "
    + "where mytop.memberID = ? and mybottom.memberID = ? and lookbook.topType = mytop.topType "
    + "and lookbook.bottomType = mybottom.bottomType "
    + "and lookbook.topColor = mytop.topColor and lookbook.bottomColor = mybottom.bottomColor "
    + "and (INSTR(lookbook.topAttribute, mytop.topAttribute) or INSTR(lookbook.bottomAttribute, mybottom.bottomAttribute) "
    + "or INSTR(mytop.topAttribute, lookbook.topAttribute) or INSTR(mybottom.bottomAttribute, lookbook.bottomAttribute)) "
    + "order by Rand() LIMIT 3";
  tmp = [req.query.id, req.query.id];
  connection.query(sql, tmp, function (err, results, fields) { 
    if (err) {
      console.log(err);
      throw err;
    } else if (!results.length){ // 추천 결과 없음
      res.status(200).send();
    } else {
      for(var i=0; i<3; i++){
        closetCody[i] = {
          codyId: "cody-"+i+1,
          outerId: results[i].topCode,
          pictureAsFile_outer: results[i].topImage,
          bottomId: results[i].bottomCode,
          pictureAsFile_bottom: results[i].bottomImage,
        }
      }

      res.status(200).send(closetCody);
    }
  });
});
// 선호스타일1 기반 추천 코디 조회
// 멤버아이디에 맞는 룩북 5개 랜덤들고오기
app.get("/recommend/stylebased1", (req, res) => { // query id에 유저id
  lookbook = [];
  sql = "select lookbook.* from lookbook, mytop, mybottom "
    + "where mytop.memberID = ? and mybottom.memberID = ? and lookbook.topType = mytop.topType "
    + "and lookbook.bottomType = mybottom.bottomType and lookbook.style = ? "
    + "and lookbook.topColor = mytop.topColor and lookbook.bottomColor = mybottom.bottomColor "
    + "and (INSTR(lookbook.topAttribute, mytop.topAttribute) or INSTR(lookbook.bottomAttribute, mybottom.bottomAttribute) "
    + "or INSTR(mytop.topAttribute, lookbook.topAttribute) or INSTR(mybottom.bottomAttribute, lookbook.bottomAttribute)) "
    + "order by Rand() LIMIT 10";
  tmp = [req.query.id, req.query.id, req.query.style];
  connection.query(sql, tmp, function (err, results, fields) { 
    if (err) {
        console.log(err);
        throw err;
    } else if (!results.length){
      res.status(200).send();
    } else {
      keys=[];
      for (var n=0, i=0; i<results.length; i++) {
        if(n>4) break;
        if(keys.indexOf(results[i].lookbookCode)==-1){
          lookbook[n] = {
            codyId: results[i].lookbookCode,
            styleName: results[i].style,
            pictureAsFile_outer: results[i].lookbookImage,
          }
          n++;
        }
      }

      res.status(200).send(lookbook);
    }
  });
});
// 선호스타일2 기반 추천 코디 조회
app.get("/recommend/stylebased2", (req, res) => { // query id에 유저id
  lookbook2 = [];
  sql = "select lookbook.* from lookbook, mytop, mybottom "
    + "where mytop.memberID = ? and mybottom.memberID = ? and lookbook.topType = mytop.topType "
    + "and lookbook.bottomType = mybottom.bottomType and lookbook.style = ? "
    + "and lookbook.topColor = mytop.topColor and lookbook.bottomColor = mybottom.bottomColor "
    + "and (INSTR(lookbook.topAttribute, mytop.topAttribute) or INSTR(lookbook.bottomAttribute, mybottom.bottomAttribute) "
    + "or INSTR(mytop.topAttribute, lookbook.topAttribute) or INSTR(mybottom.bottomAttribute, lookbook.bottomAttribute)) "
    + "order by Rand() LIMIT 10";
    tmp = [req.query.id, req.query.id, req.query.style];
    connection.query(sql, tmp, function (err, results, fields) { 
      if (err) {
          console.log(err);
          throw err;
      } else if (!results.length){
        res.status(200).send();
      } else {
        keys=[];
        for (var n=0, i=0; i<results.length; i++) {
          if(n>4) break;
          if(keys.indexOf(results[i].lookbookCode)==-1){
            lookbook2[n] = {
              codyId: results[i].lookbookCode,
              styleName: results[i].style,
              pictureAsFile_outer: results[i].lookbookImage,
            }
            n++;
          }
        }

        res.status(200).send(lookbook2);
      }
    });
  });
