import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './MyOrders.css'

const MyOrders = () => {
         const {token}=useContext(StoreContext);
         const [data,setData]=useState([]);

         const fetchData= async ()=>{
            const response = await axios.get(`https://food-delivery-application-5.onrender.com/order-api/get`,
                {headers:{Authorization:`Bearer ${token}`}});
            setData(response.data);
            console.log(response.data);
         }

         useEffect(()=>{
               if(token)
               {
                  fetchData();
               }
         },[token])

  return (
      <div className='container width'>
            <div className='py-5 row justify-content-center'>
                  <div className=' col-12 card'>
                        <table className='table table-hover'>
                                <tbody>
                                    {
                                        data.length>0 ? (data.map((order,index)=>{
                                             return(
                                                <tr key={index}>
                                                    <td><img src={assets.delivery} alt="" height={45} width={45}/></td>
                                                    <td className="align-items-center">
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
                                                    </td>
                                                    <td className='price'>&#8377;&nbsp;{order.amount.toFixed(2)}</td>
                                                    <td>items:{order.orderItems.length}</td>
                                                     <td className={`order-status fw-bold text-capitalize ${
                                                         order.orderStatus === 'delivered' ? 'text-success' : 
                                                         order.orderStatus === 'Cancelled' ? 'text-danger' :'text-success'
                                                     }`}>
                                                         {order.orderStatus}
                                                    </td>
                                                    <td>
                                                        <button className='btn btn-sm btn-warning' onClick={fetchData}>
                                                           <i className='bi bi-arrow-clockwise'></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                             )
                                        })) : 
                                        (<div className='p-5 bg-light rounded-3 mt-1 text-center'>
                                             <div className='container-fluid py-5 text-center'>
                                                <h3 className='fw-bold'>Orders Not yet </h3>
                                                <p className='fw-light fst-italic'> Looks like you haven’t placed any orders yet. Explore our menu to find something delicious food items!</p>
                                                <Link to='/explore' className='btn btn-success'>Browse Menu</Link>
                                             </div>
                                         </div>)
                                    }
                                </tbody>
                        </table>
                  </div>
            </div>
      </div>
  )
}

export default MyOrders