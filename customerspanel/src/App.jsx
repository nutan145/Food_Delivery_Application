import React, { useContext } from 'react'
import Menubar from './components/Menubar/menubar.jsx'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home/home.jsx'
import ContactUs from './pages/ContactUs/contact-us.jsx'
import ExploreFood from './pages/ExploreFood/explore-food.jsx'
import FoodDetails from './pages/FoodDetails/FoodDetails.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import { toast, ToastContainer } from 'react-toastify'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import { StoreContext } from './context/StoreContext.jsx'
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx'

const App = () => {
         const {token}=useContext(StoreContext);
  return (
    <div>
          <ToastContainer/>
          <Menubar/>
          <Routes>
               <Route path='/' element={<Home/>}></Route>
               <Route path='/home' element={<Home/>}></Route>
               <Route path='/contact-us' element={<ContactUs/>}></Route>
               <Route path='/explore' element={<ExploreFood/>} ></Route>
               <Route path='/foodItem/:id' element={<FoodDetails/>}></Route>
               <Route path='/cart' element={<Cart/>}></Route>
               <Route path='/order' element={token ? <PlaceOrder/>:<Login/>}></Route>
               <Route path='/register' element={token ? <Home/>:<Register/>}></Route>
               <Route path='/login' element={token ? <Home/>:<Login/>}></Route>
               <Route path='/myOrders' element={token ? <MyOrders/>:<Login/>}></Route>
               <Route path='*' element={<PageNotFound/>}></Route>
          </Routes>
    </div>
  )
}

export default App