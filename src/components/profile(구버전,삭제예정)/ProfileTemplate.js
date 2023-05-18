import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import 'react-rangeslider/lib/index.css';

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid purple;
  padding-bottom: =0.5rem;
  outline: none;
  width: 100%;
`;
//회원정보설정화면 좌측박스
const ProfileTemplateBlock = styled.div`
  position: absolute;
  left: 5%;
  top: 140px;
  bottom: 50px;
  width: 300px;
  background: ${palette.purple[0]};
  display: flex;
  flex-direction: cloumn;
  justify-content: center;
  aligh-items: center;
  left: 80px;
`;
// 회원정보설정화면 우측박스
const ProfileSelect = styled.div`
  position: absolute;
  font-size: 1rem;
  top: 140px;
  bottom: 50px;
  font-weight: bold;
  width: 1000px;
  background: white;
  justify-content: center;
  aligh-items: center;
  margin: 0 auto;
  margin-left: 20px;
  left: 400px;
`;
const Divide = styled.div`
  flex-direction: cloumn;
  align-items: center;
  padding-right: 60px;
  width: 500px;
  display: inline;
  margin: 0 auto;
`;
// 좌측박스 이름영역
const NameBox = styled.div`
  position: absolute;
  justify-content: center;
  aligh-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  padding-top: 50px;
`;
// 좌측박스 info 영역
const InfoBox = styled.div`
  position: absolute;
  justify-content: center;
  aligh-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  padding-top: 50px;
  margin-top: 2rem;
  display: flex;
`;
const TopRight = styled.div`
position: absolute; 
right: 0px; 
top: 0px;"
`;
const SaveButton = styled.div`
border: none;
border-radius: 4px;
font-size: 1.2rem;
font-weight: bold;
padding: 0.5rem 0.5rem;
align-items: center;
color: white;
outline: none;
cursor: pointer;
white-space: nowrap;
margin-left: 10px;
text-align=center;
width: 60px;
background: ${palette.purple[0]};
&:hover {
    background:gray;
}
`;
// 아래 ROw들은 우측영역을 채우는 작은영역들 ROw와 Row1의 차이는 height
const Row = styled.div`
  position: relative;
  height: 150px;
  // top-padding:5px;
  // margin-right:10px;
`;
const Row1 = styled.div`
  position: relative;
  height: 80px;
  // top-padding:5px;
  // margin-right:10px;
`;
const ProfileTemplate = ({ children }) => {
  // 아래 두줄은 생년월일 select에 필요한 부분 일단 주석처리
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate]=useState(new Date("2014/02/10"));
  return (
    <div>
      {/* <div class="menu">
              <a class="super_title"> 옷장예보 &gt; 개인설정</a>
            </div> */}
      <Divide>
        <Divide>
          <ProfileTemplateBlock>
            <TopRight>
              {/* 우측박스 상단의 이름변경 링크 */}
              <Link>이름 변경</Link>
            </TopRight>

            <NameBox>
              {/* 사용자의 info 영역 */}
              홍길동 님
              <InfoBox>
                성별:남 <br />
                선호 스타일1: 캐주얼 <br />
                선호 스타일2: 댄디
              </InfoBox>
            </NameBox>
          </ProfileTemplateBlock>
        </Divide>

        <ProfileSelect>
          {/* 우측 영역의 개인정보 설정 영역 */}
          <Row style={{ display: 'flex' }}>
            <Divide>
              <h2>개인 정보 설정</h2>
            </Divide>

            <Divide>
              <div>
                성별
                <select>
                  <option key="woman" value="woman">
                    여자
                  </option>
                  <option key="man" value="man">
                    남자
                  </option>
                </select>
              </div>
              {/* 아래는 생년월일 select인데 일단 주석처리                  */}
              {/* <div style={{display: 'flex', paddingTop: 20}}>생년월일
                            <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            showYearDropdown
                            dateFormatCalendar="MMMM"
                            yearDropdownItemNumber={15}
                            scrollableYearDropdown
                            />
                            </div>  */}
            </Divide>

            {/* 아래는 키와 몸무게 입력창.일단 주석처리  */}
            {/* <Divide>
                        <div >키
                          <form>
                            <StyledInput autoComplete="height" name="height" placeholder="키"/>
                           </form>
                        </div>
                        
                        <div >몸무게
                          <form>
                            <StyledInput autoComplete="weight" name="weight" placeholder="몸무게"/>
                          </form>
                        </div>
                    </Divide> */}

            <Divide>
              <div>
                선호스타일 1
                <select>
                  <option key="casual" value="casual">
                    캐주얼
                  </option>
                  <option key="chic" value="chic">
                    시크
                  </option>
                  <option key="dandy" value="dandy">
                    댄디
                  </option>
                  <option key="formal" value="formal">
                    포멀
                  </option>
                  <option key="lovely" value="lovely">
                    러블리
                  </option>
                  <option key="hip" value="hip">
                    힙
                  </option>
                  <option key="minimal" value="minimal">
                    미니멀
                  </option>
                  <option key="business casual" value="business casual">
                    비즈니스 캐주얼
                  </option>
                </select>
              </div>

              <div>
                선호스타일 2
                <select>
                  <option key="casual" value="casual">
                    캐주얼
                  </option>
                  <option key="chic" value="chic">
                    시크
                  </option>
                  <option key="dandy" value="dandy">
                    댄디
                  </option>
                  <option key="formal" value="formal">
                    포멀
                  </option>
                  <option key="lovely" value="lovely">
                    러블리
                  </option>
                  <option key="hip" value="hip">
                    힙
                  </option>
                  <option key="minimal" value="minimal">
                    미니멀
                  </option>
                  <option key="business casual" value="business casual">
                    비즈니스 캐주얼
                  </option>
                </select>
              </div>
            </Divide>
            <SaveButton
              size="medium"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                textAlign: 'center',
                paddingTop: 2,
                paddingBottom: 2,
                width: 80,
              }}
            >
              저장
            </SaveButton>
          </Row>

          {/* 아래는 우측박스 영역을 구분짓는 검은 줄 */}
          <hr
            style={{
              background: 'black',
              color: 'black',
              borderColor: 'black',
              height: '1px',
            }}
          />

          <Row style={{ display: 'flex' }}>
            {/* 아래는 비밀번호 변경 영역 */}
            <h2>비밀 번호 변경</h2>

            <Divide>
              <div>
                현재 비밀번호 :
                <form>
                  <StyledInput
                    autoComplete="currentP"
                    name="currentP"
                    placeholder="현재 비밀번호"
                  />
                </form>
              </div>

              <div>
                변경할 비밀번호 :
                <form>
                  <StyledInput
                    autoComplete="newP"
                    name="newP"
                    placeholder="변경할 비밀번호"
                  />
                </form>
              </div>
            </Divide>

            <SaveButton
              size="medium"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                textAlign: 'center',
                paddingTop: 2,
                paddingBottom: 2,
                width: 80,
              }}
            >
              저장
            </SaveButton>
          </Row>

          {/* 아래는 우측박스 영역을 구분짓는 검은 줄 */}
          <hr
            style={{
              background: 'black',
              color: 'black',
              borderColor: 'black',
              height: '1px',
            }}
          />

          <Row1>
            {/* 회원탈퇴영역 */}
            <Divide>
              <h2>회원 탈퇴 하기</h2>
            </Divide>
            <SaveButton
              size="large"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                textAlign: 'center',
                paddingTop: 2,
                paddingBottom: 2,
                width: 80,
              }}
            >
              회원탈퇴
            </SaveButton>
          </Row1>
        </ProfileSelect>
      </Divide>
    </div>
  );
};

export default ProfileTemplate;
