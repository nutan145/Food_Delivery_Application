import React, { useContext } from 'react'
import './contact-us.css'
import { useFormik } from 'formik'
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const contactUs= () => {
           const {token}=useContext(StoreContext);
           const navigate=useNavigate();
    const formik=useFormik({
          initialValues:{
                firstName:'',
                lastName:'',
                email:'',
                message:''
          },
          onSubmit:(async details=>{
               try
               {
                  const response= await axios.post(`https://food-delivery-application-5.onrender.com/contact-api/details`,details,
                    {headers:{Authorization:`Bearer ${token}`}})
                  if(response.status==201)
                  {
                     toast.success('thanks for respond your queries will solve few minutes later');
                     navigate('/');
                  }
               }
               catch(error)
               {
                   console.log(error);
                   toast.error('please login to share your queries...');
               }
          })

    });
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="contact-form p-5 shadow-sm bg-white">
                    <h2 className="text-center mb-4">Get in Touch</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input type="text" className="form-control" onChange={formik.handleChange}
                                name="firstName" placeholder="First Name" required/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" onChange={formik.handleChange}
                                name="lastName" placeholder="Last Name" required/>
                            </div>
                            <div className="col-12">
                                <input type="email" className="form-control" onChange={formik.handleChange}
                                name="email" placeholder="Email Address" required/>
                            </div>
                            <div className="col-12">
                                <textarea className="form-control custom-input" onChange={formik.handleChange} 
                                name="message" rows="5" placeholder="Your Message" required></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit">Send Message</button>
                            </div>
                            <p className='text-center'>please provide loged in user details only</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default contactUs