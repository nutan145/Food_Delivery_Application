import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category,searchText}) => {
  const {foodList}= useContext(StoreContext);

  const filteredFoodList=foodList.filter(food=>(
        (category==='All' || food.category===category) && 
        food.name.toLowerCase().includes(searchText.toLowerCase())
  )); 

  return (
    <div className='container'>
          <div className='row'>
           {
              filteredFoodList.length>0 ? (
                filteredFoodList.map((item,index)=>(
                   <FoodItem key={item.id} 
                      id={item.id}
                      name={item.name}
                      description={item.description}
                      imageUrl={item.imageUrl}
                      price={item.price}
                   />
                )
              )) : (
                 <div className='p-5 bg-light rounded-3 mt-1 text-center'>
                     <div className='container-fluid py-5 text-center'>
                       <h3 className='fw-bold'>Requested Food Item Not Found</h3>
                       <p className='fw-light fst-italic'>Sorry for the inconvenience. Please try searching for another food item.</p>
                    </div>
                </div>)
           }
          </div>
    </div>
  )
}

export default FoodDisplay