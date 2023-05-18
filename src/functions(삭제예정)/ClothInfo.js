// import React, { useState } from 'react';
// import Select from 'react-select';

// const ClothInfo = () => {
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

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//         alignContent: 'space-around',
//       }}
//     >
//       {/* Select Category*/}
//       <select
//         name="categoryValue"
//         value={form.categoryValue}
//         onChange={onChange}
//       >
//         <option value="outer">아우터</option>
//         <option value="longSleeve">긴팔</option>
//         <option value="shortSleeve">반팔</option>
//         <option value="longPants">긴바지</option>
//         <option value="shortPants">반바지</option>
//         <option value="skirt">치마</option>
//       </select>
//       {/* Select Color*/}
//       <select name="colorValue" value={form.colorValue} onChange={onChange}>
//         <option value="black">블랙</option>
//         <option value="beige">베이지</option>
//         <option value="white">화이트</option>
//         <option value="red">레드</option>
//         <option value="yellow">옐로우</option>
//         <option value="green">그린</option>
//         <option value="blue">블루</option>
//       </select>
//       {/* Input Image*/}
//       {/* <input type="file" name="image" value={form.image} onChange={onChange} /> */}
//     </div>
//   );
// };

// export default ClothInfo;
