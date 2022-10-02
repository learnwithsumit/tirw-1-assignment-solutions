import React from 'react'
import { useSelector } from 'react-redux'
import Product from './Product'

function Products() {
  const { products } = useSelector((state) => state.products)
  return (
    <>
      <div className="col-span-12 sm:col-span-12 md:col-span-7 lg:col-span-8 xxl:col-span-8">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default Products
