import axios from "axios";

const ADDTO_CART_API=`https://food-delivery-application-5.onrender.com/cart-api/add`;

const REMOVE_FROM_CART_API=`https://food-delivery-application-5.onrender.com/cart-api/remove`;

const SET_CART_ITEM_QNTY_API=`https://food-delivery-application-5.onrender.com/cart-api/set`;

const GET_CART_API=`https://food-delivery-application-5.onrender.com/cart-api/get`;

export const addFoodItemToCart= async (foodId,token)=>{
    try
    {
       await axios.post(ADDTO_CART_API,{foodId},{headers:{Authorization:`Bearer ${token}`}});
    }
    catch(error)
    {
        console.log("Error while adding the item quantity in cart:"+error);
    }
}

export const removeFoodItemFromCart= async (foodId,token)=>{
    try
    {
        await axios.post(REMOVE_FROM_CART_API,{foodId},{headers:{Authorization:`Bearer ${token}`}});
    }
    catch(error)
    {
         console.error("Error while adding the item quantity in cart",error);
    }
}

export const setCartItemQuantity= async (foodId,token)=>{
    try
    {
        await axios.post(SET_CART_ITEM_QNTY_API,{foodId},{headers:{Authorization:`Bearer ${token}`}});
    }
    catch(error)
    {
         console.error("Error while set the item quantity in cart",error);
    }
}

export const getCart= async (token)=>{
    try
    {
        const response= await axios.get(GET_CART_API,{headers:{Authorization:`Bearer ${token}`}});
        return response.data.items || {};
    }
    catch(error)
    {
       if(error.response && error.response.status==403)
       {
           throw error;
       }
       console.log("Error while fetching the cart items:"+error);
       
    }
}

