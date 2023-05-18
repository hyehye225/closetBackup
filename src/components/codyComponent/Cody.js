import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../../styles/common/App.css';
import styled from 'styled-components';
import test1Image from './Outer1.jpg';
import test2Image from './Outer2.jpg';
import test4Image from './Outer4.jpg';
import test5Image from './Outer5.jpg';
import ReactPaginate from 'react-paginate';
import ClosetService from '../../services/ClosetService';
import AuthService from '../../services/AuthService';

const testCody = [
  {
    codyId: 'test-1',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-2',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-3',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-4',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-5',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-6',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-7',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-8',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
  {
    codyId: 'test-9',
    outerId: 'outer-1',
    pictureAsFile_outer: test1Image,
    topId: 'top-1',
    pictureAsFile_top: test2Image,
    bottomId: 'bottom-1',
    pictureAsFile_bottom: test4Image,
  },
];
const Box1 = styled.div`
  width: 800px;
  height: 400px;
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
  flex-flow: row wrap;
  flex: row;
  align-content: flex-start;
  justify-content: flex-start;
`;

class Cody extends React.Component {
  constructor(props) {
    super();
    this.getAllCodys = this.getAllCodys.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteCheckedCodys = this.deleteCheckedCodys.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      // cloths: [],
      codys: [],
      codyImages: [],

      offset: 0,
      perPage: 4,
      currentPage: 0,

      checkedList: [],

      userId: '',
      // checked: false,
      // currentcodyId: '',
    };
  }
  componentDidMount() {
    // this.getAllCodys(); //모든 아우터를 가져온다
    // this.paginateCodys(); // 가져온 모든 아우터를 기반으로 pagination을 수행한다
    // const currentUser = AuthService.getCurrentUser();
    // this.setState({ userId: currentUser.id });
    const user = AuthService.getCurrentUser();

    if (!user) {
      alert('로그인을 해주세요');
      // this.state.redirect = '/login';
      this.setState({ redirect: '/login' });
      // console.log(currentUser);
    } else {
      // console.log(user.id);
      this.state.userId = user.id;
      console.log("didmount2");
      // if (user) {
      //   this.setState({
      //     currentUser: user,
      //     // userId: currentUser.id,
      //     // showModeratorBoard: user.roles.includes('ROLE_MODERATOR'),
      //     // showAdminBoard: user.roles.includes('ROLE_ADMIN'),
      //   });
      // }
      // 가져온 모든 아우터를 기반으로 pagination을 수행한다
      // const currentUser = AuthService.getCurrentUser().then(
      //   this.setState({ userId: currentUser.id }),
      // );
      this.getAllCodys();
    }
  }
  getAllCodys() {
    ClosetService.getAllCodys(this.state.userId)
      .then((res) => {
        const data = res.data;

        this.setState((this.state.codys = data));
        // this.setState((this.state.codyImages = testCloth.pictureAsFile));
        this.count = data.length;

        this.paginateCodys();
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.codys.push(response.data) //이런식으로 갈듯
    // this.setState((this.state.codys = testCody));
    // // this.setState((this.state.codyImages = testCloth.pictureAsFile));
    // this.count = testCody.length;

    // console.log(this.count);
  }
  // setCategory() {

  //   this.state.cloths.map((cloth) => {

  //     if (cloth.category == 'cody') {
  //       console.log('아우터');
  //       // this.state.codys.push(cloth);
  //       // this.state.codyImages.push(cloth.pictureAsFile);

  //     } else if (
  //       cloth.category == 'longSleeve' ||
  //       cloth.category == 'shortSleeve'
  //     ) {
  //       console.log('상의');

  //     } else {
  //       console.log('하의');

  //     }
  //     // console.log(this.state.codys);
  //     // console.log(this.state.codyImages);
  //   });

  // }
  // onCheckedElement = (checked, cody) => {
  //   if (checked) {
  //     // console.log(cody);
  //     this.setState(
  //       (this.state.checkedList = [...this.state.checkedList, cody]),
  //     );

  //     console.log(this.state.checkedList);
  //   } else if (!checked) {
  //     this.setState(this.state.checkedList.filter((el) => el !== cody));
  //     console.log(this.state.checkedList);
  //   }
  // };
  // onRemove = (cody) => {
  //   this.setState(this.state.checkedList.filter((el) => el !== cody));
  // };
  onChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.setState({
        checkedList: [...this.state.checkedList, event.target.value],
      });
    } else {
      const index = this.state.checkedList.indexOf(event.target.value);
      this.state.checkedList.splice(index, 1);
      this.setState({ checkedList: this.state.checkedList });
    }
    console.log(this.state.checkedList); //['test-8', 'test-9', 'test-5', 'test-4'] 이런식으로 배열이 나온다
  };
  deleteCheckedCodys() {
    const deleteList = this.state.checkedList;
    console.log(deleteList);
    ClosetService.deleteCodys(this.state.userId, deleteList)
      .then((res)=>{
        alert('코디가 삭제되었습니다!');
        window.location.reload(true);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  paginateCodys() {
    const data = this.state.codys;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData = slice.map((cody) => (
      <div key={cody.codyId} style={{ padding: 10 }}>
        <img width="150" height="150" src={cody.pictureAsFile_outer} />
        <img width="150" height="150" src={cody.pictureAsFile_top} />
        <img width="150" height="150" src={cody.pictureAsFile_bottom} />
        <input
          type="checkbox"
          value={cody.codyId} ///고정 ///선택한 값들이 가지는 고유한 값,서버로 전송되는 값
          onChange={this.onChange}
        />
      </div>
    ));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData,
    });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.paginateCodys();
      },
    );
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    console.log("cody render2");
    return (
      <>
        <Box1>
          <ClothBox>{this.state.postData}</ClothBox>
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </Box1>
      </>
    );
  }
}

export default Cody;
