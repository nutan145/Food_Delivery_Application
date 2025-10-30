import './PlaceOrder.css';
import React, { useContext } from 'react';
import { assets } from '../../assets/assets.js';
import { StoreContext } from '../../context/StoreContext';
import { CalculateCartTotals } from '../../util/cartUtils.js';
import {useFormik} from 'formik'
import axios from 'axios';
import { toast } from 'react-toastify';
import { RAZORPAY_KEY } from '../../util/constants.js';
import { useNavigate } from 'react-router-dom';
import Razorpay from 'razorpay'


const PlaceOrder = () => {
     const {foodList,quantities,setQuantities,token}=useContext(StoreContext)
     const cartItems=foodList.filter(food=>quantities[food.id]>0);
     const {subTotal,shipping,tax,total}=CalculateCartTotals(cartItems,quantities);
     const navigate=useNavigate();

     const clearCart= async ()=>{
                 try
                 {
                    await axios.delete(`https://food-delivery-application-5.onrender.com/cart-api/clear`,
                           {headers:{Authorization:`Bearer ${token}`}});
                    setQuantities({})
                 }
                 catch(error)
                 {
                    console.log(error);
                    toast.error('error while clearing the cart');
                 }
             }

      const deleteOrder= async (orderId)=>{
                  try
                  {
                     await axios.delete(`https://food-delivery-application-5.onrender.com/order-api/remove/${orderId}`,
                    {headers:{Authorization:`Bearer ${token}`}})
                  }
                  catch(error)
                  {
                     console.log(error);
                     toast.error('something went wrong contact support');
                  }
             }

       const verifyPayment= async (razorpayResponse)=>{
                  const paymentData={
                    razorpay_payment_id:razorpayResponse.razorpay_payment_id,
                    razorpay_order_id:razorpayResponse.razorpay_order_id,
                    razorpay_signature:razorpayResponse.razorpay_signature
                  }

                  const response= await axios.post(`https://food-delivery-application-5.onrender.com/order-api/verify`,
                    paymentData,{headers:{Authorization:`Bearer ${token}`}});
                    try
                    {
                    if(response.status==200)
                    {
                      toast.success("payment completed successfully");
                      await clearCart();
                      navigate('/myOrders');
                    }
                    else
                    {
                       toast.error('payment falide please try again');
                       navigate('/');                   
                    }

                    }
                    catch(error)
                    {
                        console.log(error);
                         toast.error('payment falide please try again later');
                    } 
                 }

        const initiateRazorpayPayment=(order,details)=>{
                 const options={
                      key:RAZORPAY_KEY,
                      amount:order.amount,
                      currency:"INR",
                      name:"Food Land",
                      description:"food order payment",
                      order_id:order.razorpayOrderId,
                      handler: async function(razorpayResponse){
                          await verifyPayment(razorpayResponse)
                      },
                      prefill:{
                          name:`${details.firstName} ${details.lastName}`,
                          email:details.email,
                          contact:details.phoneNumber
                      },
                      theme:{color:'#3399cc'},
                      modal:{
                          ondismiss: async function(){
                            toast.error('payment cancelled');
                            await deleteOrder(order.id);
                          }
                      }
                 }

                 const razorpay=new window.Razorpay(options);
                 razorpay.open();
             }        

     const formik=useFormik({
        initialValues:{
              firstName:'',
              lastName:'',
              email:'',
              phoneNumber:'',
              address:'',
              area:'',
              state:'',
              zip:''
        },

        onSubmit: async (details)=>{
             const orderData={
               userAddress:`${details.firstName} ${details.lastName},${details.address},
               ${details.area},${details.state},${details.zip}`,
               email:details.email,
               phoneNumber:details.phoneNumber,
               orderItems: cartItems.map(item=>({
                      foodId:item.id,
                      name:item.name,
                      description:item.description,
                      category:item.category,
                      price:item.price,
                      quantity:quantities[item.id],
                      imageUrl:item.imageUrl
               })),
               amount:total.toFixed(2),
               orderStatus:"preparing"
             }

             try
             {
                const response= await axios.post(`https://food-delivery-application-5.onrender.com/order-api/create`,
                  orderData,{headers:{Authorization:`Bearer ${token}`}})
                  console.log(response.data);

                if(response.status==200 && response.data.razorpayOrderId)
                {
                    //initiate the payment
                    initiateRazorpayPayment(response.data,details);
                }
                else
                {
                    toast.error('unalble to place the order please try again');
                }
             }
             catch(error)
             {
                console.log(error);
                toast.error('unalble to place the order please try again later');
             }
             
        }
     })


  return (
    <div className="container">
        <div className="py-2 text-center">
      <img className="d-block mx-auto mb-2 rounded-circle" src={assets.LOGO} width="80" height="70" />
    </div>
      <div className="row g-5">
        <div className="col-md-5 col-lg-5 order-md-last ">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill">{cartItems.length}</span>
          </h4>
          <ul className="list-group mb-3">
            {
                cartItems.map(item=>
                    <li key={item.id} className="list-group-item d-flex justify-content-between lh-sm">
                       <div>
                            <h6 className="my-0">{item.name}</h6>
                            <small className="text-muted">Qnty:{quantities[item.id]}</small>
                       </div>
                       <span className="text-muted">&#8377; {item.price*quantities[item.id]}</span>
                    </li>
                )
            }
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Shipping Price</h6>
              </div>
              <span className="text-muted">&#8377; {shipping}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <div>
                <h6 className="my-0">Tax(10%)</h6>
              </div>
              <span className="text-muted">&#8377; {tax}</span>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (INR)</span>
              <strong>&#8377; {total.toFixed(2)}</strong>
            </li>
          </ul>
        </div>

        {/* Billing Form (Left Column) */}
        <div className="col-md-7 col-lg-7 "  style={{height:'100px',width:'600px'}}>
          <h4 className="mb-2">Billing address</h4>
          <form onSubmit={formik.handleSubmit} className="needs-validation">
          <div className="row g-2">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">First name</label>
              <input type="text" className="form-control" onChange={formik.handleChange} name="firstName"  required />
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">Last name</label>
              <input type="text" className="form-control" onChange={formik.handleChange} name="lastName" required />
            </div>

            <div className="col-12">
              <label htmlFor="username" className="form-label">Email</label>
              <div className="input-group has-validation">
                <span className="input-group-text">@</span>
                <input type="text" className="form-control" onChange={formik.handleChange} name="email" placeholder="Email" required />    
              </div>
            </div>

            <div className="col-12">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="text" className="form-control" onChange={formik.handleChange} name="phoneNumber"  required />
            </div>
            

            <div className="col-12">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" onChange={formik.handleChange} name="address"  required />
            </div>

            <div className="col-md-5">
              <label htmlFor="country" className="form-label">Area</label>
              <select className="form-select" onChange={formik.handleChange} name="area" required>
                <option value="">Choose...</option>
                <option>Hyderabad</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">State</label>
              <select className="form-select" onChange={formik.handleChange} name="state" required>
                <option value="">Choose...</option>
                <option>Telangana</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">Zip</label>
              <input type="text" className="form-control" onChange={formik.handleChange} name="zip"  required />
            </div>
          </div>

          <hr className="my-2" />

          <button className="w-100 btn btn-primary btn-lg mb-lg-5" type="submit" disabled={cartItems.length==0}>
            Continue to checkout
          </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
