import React,{createContext, useEffect, useState}from 'react'
import axios from 'axios'
import { fetchFoodList } from '../Service/FoodService';
import { toast } from 'react-toastify';
import { addFoodItemToCart, getCart, removeFoodItemFromCart, setCartItemQuantity } from '../Service/CartService';

export const StoreContext=createContext(null);

export const StoreContextProvider=(props)=>{

      const[foodList,setFoodList]=useState([]);
      const[quantities,setQuantities]=useState({});
      const[token,setToken]=useState("");

      const increaseQuantity= async (foodId)=>{
            setQuantities((prev)=>({...prev,[foodId]:(prev[foodId] || 0)+1}));
            await addFoodItemToCart(foodId,token);
      }

      const decreaseQuantity= async (foodId)=>{
           setQuantities((prev)=>({...prev,[foodId] : prev[foodId]> 0 ? prev[foodId]-1:0}));
           await removeFoodItemFromCart(foodId,token);
      }

      const removeFromCart= async (foodId)=>{
            await setCartItemQuantity(foodId,token);
            setQuantities(previousQuantitis=>{
                  const updatedQuantities={...previousQuantitis};
                  delete updatedQuantities[foodId];
                  return updatedQuantities;
            })
            
      }

      const loadCartData= async (token)=>{
         try
         {
            const response= await getCart(token);
            setQuantities(response || {});
         }
         catch(error)
         {
             if(error.response && error.response.status==403)
             {
                localStorage.removeItem('token');
                setToken('');
                setQuantities({});
             }
             console.log("Error loading cart data:"+error);
         }
      }

      const ContextValue={
           foodList,
           increaseQuantity,
           decreaseQuantity,
           quantities,
           setQuantities,
           removeFromCart,
           token,
           setToken,
           loadCartData
      }

      useEffect(()=>{
            const loadData= async ()=>{
                 try{
                       const data= await fetchFoodList();
                       setFoodList(data);
                       if(localStorage.getItem('token'))
                       {
                          setToken(localStorage.getItem('token'));
                          await loadCartData(localStorage.getItem('token'));
                       }
                 }
                 catch(error){
                       toast.error("Error fetching the food list");
                 }
            }
            loadData();
      },[])

      return(
           <StoreContext.Provider value={ContextValue}>
            {props.children}
           </StoreContext.Provider>
      )
}

