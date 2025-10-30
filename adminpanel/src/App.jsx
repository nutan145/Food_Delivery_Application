import React, { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import AddFood from './pages/AddFood/addFood'
import FoodList from './pages/FoodList/foodList'
import Orders from './pages/Orders/orders'
import Sidebar from './components/Sidebar/sidebar'
import Menubar from './components/Menubar/menubar'
import { ToastContainer} from 'react-toastify';
import UpdateFoodItem from './pages/UpdateFoodItem/UpdateFoodItem'

const App = () => {
     
    const [sidebarVisible,setSidebarVisible]=useState(true);

    const togglesidebar=()=>{
        setSidebarVisible(!sidebarVisible);
    } 

  return (
    <div>
           <div className="d-flex" id="wrapper">
            <div className="border-end bg-white" id="sidebar-wrapper">
                <Sidebar sidebarVisible={sidebarVisible}/>
            </div>
            <div id="page-content-wrapper">
                 <Menubar togglesidebar={togglesidebar}/>
                 <ToastContainer/>
                <div className="container-fluid">
                    <Routes>
                        <Route path='/add' element={<AddFood/>}></Route>
                        <Route path='/list' element={<FoodList/>}></Route>
                        <Route path='/orders' element={<Orders/>}></Route>
                        <Route path='/update/:id' element={<UpdateFoodItem/>}></Route>
                        <Route path='/' element={<FoodList/>}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    </div>
  )
}

export default App