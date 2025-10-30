import React, { useRef } from 'react'
import { Categories } from '../../assets/assets.js'
import './explore-menu.css'

const exploreMenu = ({category,setCategory}) => {

      const menuRef=useRef(null)
      const scrollLeft=()=>{
        if(menuRef.current)
        {
            console.log(menuRef.current);
            menuRef.current.scrollBy({left:-200,behavior:'smooth'})
        }
      }

      const scrollRight=()=>{
        if(menuRef.current)
        {
             menuRef.current.scrollBy({left:200,behavior:'smooth'});
        }
      }

  return (
    <div className='explore-menu position-relative'>
          <h1 className='d-flex align-items-center justify-content-between'>
               Explore Our Menu
               <div className='d-flex'>
                     <i className='bi bi-arrow-left-circle scroll-icon mx-2' onClick={scrollLeft}></i>
                     <i className='bi bi-arrow-right-circle scroll-icon' onClick={scrollRight}></i>
               </div>
          </h1>
          <p>Explore the curated list of dishes from categories</p>
          <div className='d-flex justify-content-between gap-4 overflow-auto explore-menu-list' ref={menuRef}>
            {
                Categories.map((item,index)=>
                    <div key={index} className='text-center explore-menu-list-item' 
                     onClick={()=>setCategory((pre)=>pre===item.category?'All':item.category)}>
                         <img src={item.icon} height={120} width={120} 
                         className={item.category===category ? 'rounded-circle active' :'rounded-circle'}/>
                         <p className='mt-2 fw-bold'>{item.category}</p>
                    </div>
                )
            }
          </div>
          <hr />
    </div>
  )
}

export default exploreMenu