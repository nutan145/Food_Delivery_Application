import React, { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const exploreFood = () => {

     const[category,setCategory]=useState('All');
     const[searchText,setSearchText]=useState('');

  return (
      <>
           <div className='container'>
             <div className='row justify-content-center'>
                  <div className='col-md-6'>
                        <form onSubmit={(e)=>e.preventDefault()}>
                             <div className="input-group mb-5 mt-2">
                                  <select className='form-select' onChange={(e)=>setCategory(e.target.value)} style={{maxWidth:'180px'}}>
                                       <option value="All" >Select Category</option>
                                       <option value="Biryani" >Biryani's</option>
                                       <option value="Burger" >Burger's</option>
                                       <option value="Pizza" >Pizza's</option>
                                       <option value="Cake" >Cakes</option>
                                       <option value="Ice cream" >Ice Craems</option>
                                       <option value="Salad" >Salads</option>
                                       <option value="Noodles">Noodles</option>
                                       <option value="Fried Rice">Fried Rice</option>
                                       <option value="Manchurian">Manchurian</option>
                                  </select>
                                  <input type="text" className='form-control' placeholder='Search your favorite dish...' 
                                  onChange={(e)=>setSearchText(e.target.value)} value={searchText} />
                                  <button type='submit' className='btn btn-warning bi bi-search'></button>
                             </div>
                        </form>
                  </div>
             </div>
      </div>
       <FoodDisplay category={category} searchText={searchText}/>
    </>
  )
}

export default exploreFood