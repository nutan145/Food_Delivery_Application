import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets';
import './Orders.css'

const Orders = () => {
         const [data,setData]=useState([]);

         const fetchOrders= async ()=>{
            const response = await axios.get(`https://food-delivery-application-5.onrender.com/order-api/all`);
            setData(response.data);
            console.log(response.data);
         }

         const updateStatus= async(event,orderId)=>{
             const response= await axios.patch(`https://food-delivery-application-5.onrender.com/order-api/status/${orderId}?status=${event.target.value}`);
             if(response.status==200)
             {
                await fetchOrders();
             }
         }

         useEffect(()=>{
                 fetchOrders();
         },[])

  return (
       <div className='container'>
                   <div className='py-5 row justify-content-center'>
                         <div className='col-12 card'>
                               <table className='table table-hover'>
                                       <tbody>
                                           {
                                               data.map((order,index)=>{
                                                    return(
                                                       <tr key={index}>
                                                           <td><img src={assets.parcel} alt="" height={50} width={50}/></td>
                                                           <td>
                                                               <div>
                                                                    {
                                                                  order.orderItems.map((item,index)=>{
                                                                      if(index==order.orderItems.length-1)
                                                                      {
                                                                         return item.name+" - "+item.quantity;
                                                                      }
                                                                      else
                                                                      {
                                                                         return item.name+" - "+item.quantity+", ";
                                                                      }
                                                                  })
                                                               }
                                                               </div>
                                                               <div className='text-sm fw-medium'>
                                                                  {order.userAddress}
                                                               </div>
                                                           </td>
                                                           <td>&#8377;&nbsp;{order.amount.toFixed(2)}</td>
                                                           <td>items:{order.orderItems.length}</td>
                                                           <td>
                                                               <select className='form-control status' 
                                                               onChange={(event)=>updateStatus(event,order.id)} value={order.orderStatus}>
                                                                <option value="Food Preparing">Food Preparing</option>
                                                                <option value="Out For Delivery">Out For Delivery</option>
                                                                <option value="Delivered">Delivered</option>
                                                                <option value="Cancelled">Cancelled</option>
                                                               </select>
                                                           </td>
                                                       </tr>
                                                    )
                                               })
                                           }
                                       </tbody>
                               </table>
                         </div>
                   </div>
             </div>
  )
}

export default Orders