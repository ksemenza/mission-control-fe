// import React from 'react';
// import { useForm } from 'react-hook-form';

// export default function EditUser() {
//   const { register, handleSubmit } = useForm();
//   const onSubmit = data => console.log(data);
//   return (
//       <form onSubmit={handleSubmit(onSubmit)}>
//       <h2>Edit/Update User</h2>
//       <input name="firstName" placeholder="First Name" ref={register} /> <br/>
//       <input name="lastName" placeholder="Last Name" ref={register} /> <br/>
//       <input
//         type="text"
//         placeholder="Email"
//         name="Email"
//         ref={register({ required: true, pattern: /^\S+@\S+$/i })}
//       />
//       <br />
//       <input type="submit" />
//     </form>
//   );
// }

import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import {useQuery} from 'urql';
export default function EditUser() {
  let token = JSON.parse(localStorage.getItem('okta-token-storage'))
  // console.log(token.idToken.claims)
  const[input, editInput]=useState({
    name: token.idToken.claims.name,
    email:token.idToken.claims.email
  })
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    const edit = console.log('whatever we need to push this to our server')
    console.log(data)
    //TODO: check for changes, if not, use the token info, if changed, update.
    // if (data.name.length===0 && data.email.length===0)
    // {
    //   edit+input
    // }
    // else if(data.name.length===0){
    //   editInput(...input, email:data.email)
    // }
    // else if(data.email.length===0){
    //   editInput(...input, email:data.name)
    // }
    // else{
    //   editInput(...input, name:data.name, email:data.email)
    // }
  };
  const changeHandler = (e)=>{
    console.log('suffering')
    editInput({name:e.target.name,email:e.target.email})
    console.log(input)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="name" placeholder={token.idToken.claims.name} ref={register} /> <br/>
      <input name="email" placeholder={token.idToken.claims.email} ref={register({ required: true, pattern: /^\S+@\S+$/i })} /> <br/>
      <br />
      <input type="submit" />
    </form>
  );
}