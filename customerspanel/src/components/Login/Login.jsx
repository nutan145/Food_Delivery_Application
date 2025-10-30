import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import {useFormik} from 'formik'
import { LoginUser } from '../../Service/AuthService'
import { toast } from 'react-toastify'
import { StoreContext } from '../../context/StoreContext'

const Login = () => {
      
      const {setToken,loadCartData}=useContext(StoreContext);
      const navigate=useNavigate();

      const formik=useFormik({

            initialValues:{
                    email:'',
                    password:''
            },

            onSubmit: async (details)=>{
                   try
                   {
                        const response= await LoginUser(details);
                                 if(response.status==200)
                                 {     
                                       setToken(response.data.token);
                                       localStorage.setItem('token',response.data.token);
                                   try
                                   {
                                      await loadCartData(response.data.token);
                                      navigate('/');
                                   }
                                   catch(error)
                                   {
                                      navigate('/');
                                   }
                                }
                                else
                                {
                                   toast.error('invalid email or password');
                                }

                   }
                   catch(error)
                   {
                       console.log("Error while login:"+error);
                       toast.error('invalid email or password');
                   }
            }
      });

  return (
    <div className='login'>
           <div className='row py-5'> 
                 <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                       <div className='card shadow'>
                             <div className='card-header text-center'>
                             <h3 className='bi bi-person-fill'>&nbsp;Customer Login</h3>
                            </div>
                             <div className='card-body'>
                                 <form onSubmit={formik.handleSubmit}>
                                      <div className='mb-3'>
                                          <label htmlFor="email" className='form-check-label'>Email Address</label>
                                          <input type="text" onChange={formik.handleChange} className='form-control' name='email'/>
                                      </div>
                                      <div className='mb-3'>
                                           <label htmlFor="password" className='form-check-label'>Password</label>
                                           <input type="password" onChange={formik.handleChange} className='form-control' name='password' />
                                      </div>
                                      <div className='d-grid'>
                                           <button type='submit' className='btn btn-primary'>
                                              Login
                                           </button>
                                      </div>
                                       <hr />
                                       <div className='mt-3 text-center'>
                                        Don't have an accoutn ? <Link to='/register'>Register</Link>
                                       </div>
                                 </form>
                             </div>
                       </div>
                 </div>
           </div>
    </div>
  )
}

export default Login