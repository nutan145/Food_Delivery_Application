import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import {useFormik} from 'formik';
import*as yup from 'yup';
import axios from 'axios';
import {toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { addFoodItem } from '../../Service/FoodService';


const AddFood = () => {
  
  const[image,setImage]=useState(null);

   const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 1, // Compress image to around 1MB
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      setImage(compressedFile);
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Image compression failed');
    }
  };

  
  const formik=useFormik({
         
         initialValues:{
           name:'',
           description:'',
           category:'',
           price:0
         },

         onSubmit:  async (data)=>{
            
                if(!image)
                  {
                    toast.error('please select an image');
                    return;
                  }
                  
                  const toastId = toast.loading('Uploading the food item...');

                try
                {  

                 const response= await addFoodItem(data,image);
                 
                 if(response.status==201)
                 {
                    // Update loading toast to success
                    toast.update(toastId, {
                        render: 'Food item added successfully!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 2000,
                        });  

                    formik.resetForm();
                    setImage(null);
                 }
              
              }
              catch(error)
              {
                console.log(error);
                toast.dismiss(toastId);
                toast.error('failed to add the food item');
              }
         }
  }); 

  return (
    <div className='container w-50  mt-2 p-4 border border-1 border-dark rounded-2'>
         <h3 className='text-center'>Food Item Details</h3>
         <hr />
         <form onSubmit={formik.handleSubmit}>
              <dl>
                   <dt>
                      <label htmlFor="image">
                        <img src={image? URL.createObjectURL(image):assets.upload} height={70} width={70} alt='Food Item Preview'/>
                      </label>
                   </dt>
                   <dd><input type="file" id='image'  hidden onChange={handleImageChange}/></dd>
                  <dt>Name</dt>
                  <dd><input type="text" className='form-control' onChange={formik.handleChange} value={formik.values.name} id="name" name="name" /></dd>
                  <dt>Description</dt>
                  <dd><textarea name="description" onChange={formik.handleChange} value={formik.values.description} id="description" rows='5' cols='30'></textarea></dd>
                  <dt>Category</dt>
                  <dd>
                    <select className='form-select' onChange={formik.handleChange} value={formik.values.category} name='category' id='category'>
                        <option value="">Select Category</option>
                        <option value="Biryani">Biryani</option>
                        <option value="Cake">Cake</option>
                        <option value="Burger">Burger</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Salad">Salad</option>
                        <option value="Ice cream">Ice Cream</option>
                        <option value="Noodles">Noodles</option>
                        <option value="Fried Rice">Fried Rice</option>
                        <option value="Manchurian">Manchurian</option>
                    </select>
                  </dd>
                  <dt>Price</dt>
                  <dd><input type="number" className='form-control' onChange={formik.handleChange} value={formik.values.price} name='price' id='price' /></dd>
              </dl>
              <button type='submit' className='btn btn-success w-25'>Add</button>
         </form>
    </div>
  )
}

export default AddFood