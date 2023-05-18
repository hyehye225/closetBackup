// import React from 'react';
// import styled from 'styled-components';
// import 'react-rangeslider/lib/index.css';
// import palette from '../../lib/styles/palette';
// import imgB from './imgB.jpg';
// import Top1 from './Top1.jpg';
// import Bottom1 from './Bottom1.jpg';
// import './Paging.css';
// import CodySelectComponent from '../codyComponent/CodyBlogComponent';
// import AddCodyComponent from '../codyComponent/CodyAddComponent';

// // 콘텐츠 위치 영역
// const Div = styled.div`
//   position: absolute;
//   top: 110px;

//   display: inline-flex;
//   justyfiy-content: space-between;
// `;
// //페이지 왼쪽 박스
// const ClosetTemplateBlock = styled.div`
//   padding-left: 10px;
//   height: 560px;
//   width: 450px;
//   background: ${palette.purple[0]};
//   flex-direction: cloumn;
//   justify-content: center;
//   text-align: center;
//   aligh-items: center;
//   // left:160px;
//   // float:left;
// `;
// //왼쪽박스의 옷이미지가 위치하는 영역
// const ClothBox = styled.div`
//   width: 500px;
//   height: 490px;
//   justify-content: center;
//   aligh-items: center;
//   // margin-top: 30px;
//   background: ${palette.purple[0]};
//   display: inline;
// `;
// //아우터가 위치하는 영역
// const OuterBox = styled.div`
//   width: 200px;
//   height: 402px;
//   background: white;
//   border: 1px solid black;
// `;
// //상의가 위치하는 영역
// const TopBox = styled.div`
//   width: 200px;
//   height: 200px;
//   border: 1px solid black;
//   background: white;
// `;
// //하의가 위치하는 영역
// const BottomBox = styled.div`
//   width: 200px;
//   height: 200px;
//   background: white;
//   margin: 0 auto;
//   border: 1px solid black;
// `;
// // 왼쪽박스 하위 버튼 영역
// const ButtonSection = styled.div`
// height: 30px;
// padding-bottom:5px;
// padding-top:20px;
// text-align=center;
// float:right ;
// justifyContent: "center";
// alignItems: "center";
// `;
// // 페이지 우측 박스
// const ClosetSelect = styled.div`
//   margin-left: 10px;
//   height: 560px;
//   width: 800px;
//   font-weight: bold;
//   border-radius: 6px;
//   float: left;
//   background: ${palette.purple[0]};
//   .react-tabs__tab--selected {
//     background: ${palette.purple[0]};
//     border-color: ${palette.purple[0]};
//     color: white;
//     border-radius: 5px 5px 0 0;
//   }
//   .react-tabs__tab-list {
//     background: white;
//     border-bottom: 0px solid #aaa;
//     margin: 0 0 10px;
//     padding: 0;
//   }
//   .react-tabs__tab:focus:after {
//     content: '';
//     position: absolute;
//     height: 5px;
//     left: 4px;
//     right: 4px;
//     bottom: -5px;
//     background: ${palette.purple[0]};
//   }
// `;
// // 우측 박스에 옷이미지를 나열하는 영역
// const ClothBlog = styled.div`
//   width: 100%;
//   align-content: space-around;
//   justify-content: center;
//   flexdirection: 'column';
//   display: block;
//   margin: auto;
// `;
// // 버튼의 css
// const SaveButton = styled.div`
// border: none;
// border-radius: 4px;
// font-size: 1.2rem;
// font-weight: bold;
// padding: 0.5rem 0.5rem;
// align-items: center;
// color: white;
// outline: none;
// cursor: pointer;
// white-space: nowrap;
// text-align=center;
// width: 60px;
// background: ${palette.purple[0]};
// &:hover {
//     background:gray;
// }
// `;
// const ComboBox = styled.div`
//   width: 300px;
//   height: 150px;
//   margin: 0 auto;
//   background: ${palette.purple[0]};
//   // margin-top: 30px;
//   justify-content: center;
//   aligh-items: center;
//   text-align: center;
//   // aligncontent: 'space-around';
// `;
// const ClosetMatchTemplate = ({ children }) => {
//   return (
//     <div>
//       <Div>
//         <ClosetTemplateBlock>
//           <ComboBox>
//             <AddCodyComponent />
//           </ComboBox>
//           {/* <h3 style={{ color: 'white', textAlign: 'center' }}>코디 매칭</h3>
//           <ClothBox
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignContent: 'center',
//             }}
//           >
//             <OuterBox>
//               <img src={imgB} width="100%" height="100%" />
//             </OuterBox>
//             <OuterBox>
//               <TopBox>
//                 <img src={Top1} width="100%" height="100%" />
//               </TopBox>
//               <BottomBox>
//                 <img src={Bottom1} width="100%" height="100%" />
//               </BottomBox>
//             </OuterBox>
//           </ClothBox>
//           <ButtonSection>
//             <SaveButton
//               size="medium"
//               style={{ textAlign: 'center', paddingTop: 2, paddingBottom: 2 }}
//             >
//               등록
//             </SaveButton>
//           </ButtonSection> */}
//         </ClosetTemplateBlock>
//         <ClosetSelect>
//           <CodySelectComponent />
//         </ClosetSelect>
//       </Div>
//     </div>
//   );
// };
// export default ClosetMatchTemplate;
