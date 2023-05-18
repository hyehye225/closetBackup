import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
// import Outer from './ClothBlogComponents/Outer';
// import Top from './ClothBlogComponents/Top';
// import Bottom from './ClothBlogComponents/Bottom';
import '../../styles/common/App.css';
import styled from 'styled-components';
import '../../styles/common/App.css';
import test1 from './casual_1.png';
import test2 from './casual_2.png';
import test3 from './casual_3.png';
import test4 from './casual_4.png';
import test5 from './casual_5.png';
import test6 from './minimal_1.png';
import test7 from './minimal_2.png';
import test8 from './minimal_3.png';
import test9 from './minimal_4.png';
import test10 from './minimal_5.png';
import ClosetService from '../../services/ClosetService';
import ReactPaginate from 'react-paginate';
import AuthService from '../../services/AuthService';
import '../../styles/common/App.css';
const testCody1 = [
  {
    codyId: 'test-1',
    styleName: 'casual',
    // codyId: 'cody-1',
    pictureAsFile_outer: test1,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    // bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom1,
  },
  {
    codyId: 'test-2',
    styleName: 'casual',
    // outerId: 'cody-1',
    pictureAsFile_outer: test2,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom3,
  },
  {
    codyId: 'test-3',
    styleName: 'casual',
    // outerId: 'cody-1',
    pictureAsFile_outer: test3,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom2,
  },
  {
    codyId: 'test-4',
    styleName: 'casual',
    // outerId: 'cody-1',
    pictureAsFile_outer: test4,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom1,
  },
  {
    codyId: 'test-5',
    styleName: 'casual',
    // outerId: 'cody-1',
    pictureAsFile_outer: test5,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom3,
  },
];
const testCody2 = [
  {
    codyId: 'test-6',
    styleName: 'minimal',
    // outerId: 'cody-1',
    pictureAsFile_outer: test6,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom2,
  },
  {
    codyId: 'test-7',
    styleName: 'minimal',
    // outerId: 'cody-1',
    pictureAsFile_outer: test7,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom1,
  },
  {
    codyId: 'test-8',
    styleName: 'minimal',
    // outerId: 'cody-1',
    pictureAsFile_outer: test8,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom3,
  },
  {
    codyId: 'test-9',
    styleName: 'minimal',
    // outerId: 'cody-1',
    pictureAsFile_outer: test9,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    // bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom2,
  },
  {
    codyId: 'test-10',
    styleName: 'minimal',
    // outerId: 'cody-10',
    pictureAsFile_outer: test10,
    // topId: 'top-1',
    // pictureAsFile_top: test2Image,
    // bottomId: 'bottom-1',
    // pictureAsFile_bottom: bottom2,
  },
];
const Box1 = styled.div`
  width: 950px;
  height: 200px;
  border-radius: 5;
`;
const ClothBox = styled.div`
  padding-bottom: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  height: 100%;
  overflow-y: scroll;
  background: #c8bee6;
  display: flex;
  // flex-flow: column wrap;
  flex-wrap: wrap;
  // flex: column;
  align-content: flex-start;
  justify-content: flex-start;
`;
export default class StyleBasedRecComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    // this.changeCategory = this.changeCategory.bind(this);
    // this.getAllCloths = this.getAllCloths.bind(this);
    // this.refreshList = this.refreshList.bind(this);
    // this.setActiveCloth = this.setActiveCloth.bind(this);
    // this.removeAllCloths = this.removeAllCloths.bind(this);
    this.getAllPSCodys = this.getAllPSCodys.bind(this);
    this.state = {
      // category: 0,
      codys1: [],
      codys2: [],

      style1: '',
      style2: '',

      offset: 0,
      perPage: 5,
      currentPage: 0,

      userId: '',
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
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (!user) {
      alert('로그인을 해주세요');
      // this.state.redirect = '/login';
      this.setState({ redirect: '/login' });
      // console.log(currentUser);
    } else {
      // console.log(user.id);
    this.state.userId = user.id;
    this.state.style1 = user.style_1;
    this.state.style2 = user.style_2;

    this.getAllPSCodys(); //모든 아우터를 가져온다
    // this.paginateCodys1(); // 가져온 모든 아우터를 기반으로 pagination을 수행한다
    // this.paginateCodys2();
    }
  }
  paginateCodys1() {
    const data = this.state.codys1;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData1 = slice.map((cody) => (
      <div key={cody.codyId} style={{ padding: 6 }}> 
        <img width="160" height="200" src={process.env.PUBLIC_URL + cody.pictureAsFile_outer} />
        {/* <img width="150" height="150" src={cody.pictureAsFile_top} /> */}
        {/* <img width="180" height="180" src={cody.pictureAsFile_bottom} /> */}
        {/* <input
          type="checkbox"
          value={cody.codyId} ///고정 ///선택한 값들이 가지는 고유한 값,서버로 전송되는 값
          onChange={this.onChange}
        /> */}
      </div>
    ));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData1,
    });
  }
  paginateCodys2() {
    const data = this.state.codys2;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData2 = slice.map((cody) => (
     
      
      <div key={cody.codyId} style={{ padding: 6 }}>
        <img width="160" height="200" src={cody.pictureAsFile_outer} />
        {/* <img width="150" height="150" src={cody.pictureAsFile_top} /> */}
        {/* <img width="180" height="180" src={cody.pictureAsFile_bottom} /> */}
        {/* <input
          type="checkbox"
          value={cody.codyId} ///고정 ///선택한 값들이 가지는 고유한 값,서버로 전송되는 값
          onChange={this.onChange}
        /> */}
      </div>
       ));

     this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData2,
    });
  }
  handlePageClick1 = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.paginateCodys1();
      },
    );
  };
  handlePageClick2 = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.paginateCodys2();
      },
    );
  };

  getAllPSCodys() {
    ClosetService.getAllPS1Codys(this.state.userId, this.state.style1)
      .then((res) => {
        const data = res.data;
        console.log(data);

        this.setState((this.state.codys1 = data));

        this.setState({
          style1: data[0].styleName,
          // offset: offset,
        });

        this.paginateCodys1(); // 가져온 모든 아우터를 기반으로 pagination을 수행한다
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.codys.push(response.data) //이런식으로 갈듯
    // this.setState((this.state.codys1 = testCody1)); //v
    // this.setState((this.state.style1 = testCody1[0].styleName));
    // this.setState({ //v
    //   style1: testCody1[0].styleName,
    //   // offset: offset,
    // });
    // this.setState((this.state.codyImages = testCloth.pictureAsFile));
    // this.count = testCody.length;

    // console.log(this.count);
    ClosetService.getAllPS2Codys(this.state.userId, this.state.style2)
      .then((res) => {
        const data = res.data;
        console.log(data);
        
        this.setState((this.state.codys2 = data));

        this.setState({
          style2: data[0].styleName,
          // offset: offset,
        });

        this.paginateCodys2();
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.codys.push(response.data) //이런식으로 갈듯
    // this.setState((this.state.codys2 = testCody2));
    // this.setState((this.state.style2 = testCody2[0].styleName));
    // this.setState({
    //   style2: testCody2[0].styleName,
    //   // offset: offset,
    // });
    // this.setState((this.state.codyImages = testCloth.pictureAsFile));
    // this.count = testCody.length;

    // console.log(this.count);
  }
  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    return (
      <>
        <div
          className="wrap"
          style={{
            background: '#C8BEE6',
            borderRadius: 5,
            margin: 10,
            padding: 10,
            height: '300px',
            width: '1050px',
            fontFamily:'Tenada',
          }}
        >
          <header className="well" style={{ backgroundColor: '#C8BEE6' ,fontFamily:'Tenada',}}>
            <h3>선호 스타일1 ({this.state.style1}) 기반 추천 코디</h3>
            {/* <h4>{this.state.style1}</h4> */}
          </header>
          {/* <div className="menuBar">
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
        </div> */}
          <div className="contentArea">
            {/* {(() => {
            if (this.state.category == 0) {
              return <Outer ref={this.myRef} />;
            } else if (this.state.category == 1) {
              return <Top ref={this.myRef} />;
            } else {
              return <Bottom ref={this.myRef} />;
            }
          })()} */}
            <Box1>
              <ClothBox>{this.state.postData1}</ClothBox>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick1}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </Box1>
          </div>
        </div>
        <div
          className="wrap"
          style={{
            background: '#C8BEE6',
            borderRadius: 5,
            margin: 10,
            padding: 10,
            height: '300px', //300 160+40
            width: '1050px',
          }}
        >
          <header className="well" style={{ backgroundColor: '#C8BEE6' ,fontFamily:'Tenada',}}>
            <h3>선호 스타일2 ({this.state.style2}) 기반 추천 코디</h3>
            {/* <h4>{this.state.style2}</h4> */}
          </header>
          <div className="contentArea">
            <Box1>
              <ClothBox>{this.state.postData2}</ClothBox>
              <ReactPaginate
                previousLabel={'<'}
                nextLabel={'>'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick2}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </Box1>
          </div>
        </div>
      </>
    );
  }
}
