import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../../../styles/common/App.css';
import styled from 'styled-components';
import test1Image from '../formal_1.png';
import test2Image from '../formal_2.png';
import test4Image from '../formal_4.png';
import ReactPaginate from 'react-paginate';
import ClosetService from '../../../services/ClosetService';
import AuthService from '../../../services/AuthService';

// const testCloth = [
//   {
//     id: 'test-44',
//     category: 'bottom',
//     color: 'red',
//     pictureAsFile: test1Image,
//   },
//   {
//     id: 'test-45',
//     category: 'bottom',
//     color: 'black',
//     pictureAsFile: test2Image,
//   },

//   {
//     id: 'test-46',
//     category: 'bottom',
//     color: 'white',
//     pictureAsFile: test4Image,
//   },
// ];
// const testCloth = [
//   {
//       "id": "aaaaa",
//       "category": "jeans",
//       "color": "black",
//       "pictureAsFile": "1669566201422.PNG"
//   },
//   {
//       "id": "aaaaa",
//       "category": "trousers",
//       "color": "white",
//       "pictureAsFile": "1669566787517.jpg"
//   },
//   {
//       "id": "aaaaa",
//       "category": "jeans",
//       "color": "yellow",
//       "pictureAsFile": "1669568381567.PNG"
//   },
//   {
//       "id": "aaaaa",
//       "category": "trousers",
//       "color": "green",
//       "pictureAsFile": "1669568707891.PNG"
//   },
//   {
//       "id": "aaaaa",
//       "category": "jeans",
//       "color": "white",
//       "pictureAsFile": "1669572250667.PNG"
//   }
// ];
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
class Bottom extends React.Component {
  constructor(props) {
    super();
    this.getAllBottoms = this.getAllBottoms.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteCheckedCloths = this.deleteCheckedCloths.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      // cloths: [],
      bottoms: [],
      bottomImages: [],

      offset: 0,
      perPage: 12,
      currentPage: 0,

      checkedList: [],
      checked: false,
      currentbottomId: '',

      userId: '',
    };
  }
  componentDidMount() {
    //모든 아우터를 가져온다
    const user = AuthService.getCurrentUser();

    if (!user) {
      alert('로그인을 해주세요');
      // this.state.redirect = '/login';
      this.setState({ redirect: '/login' });
      // console.log(currentUser);
    } else {
      // console.log(user.id);
      this.state.userId = user.id;
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
      this.getAllBottoms();
      // this.paginateBottoms();
      // this.deleteCheckedCloths();
    }
  }
  getAllBottoms() {
    ClosetService.getAllBottoms(this.state.userId).then((res) => {
      const data = res.data;
      console.log("bottom res :"+data);

      this.setState((this.state.bottoms = data));
      // console.log("bottoms :"+this.state.bottoms[0].id);
      this.setState((this.state.bottomImages = data.pictureAsFile)); //.
      this.count = data.length;

      // this.setState((this.state.bottoms = testCloth));
      // this.setState((this.statebottomImages = testCloth.pictureAsFile));
      // this.count = testCloth.length;
      this.paginateBottoms();
      // console.log("get all bottoms this count: "+this.count);
    }).catch((e) => {
      console.log(e);
    });

    // this.state.bottoms.push(response.data) //이런식으로 갈듯
    // this.setState((this.state.bottoms = testCloth));
    // this.setState((this.statebottomImages = testCloth.pictureAsFile));
    // this.count = testCloth.length;

    //console.log(this.count);
  }
  // setCategory() {

  //   this.state.cloths.map((cloth) => {

  //     if (cloth.category == 'bottom') {
  //       console.log('아우터');
  //       // this.state.bottoms.push(cloth);
  //       // this.state.bottomImages.push(cloth.pictureAsFile);

  //     } else if (
  //       cloth.category == 'longSleeve' ||
  //       cloth.category == 'shortSleeve'
  //     ) {
  //       console.log('상의');

  //     } else {
  //       console.log('하의');

  //     }
  //     // console.log(this.state.bottoms);
  //     // console.log(this.state.bottomImages);
  //   });

  // }
  // onCheckedElement = (checked, bottom) => {
  //   if (checked) {
  //     // console.log(bottom);
  //     this.setState(
  //       (this.state.checkedList = [...this.state.checkedList, bottom]),
  //     );

  //     console.log(this.state.checkedList);
  //   } else if (!checked) {
  //     this.setState(this.state.checkedList.filter((el) => el !== bottom));
  //     console.log(this.state.checkedList);
  //   }
  // };
  // onRemove = (bottom) => {
  //   this.setState(this.state.checkedList.filter((el) => el !== bottom));
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
  deleteCheckedCloths() {
    const deleteList = this.state.checkedList;
    console.log(deleteList);
    ClosetService.deleteBottoms(this.state.userId, deleteList)
      .then(alert('옷이 삭제되었습니다!'))
      .then(window.location.reload(false))
      .catch((e) => {
        console.log(e);
      });
  }
  paginateBottoms() {
    const data = this.state.bottoms;
    console.log("bottom pagenate data :"+data);
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData = slice.map((bottom) => (
      <div key={bottom.id} style={{ padding: 10 }}>
        <img width="150" height="150" src={bottom.pictureAsFile} />
        <input
          type="checkbox"
          value={bottom.id} ///고정 ///선택한 값들이 가지는 고유한 값,서버로 전송되는 값
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
        this.paginatebottoms();
      },
    );
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }
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
export default Bottom;
