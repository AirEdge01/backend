import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch,useSelector } from 'react-redux';
import { increment,decrement } from '../redux/counterSlice';

const Form = () => {
  let dispatch = useDispatch()
  let count = useSelector((state) =>state.counter.counter)
  let formik = useFormik({
    initialValues: {
      firstName:'',
      lastName:'',
      email:'',
      password:'',
    },
    onSubmit: (values)=>{
      console.log(values);
    },validationSchema: yup.object({
      firstName: yup.string('Input your first name here').required('First name cannot be empty'),
      lastName: yup.string('Input your last name here').required('last name cannot be empty'),
      email: yup.string('Fix in your mail').required('Email is required').email('Email must be valid'),
      password: yup.string('put your password').required('Password field is required')
    })
  })
  return (
    <div>
      <h3>{count}</h3>
      <button onClick={()=>dispatch(increment())}>increment</button>
      <button onClick={()=>dispatch(decrement())}>decrement</button>

      <input type="text" name="firstName"onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.firstName && formik.errors.firstName? <small className='text-danger'>{formik.errors.firstName}</small>: ''}

      <input type="text" name="lastName"onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.lastName && formik.errors.lastName? <small className='text-danger'>{formik.errors.lastName}</small>: ''}

      <input type="text" name="email"onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.email && formik.errors.email? <small className='text-danger'>{formik.errors.email}</small>: ''}

      <input type="password" name="password"onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.touched.lastName && formik.errors.password? <small className='text-danger'>{formik.errors.password}</small>: ''}

      <button type='button' onClick={formik.handleSubmit}>Submit</button>
    
    </div>
  );
}

export default Form;
