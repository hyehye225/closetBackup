import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import ClosetService from '../../services/ClosetService';
import { uniqueId } from 'lodash';
import AuthService from '../../services/AuthService';
import '../../styles/common/App.css';
export default class ClothAddComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeClothImage = this.onChangeClothImage.bind(this);
    this.onChangeAttribute = this.onChangeAttribute.bind(this);
    
    this.saveCloth = this.saveCloth.bind(this);
    this.newCloth = this.newCloth.bind(this);

    this.state = {
      id: null,
      category: '',
      color: '',
      PicturePreview: '',
      pictureAsFile: '',
      userId: '',
      submitted: false,

      attribute: [],
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      alert('로그인을 해주세요');
      // this.state.redirect = '/login';
      this.setState({ redirect: '/login' });
      // console.log(currentUser);
    } else {
      this.setState({ userId: currentUser.id });
    }
  }
  onChangeCategory(e) {
    this.setState({
      category: e.target.value,
    });
  }

  onChangeColor(e) {
    this.setState({
      color: e.target.value,
    });
  }

  onChangeClothImage(e) {
    this.setState({
      picturePreview: URL.createObjectURL(e.target.files[0]),
      pictureAsFile: e.target.files[0],
    });
  }

  onChangeAttribute(e) {
    // var options = e.target.options;
    // var value = "[ ";
    // for (var i = 0, l = options.length; i < l; i++) {
    //   if (options[i].selected) {
    // //     value.push(options[i].value);
    //     value+=options[i].selected+",";
    //   }
    // }
    // value+="]";
    // console.log(value);
    // this.setState({ attribute: value });
    var options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ attribute: value }); 
  }

  newCloth() {
    this.setState({
      id: null,
      category: '',
      color: '',
      PicturePreview: '',
      pictureAsFile: '',

      attribute: [],

      submitted: false,
    });
    //등록된 옷정보를 초기화
  }
  // getBase64(files) {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(files);

  //   reader.onload = () => {
  //     console.log(reader.result);
  //     this.state.pictureAsFile = reader.result;
  //   };
  //   reader.onerror = (error) => {
  //     console.log('Error: ', error);
  //   };
  // }
  // getFormData(object) {
  //   const formData = new FormData();
  //   Object.keys(object).forEach((key) => formData.append(key, object[key]));
  //   return formData;
  // }

  saveCloth(e) {
    e.preventDefault();

    const formData = new FormData();
    this.state.id = 'cloth-' + new Date().getTime();
    formData.append('id', this.state.id);
    formData.append('userId', this.state.userId); //사용자 id
    formData.append('category', this.state.category);
    formData.append('color', this.state.color);
    formData.append('img', this.state.pictureAsFile); //(개별 옷의)id,category,color,img(파일)을 formdata 형식으로 전송
    formData.append('attribute', JSON.stringify(this.state.attribute));

    for (var pair of formData.entries()) {
      console.log(`${pair}`);
    } //form 데이터 요소 확인//form 데이터는 정상적으로 저장되어있다!!
    ClosetService.createCloth(formData)

      .then((response) => {
        console.log(response.data);
        this.setState({
          submitted: true,
        });
        // console.log(response);
      })
      .catch((error) => {
        // console.log(e);
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        alert(resMessage); 
        // alert(e);
      });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    
    let picturePreview = null;
    if (this.state.picturePreview !== '') {
      picturePreview = (
        <img
          className="picturePreview"
          src={this.state.picturePreview}
          width={190}
          height={190}
        />
      );
    }
    return (
      <div
        className="submit-form"
        style={{
          borderRadius: 5,
          backgroundColor: '#C8BEE6',
          color: 'white',
          textAlign: 'center',
          margin: 10,
          padding: 10,
          height: '550px',
          width: '300px',
          fontFamily:'Tenada',
        }}
      >
        {this.state.submitted ? (
          <div>
            <h4>옷 등록 완료!</h4>
            <button
              className="btn btn-success"
              onClick={this.newCloth}
              style={{
                borderColor: 'white',
                color: 'black',
                backgroundColor: 'white',
              }}
            >
              옷 추가 등록
            </button>
          </div>
        ) : (
          <div>
            <h3>옷 등록</h3>
            {/* formdata post 시 의 형식 설정 */}
            <form action="/cloth" method="post" encType="multipart/form-data">
              <div className="form-group" style={{ height: 25 }}>
                <label htmlFor="category">{/* 옷 카테고리 */}</label>

                <select
                  required
                  type="text"
                  className="form-control"
                  id="category"
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  name="category"
                >
                  <option value="">옷 카테고리 선택</option>
                  {/* <option key="outer" value="outer">
                    아우터
                  </option>
                  <option key="longSleeve" value="longSleeve">
                    긴팔
                  </option>
                  <option key="shortSleeve" value="shortSleeve">
                    반팔
                  </option>
                  <option key="longPants" value="longPants">
                    긴바지
                  </option>
                  <option key="shortPants" value="shortPants">
                    반바지
                  </option>
                  <option key="skirt" value="skirt">
                    치마
                  </option> */}
                  <option key="coat" value="coat">
                    코트
                  </option>
                  <option key="jacket" value="jacket">
                    자켓
                  </option>
                  <option key="shirt" value="shirt">
                    셔츠
                  </option>
                  <option key="clothing" value="clothing">
                    이너
                  </option>
                  <option key="jeans" value="jeans">
                    청바지
                  </option>
                  <option key="trousers" value="trousers">
                    바지
                  </option>
                  <option key="skirt" value="skirt">
                    치마
                  </option>
                  <option key="miniskirt" value="miniskirt">
                    미니스커트
                  </option>
                  <option key="shorts" value="shorts">
                    반바지
                  </option>
                  <option key="suit" value="suit">
                    수트
                  </option>
                  <option key="dress" value="dress">
                    드레스
                  </option>
                </select>
              </div>

              <div className="form-group" style={{ height: 25 }}>
                <label htmlFor="color">{/* 옷 색상 */}</label>

                <select
                  required
                  type="text"
                  className="form-control"
                  id="color"
                  value={this.state.color}
                  onChange={this.onChangeColor}
                  name="color"
                >
                    <option value="">옷 색상 선택</option>
                  <option value="black">블랙</option>
                  <option value="grey">그레이</option>
                  <option value="brown">브라운</option>
                  <option value="beige">베이지</option>
                  <option value="white">화이트</option>
                  {/* <option value="darkblue">진청</option>
                  <option value="lightblue">연청</option> */}
                  <option value="red">레드</option>
                  <option value="orange">오렌지</option>
                  <option value="yellow">옐로우</option>
                  <option value="green">그린</option>
                  <option value="blue">블루</option>
                  <option value="violet">바이올렛</option>
                  <option value="purple">퍼플</option>
                </select>
              </div>

              <div className="form-group" style={{ height: 85 }}>
                <label htmlFor="attribute">{/* 옷 특성 */}</label>

                <select
                  multiple={true}
                  required
                  type="text"
                  className="form-control"
                  id="attribute"
                  value={this.state.attribute}
                  onChange={this.onChangeAttribute}
                  name="attribute"
                >
                  <option>옷 특성 없음</option>
                  <option value="animal">동물무늬</option>
                  <option value="camouflage">밀리터리</option>
                  <option value="cargo">카고</option>
                  <option value="colorblock">컬러블록</option>
                  <option value="cotton">면</option>
                  <option value="floral">꽃무늬</option>
                  <option value="graphic">그림</option>
                  <option value="leopard">호피</option>
                  <option value="pleated">주름진</option>
                  <option value="print">프린트</option>
                  <option value="striped">줄무늬</option>
                  <option value="sheer">비침</option>
                  <option value="utility">유틸리티</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="pictureAsFile">{/* 옷 이미지 업로드 */}</label>
                <input
                  type="file"
                  className="form-control"
                  id="pictureAsFile"
                  required
                  accept="pictureAsFile/jpg,pictureAsFile/png,pictureAsFile/jpeg"
                  name="img"
                  onChange={this.onChangeClothImage}
                />
                {picturePreview}
              </div>

              <button
                type="submit"
                onClick={this.saveCloth}
                className="btn btn-success"
                style={{
                  borderColor: 'white',
                  color: 'black',
                  backgroundColor: 'white',
                }}
              >
                등록
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
