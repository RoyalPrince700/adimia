import React, { useEffect, useState } from 'react'
import { useLocation,} from 'react-router-dom'
import VerticalCard from '../components/VerticalCard'
import { searchLocalProducts } from '../data/localProducts'

const SearchProduct = () => {
const query = useLocation()
const [data,setData] = useState([])
const [loading,setLoading] = useState(false)

const fetchProduct = async()=>{
    setLoading(true)
    // Backend version kept here for easy reactivation later.
    // const response = await fetch(SummaryApi.searchProduct.url+query.search)
    // const dataResponse = await response.json()
    // setData(dataResponse.data)

    const params = new URLSearchParams(query.search)
    const searchValue = params.get('q') || ''
    setData(searchLocalProducts(searchValue))
    setLoading(false)
}

useEffect(()=>{
    fetchProduct()
},[query])

  return (
    <div className=' mt-[100px] mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading .....</p>
        )
      }
   <p className='text-lg font-semibold my-3'>Search Results : {data.length} products found</p>
   {
      data.length === 0 && !loading && (
          <p className='bg-white text-center p-4'>No Data Found.....</p>
      )
   }

   {
    data.length !==0 && !loading && (
      
            <VerticalCard loading={loading} data={data}/>   
    )
   }
    </div>
  )
}

export default SearchProduct