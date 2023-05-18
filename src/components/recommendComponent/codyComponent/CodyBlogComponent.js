import React, { Component } from 'react';
import '../../styles/common/App.css';
import Cody from './Cody';

export default class CodyBlogComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    // this.getAllCloths = this.getAllCloths.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveCloth = this.setActiveCloth.bind(this);
    // this.removeAllCloths = this.removeAllCloths.bind(this);

    this.state = {
      // category: 0,
      // cloths: [],
      // outers: [],
      // tops: [],
      // bottoms: [],
      // currentCloth: null,
      // currentIndex: -1,
    };
  }
  // changeCategory = (categoryIndex) => {
  //   this.setState({ category: categoryIndex });
  // };
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
    console.log("cody blog render");
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
        }}
      >
        <div className="menuBar">
          <ul className="tabs ">
            {/* <li
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
            </li> */}
            <li
              className={'active'}
              // onClick={() => this.changeCategory(3)}
            >
              코디
            </li>
            {/* <li
              className={`${this.state.category === 3 ? 'active' : ''}`}
              onClick={() => this.changeCategory(3)}
            >
              한벌옷
            </li> */}
            {/* <li
              className={`${this.state.category === 4 ? 'active' : ''}`}
              onClick={() => this.changeCategory(4)}
            >
              내 코디
            </li> */}

            <button
              style={{
                background: 'white',
                float: 'right',
              }}
              className="m-3 btn btn-sm "
              onClick={() => this.myRef.current.deleteCheckedCodys()}
            >
              선택 코디 삭제
            </button>
            {/* <button
              style={{
                background: 'white',
                float: 'right',
              }}
              className="m-3 btn btn-sm "
              onClick={() => this.myRef.current.deleteCheckedCloths()}
            >
              하의 선택
            </button>
            <button
              style={{
                background: 'white',
                float: 'right',
              }}
              className="m-3 btn btn-sm "
              onClick={() => this.myRef.current.deleteCheckedCloths()}
            >
              상의 선택
            </button>
            <button
              style={{
                background: 'white',
                float: 'right',
              }}
              className="m-3 btn btn-sm "
              onClick={() => this.myRef.current.deleteCheckedCloths()}
            >
              아우터 선택
            </button> */}
          </ul>
        </div>
        <div className="contentArea">
          {(() => {
            return <Cody ref={this.myRef} />;
          })()}
        </div>
      </div>
    );
  }
}
