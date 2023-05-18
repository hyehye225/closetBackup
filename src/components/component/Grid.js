// import Gallery from 'react-photo-gallery';
// import Auxilary from './Auxilary';
// import Rmodal from 'react-modal';
// import axios from 'axios';
// import React, { Component } from 'react';
// class Grid extends React.Component {
//   state = {
//     photos: [],
//     selectedPhotoUrl: '',
//     error: false,
//     showModal: false,
//   };

//   componentDidMount() {
//     axios
//       .get('/photos')
//       .then((response) => {
//         const pics = response.data.slice(0, 20);
//         //console.log(response);
//         const updatedPics = pics.map((pic) => {
//           return {
//             src: pic.url,
//             width: 4,
//             height: 3,
//           };
//         });
//         this.setState({ photos: updatedPics });
//       })
//       .catch((err) => {
//         this.setState({ error: true });
//       });
//   }

//   photoClickHandler = (event, obj) => {
//     const url = event.target.src;
//     this.setState({ selectedPhotoUrl: url, showModal: true });
//     //console.log(url);
//   };

//   hidePhotoHandler = () => {
//     this.setState({ showModal: false });
//   };

//   render() {
//     let album = this.state.photos;
//     const customStyles = {
//       content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)',
//       },
//     };

//     if (this.state.error) {
//       album = (
//         <p style={{ textAlign: 'center' }}>
//           Something went wrong with the http request
//         </p>
//       );
//     }

//     return (
//       <Auxilary>
//         <Rmodal
//           style={customStyles}
//           ariaHideApp={false}
//           onRequestClose={this.hidePhotoHandler}
//           isOpen={this.state.showModal}
//         >
//           <img
//             style={{ width: 350, height: 250 }}
//             alt="slectedPhoto"
//             src={this.state.selectedPhotoUrl}
//           />
//         </Rmodal>
//         <Gallery photos={album} onClick={this.photoClickHandler} />
//       </Auxilary>
//     );
//   }
// }

// export default Grid;
