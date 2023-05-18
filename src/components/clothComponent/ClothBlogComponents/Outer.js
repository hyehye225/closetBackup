import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import '../../../styles/common/App.css';
import styled from 'styled-components';
import test1Image from '../formal_1.png';
import test2Image from '../formal_2.png';
import test4Image from '../formal_4.png';
import test5Image from '../formal_5.png';
import ReactPaginate from 'react-paginate';
import ClosetService from '../../../services/ClosetService';
import AuthService from '../../../services/AuthService';
const testCloth = [
  {
    id: 'test-1',
    category: 'outer',
    color: 'red',
    pictureAsFile: test1Image,
  },
  {
    id: 'test-2',
    category: 'outer',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-4',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-5',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-6',
    category: 'outer',
    color: 'red',
    pictureAsFile: test1Image,
  },
  {
    id: 'test-7',
    category: 'outer',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-8',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-9',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-10',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-11',
    category: 'outer',
    color: 'black',
    pictureAsFile: test2Image,
  },

  {
    id: 'test-12',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-13',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-14',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-15',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-16',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-17',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-18',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-19',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-20',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-21',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-22',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-23',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-24',
    category: 'outer',
    color: 'white',
    pictureAsFile: test4Image,
  },
  {
    id: 'test-25',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
  },
  {
    id: 'test-26',
    category: 'outer',
    color: 'yellow',
    pictureAsFile: test5Image,
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

class Outer extends React.Component {
  constructor(props) {
    super();
    this.getAllOuters = this.getAllOuters.bind(this);
    this.onChange = this.onChange.bind(this);
    this.deleteCheckedCloths = this.deleteCheckedCloths.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      // cloths: [],
      outers: [],
      outerImages: [],

      offset: 0,
      perPage: 12,
      currentPage: 0,

      checkedList: [],
      // checked: false,
      // currentOuterId: '',

      userId: '',
    };
  }
  componentDidMount() {
    console.log("outer render");
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
      this.getAllOuters();
      //this.paginateOuters();
    }
  }
  getAllOuters() {
    ClosetService.getAllOuters(this.state.userId)
      .then((res) => {
        const data = res.data;

        this.setState((this.state.outers = data));
        this.setState((this.state.outerImages = data.pictureAsFile));
        this.count = data.length;

        this.paginateOuters();
      })
      .catch((e) => {
        console.log(e);
      });

    // this.state.outers.push(response.data) //이런식으로 갈듯
    // this.setState((this.state.outers = testCloth));
    // this.setState((this.state.outerImages = testCloth.pictureAsFile));
    // this.count = testCloth.length;

    // console.log(this.count);
  }
  // setCategory() {

  //   this.state.cloths.map((cloth) => {

  //     if (cloth.category == 'outer') {
  //       console.log('아우터');
  //       // this.state.outers.push(cloth);
  //       // this.state.outerImages.push(cloth.pictureAsFile);

  //     } else if (
  //       cloth.category == 'longSleeve' ||
  //       cloth.category == 'shortSleeve'
  //     ) {
  //       console.log('상의');

  //     } else {
  //       console.log('하의');

  //     }
  //     // console.log(this.state.outers);
  //     // console.log(this.state.outerImages);
  //   });

  // }
  // onCheckedElement = (checked, outer) => {
  //   if (checked) {
  //     // console.log(outer);
  //     this.setState(
  //       (this.state.checkedList = [...this.state.checkedList, outer]),
  //     );

  //     console.log(this.state.checkedList);
  //   } else if (!checked) {
  //     this.setState(this.state.checkedList.filter((el) => el !== outer));
  //     console.log(this.state.checkedList);
  //   }
  // };
  // onRemove = (outer) => {
  //   this.setState(this.state.checkedList.filter((el) => el !== outer));
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
    ClosetService.deleteOuters(this.state.userId, deleteList)
      .then(alert('옷이 삭제되었습니다!'))
      .then(window.location.reload(false))
      .catch((e) => {
        console.log(e);
      });
  }
  paginateOuters() {
    const data = this.state.outers;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage,
    );
    const postData = slice.map((outer) => (
      <div key={outer.id} style={{ padding: 10 }}>
        <img width="150" height="150" src={outer.pictureAsFile} />
        <input
          type="checkbox"
          value={outer.id} ///고정 ///선택한 값들이 가지는 고유한 값,서버로 전송되는 값
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
        this.paginateOuters();
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

export default Outer;
