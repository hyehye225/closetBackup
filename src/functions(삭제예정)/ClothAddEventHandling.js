// import React, { useState, useEffect } from 'react';
// import ClothInfo from './ClothInfo';
// import { ImageUpload } from './ImageUpload';

// const ClothAddEventHandling = () => {
//   const [form, setForm] = useState({
//     // image: '',
//     categoryValue: '',
//     colorValue: '',
//   });

//   const onChange = (e) => {
//     const { name, value } = e.target;

//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };
//   const [selectedFile, setSelectedFile] = useState();
//   const [preview, setPreview] = useState();

//   // create a preview as a side effect, whenever selected file is changed
//   useEffect(() => {
//     if (!selectedFile) {
//       setPreview(undefined);
//       return;
//     }

//     const objectUrl = URL.createObjectURL(selectedFile);
//     setPreview(objectUrl);

//     // free memory when ever this component is unmounted
//     return () => URL.revokeObjectURL(objectUrl);
//   }, [selectedFile]);

//   const onSelectFile = (e) => {
//     if (!e.target.files || e.target.files.length === 0) {
//       setSelectedFile(undefined);
//       return;
//     }

//     // I've kept this example simple by using the first image instead of multiple
//     setSelectedFile(e.target.files[0]);
//   };
//   //   const [message, setMessage] = useState('');

//   return (
//     <div>
//       <h1 style={{ color: 'white', textAlign: 'center' }}>옷 등록</h1>
//       <div>
//         {selectedFile && <img src={preview} width="70%" height="70%" />}
//         <input type="file" onChange={onSelectFile} style={{ padding: 10 }} />
//       </div>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           alignContent: 'space-around',
//           padding: 10,
//         }}
//       >
//         {/* Select Category*/}
//         <select
//           name="categoryValue"
//           value={form.categoryValue}
//           onChange={onChange}
//         >
//           <option value="outer">아우터</option>
//           <option value="longSleeve">긴팔</option>
//           <option value="shortSleeve">반팔</option>
//           <option value="longPants">긴바지</option>
//           <option value="shortPants">반바지</option>
//           <option value="skirt">치마</option>
//         </select>
//         {/* Select Color*/}
//         <select name="colorValue" value={form.colorValue} onChange={onChange}>
//           <option value="black">블랙</option>
//           <option value="beige">베이지</option>
//           <option value="white">화이트</option>
//           <option value="red">진청</option>
//           <option value="red">연청</option>
//           <option value="red">레드</option>
//           <option value="yellow">옐로우</option>
//           <option value="green">그린</option>
//           <option value="blue">블루</option>
//         </select>
//       </div>
//       <div>
//         <button
//           onClick={() => {
//             alert(form.colorValue + ' ' + form.categoryValue);
//             ClothInfo.setForm('');
//           }}
//         >
//           저장
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ClothAddEventHandling;
