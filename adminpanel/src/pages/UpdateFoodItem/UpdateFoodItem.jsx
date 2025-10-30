import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import {useFormik} from 'formik';
import*as yup from 'yup';
import axios from 'axios';
import {toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';
import { useNavigate, useParams } from 'react-router-dom';
import { updateFoodItem } from '../../Service/FoodService';


const UpdateFoodItem = () => {
  
  const[image,setImage]=useState(null);
  const[preview,setPreview]=useState(null);
  const[foodItem,setFoodItem]=useState();
  const params=useParams();
  const navigate=useNavigate();

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
      setImage(null); //clear the old image url
      setPreview(compressedFile); //set the new compressed file
    } catch (error) {
      console.error('Compression error:', error);
      toast.error('Image compression failed');
    }
  };

    const loadFoodItem= async ()=>{
           console.log("food item details");
           const response= await axios.get(`https://food-delivery-application-5.onrender.com/food-api/find/${params.id}`);
           setFoodItem(response.data);
           setImage(response.data.imageUrl);
           console.log(response.data);
    }

    useEffect(()=>{
           loadFoodItem();
    },[]);

  
  const formik=useFormik({
         
         initialValues:{
           name:foodItem?.name || '',
           description:foodItem?.description || '',
           category:foodItem?.category || '',
           price:foodItem?.price || 0
         },

         enableReinitialize:true,

         onSubmit:  async (data)=>{
            
                if(!image && !preview)
                  {
                    toast.error('please select an image');
                    return;
                  }
                  
                  const toastId = toast.loading('Updating the food item...');

                try
                {  

                  const response= await updateFoodItem(params.id,data,preview);
                 
                 if(response.status==200)
                 {
                    // Update loading toast to success
                    toast.update(toastId, {
                        render: 'Food item updated successfully!',
                        type: 'success',
                        isLoading: false,
                        autoClose: 2000,
                        });  

                    navigate('/list');
                 }
              
              }
              catch(error)
              {
                console.log(error);
                toast.dismiss(toastId);
                toast.error('failed to update the food item');
              }
         }
  }); 

  return (
    <div className='container w-50  mt-2 p-4 border border-1 border-dark rounded-2'>
         <h3 className='text-center'>Update Food Item Details</h3>
         <hr />
         <form onSubmit={formik.handleSubmit}>
              <dl>
                   <dt>
                      <label htmlFor="image">
                        <img src={preview? URL.createObjectURL(preview):image} height={70} width={70} alt='food item preview'/>
                      </label>
                   </dt>
                   <dd><input type="file" id='image' hidden onChange={handleImageChange}/></dd>
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
              <button type='submit' className='btn btn-success w-25'>Modify</button>
         </form>
    </div>
  )
}

export default UpdateFoodItem