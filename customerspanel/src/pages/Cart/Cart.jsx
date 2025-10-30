import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { CalculateCartTotals } from '../../util/cartUtils'

const Cart = () => {

      const {foodList,increaseQuantity,decreaseQuantity,quantities,removeFromCart}=useContext(StoreContext);

      const navigate=useNavigate();

      const cartItems=foodList.filter(food=>quantities[food.id]>0);

      const {subTotal,shipping,tax,total}=CalculateCartTotals(cartItems,quantities);

  return (
    <div className="container py-5">
    <h3 className="mb-5 fw-bold">Your Shopping Cart</h3>
    <div className="row">
        <div className="col-lg-8">
            {
                cartItems.length==0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="card mb-4">
                       <div className="card-body">
                        {
                            cartItems.map(food=>
                                <div className="row cart-item mb-3" key={food.id}>
                                    <div className="col-md-3">
                                       <img src={food.imageUrl} alt={food.name} className="img-fluid rounded" 
                                        width='100px'/>
                                    </div>
                                    <div className="col-md-5">
                                        <h5 className="card-title">{food.name}</h5>
                                        <p className="text-muted">Category: {food.category}</p>
                                    </div>
                                    <div className="col-md-2">
                                       <div className="input-group">
                                           <button className="btn btn-outline-secondary btn-sm" type="button" 
                                           onClick={()=>decreaseQuantity(food.id)}>-</button>

                                           <input style={{maxWidth:'100px'}} type="text" value={quantities[food.id]} 
                                           className="form-control  form-control-sm text-center quantity-input" readOnly/>

                                           <button className="btn btn-outline-secondary btn-sm" type="button" 
                                           onClick={()=>increaseQuantity(food.id)}>+</button>
                                       </div>
                                    </div>
                                    <div className="col-md-2 text-end">
                                       <p className="fw-bold">&#8377;{(food.price * quantities[food.id]).toFixed(2)}</p>
                                       <button className="btn btn-sm btn-outline-danger" onClick={()=>removeFromCart(food.id)}>
                                           <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <hr />
                              </div>
                            )
                        }
                        </div>
                    </div>
                )
            }
            <div className="text-start mb-4">
                <Link to="/home" className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </Link>
            </div>
        </div>
        <div className="col-lg-4">
            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>&#8377;{subTotal.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Shipping</span>
                        <span>&#8377;{shipping.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Tax</span>
                        <span>&#8377;{tax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>&#8377;{total.toFixed(2)}</strong>
                    </div>
                    <button className="btn btn-primary w-100" disabled={cartItems.length==0} onClick={()=>navigate('/order')}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Cart