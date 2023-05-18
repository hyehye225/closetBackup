import React, { Component } from 'react';
import '../../styles/common/App.css';
import styled from 'styled-components';
import test1Image from './Outer1.jpg';
import test2Image from './Outer2.jpg';
import test4Image from './Outer4.jpg';
import test5Image from './Outer5.jpg';
import ReactPaginate from 'react-paginate';
import ClosetService from '../../services/ClosetService';
import AuthService from '../../services/AuthService';

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

class OuterModalComponent extends React.Component {
  constructor(props) {
    super();

    this.state = {
      cloths: [],
      outers: [],
      outerImages: [],

      offset: 0,
      perPage: 12,
      currentPage: 0,

      checkedId: null,
      checked: false,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();

    // console.log(user.id);
    this.state.userId = user.id;
    
    this.getAllOuters(); //모든 아우터를 가져온다
    // this.setCategory(); //가져온 모든 옷을 기반으로 아우터만 따로 선별한다
    //this.paginateOuters(); // 가져온 모든 아우터를 기반으로 pagination을 수행한다
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
  handleChange = (e) => {
    console.log(`선택한 값 : ${e.target.value}`);
    this.setState({ checkedId: e.target.value });
    console.log(this.checkedId);
  };
  deleteCheckedCloths() {
    const deleteList = this.state.checkedList;
    console.log(deleteList);
    ClosetService.deleteOuters(deleteList)
      .then(alert('코디가 삭제되었습니다!'))
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
          type="radio"
          name="selectedOuter" //radiobutton 중에서 하나만 선택하게 해준다.
          value={outer.id} ///고정 ///선택한 값들이 가지는 고유한 값,서버로 전송되는 값
          onChange={this.handleChange}
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
    return (
      <>
        <Box1>
          <ClothBox>{this.state.postData} </ClothBox>
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

export default OuterModalComponent;
