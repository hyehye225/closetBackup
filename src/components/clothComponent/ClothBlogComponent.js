import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Outer from './ClothBlogComponents/Outer';
import Top from './ClothBlogComponents/Top';
import Bottom from './ClothBlogComponents/Bottom';
import '../../styles/common/App.css';
import AuthService from '../../services/AuthService';
import '../../styles/common/App.css';
export default class ClothBlogComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.changeCategory = this.changeCategory.bind(this);
    // this.getAllCloths = this.getAllCloths.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveCloth = this.setActiveCloth.bind(this);
    // this.removeAllCloths = this.removeAllCloths.bind(this);

    this.state = {
      category: 0,
      // cloths: [],
      // outers: [],
      // tops: [],
      // bottoms: [],
      // currentCloth: null,
      // currentIndex: -1,
    };
  }

  changeCategory = (categoryIndex) => {
    this.setState({ category: categoryIndex });
  };
  // componentDidMount() {
  //   this.getAllCloths();
  //   this.setCategory();
  // }
  // getAllCloths() {
  //   ClosetService.getAllCloths()
  //     .then((response) => {

  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  //   this.state.cloths = testCloth;
  // }
  // setCategory() {

  //   this.state.cloths.map((cloth) => {

  //     if (cloth.category == 'outer') {
  //       console.log('아우터');
  //       this.state.outers.push(cloth);

  //     } else if (
  //       cloth.category == 'longSleeve' ||
  //       cloth.category == 'shortSleeve'
  //     ) {
  //       console.log('상의');
  //       this.state.tops.push(cloth);

  //     } else {
  //       console.log('하의');
  //       this.state.bottoms.push(cloth);

  //     }
  //     console.log(this.state.bottoms);
  //   });

  // }
  // refreshList() {
  //   this.getAllCloths();
  //   this.setState({
  //     currentCloth: null,
  //     currentIndex: -1,
  //   });
  // }
  // setActiveCloth(Cloth, index) {
  //   this.setState({
  //     currentCloth: Cloth,
  //     currentIndex: index,
  //   });
  // }
  // removeAllCloths() {
  //   ClosetService.deleteAllCloths()
  //     .then((response) => {
  //       this.refreshList();
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
    
    return (
      <div
        className="wrap"
        style={{
          background: '#C8BEE6',
          borderRadius: 5,
          margin: 10,
          padding: 10,
          height: '550px',
          width: '850px',
          fontFamily:'Tenada',
        }}
      >
        <div className="menuBar">
          <ul className="tabs">
            <li
              className={`${this.state.category === 0 ? 'active' : ''}`}
              onClick={() => this.changeCategory(0)}
            >
              아우터
            </li>
            <li
              className={`${this.state.category === 1 ? 'active' : ''}`}
              onClick={() => this.changeCategory(1)}
            >
              상의
            </li>
            <li
              className={`${this.state.category === 2 ? 'active' : ''}`}
              onClick={() => this.changeCategory(2)}
            >
              하의
            </li>

            <button
              style={{ background: 'white', float: 'right' }}
              className="m-3 btn btn-sm "
              onClick={() => this.myRef.current.deleteCheckedCloths()}
            >
              선택 옷 삭제
            </button>
          </ul>
        </div>
        <div className="contentArea">
          {(() => {
            if (this.state.category == 0) {
              return <Outer ref={this.myRef} />;
            } else if (this.state.category == 1) {
              return <Top ref={this.myRef} />;
            } else {
              return <Bottom ref={this.myRef} />;
            }
          })()}
        </div>
      </div>
    );
  }
}
