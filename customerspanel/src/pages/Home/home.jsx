import React, { useState } from 'react'
import Header from '../../components/Header/header.jsx'
import ExploreMenu from '../../components/ExploreMenu/explore-menu.jsx'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay.jsx'


const home = () => {

   const[category,setCategory]=useState('All');

  return (
    <main className='container'>
          <Header/>
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} searchText={''}/>
    </main>
  )
}

export default home