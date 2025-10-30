import axios from "axios";

const GET_FOODITEMS=`https://food-delivery-application-5.onrender.com/food-api/all`;

const GET_FOODITEM=`https://food-delivery-application-5.onrender.com/food-api/find`;

export const fetchFoodList= async()=>{
         try
         {
            const response= await axios.get(GET_FOODITEMS);
            return response.data;
         }
         catch(error)
         {
            console.log("Error getting the food list",error);
            throw error;
         }
} 

export const fetchFoodDetails= async (id)=>{
        try
        {
         const response= await axios.get(GET_FOODITEM+`/${id}`);
         return response.data;
        }
        catch(error)
        {
           console.error('Error geting the food item details:',error);
           throw error;
        }
   }
