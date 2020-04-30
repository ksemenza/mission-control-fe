import React from 'react';
import { useForm } from 'react-hook-form';

export default function EditUser() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name="firstName" placeholder="First Name" ref={register} /> <br/>
      <input name="lastName" placeholder="Last Name" ref={register} /> <br/>
      <input
        type="text"
        placeholder="Email"
        name="Email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      <select name="role" ref={register}>
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
      </select>
      <br />
      <input type="submit" />
    </form>
  );
}