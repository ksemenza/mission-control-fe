import React from 'react';
import { useForm } from 'react-hook-form';

export default function EditUser() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
      <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit/Update User</h2>
      <input name="firstName" placeholder="First Name" ref={register} /> <br/>
      <input name="lastName" placeholder="Last Name" ref={register} /> <br/>
      <input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <br />
      <input type="submit" />
    </form>
  );
}