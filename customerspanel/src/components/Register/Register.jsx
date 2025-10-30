import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
import {useFormik} from 'formik' 
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import {RegisterUser} from '../../Service/AuthService.jsx'

const Register = () => {

    const navigate=useNavigate();

   const formik=useFormik({
       initialValues:{
               name:'',
               email:'',
               password:''
       },

       validationSchema:yup.object({
           
             name:yup.string().required('user name required'),
             email:yup.string().required('email is required').matches(/@gmail.com/,'invalid gmail formate'),
             password:yup.string().required('password is required').
             min(4,'password must be atleast 4 characters').
             matches(/[A-Z]/,'atleast one capital letter required').
             matches(/[0-9]/,'atleast one number is required')
       }),

       onSubmit: async (details)=>{
             try
             {
                const response= await RegisterUser(details);
                if(response.status==201)
                {
                    toast.success('user register successfully, please login');
                    formik.resetForm();
                    navigate('/login');
                }
                else
                {
                    toast.error('Registration failed');
                }
             }
             catch(error)
             {
                toast.error('Unable Register currently please try later');
             }
       }
   })

    const resetBtn=()=>{
         formik.resetForm();
    }

  return (
    <div className='register'>
           <div className='row py-5'> 
                 <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                       <div className='card shadow' style={{height:'500px'}}>
                             <div className='card-header text-center'>
                                <h3 className='bi bi-person-fill'>&nbsp;Registration</h3>
                            </div>
                             <div className='card-body'>
                                 <form onSubmit={formik.handleSubmit}>
                                      <div className='mb-3'>
                                          <label htmlFor="name" className='form-check-label'>User Name</label>
                                          <input type="text" className='form-control' onChange={formik.handleChange} 
                                          name='name' value={formik.values.name}/>
                                          <p className='text-danger'>{formik.errors.name}</p>
                                      </div>
                                      <div className='mb-3'>
                                          <label htmlFor="email" className='form-check-label'>Email Address</label>
                                          <input type="text" className='form-control' onChange={formik.handleChange} 
                                          name='email' value={formik.values.email}/>
                                          <p className='text-danger'>{formik.errors.email}</p>
                                      </div>
                                      <div className='mb-3'>
                                           <label htmlFor="password" className='form-check-label'>Password</label>
                                           <input type="password" className='form-control' onChange={formik.handleChange} 
                                           name='password' value={formik.values.password}/>
                                           <p className='text-danger'>{formik.errors.password}</p>
                                      </div>
                                      <div className='d-grid mb-3'>
                                           <button type='submit' className='btn btn-primary'>
                                              Register
                                           </button>
                                      </div>
                                      <div className='d-grid'>
                                           <button type='button' className='btn btn-outline-danger' onClick={resetBtn}>
                                              Reset
                                           </button>
                                      </div>
                                       <hr />
                                       <div className='mt-3 text-center'>
                                        Already have an accoutn ? <Link to='/login'>Login</Link>
                                       </div>
                                 </form>
                             </div>
                       </div>
                 </div>
           </div>
    </div>
  )
}

export default Register